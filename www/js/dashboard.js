$(document).on("pageinit", function() {

	dashboardObject = {
			registerEvents : function (){

					$('#dashboard').on('click',function(){
						bootstrap.hideAll();
						bootstrap.showHeaderFooter();
						
						dashboardObject.showLastFeedCard();
						dashboardObject.showNappyChangeCountCard();
						dashboardObject.showFeedCountCard();

						$('#dashboard-list').show();
				});
			},
			showLastFeedCard : function (){
						var now       = new Date();
						var lastDate  = new Date($( "#calender-list li" ).first().attr('id'));
						var minutes = lastDate.getMinutes();
						minutes = minutes > 9 ? minutes : '0' + minutes;
						var time = lastDate.getHours()+':'+minutes;
						var diffMs    = (now - lastDate); 
						var diff      = now.getTime() - lastDate.getTime();
						var diffmins  = parseInt(diff / 60000);
						var diffhours = parseFloat(diffmins / 60).toFixed(2);

						if(diffhours < 1){
							lastFeedMessage = 'Last Feed was at '+time+' ('+diffmins+ ' mins ago)';
						}
						else{
							lastFeedMessage = 'Last Feed was at '+time+' ('+diffhours+ ' hours ago)';
						}

						$('#lastFeed').html(lastFeedMessage);
			},
			showNappyChangeCountCard : function (){
				var now       = new Date();
				var feedCount = dashboardObject.filterEventObject('nappychange',now);
				$('#nappyChangeCount').html(feedCount+' Nappy Changes Today');	
			},
			showFeedCountCard : function (){
				var now       = new Date();
				var feedCount = dashboardObject.filterEventObject('leftbreastfeed,rightbreastfeed,bottlefeed',now);
				$('#feedCount').html(feedCount+' Feeds Today');		
			},
			filterEventObject : function (eventTypeFilter,dateFilter){
				var eventCount = 0;
				var eventObject = $.jStorage.get('eventObject');

				var startOfDay = dateFilter.setHours(0,0,0);
				startOfDay     = new Date(startOfDay);

				$.each(eventObject, function(index, itemData) {
					eventType = itemData.eventType.toLowerCase().replace(/\s+/g, '');
					var createdDate = new Date(itemData.created);
					
					if(eventType.indexOf(eventTypeFilter) != -1){
						var diff =  Math.floor(( Date.parse(startOfDay) - Date.parse(createdDate) ) / 86400000);
						console.log(diff);
						if(diff == -1){
							console.log(diff);
							eventCount++;
						}	
					}					
				});
				return eventCount;		
			}
	}
}); 