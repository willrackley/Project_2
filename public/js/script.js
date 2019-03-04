$("#sign-up").submit(function(event) {
	event.preventDefault();
	var newUser = {
		name: $("#signUpNameInput").val(),
		email: $("#signUpEmailInput").val(),
        password: $("#signUpPasswordInput").val(),
        password2: $("#signUpPasswordInput2").val(),
}
	$.post("/app/users/register", newUser).then(function(data) {
        $('.info-messages').empty();
        for (var i=0; i < data.length; i++) {
            message = '<div class="alert alert-' + data[i].type + ' alert-dismissible fade show" role="alert">';
            message += data[i].msg;
            message += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
            message += '<span aria-hidden="true">&times;</span> </button> </div>';
            // Maybe we should add some animation fade in or something like that
            $(message).appendTo('.info-messages');
        }
    });
});

$("#log-in").submit(function(event) {
    var userData = {
        email: $("#logInEmailInput").val(),
        password: $("#logInPasswordInput").val()
    }
    $.post("/app/users/login", userData).then(function(data) {
        console.log(data);
    });
});