$(document).on("pageinit", function() {

	loginObject = {
			showLoginForm : function (){
				$('[name=login-form]').show();
				$('#introLogo').show();
			},
			registerEvents : function (){
				$('[name=login]').on('click',function(e){
					$('[name=submitType]').val('login');
				});

				$('[name=register]').on('click',function(e){
					$('[name=submitType]').val('register');
				});

				$('[name=login-form]').on('submit',function(e){
					e.preventDefault();
					var serializedForm = $('[name=login-form]').serializeArray();
					var userName = serializedForm[0].value;
					var password = serializedForm[1].value;
					
					$("body").prepend("<progress id='nativeDroidProgress' data-animation-time='5' value='0' max='100' class='nativeDroidProgress'></progress>");
					$(".ui-header").addClass("noborder");
					$(".nativeDroidProgress").attr("data-animation-time", 0).attr("value", 0);

					if($('[name=submitType]').val() == 'login'){
						Parse.User.logIn(userName, password, {
						  success: function(user) {
						    $.jStorage.set('clientKey',user.id);
						    location.reload();
						  },
						  error: function(user, error) {
						  	$('body').append('<div class="message warning"><i class="fa fa-exclamation"></i><p>'+error.message+'</p></div>');
						  	$(".ui-header").addClass("noborder");
						  }
						});
					}
					else if($('[name=submitType]').val() == 'register'){
						var user = new Parse.User();

						user.set("username", userName);
						user.set("password", password);

						user.signUp(null, {
						  success: function(user) {
						  	$('body').append('<div class="message success"><i class="fa fa-exclamation"></i><p>Congratulations! You have signed up. You can now click login</p></div>');
						  },
						  error: function(user, error) {
						    // Show the error message somewhere and let the user try again.
						  	$('body').append('<div class="message warning"><i class="fa fa-exclamation"></i><p>'+error.message+'</p></div>');
						  	$(".ui-header").addClass("noborder");
						  }
						});
					}
				});
				
				$('#logout').on('click',function(){
					$.jStorage.deleteKey('clientKey');
					location.reload();
				});
			}
		}

});