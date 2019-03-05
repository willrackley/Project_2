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
        var addSymbol = $('<i class="fas fa-plus">');
        addSymbol.addClass("p-2 text-dark");
        addBtn.addClass("")
        addBtn.append(addSymbol);
        buttonDiv.append(addBtn);
        cardBody.append(buttonDiv);
        card.append(cardHeader);
        card.append(cardBody);
        
        $('#menuContainer').append(card);
    }

    getMenu();



});