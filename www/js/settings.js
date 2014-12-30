$(document).on("pageinit", function() {

	settingsObject = {
			registerEvents : function (){
				$('[name=settings-form]').on('submit',function(e){
					e.preventDefault();
					var serializedForm = $('[name=settings-form]').serializeArray();

					var Baby = Parse.Object.extend("Baby");
					var baby = new Baby();
					 
					baby.set("score", 1337);
					baby.set("playerName", "Sean Plott");
					baby.set("cheatMode", false);
					baby.set("skills", ["pwnage", "flying"]);
					 
					gameScore.save(null, {
					  success: function(gameScore) {
					    // Now let's update it with some new data. In this case, only cheatMode and score
					    // will get sent to the cloud. playerName hasn't changed.
					    gameScore.set("cheatMode", true);
					    gameScore.set("score", 1338);
					    gameScore.save();
					  }
					});
				});

				$('#settings').on('click',function(){
					bootstrap.hideAll();
					bootstrap.showHeaderFooter();
					var Baby = Parse.Object.extend("Baby");
					var query = new Parse.Query(Baby);
					query.equalTo("userId", $.jStorage.get('clientKey'));

						query.find({
						  success: function(results) {
						  	console.log(results[0].get('babyGender'));
						  	$('[name=babyForename]').val(results[0].get('babyForename'));
						  	$('[name=babyMiddleName]').val(results[0].get('babyMiddleName'));
						  	$('[name=babySurname]').val(results[0].get('babySurname'));

						  	if(results[0].get('babyGender') == 'Boy'){

						  	}
						  	else{
						  		$('.genderGirl').attr('checked',true);
						  	}

						  	var dateObject = new Date(results[0].get('dateOfBirth'));
							var d =  dateObject.getDate();
						    var m =  dateObject.getMonth();
							m += 1;  // JavaScript months are 0-11
							var y = dateObject.getFullYear();
							var formattedDate = y+'-'+m+'-'+d;

						  	$('[name=dateOfBirth]').val(formattedDate);
						  	$('[name=settings-form]').show();
						  },
						  error: function(error) {
						    alert("Error: " + error.code + " " + error.message);
						  }
						});
				});
			}
	}
});