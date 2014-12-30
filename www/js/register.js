$(document).on("pageinit", function() {
	
	registerObject = {
			registerEvents : function (){
				$('[name=register-form]').on('submit',function(e){
					e.preventDefault();
					var serializedForm = $('[name=register-form]').serializeArray();

					var user = new Parse.User();

					user.set("username", serializedForm[0].value);
					user.set("password", serializedForm[1].value);

					user.signUp(null, {
					  success: function(user) {

					  },
					  error: function(user, error) {
					    // Show the error message somewhere and let the user try again.
					    alert("Error: " + error.code + " " + error.message);
					  }
					});
				});
			}
		}		
});