var orderItems;

    //function that grabs all api information
    function getCustomerOder() {
        // uncomment if you want to get all the records at Order table
//        $.get('/app/orders', function(data) {

        // line to test the join with order details
        $.get('/app/orders/view-order', function(data) {
                orderItems = data;
            console.log(orderItems)
            initializeRows();
        });
    }

    function initializeRows() {
      
        var itemsToAdd = [];
        for (var i = 0; i < orderItems.length; i++) {
          itemsToAdd.push(createNewRow(orderItems[i]));
        }
        $('#todaysOrdersContainer').append(itemsToAdd);
    }

    function createNewRow(orderItems) {
        var tableRow =$('<tr>');
        var id =$('<th scope="row">');
        id.text(orderItems.id);
        var item=$('<td>');
        item.text(orderItems.status);
        var date=$('<td>');
        date.text(orderItems.date);
        var comment=$('<td>');
        comment.text(orderItems.comment);
        tableRow.append(id);
        tableRow.append(item);
        tableRow.append(date);
        tableRow.append(comment);
        tableRow.appendTo($('#tableBody'));
    }
    getCustomerOder();

    