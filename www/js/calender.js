$(document).on("pageinit", function() {

	calenderObject = {
			renderCalender : function (){
				bootstrap.hideAll();
				bootstrap.showHeaderFooter();
				calenderObject.showCalender();

				if(!$.jStorage.get('eventObject')){
					calenderObject.getCalenderEventsFromParse();
				}
				else{
					calenderObject.buildCalenderList();
				}
				
			},
			registerEvents : function (){
				$('#calender').on('click',function(){
					calenderObject.renderCalender();
				});
			},
			clearEventObject : function (){
				$.jStorage.deleteKey('eventObject');
			},
			buildCalenderList : function (){
				$( "#calender-list" ).listview().empty();
				var eventObject = $.jStorage.get('eventObject');

				if(eventObject.length == 0){
					noDataItem = '<li data-role="list-divider">No events have been logged yet<span class="ui-li-count"></span></li>';
					$('#calender-list').append(noDataItem).listview('refresh');
				}
				else{
					var previousDate = '';

					$.each(eventObject, function(index, itemData) {
						var dateObject = new Date(itemData.created);
						var d =  dateObject.getDate();
						var m =  dateObject.getMonth();
						m += 1;  // JavaScript months are 0-11
						var y = dateObject.getFullYear();
						var minutes = dateObject.getMinutes();
						minutes = minutes > 9 ? minutes : '0' + minutes;
						var time = dateObject.getHours()+':'+minutes;
						var formattedDate = d+'/'+m+'/'+y;
						var timeTaken = '';
						var eventArray = [];
						var iconList = '';

						if(formattedDate != previousDate){
							dayCount = 0;
							dateItem = '<li id="'+dateObject+'" data-role="list-divider">'+formattedDate+'<span id="'+itemData.created+'-count" class="ui-li-count"></span></li>';
							$('#calender-list').append(dateItem).listview('refresh');
						}

						if(itemData.timeTaken != '00:00:00'){
							timeTaken = ' (time taken '+itemData.timeTaken+')';
						}

						var eventArray = itemData.eventType.split(",");

						$.each(eventArray,function(i){
							iconClass = eventArray[i].replace(/ /g,'').toLowerCase();
							iconList = iconList+'<i class="'+iconClass+'"></i>';
						});

						dayCount = dayCount + 1;
						listItem = '<li><a href="#"><h2><strong>'+time+timeTaken+' </strong></h2><div class="iconHolder">'+iconList+'</div></a></li>';
						$('#calender-list').append(listItem).listview('refresh');
						previousDate = formattedDate;

								  //$( "li" ).closest('.ui-li-divider').html(dayCount);
					});
				}
			},
			showCalender : function (){
				$('#calender-list').show();
			},
			getCalenderEventsFromParse : function (){
				var dayCount = 0;
				var eventObject = [];
				var EventLog = Parse.Object.extend("EventLog");
				var query = new Parse.Query(EventLog);
				query.equalTo("userId", $.jStorage.get('clientKey'));
				query.descending("createdAt");
				query.limit(40);

					query.find({
					  success: function(results) {
					    for (var i = 0; i < results.length; i++) { 
					      var object = results[i];
					      item = {}
					      item ["id"] = object.id;
					      item ["created"] = object.createdAt;
					      item ["eventType"] = object.get('eventType');
						  item ["timeTaken"] = object.get('timeTaken');
					      eventObject.push(item);			      
					    }

					   $.jStorage.set('eventObject',eventObject);
					   calenderObject.buildCalenderList();
					  },
					  error: function(error) {
					    alert("Error: " + error.code + " " + error.message);
					  }
					});
			}

		}
				
}); 	