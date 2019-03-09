/* ---------   Customer Orders script ------------
Created on: 03/08
Script to be called from ../public/customerOrders.html 
------------------------------------------------ */

$(document).ready(function(){
    var orderData;
    var ordersColumn = [];
    
    function getCustomerOrders(){
        console.log("at getCustomerOrders");
        $.get('/app/orders/by-user', function(data){
            orderData = data;
            console.log(orderData);
            initializeTableData();
        });
    }

    function initializeTableData() {
        var itemsToAdd = [];
        ordersColumn = [];
        for (var i = 0; i < orderData.length; i++) {
          itemsToAdd.push(createTableData(orderData[i]));
        }
        $('#todaysOrdersContainer').append(itemsToAdd);
    }

   
    function createTableData(orderData) {
        console.log('at CreateNewRow'); 
        ordersColumn = [];

        // console.log(orderData.Orders[0].order_user_id);
        // console.log(orderData.id);

        for(var i=0; i < orderData.Orders.length; i++ ){
            for(var j=0; j < orderData.Orders[i].detailOrders.length; j++){
                //console.log(orderData.Orders[i].detailOrders[j]);
                //console.log(orderData.Orders[i].detailOrders[j].quantity + '. ' + orderData.Orders[i].detailOrders[j].Product.name);
                // ordersColumn.push(orderData.Orders[i].status);
                // ordersColumn.push(orderData.Orders[i].createdAt);
                // ordersColumn.push(orderData.Orders[i].detailOrders[j].quantity);
                // ordersColumn.push(orderData.Orders[i].detailOrders[j].Product.name);
                if (orderData.id === orderData.Orders[i].order_user_id)
                {
                    ordersColumn.push({
                        ProductName:   orderData.Orders[i].detailOrders[j].Product.name,
                        Quantity:      orderData.Orders[i].detailOrders[j].quantity, 
                        Status:        orderData.Orders[i].status,
                        Date:          orderData.Orders[i].createdAt
                    });
                }
            }
        }
        //var tableRow = " ";
        
        for (var i = 0; i < ordersColumn.length; i++) {
            var tableRow = $('<tr>');
            var tableTh = $('<th scope="row">');
            tableRow.append(tableTh);
            var product = $('<td>');
            product.text = ordersColumn[i].ProductName; 
            // console.log('product text: ' + product.text);
            //tableRow.append(product);
            product.appendTo(tableRow);
            var quantity = $('<td>'); 
            quantity.text = ordersColumn[i].Quantity;
            tableRow.append(quantity);
            var status = $('<td>');
            status.text = ordersColumn[i].Status;
            tableRow.append(status);
            var date = $('<td>');
            date.text = ordersColumn[i].Date;
            tableRow.append(date);
            tableRow.append('</tr>');

            //$('#tableBody').appendTo(tableRow);
            tableRow.appendTo($('#tableBody'));

        }
        //$('#tableBody').append('</tr>');
        console.log(ordersColumn);
        //console.log(tableRow.text);
        
    }
    
    getCustomerOrders();

}); // End - $(document).ready(function(){