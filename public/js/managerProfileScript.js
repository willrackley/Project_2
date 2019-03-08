var menuItems;

    //function that grabs all api information
    function getMenu() {
        $.get('/app/products', function(data) {
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
        category.text(productcategories.name);
        //tableRow.append(id);
        tableRow.append(item);
        tableRow.append(price);
        tableRow.append(category);
        tableRow.appendTo($('#tableBody'));
       
       

    }
    getMenu();

    // Get Categories and Products From Database And Add To Select List
$(document).ready(function(){
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

    