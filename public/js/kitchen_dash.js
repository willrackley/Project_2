$(document).ready(function(){
    var orderData;
    var ordersColumn = [];
    function getOrders(){
        $.get('/app/orders/kitchen', function(data){
            orderData = data;

            console.log(orderData);

            initializeOrderData();
        });
    }

    function initializeOrderData(){
       var ordersToAdd = [];
       ordersColumn = [];
       for (var i = 0; i <orderData.length; i++) {
           ordersToAdd.push(createOrderDiv(orderData[i]));
        }
        $('#orderContainer').append(ordersToAdd);
    }

    function createOrderDiv(orderData){
        //console.log('made it')
        ordersColumn = [];
        var card = $('<div class="card kitchenOrderCards mb-5">');
        var cardHeader = $('<div class="card-header kitchenCardHeader w-100">');
        var cardBody = $('<div class="card-body p-3">');
        var status = $('<div class="mt-1">');
        status.text('STATUS: pending');
        var btnDiv = $('<div class="text-center">')
        var redBtn = $('<button class="btn btn-danger RedButton mx-1 mt-2">');
        redBtn.attr('id', 'kitchen-action');
        redBtn.attr('value', orderData.id);
        redBtn.text('CANCELED');
        var yellowBtn = $('<button class="btn mx-1 btn-warning YellowButton mt-2">');
        yellowBtn.attr('id', 'kitchen-action');
        yellowBtn.attr('value', orderData.id);
        yellowBtn.text('IN PROCCESS');
        var greenBtn = $('<button class="btn mx-1 btn-success GreenButton mt-2">');
        greenBtn.attr('id', 'kitchen-action');
        greenBtn.attr('value', orderData.id);
        greenBtn.text('COMPLETED');
        cardHeader.text('ORDER: ' + orderData.id);
        for(var i=0; i < orderData.detailOrders.length; i++ ){
            var quantity = orderData.detailOrders[i].quantity
            var product = orderData.detailOrders[i].Product.name
            ordersColumn.push(quantity);
            ordersColumn.push(product);
        }
        cardBody.text(ordersColumn.join(['\xa0 \xa0']));
        status.appendTo(cardHeader);
        redBtn.appendTo(btnDiv);
        yellowBtn.appendTo(btnDiv);
        greenBtn.appendTo(btnDiv);
        btnDiv.appendTo(cardBody);
        cardHeader.appendTo(card);
        //ordeeOrderData.text(ordersColumn.join(['\xa0 \xa0']));
        cardBody.appendTo(card)
        $('#orderContainer').append(card);
       
    }

    getOrders();
    
});