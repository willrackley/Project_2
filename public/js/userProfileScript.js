var cart = [];

$('#userScanQRcode').on('click', function(){

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
        $('#menuContainer').empty();
       
        var itemsToAdd = [];
        for (var i = 0; i < menuItems.length; i++) {
          itemsToAdd.push(createNewRow(menuItems[i]));
        }
        $('#menuContainer').append(itemsToAdd);
    }

    function createNewRow(menuItem) {
        var card = $('<div>');
        card.addClass('card mb-5');
        var cardHeader = $('<div>');
        cardHeader.addClass('card-header w-100');
        cardHeader.text(menuItem.name + " " + "|" + " " + menuItem.discount_price);
        var cardBody = $('<div>');
        cardBody.addClass('card-body');
        cardBody.text(menuItem.description);
        var buttonDiv = $('<div>');
        buttonDiv.addClass("mt-2")
        var addBtn = $('<button>');
        addBtn.addClass("addBtn");
        addBtn.attr("itemName", menuItem.name);
        addBtn.attr("key", menuItem.id);
        addBtn.attr("itemPrice", menuItem.discount_price);
        var addSymbol = $('<i class="fas fa-plus">');
        addSymbol.addClass("p-2 text-dark");
        var input = $('<input type="number" id="itemAmountInput' + menuItem.id +  '"  class="mr-3 text-center" min="1" value="1" max="5">');
        addBtn.append(addSymbol);
        buttonDiv.append(input);
        buttonDiv.append(addBtn);
        cardBody.append(buttonDiv);
        card.append(cardHeader);
        card.append(cardBody);
        $('#menuContainer').append(card);
    }
    getMenu();
});

$(document).on('click', '.addBtn', function(){
    var inputKey = $(this).attr('key');
    var inputSelector = '#itemAmountInput' + inputKey;
    var inputAmount = parseInt($(inputSelector).val());

    var itemChoice = {
        name: $(this).attr('itemName'),
        price: $(this).attr('itemPrice'),
        amount: inputAmount
     };

    cart.push(itemChoice);
    console.log(cart);
    //still need to list the cart items in the checkout page
    //and add to orders table
}); 