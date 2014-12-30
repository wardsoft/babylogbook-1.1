$(document).on("pageinit", function() {

	eventObject = {
			registerEvents : function (){
				$('[name=event-form]').on('submit',function(e){
				e.preventDefault();
				var serializedForm = $('[name=event-form]').serializeArray();
				Example1.resetStopwatch();
				
				var EventLog = Parse.Object.extend("EventLog");
				var eventLog = new EventLog();
				
				var eventType= "";

				$.each(serializedForm, function(i, fd) {
				    eventType += fd.value+',';
				}); 
				eventType = eventType.replace(/,+$/, "");

				eventLog.set("userId", $.jStorage.get('clientKey'));
				eventLog.set("timeTaken", $('#stopwatch').html());
				eventLog.set("eventType", eventType);
				 
				eventLog.save(null, {
				  success: function(eventLog) {
				    calenderObject.clearEventObject();
				    calenderObject.renderCalender();
				  },
				  error: function(eventLog, error) {
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				  }
				});
			});

			$('#addEvent').on('click',function(){
				bootstrap.hideAll();
				bootstrap.showHeaderFooter();
				var dateObject = new Date();
				var d =  dateObject.getDate();
				var m =  dateObject.getMonth();
				m += 1;  // JavaScript months are 0-11
				var y = dateObject.getFullYear();
				var formattedDate = y+'-'+m+'-'+d;

				$('[name=createdAt]').val(formattedDate);
				$('[name=event-form]').show();
			});
		}
	}	

});