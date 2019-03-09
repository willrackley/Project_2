/* ---------   Customer Orders script ------------
Created on: 03/08
Script to be called from ../public/customerOrders.html 
------------------------------------------------ */

$(document).ready(function(){
    var orderData;
    var ordersColumn = [];
    
    function getCustomerOrders(){
        //console.log("at getCustomerOrders");
        $.get('/app/orders/get-last', function(data){
            orderData = data;
            //console.log(orderData);
            initializeOrderData();
        });
    }

    function initializeOrderData() {
        var ordersToAdd = [];
        ordersColumn = [];
        for (var i = 0; i < orderData.length; i++) {
          ordersToAdd.push(createOrderDiv(orderData[i]));
        }
        $('#lastOrderContainer').append(ordersToAdd);
    }
   
    function convertUTCDateToLocalDate (UTCDateString) {
        var convertdLocalTime = new Date(UTCDateString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

        return (monthNames[convertdLocalTime.getMonth()] + '/' + convertdLocalTime.getDate() + '/' + convertdLocalTime.getFullYear('YYYY') + '  ' + convertdLocalTime.getHours() + ':' + convertdLocalTime.getMinutes());
    }

    function createOrderDiv(orderData) {
        //console.log('at CreateNewRow'); 
        ordersColumn = [];

        var card = $('<div class="card customerOrderCards mb-5">');
        var cardHeader = $('<div class="card-header customerOrderCardHeader w-100">');
        var cardBody = $('<div class="card-body p-3">');
        var status = $('<div class="mt-1 font-weight-bold h4">');

        var lastOrderIndex = orderData.Orders.length - 1;
        status.attr('id', 'status'+ orderData.Orders[lastOrderIndex].id);
        status.text('Status: ' + orderData.Orders[lastOrderIndex].status);

        cardHeader.text('Date:  ' + convertUTCDateToLocalDate(orderData.Orders[lastOrderIndex].createdAt) + '  . Total Price: ' + orderData.Orders[lastOrderIndex].total_price); 
        //cardHeader.text('Total Price: ' + orderData.Orders[lastOrderIndex].total_price );

        for(var j=0; j < orderData.Orders[lastOrderIndex].detailOrders.length; j++ ){
            var quantity = orderData.Orders[lastOrderIndex].detailOrders[j].quantity;
            var product = orderData.Orders[lastOrderIndex].detailOrders[j].Product.name;
           
            ordersColumn.push(quantity);
            ordersColumn.push(product);
        }
    

        cardBody.text(ordersColumn.join(['\x0a \x0a']));
        status.appendTo(cardHeader);

        cardHeader.appendTo(card);
        //ordeeOrderData.text(ordersColumn.join(['\xa0 \xa0']));
        cardBody.appendTo(card)
        $('#lastOrderContainer').append(card);

        
    }

    getCustomerOrders();

}); // End - $(document).ready(function(){