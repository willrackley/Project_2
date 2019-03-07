var menuItems;

    //function that grabs all api information
    function getMenu() {
        $.get('/app/products', function(data) {
            menuItems = data;
            console.log(menuItems)
            initializeRows();
        });
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
        var id =$('<th scope="row">');
        id.text(menuItems.id);
        var item=$('<td>');
        item.text(menuItems.name);
        var price=$('<td>');
        price.text(menuItems.discount_price);
        var category=$('<td>');
        category.text(menuItems.category_id);
        tableRow.append(id);
        tableRow.append(item);
        tableRow.append(price);
        tableRow.append(category);
        tableRow.appendTo($('#tableBody'));
       
       

    }
    getMenu();

    // Get Categories From Database And Add To Select List
$(document).ready(function(){
    $.get('/app/products/categories', function(data) {
        console.log(data);
        for (var i=0; i < data.length; i++) {
            var option =$('<option>');
            option.attr('value', data[i].id);
            option.text(data[i].name);
            option.appendTo($("#select-categories"));
        }
    });
});

    