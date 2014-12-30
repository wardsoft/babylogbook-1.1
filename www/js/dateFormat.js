$(document).on("pageinit", function() {

	dateFormatObject = {
			getNiceTime : function (fromDate, toDate, levels, prefix){
				console.log(fromDate);
				console.log(toDate);
				
				    var lang = {
				            "date.past": "{0} ago",
				            "date.future": "in {0}",
				            "date.now": "now",
				            "date.year": "{0} year",
				            "date.years": "{0} years",
				            "date.years.prefixed": "{0} years",
				            "date.month": "{0} month",
				            "date.months": "{0} months",
				            "date.months.prefixed": "{0} months",
				            "date.day": "{0} day",
				            "date.days": "{0} days",
				            "date.days.prefixed": "{0} days",
				            "date.hour": "{0} hour",
				            "date.hours": "{0} hours",
				            "date.hours.prefixed": "{0} hours",
				            "date.minute": "{0} minute",
				            "date.minutes": "{0} minutes",
				            "date.minutes.prefixed": "{0} minutes",
				            "date.second": "{0} second",
				            "date.seconds": "{0} seconds",
				            "date.seconds.prefixed": "{0} seconds",
				        },
				        langFn = function(id,params){
				            var returnValue = lang[id] || "";
				            if(params){
				                for(var i=0;i<params.length;i++){
				                    returnValue = returnValue.replace("{"+i+"}",params[i]);
				                }
				            }
				            return returnValue;
				        },
				        toDate = toDate ? toDate : new Date(),
				        diff = fromDate - toDate,
				        past = diff < 0 ? true : false,
				        diff = diff < 0 ? diff * -1 : diff,
				        date = new Date(new Date(1970,0,1,0).getTime()+diff),
				        returnString = '',
				        count = 0,
				        years = (date.getFullYear() - 1970);
				    if(years > 0){
				        var langSingle = "date.year" + (prefix ? "" : ""),
				            langMultiple = "date.years" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (years > 1 ? langFn(langMultiple,[years]) : langFn(langSingle,[years]));
				        count ++;
				    }
				    var months = date.getMonth();
				    if(count < levels && months > 0){
				        var langSingle = "date.month" + (prefix ? "" : ""),
				            langMultiple = "date.months" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (months > 1 ? langFn(langMultiple,[months]) : langFn(langSingle,[months]));
				        count ++;
				    } else {
				        if(count > 0)
				            count = 99;
				    }
				    var days = date.getDate() - 1;
				    if(count < levels && days > 0){
				        var langSingle = "date.day" + (prefix ? "" : ""),
				            langMultiple = "date.days" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (days > 1 ? langFn(langMultiple,[days]) : langFn(langSingle,[days]));
				        count ++;
				    } else {
				        if(count > 0)
				            count = 99;
				    }
				    var hours = date.getHours();
				    if(count < levels && hours > 0){
				        var langSingle = "date.hour" + (prefix ? "" : ""),
				            langMultiple = "date.hours" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (hours > 1 ? langFn(langMultiple,[hours]) : langFn(langSingle,[hours]));
				        count ++;
				    } else {
				        if(count > 0)
				            count = 99;
				    }
				    var minutes = date.getMinutes();
				    if(count < levels && minutes > 0){
				        var langSingle = "date.minute" + (prefix ? "" : ""),
				            langMultiple = "date.minutes" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (minutes > 1 ? langFn(langMultiple,[minutes]) : langFn(langSingle,[minutes]));
				        count ++;
				    } else {
				        if(count > 0)
				            count = 99;
				    }
				    var seconds = date.getSeconds();
				    if(count < levels && seconds > 0){
				        var langSingle = "date.second" + (prefix ? "" : ""),
				            langMultiple = "date.seconds" + (prefix ? ".prefixed" : "");
				        returnString += (count > 0 ?  ', ' : '') + (seconds > 1 ? langFn(langMultiple,[seconds]) : langFn(langSingle,[seconds]));
				        count ++;
				    } else {
				        if(count > 0)
				            count = 99;
				    }
				    if(prefix){
				        if(returnString == ""){
				            returnString = langFn("date.now");
				        } else if(past)
				            returnString = langFn("date.past",[returnString]);
				        else
				            returnString = langFn("date.future",[returnString]);
				    }
				    return returnString;
				}
			}
});