(function() {
	var $body,
		window_height,
		window_width,
		$user_menu_butt,
		media_point_1 = 1024,
		media_point_2 = 768,
		media_point_3 = 480,
		media_point_4 = 320;

	$(document).ready(function ($) {
		$body = $('body');
		$user_menu_butt = $('#user_menu_butt');
		window_width = $(window).width();
		window_height = $(window).height();

		$('.some_selector').text('some text');

		//pageWidget(['index']);
		//getAllClasses('html','.elements_list');
	});

	$(window).on('resize', function () {
		resize_f();
	});

	$(window).on('scroll', function () {
		scroll_f();
	});

	$(window).on('load',function() {
		load_f();
	});

	function resize_f() {

	}
	function load_f() {

	}

	function scroll_f() {

	}

	function move_to_block(block, control) {
		var $block = $(block),
			$control = $(control);
		$control.on('click', function () {
			var $block_pos = $block.offset();
			$('body,html').animate({
				scrollTop: $block_pos.top
			}, 500);
			return false;
		})
	}

	function docScrollTo(pos, speed, callback) {

		$('html,body').animate({'scrollTop': pos}, speed);

		if (typeof(callback) == 'function') {
			callback();
		}
	}



//Functions for development
	function getAllClasses(context,output) {
		var finalArray = [],
			mainArray = [],
			allElements = $(context).find($('*'));//get all elements of our page
		//If element has class push this class to mainArray
		for(var i = 0;i<allElements.length;i++) {
			var someElement = allElements[i],
				elementClass = someElement.className;
			if (elementClass.length>0) {//if element have not empty class
				//If element have multiple classes - separate them
				var elementClassArray = elementClass.split(' '),
					classesAmount = elementClassArray.length;
				if (classesAmount === 1) {
					mainArray.push('.' + elementClassArray[0] + ' {');
				} else {
					var cascad = '.'+ elementClassArray[0] + ' {';
					for(var j=1;j<elementClassArray.length;j++) {
						cascad+= ' &.' + elementClassArray[j] + ' { }';
					}
					mainArray.push(cascad);
				}
			}
		}

		//creating finalArray, that don't have repeating elements
		var noRepeatingArray = unique(mainArray);
		noRepeatingArray.forEach(function (item) {
			var has = false;
			var preWords = item.split('&');
			for (var i = 0; i < finalArray.length; ++i) {
				var newWords = finalArray[i].split('&');
				if (newWords[0] == preWords[0]) {
					has = true;
					for (var j = 0; j < preWords.length; ++j) {
						if (newWords.indexOf(preWords[j]) < 0) {
							newWords.push(preWords[j]);
						}
					}
					finalArray[i] = newWords.join('&');
				}
			}
			if (!has) {
				finalArray.push(item);
			}
		});
		for (var i = 0;i<finalArray.length;i++) {
			$('<div>'+finalArray[i]+' }</div>').appendTo(output);
		}



		//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
		function unique(A) {
			var n = A.length, k = 0, B = [];
			for (var i = 0; i < n; i++)
			{ var j = 0;
				while (j < k && B[j] !== A[i]) j++;
				if (j == k) B[k++] = A[i];
			}
			return B;
		}
	}

	function pageWidget(pages) {
		var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
		widgetWrap.prependTo("body");
		for (var i = 0; i < pages.length; i++) {
			$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
		}
		var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
		widgetStilization.prependTo(".widget_wrap");
	}
})();
