$(document).ready(function(){
    var orderData;
    var ordersColumn = [];
    function getOrders(){
        $.get('/app/orders/by-user', function(data){
            orderData = data;
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

    function createTableData(orderData){
        //console.log('made it')
        ordersColumn = [];
        var row = $('<tr>');
        var tableNumb = $('<th scope="row">');
        var orderTableData = $('<td>');
        for(var i=0; i < orderData.Orders.length; i++ ){
            for(var j=0; j < orderData.Orders[i].detailOrders.length; j++){
            //console.log(orderData.Orders[i].detailOrders[j]);
            //console.log(orderData.Orders[i].detailOrders[j].quantity + '. ' + orderData.Orders[i].detailOrders[j].Product.name);
            ordersColumn.push(orderData.Orders[i].detailOrders[j].quantity);
            ordersColumn.push(orderData.Orders[i].detailOrders[j].Product.name);
            }
        }
        console.log(ordersColumn);
        orderTableData.text(ordersColumn[0] + '. ' + ordersColumn[1]);
        tableNumb.appendTo(row);
        orderTableData.appendTo(row);
        row.appendTo($('#kitchenTableBody'));
       
    }

    getOrders();
    
});