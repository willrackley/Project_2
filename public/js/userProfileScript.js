
$(document).ready(function(){
    var cart = [];
    var myOrder = [];
    var itemTotals = [];
    var userId = [];
    var postedCost = [];
    var grabOrderId= [];
    var orderId;
    var menuItems;

    $('#orderHeader').hide();
    $('#priceTotal').hide();
    $('#reviewOrder').hide();
    $('#comment').hide();

    /*=====================FUNCTIONS====================*/

    //creates the rows to be displayed in the orders section
    function creatOrderRows(itemChoice){
        var orderDiv = $('<div class="card mb-2 orderCards" id='+itemChoice.id+'>');
        var cardBody = $('<div class="card-body">');
        var input = $('<input type="number" class="mr-3" min="1" value='+ itemChoice.amount + ' max="10" id="input' + itemChoice.id +'" >');
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
        var card = $('<div class="card menuCards mb-5">');
        var cardHeader = $('<div class="card-header cardHeads w-100">');
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
            initializeRows();
        });
    }


    function postOrder(createOrder, cart){
        $.post("/app/orders/add", createOrder, function(data) {
            orderId = data.id

            for(var i=0; i < cart.length; i++){ 
                cart[i].order_id = orderId;
                $.post("/app/orders/add/detailed", cart[i], function(){
                });       
            }
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

    //function to display order total in 00.00 format
    function roundNumber(num,n){
        return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
      }

    //function to calculate final order total
    function finalTotal(){
        var sum = 0;
        
        for(var i=0; i < itemTotals.length; i++){
            sum += itemTotals[i];
            sum = parseFloat(sum.toFixed(2));
        }
 
        var taxPercentage = sum * .07;
        taxPercentage = parseFloat(taxPercentage.toFixed(2));
        var orderTotal = taxPercentage + sum;
        orderTotal = parseFloat(orderTotal.toFixed(2))
        
        $('#subtotal').text('$' + roundNumber(sum,2));
        $('#tax').text('$' + roundNumber(taxPercentage,2));
        $('#total').text('$' + roundNumber(orderTotal,2));
        postedCost.push(roundNumber(orderTotal,2));
    }

     /*=====================LOGIC====================*/
     getMenu();
    // $('#userScanQRcode').on('click', function(){
    //     
    // });

    //click event that adds menu item to the users order
    $(document).on('click', '.addBtn', function(){
        $('#orderHeader').show();
        $('#orderSection').show();
        $('#reviewOrder').show();
        $('#priceTotal').hide();
        $('#comment').show();

        var inputKey = $(this).attr('key');
        var inputSelector = '#itemAmountInput' + inputKey;
        var inputAmount = parseInt($(inputSelector).val());

        var itemChoice = {
            id: inputKey,
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
                
                if(cart[i].id === itemChoice.id){
                    newItem = false;
                    cart[i].amount+= itemChoice.amount;
                    
                } 
            }
            if(newItem) cart.push(itemChoice);
        }
        displayOrders();
    }); 

    //click event deletes item from order's section
    $(document).on('click', '.deleteItem', function(){
        var deleteKeySelector = '#' + $(this).attr('id');
        var deleteKey = $(this).attr('id');
        var deleteItem = $('.hidden').val();
    
        $(deleteKeySelector).remove();
        for(var i=0; i < cart.length; i++){
            if(cart[i].id === deleteKey){
                cart.splice(i,1); 
            }
        } 
    });

    $(document).on('click', '#reviewOrder', function(){
        $('#priceTotal').show();
        itemTotals = [];
        for(var i=0; i < cart.length; i++){
            var selector = '#input'+ cart[i].id;
            var totalCost = $(selector).val() * cart[i].price;
            itemTotals.push(totalCost);
        }
        finalTotal();
    });

    $(document).on('click', '#testBtn', function(){

        $('#orderHeader').hide();
        $('#priceTotal').hide();
        $('#reviewOrder').hide();
        $('#comment').hide();
        $('#orderSection').hide();
        
        var costIndex = postedCost.length - 1;

        var createOrder = {
            total_price: parseFloat(postedCost[costIndex]),
            status: "pending",
            comment: $('#commentInput').val()
        }
        postOrder(createOrder, cart); 
        //for pushing 
        cart = [];
        $('#commentInput').val('')
    });
});