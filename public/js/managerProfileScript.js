$(document).ready(function(){

var menuItems;

    //function that grabs all api information
    function getMenu() {
        $.get('/app/products/by-category', function(data) {
            menuItems = data;
            productcategories = data;
            console.log(menuItems)
            initializeRows();
        });
    }

    //function to display order total in 00.00 format
  function roundNumber(num,n){
      return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
    }
     
    function initializeRows() {
        var itemsToAdd = [];
        for (var i = 0; i < menuItems.length; i++) {
          itemsToAdd.push(createNewRow(menuItems[i]));
        }
        $('#menuContainer').append(itemsToAdd);
    }

   

    function createNewRow(menuItems) {
        var tableRow =$('<tr>');
        //var id =$('<th scope="row">');
        //id.text(menuItems.id);
        var item=$('<td>');
        item.text(menuItems.name);
        var price=$('<td>');
        price.text('$' + roundNumber(menuItems.regular_price,2));
        var category=$('<td>');
        category.text(menuItems.productCategory.name);
        //tableRow.append(id);
        tableRow.append(item);
        tableRow.append(price);
        tableRow.append(category);
        tableRow.appendTo($('#tableBody'));

    }

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
       for (var i = 0; i < orderData.length; i++) {
           ordersToAdd.push(createOrderDiv(orderData[i]));
        }
        $('#orderContainer').append(ordersToAdd);
    }

    function createOrderDiv(orderData){
        //console.log('made it')
        ordersColumn = [];
        var card = $('<div class="card managerMenuCards mb-5">');
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
    getMenu();

    // Get Categories and Products From Database And Add To Select List
    $.get('/app/products/categories', function(data) {
        for (var i=0; i < data.length; i++) {
            var option =$('<option>');
            option.attr('value', data[i].id);
            option.text(data[i].name);
            option.appendTo($("#select-categories"));
        }
    });

    $.get('/app/products', function(data) {
        menuProducts = data;
        for (var i=0; i < data.length; i++) {
            var option =$('<option>');
            option.attr('value', data[i].id);
            option.text(data[i].name);
            option.appendTo($("#select-product"));
        }
    });


$('#select-product').on('change', function() {
    for (var i=0; i < menuItems.length; i++) {
        if (menuItems[i].id === this.value) {
            $('#productId').val(menuItems[i].id);
            $('#itemName').val(menuItems[i].name);
            $('#regularPrice').val(menuItems[i].regular_price);
            $('#discountPrice').val(menuItems[i].discount_price);
            $('#productImg').val(menuItems[i].product_image);
            $('#itemDecription').val(menuItems[i].description);
        }
    }
});

});

    