/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;(function($) {
	$.timer = function(func, time, autostart) {	
	 	this.set = function(func, time, autostart) {
	 		this.init = true;
	 	 	if(typeof func == 'object') {
		 	 	var paramList = ['autostart', 'time'];
	 	 	 	for(var arg in paramList) {if(func[paramList[arg]] != undefined) {eval(paramList[arg] + " = func[paramList[arg]]");}};
 	 			func = func.action;
	 	 	}
	 	 	if(typeof func == 'function') {this.action = func;}
		 	if(!isNaN(time)) {this.intervalTime = time;}
		 	if(autostart && !this.isActive) {
			 	this.isActive = true;
			 	this.setTimer();
		 	}
		 	return this;
	 	};
	 	this.once = function(time) {
			var timer = this;
	 	 	if(isNaN(time)) {time = 0;}
			window.setTimeout(function() {timer.action();}, time);
	 		return this;
	 	};
		this.play = function(reset) {
			if(!this.isActive) {
				if(reset) {this.setTimer();}
				else {this.setTimer(this.remaining);}
				this.isActive = true;
				console.log();
			}
			return this;
		};
		this.pause = function() {
			if(this.isActive) {
				this.isActive = false;
				this.remaining -= new Date() - this.last;
				this.clearTimer();
			}
			return this;
		};
		this.stop = function() {
			this.isActive = false;
			this.remaining = this.intervalTime;
			this.clearTimer();
			return this;
		};
		this.toggle = function(reset) {
			if(this.isActive) {this.pause();}
			else if(reset) {this.play(true);}
			else {this.play();}
			return this;
		};
		this.reset = function() {
			this.isActive = false;
			this.play(true);
			return this;
		};
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.setTimer = function(time) {
			var timer = this;
	 	 	if(typeof this.action != 'function') {return;}
	 	 	if(isNaN(time)) {time = this.intervalTime;}
		 	this.remaining = time;
	 	 	this.last = new Date();
			this.clearTimer();
			this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
		};
	 	this.go = function() {
	 		if(this.isActive) {
	 			this.action();
	 			this.setTimer();
	 		}
	 	};
	 	
	 	if(this.init) {
	 		return new $.timer(func, time, autostart);
	 	} else {
			this.set(func, time, autostart);
	 		return this;
	 	}
	};
})(jQuery);

	var Example1 = new (function() {
        var $stopwatch, // Stopwatch element on the page
                incrementTime = 70, // Timer speed in milliseconds
                currentTime = 0, // Current time in hundredths of a second
                updateTimer = function() {
                    $stopwatch.html(formatTime(currentTime));
                    currentTime += incrementTime / 10;
                },
                init = function() {
                    $stopwatch = $('#stopwatch');
                    Example1.Timer = $.timer(updateTimer, incrementTime, false);
                };
            this.resetStopwatch = function() {
                currentTime = 0;
                this.Timer.stop().once();
            };
            $(init);
        });

        // Common functions
        function pad(number, length) {
            var str = '' + number;
            while (str.length < length) {str = '0' + str;}
            return str;
        }
        function formatTime(time) {
            var min = parseInt(time / 6000),
                sec = parseInt(time / 100) - (min * 60),
                hundredths = pad(time - (sec * 100) - (min * 6000), 2);
            return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
        }