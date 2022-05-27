;
(function($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);
    var $html;

    $doc.ready(function() {
        $html = $(document.documentElement);

        var $navToggle = $('#nav-toggle');
        var $navContainer = $('#nav-container');

        var breakpointIsTablet = false;

        $win.on('resize load', function() {
            if ($win.width() < 992) {
                if (breakpointIsTablet) {
                    return;
                }

                breakpointIsTablet = true;

                $('.intro .tabs').insertAfter('.intro .slogan');

            } else {
                if (!breakpointIsTablet) {
                    return;
                }

                breakpointIsTablet = false;

                $('.intro .tabs').prependTo('.intro-body .col-xs-12:last-child');
            }
        });

        $navToggle
            .on('click', function(event) {
                event.preventDefault();

                $html.toggleClass('nav-open');
            });

        var lastTouchPoint = 0;

        addEventListener('touchstart', function(event) {
            lastTouchPoint = event.touches[0].pageY;
        });

        addEventListener('touchmove', function(event) {
            var currentTouchPoint = event.touches[0].pageY;

            if ($html.hasClass('nav-open') && ($navContainer.scrollTop() <= 0 && currentTouchPoint > lastTouchPoint || $navContainer.scrollTop() + $navContainer.outerHeight() >= $navContainer[0].scrollHeight && currentTouchPoint < lastTouchPoint)) {
                event.preventDefault();
            }

            lastTouchPoint = currentTouchPoint;
        });

        var $introTabs = $('.intro a[data-toggle="tab"]');
        var $introTestimonials = $('.intro .testimonial');

        $introTabs
            .on('shown.bs.tab', function(event) {
                var idx = $(this).parent().index();

                $introTestimonials.eq(idx).addClass('current').siblings('.current').removeClass('current');
            });

        var $solutionsSlider = $('.slider-solutions');
        var $solutionsSlides = $solutionsSlider.find('.slide');

        if ($solutionsSlider.length) {
            new SolutionsSlider($solutionsSlider);
        }

        $solutionsSlides
            .popover({
                container: 'body',
                delay: 0,
                content: function() {
                    var $solutionSlide = $(this);
                    var content = $solutionSlide.find('.slide-overlay').html();

                    return content;
                },
                html: true,
                placement: 'bottom',
                trigger: 'manual'
            });

        $solutionsSlides
            .on('mouseenter', function(event) {
                var $slide = $(this);

                $slide.popover('show');
            })
            .on('mouseleave', function(event) {
                var $slide = $(this);

                $slide.popover('hide');
            })
            .on('touchend', function(event) {
                var $slide = $(this);

                $slide.popover('toggle');
            });

        var $videoModal = $('#video-modal');
        var $videoModalTrigger = $('a[data-target="#video-modal"]');

        $videoModal
            .on('show.bs.modal', function() {
                $videoModal.find('iframe').attr('src', $videoModalTrigger.attr('href') + '?autoplay=1');
            })
            .on('hide.bs.modal', function() {
                $videoModal.find('iframe').attr('src', '');
            });

        if ($('.service_item_listing').length) {
            $('.service_item_listing').popover();
        }

        if ($("#loanSlider").length) {
            $("#loanSlider").slider({
                step: 1,
                min: 1,
                max: 5,
                precision: 2
            });
        }
        if ($("#mortgage-calculator").length) {
            $(".calculator-amortization").accrue({
                mode: "amortization"
            });
        }

        if ($('#form-car-loan').length) {
            $("#result").hide();
            LoanCalculator.updateUser();
            $('#creditScoreRange').bind("slideStop", function(e) {
                LoanCalculator.updateUser();
            });
            $('#form-car-loan .btn-form-car-loan-submit').click(function(e) {
                e.preventDefault();
                if ($('#form-car-loan').valid()) {
                    $('#form-car-loan').submit();
                }
            });

            $('#backbtn').bind("click", function(e) {
                LoanCalculator.hideResult();
            });
            $("#form-car-loan").validate({

                debug: false,
                errorClass: "alert alert-danger",
                errorElement: "div",
                errorPlacement: function(error, element) {
                    error.appendTo('#errordiv');
                },

                rules: {
                    interestrate: {
                        required: true,
                        number: true,
                        min: 0.1
                    },
                    price: "required digits",
                    downpayment: "required digits",
                    term: "required digits"

                },

                // Specify the validation error messages
                messages: {
                    interestrate: "Please enter an interest rate",
                    price: "Please enter a car price",
                    downpayment: "Please enter a down payment",
                    term: "Please enter the term in which the loan will be paid off"
                },

                submitHandler: function(form) {
                    LoanCalculator.calculateLoan();
                }
            });
        }
        if ($('#form-loan-calculator').length) {
            $("#result").hide();
            LoanCalculator.updateUser();
            $('#creditScoreRange').bind("slideStop", function(e) {
                LoanCalculator.updateUser();
            });
            $('#form-loan-calculator').submit(function(e) {

                //validate form
                e.preventDefault(); // or return false ;
            });

            $('#backbtn').bind("click", function(e) {
                LoanCalculator.hideResult();
            });
            $("#form-loan-calculator").validate({

                debug: false,
                errorClass: "alert alert-danger",
                errorElement: "div",
                errorPlacement: function(error, element) {
                    error.appendTo('#errordiv');
                },

                rules: {
                    interestrate: "required digits",
                    price: "required digits",
                    term: "required digits"

                },

                // Specify the validation error messages
                messages: {
                    interestrate: "Please enter an interest rate",
                    price: "Please enter a car price",
                    term: "Please enter the term in which the loan will be paid off"

                },

                submitHandler: function(form) {
                    LoanCalculator.calculateLoan();

                }
            });
        }
    }); // close doc.ready

    function SolutionsSlider($element) {
        this.$slider = $element;
        this.$track = $element.find('.slider-clip');
        this.$slides = $element.find('.slide');

        this.$prev = $element.find('.slider-prev');
        this.$next = $element.find('.slider-next');

        this.current = 0;

        this.inViewport = 5;

        this.init();
    }

    SolutionsSlider.prototype.init = function() {
        this.enable();

        this.dimensions();

        this.bind();

        this.setCurrent();
    }

    SolutionsSlider.prototype.enable = function() {
        var initialHeight = this.$track[0].offsetHeight;

        this.$slider.addClass('slider-enabled');

        var offset = initialHeight - this.$track[0].offsetHeight;

        this.$track
            .css({
                marginBottom: offset
            });
    }

    SolutionsSlider.prototype.maxPossibleVisible = function() {
        var count = Math.floor(this.$slider.width() / this.$slides.eq(0).width()) - 1;

        if (count < 2) {
            count = 2;
        }

        return this.centered() ? 1 : count;
    }

    SolutionsSlider.prototype.centered = function() {
        return $win.width() < 480;
    }

    SolutionsSlider.prototype.dimensions = function() {
        this.inViewport = this.maxPossibleVisible();

        var itemOffset = this.centered() ? 0 : (this.$slider.width() - this.$slides.eq(0).width() * this.inViewport) / (this.inViewport - 1);
        var itemWidth = this.centered() ? this.$track.parent().width() : 110;

        if (this.centered()) {
            var outerWidth = this.$slides.length * itemWidth;

            this.$slider.find('.slides').css({
                width: outerWidth
            });
        } else {
            this.$slider.find('.slides').attr('style', '');
        }

        this.$slides.each(function(i) {
            $(this).css({
                width: itemWidth
            });

            if (i > 0) {
                $(this).css({
                    marginLeft: itemOffset
                });
            }
        });

        this.setCurrent(false);
    }

    SolutionsSlider.prototype.setCurrent = function(animate) {
        var $active = this.$slides.eq(this.current);

        $active.addClass('active').siblings('.active').removeClass('active');

        this.$prev.toggleClass('disabled', this.current === 0);
        this.$next.toggleClass('disabled', this.current === this.$slides.length - 1);

        var newOffset = $active.position().left + parseInt($active.css('margin-left'), 10) + this.$track.scrollLeft();

        if (animate) {
            this.$track
                .animate({
                    scrollLeft: newOffset
                }, {
                    duration: 400,
                    queue: false
                });
        } else {
            this.$track.scrollLeft(newOffset);
        }
    }

    SolutionsSlider.prototype.bind = function() {
        var _slider = this;

        var debouncer = null;

        $win
            .on('load', function() {
                _slider.dimensions();
            })
            .on('resize', function() {
                if (debouncer !== null) {
                    clearTimeout(debouncer);
                }

                debouncer = setTimeout(function() {
                    _slider.dimensions();
                }, 350);
            });

        addEventListener('orientationchange', function(event) {
            _slider.dimensions();
        });

        this.$prev
            .on('click', function(event) {
                event.preventDefault();

                if (_slider.current > 0) {
                    _slider.current--;

                    _slider.setCurrent(true);
                }
            });

        this.$next
            .on('click', function(event) {
                event.preventDefault();

                if (_slider.current < _slider.$slides.length - 1) {
                    _slider.current++;

                    _slider.setCurrent(true);
                }
            });

        this.$slider[0].addEventListener('touchmove', function(event) {
            event.preventDefault();
        });
    }

})(jQuery, window, document);

/*(function(){

	if (storageAvailable('localStorage')) {
		var proof_start_time = 2500;
		var proof_timeout_time = 12000;
		var proof_show_duration = 6000;
		var proof_leads = (localStorage.getItem("proof_leads") != null)
					?
						$.parseJSON(localStorage.getItem("proof_leads"))
					: null;
		var proof_index =
			(localStorage.getItem("proof_index") != null)
				?
					localStorage.getItem("proof_index")
				: 0;
		var shown =
			(localStorage.getItem("shown_proof_leads") != null && localStorage.getItem("shown_proof_leads") != "")
				?
				$.parseJSON( localStorage.getItem("shown_proof_leads") )
				: [];

		// begin
		proof_leads = get_proof_leads();
		next_proof_lead(proof_start_time);
	}

	function next_proof_lead(t) {
		if(proof_leads != null && proof_leads.list_size != null && proof_leads.list_size > 0) {
			setTimeout(handle_next_proof_lead, t);
		}
	}

	function handle_next_proof_lead() {
		if( proof_index < proof_leads.list_size) {
			var lead = proof_leads.list[proof_index];
			proof_index ++;
			localStorage.setItem("proof_index",proof_index);
			if(shown.indexOf(lead.uid) == -1) {
				// draw the lead
				draw_proof_lead(lead);

				// keep track of shown leads
				shown.push(lead.uid);
				localStorage.setItem("shown",JSON.stringify(shown));

				// show next lead, if any available
				if(proof_index < proof_leads.list_size) {
					next_proof_lead(proof_timeout_time);
				}
			}
		}

		if (shown.length == proof_leads.list_size) {
			// we have shown visitor all leads
			proof_leads = get_proof_leads();
			next_proof_lead(proof_timeout_time);
		}
	}

	function draw_proof_lead(lead) {
		var div = $('<div style="background:white;font-size:12px;border:2px solid #038AFB;position:fixed;bottom:10px;left:10px;width:250px;padding:10px;border-radius:10px;z-index:99999;"></div>');
		var now = Date.now();
		var proof_leads_date = Date.parse(lead.date_time.replace(' ','T')); // ms
		var diff = Math.floor(Math.abs(now - proof_leads_date) / 3600000);
		if (diff == 1) {
			diff += ' hour ago.';
		} else if (diff>1) {
			diff += ' hours ago.';
		} else {
			diff = Math.round(Math.abs(now - proof_leads_date) % 86400000 % 3600000 / 60000);
			diff += ' minutes ago.';
		}
		city = "";
		if( lead.city != null && lead.city.length > 0 ) {
			city = lead.city + ', ';
		}
		$(div).append(lead.first_name + ' from ' + city + lead.state + ' applied for a ' + lead.product.toLowerCase() + ' solution ' + diff)
			.appendTo( $('body') ).fadeIn('500');
		setTimeout( function() { $(div).fadeOut('700') }, proof_show_duration );
	}

	function get_proof_leads() {
		if(proof_leads != null && proof_leads.date_time != null) {
			// determine if we need to get new list
			var now = Date.now();
			var proof_leads_date = Date.parse(proof_leads.date_time.replace(' ','T'));
			var diff = Math.abs(now - proof_leads_date) / 3600000;
			if(diff >= 18) {
				// dont get more than 1 set every 18 hours
				var list = null;
				return $.ajax({url:'/app/assets/modules/get_proof.php',async: false}).done(function( data ) {
					list = $.parseJSON(data);
					localStorage.setItem("proof_leads", JSON.stringify(list) );
					shown = [];
					proof_index = 0;
					localStorage.setItem("shown",shown);
					localStorage.setItem("proof_index",proof_index);
					return list;
				}).fail(function(){
					return null;
				}).responseText;
			} else {
				return proof_leads;
			}
		} else {
			// no proof leads saved, get moar
			var list = null;
			return $.ajax({url:'/app/assets/modules/get_proof.php',async: false}).done(function( data ) {
				list = $.parseJSON(data);
				localStorage.setItem("proof_leads", JSON.stringify(list) );
				shown = [];
				proof_index = 0;
				localStorage.setItem("shown",shown);
				localStorage.setItem("proof_index",proof_index);
				return list;
			}).fail(function(){
				return null;
			}).responseText;
		}
	}

	function storageAvailable(type) {
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				storage.length !== 0;
		}
	}
})();*/