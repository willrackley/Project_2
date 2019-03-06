
$(document).ready(function(){
    var cart = [];
    var myOrder = [];
    var deleteCtr = 0;
    var menuItems;
    $('#orderHeader').hide();
    $('#priceTotal').hide();

    //creates the rows to be displayed in the orders section
    function creatOrderRows(itemChoice){
        var orderDiv = $('<div class="card mb-2" id='+itemChoice.id+'>');
        var cardBody = $('<div class="card-body">');
        var input = $('<input type="number" class="mr-3" min="1" value='+ itemChoice.amount + ' max="10">');
        var hiddenInput = $('<input type="hidden" class="hidden" value='+ itemChoice.id + '>');
        var deleteBtnDiv = $('<div class="mb-2 text-right">');
        var deleteBtn = $('<button class="deleteItem" >');
        deleteBtn.attr('id',itemChoice.id);
        deleteBtn.text('x');
        deleteBtn.appendTo(deleteBtnDiv);
        deleteBtnDiv.appendTo(cardBody);
        cardBody.append(hiddenInput);
        cardBody.append(input);
        cardBody.append(itemChoice.name + " | " + itemChoice.price);
        cardBody.appendTo(orderDiv);
        $('#orderSection').append(orderDiv);
    }

    //takes all products from the database and runs a function to neatly display them 
    function initializeRows() { 
        $('#menuContainer').empty();
        var itemsToAdd = [];
        for (var i = 0; i < menuItems.length; i++) {
            itemsToAdd.push(createNewRow(menuItems[i]));
        }
        $('#menuContainer').append(itemsToAdd);
    }

    //creates the rows that are going to be displayed in menu section
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
        var input = $('<input type="number" id="itemAmountInput' + menuItem.id +  '"  class="mr-3 text-center" min="1" value="1" max="10">');
        addBtn.append(addSymbol);
        buttonDiv.append(input);
        buttonDiv.append(addBtn);
        cardBody.append(buttonDiv);
        card.append(cardHeader);
        card.append(cardBody);
        $('#menuContainer').append(card);
    }

    //function that grabs all api information
    function getMenu() {
        $.get('/app/products', function(data) {
            menuItems = data;
            console.log(menuItems)
            ;
            initializeRows();
        });
    }

    //displays selected menu item in the orders section
    function displayOrders(){
        $('#orderSection').empty();
        for(var i=0; i < cart.length; i++){
            myOrder.push(creatOrderRows(cart[i]));
        }
        $('#orderSection').append(myOrder);
    } 

    $('#userScanQRcode').on('click', function(){
        getMenu();
    });

    //click event that adds menu item to the users order
    $(document).on('click', '.addBtn', function(){
        $('#orderHeader').show();
        $('#priceTotal').show();

        var inputKey = $(this).attr('key');
        var inputSelector = '#itemAmountInput' + inputKey;
        var inputAmount = parseInt($(inputSelector).val());

        var itemChoice = {
            id: parseInt(inputKey),
            name: $(this).attr('itemName'),
            price: $(this).attr('itemPrice'),
            amount: inputAmount
        };
        
        //logic to make sure the user cant add repeat items to his order
        //it increments the amount of the item instead
        if(cart.length === 0){
            cart.push(itemChoice);
            console.log('added to empty cart');
        } else {
            var newItem = true;
            for(var i=0; i < cart.length; i++){
                console.log("actual CART id = " + cart[i].id + " TYPE " + (typeof cart[i].id)  );
                console.log("actual CHOICE id = " + itemChoice.id + " TYPE " +(typeof itemChoice.id ) );
                if(cart[i].id === itemChoice.id){
                    newItem = false;
                    cart[i].amount+= itemChoice.amount;
                    console.log('already on cart');
                } 
            }
            if(newItem) cart.push(itemChoice);
        }
        console.log(cart);
        displayOrders();
    }); 

    //click event deletes item from order's section
    $(document).on('click', '.deleteItem', function(){
        var deleteKeySelector = '#' + $(this).attr('id');
        var deleteKey = $(this).attr('id');
        var deleteItem = $('.hidden').val();
    
        $(deleteKeySelector).remove();
        for(var i=0; i < cart.length; i++){
            if(cart[i].id === parseInt(deleteKey)){
                cart.splice(i,1); 
            }
        } 
    });

});