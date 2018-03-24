$(document).ready(function(){

	// [ PAGE LOADER ]
	$(window).load(function () {
		$("#loader").addClass('display_block');
		$("#loader-wrapper").fadeOut(200);
	});

	// [ PAGE SCROLL ]
	smoothScroll.init({
		offset: 60
	});

	// [ HEADER ]
	var offset = $(".header").height();
	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$(".header .topbar").addClass("fix");
		} else {
			$(".header .topbar").removeClass("fix");
		}
	});

	// [ LOGO POSITION ]
	var logoWidth = $("#logo .logo").outerWidth();
	var logoHeight = $("#logo .logo").outerHeight();
	var w = logoWidth/2;
	var h = logoHeight/2;
	$("#logo .logo").css({
      "margin-top": -h,
      "margin-left": -w
    });

	// [ NAVIGATION ]
	var icon_height = $(".topbar").height();
    $(".menu-icon").css("height",icon_height);

    (function() {
		var triggerBttn = document.getElementById( 'trigger-overlay' ),
			overlay = document.querySelector( 'div.overlay' ),
			closeBttn = overlay.querySelector( 'button.overlay-close' );
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			support = { transitions : Modernizr.csstransitions };

		function toggleOverlay() {
			if( classie.has( overlay, 'open' ) ) {
				classie.remove( overlay, 'open' );
				classie.add( overlay, 'close' );
				var onEndTransitionFn = function( ev ) {
					if( support.transitions ) {
						if( ev.propertyName !== 'visibility' ) return;
						this.removeEventListener( transEndEventName, onEndTransitionFn );
					}
					classie.remove( overlay, 'close' );
				};
				if( support.transitions ) {
					overlay.addEventListener( transEndEventName, onEndTransitionFn );
				}
				else {
					onEndTransitionFn();
				}
			}
			else if( !classie.has( overlay, 'close' ) ) {
				classie.add( overlay, 'open' );
			}
		}

		triggerBttn.addEventListener( 'click', toggleOverlay );
		closeBttn.addEventListener( 'click', toggleOverlay );
	})();

	$("#myMenu li").on("click", function(){
		$(".overlay").removeClass("open");
	});

	$(".mob-social-icon").on("click", function(){
		$(".social-icon").slideDown();
		$(".mob-social-icon").on("click", function(){
			$(".social-icon").slideDown();
		});
	});

	// [ HOME SLIDER ]
	new WOW().init();

	$(document).ready(function() {fullScreenSlide(); fullWidthSlide(); });
	$(window).resize(function() {fullScreenSlide(); fullWidthSlide(); });

	function fullScreenSlide(){
		$("#slider.full-screen-slider li.slide-bg").each(function(){
			var fullHeight = $(window).height();
			var bg = $(this).attr("data-slideBg");
			$(this).css("background-image", "url("+bg+")");
			$(this).css("height", fullHeight);
		});
	}

	function fullWidthSlide(){
		$("#slider.full-width-slider li.slide-bg").each(function(){
			var bg = $(this).attr("data-slideBg");
			$(this).css("background-image", "url("+bg+")");
		});
	}
	
    var sudoSlider = $("#slider").sudoSlider({
		continuous: true,
		auto:false,
		prevNext:false,
		customLink:'.slide-nav',
		beforeAnimation:function (t, slider) { 
			$(this).find(".capstion-wrapper").html("");
			$(this).siblings().find(".capstion-wrapper").html("");
		},
		afterAnimation: function(t){
			var slide = this;
			function caps(slide, t){
				$(slide).find(".capstion-wrapper").html($("#caps"+t).html());
				$(slide).find(".caps-1").animate({
					opacity: 1,
					top: "0"
				}, 800, function() {
					$(slide).find(".caps-2").animate({
						opacity: 1,
						top: "0"
					}, 700, function(){
						$(slide).find(".caps-3").animate({
							opacity: 1,
							top: "0"
						},600);
					});
				});
			}
			caps(slide, t);
		},
		initCallback: function() {
            var slide = this;
            var t = this.getValue("currentSlide");
            $(slide).find(".capstion-wrapper").html($("#caps"+t).html());
            $(slide).find(".caps-1").animate({
				opacity: 1,
				top: "0"
			},800, function() {
				$(slide).find(".caps-2").animate({
					opacity: 1,
					top: "0"
				},700, function(){
					$(slide).find(".caps-3").animate({
						opacity: 1,
						top: "0"
					},600);
				});
			});
			$(slide).siblings().find(".capstion-wrapper").html("");
        }
    });


	// [ VERTICAL CAROUSEL ]
	$("#vertical li").each(function(){
		var img = $(this).attr("data-thumb");
		$(this).css("background-image","url("+img+")");	
	});
	$('#vertical').lightSlider({
		item:1,
		gallery:false,
		vertical:true,
		verticalHeight:400,
		auto:true,
		slideMargin:0,
		responsive : [{
	        breakpoint:599,
	        settings: {
	            verticalHeight:350
			}
	    },
        {
            breakpoint:419,
            settings: {
                verticalHeight:250
		}
        }]
	});  
	pagerHeight = $('.vertical-carousel .lSSlideOuter .lSPager.lSpg').height();
	halfPager = (pagerHeight/2);
	$(".lSSlideOuter .lSPager.lSpg").css("margin-top", -halfPager);


	// OWL CAROUSEL
	function strtoArr(arr) {
		if (typeof(arr) == "string") {
			var t1 = arr.split('|');
			var t2 = [];
			$.each(t1, function(index, val) {
				var str = val;
				t2.push(str.split(','));
			});
			return t2;
		}else{
			return false;
		}
	}

	function dataCheck(val){
		return val && val == "true" ? true : false;
	}

	if ($(".carousel-widget").length > 0) {
		var carousel = 0;
		$('.carousel-widget').each(function(){

			// SET ID ON ALL OBJECTS
			carousel++;
			var createObj = 'owl'+carousel;
			$(this).css({opacity:0});
			$(this).attr("id", createObj);
			$(this).addClass(createObj);

			var pager = dataCheck($(this).attr('data-pager'));
			var itemsCustom = $(this).attr('data-itemrange') ? strtoArr($(this).attr('data-itemrange')) : [ [0, 1], [420, 2], [600, 3], [768, 3], [980, 4] ];
			var singleItem = dataCheck($(this).attr('data-singleitem'));
			var effect = dataCheck($(this).attr('data-effect'));

			// console.log(itemsCustom);

			$("."+createObj).animate({opacity:1}, 100, function(){

				 $("."+createObj+ " .carousel .owl-carousel").owlCarousel({
					itemsCustom : itemsCustom,
					navigation : false,
					pagination : pager,
					responsiveBaseWidth: "."+createObj,
					singleItem: singleItem,
					scrollPerPage: 1,
					transitionStyle : effect
				});

				var owl = $("."+createObj+ " .carousel .owl-carousel").data('owlCarousel');
				$("."+createObj).find('.carousel-btn .prev').on('click', function() { owl.prev(); });
				$("."+createObj).find('.carousel-btn .next').on('click', function() { owl.next(); });
			});
		});
	}

	// SERVICE-BOX-2
	//using TweenLite.set() takes care of all vendor-prefixes
	function serviceIe9(){
		if ($("html").hasClass('ie9')){
			console.log('test');
			$(".service-box-2 .inner-box .box.back").addClass("hide");
			$(".service-box-2").hover(
				function() {
					$(this).find(".box.back").removeClass("hide");
				}, function() {
					$(this).find(".box.back").addClass("hide");
				}
			);
		}
	}
	serviceIe9();
	TweenLite.set(".service-box-2", {perspective:800});
	TweenLite.set(".service-box-2 .inner-box", {transformStyle:"preserve-3d"});
	TweenLite.set(".service-box-2 .back", {rotationY:-180});
	TweenLite.set([".service-box-2 .back", ".service-box-2 .front"], {backfaceVisibility:"hidden"});

	$(".service-box-2").hover(
		function() {
			TweenLite.to($(this).find(".inner-box"), 1.2, {rotationY:180, ease:Back.easeOut});
		},
		function() {
			TweenLite.to($(this).find(".inner-box"), 1.2, {rotationY:0, ease:Back.easeOut});  
		}
	);

	TweenMax.staggerTo($(".service-box-2 .inner-box"), 1, {rotationY:-180, repeat:1, yoyo:true}, 0.1);


	// CONTACT-US FORM
	$('#cntForm').submit(function () {
        $('#cntForm .error-form').remove();
        $('#cntForm .success').remove();
        var hasError = false;
        $('.form-control').each(function () {
            if (jQuery.trim($(this).val()) === '') {
            	$(this).addClass('error-box');
                $(this).parent().append('<span class="error-form animated flash"><i class="fa fa-exclamation-triangle"></i></span>');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w]+\.)+[\w]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                	$(this).addClass('error-box');
                    $(this).parent().append('<span class="error-form animated flash"><i class="fa fa-exclamation-triangle"></i></span>');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            formInput = $(this).serialize();
            $.post($(this).attr('action'), formInput, function (data) {
            	$("#cntForm input, #cntForm textarea, #cntForm button").attr("disabled", "disabled");
            	$(".disable").fadeIn('200');
            	$('#returnmessage').css("opacity", 1);
            	$('#returnmessage').fadeIn('300');
                $('#returnmessage').text('Your message has been sent, we will get back to you as soon as possible !');
                $('#returnmessage').fadeOut(6000);
                $('#returnmessage').css("opacity", 0);
                $(".disable").delay(3000).fadeOut(4500, function () {
                	$("#cntForm input, #cntForm textarea, #cntForm button").removeAttr("disabled");
                });
            });
            $('.form-field').val('');
        }
        return false;
    });
    $('#cntForm .form-control').focus(function () {
    	$('#cntForm .form-control').removeClass('error-box');
        $('#cntForm .error-form').remove();
        $('#cntForm .success').remove();
    });
    $('#cntForm textarea').focus(function () {
    	$('#cntForm .form-control').removeClass('error-box');
        $('#cntForm .error-form').remove();
        $('#cntForm .success').remove();
    });

    // MINI-GALLERY
    $(".min-gallery .img-overlay .icon").magnificPopup({
		 gallery: {
			enabled: true
	    },
		type: 'image'
	}); 

});