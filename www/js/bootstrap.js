$(document).on("pageinit", function() {

	Parse.initialize("SQWjwqMVvRjQfTJfUzMzpPudULQd2v8q1DzX1dFy", "6HYqlvYm9mEpyR3qULjsgPpUYodHEnOuXZIClxFQ");

	bootstrap = {
			hideAll : function (){
				$('[name=login-form]').hide();
				$('#calender-list').hide();
				$('[name=event-form]').hide();
				$('#dashboard-list').hide();
				$('[data-role="footer"]').hide();
				$('[data-role="header"]').hide();
				$('#introLogo').hide();
				$('[name=settings-form]').hide();
			},
			registerEvents : function (){
				loginObject.registerEvents();
				registerObject.registerEvents();
				calenderObject.registerEvents();
				dashboardObject.registerEvents();
				eventObject.registerEvents();
				settingsObject.registerEvents();
			},
			showHeaderFooter : function (){

				if(!$.jStorage.get('babyFullName')){
					bootstrap.getBabyCredentialsFromParse();
				}
				else{
					bootstrap.setBabyCredentials();
				}

				$('[data-role="footer"]').show();
				$('[data-role="header"]').show();
			},
			getBabyCredentialsFromParse : function (){

					var Baby = Parse.Object.extend("Baby");
					var query = new Parse.Query(Baby);
					query.equalTo("userId", $.jStorage.get('clientKey'));

					query.find({
					  success: function(results) {
					  	babyFullName = results[0].get('babyForename')+' '+results[0].get('babyMiddleName')+' '+results[0].get('babySurname');
					  	var now       = new Date();
						var lastDate  = new Date(results[0].get('dateOfBirth'));
						var age       = dateFormatObject.getNiceTime(lastDate,now,2,false)+' old';
						$.jStorage.set('babyFullName',babyFullName);
						$.jStorage.set('babyAge',age); 
						bootstrap.setBabyCredentials();	
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});
			},
			setBabyCredentials : function (){
				$('#credentials').html('<p>'+$.jStorage.get('babyFullName')+'<br>'+$.jStorage.get('babyAge')+'</p>');	
			}
		}
	
	calenderObject.clearEventObject();
	bootstrap.registerEvents();

	if(!$.jStorage.get('clientKey')){
		bootstrap.hideAll();
		loginObject.showLoginForm();
	}
	else{
		bootstrap.showHeaderFooter();
		calenderObject.renderCalender();
	}


}); 