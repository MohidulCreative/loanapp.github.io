function hide_fields(currentStepContainer, frmbldr) {
    var className = '.hide-for-short-version';
    var fields = $(currentStepContainer).find(className);

    $.each(fields, function(index, formElement) {
        $(formElement).closest('.form-group').hide();
        $(formElement).closest('.form-group').addClass('hide');
    });

    var visibleElements = $(currentStepContainer).find('.form-group:not(.hide)').length;
    if (visibleElements < 1) {
        frmbldr.goToNextStep();
    }
}

function shorten_form(currentStepContainer, frmbldr) {
    console.log('shorten_form');

    // we need the unique_id to check for duplicates
    let unique_id = $(currentStepContainer).closest('form').find('#unique_id').val();

    // once we get the response from server, we can keep that value in the form so we avoid additional requests
    var la_duplicate = $(currentStepContainer).closest('form').find('#la_duplicate').val();

    // we check if we already made the request to determine if it is a duplicate
    if (typeof la_duplicate !== "undefined" && la_duplicate.length > 0) {

        if (la_duplicate == "true") {
            hide_fields(currentStepContainer, frmbldr);
        }

        return;
    }

    // unique_id is required for the request
    if (!unique_id) {
        return;
    }

    var req = jQuery.ajax({
            method: "POST",
            url: '/app/is-duplicate',
            data: {
                uid: unique_id,
            },
            dataType: "json",
            timeout: 4000
        })
        .done(function(data) {
            // console.log(JSON.stringify(data));

            if (typeof data.is_duplicate !== "undefined") {
                // we keep the response value 'is_duplicate' in the form to avoid additional requests
                var la_duplicate = $(currentStepContainer).closest('form').find('#la_duplicate');
                if (la_duplicate) {
                    la_duplicate.val(!!data.is_duplicate);
                }

                if (!!data.is_duplicate) {
                    hide_fields(currentStepContainer, frmbldr);
                }
            }
        })
        .fail(function(xhr, textStatus, errorThrown) {
            console.log('failed at -- is-duplicate');
        });
}

function fill_city_and_state(previousStepContainer) {
    console.log('fill_city_and_state');
    var form = jQuery(previousStepContainer).closest("form");
    var city = jQuery(form).find("#city");
    var state = jQuery(form).find("#state");
    var postal_code = jQuery(form).find("#postal_code").val();

    let code = postal_code.trim().toUpperCase().charAt(0);
    let hasState = false;
    let hasCity = false;

    let postalCodeProvince = {
        'A': 'NL',
        'B': 'NS',
        'C': 'PE',
        'E': 'NB',
        'G': 'QC',
        'H': 'QC',
        'J': 'QC',
        'K': 'ON',
        'L': 'ON',
        'M': 'ON',
        'N': 'ON',
        'P': 'ON',
        'R': 'MB',
        'S': 'SK',
        'T': 'AB',
        'V': 'BC',
        // 'X':'NU',
        // 'X':'NT',
        'Y': 'YT',
    };

    if (code in postalCodeProvince) {
        $(state).val(postalCodeProvince[code]);
        hasState = true;
    }

    var req = jQuery.ajax({
        method: "POST",
        url: '/app/geonames',
        data: {
            postalcode: postal_code,
            country: 'CA',
            username: 'loanscanada'
        },
        dataType: "json"
    });

    req.done(function(data) {
        //console.log(JSON.stringify(data));

        if (typeof data.postalcodes !== "undefined" && data.postalcodes.length > 0) {
            // if(typeof data.postalcodes[0]["adminName2"] !== 'undefined' && data.postalcodes[0]["adminName2"].length > 0) {
            // 	$(city).val(data.postalcodes[0]["adminName2"]);
            // } else {
            // 	$(city).closest(".form-group").removeClass('hide');
            // }
            if (typeof data.postalcodes[0]["placeName"] !== 'undefined' && data.postalcodes[0]["placeName"].length > 0) {
                console.log(data.postalcodes[0]["placeName"]);
                $(city).val(data.postalcodes[0]["placeName"].split('(')[0]);
                hasCity = true;
            }

            // if(typeof data.postalcodes[0]["adminCode1"] !== 'undefined' && data.postalcodes[0]["adminCode1"].length > 0) {
            // 	$(state).val(data.postalcodes[0]["adminCode1"]);
            // } else {
            // 	$(state).closest(".form-group").removeClass('hide');
            // }

            if (code == 'X') {
                if (typeof data.postalcodes[0]["adminCode1"] !== 'undefined' &&
                    data.postalcodes[0]["adminCode1"].length > 0) {

                    // The geonames api is inconsistent and sometimes
                    // returns an Integer and sometimes the province code
                    // as adminCode1
                    let xCodes = {
                        "13": "NT",
                        "NT": "NT",
                        "14": "NU",
                        "NU": "NU",
                    };

                    if (data.postalcodes[0]["adminCode1"] in xCodes) {
                        $(state).val(xCodes[data.postalcodes[0]["adminCode1"]]);
                        hasState = true;
                    }
                }
            }

        }

        if (!hasState)
            $(state).closest(".form-group").removeClass('hide');

        if (!hasCity)
            $(city).closest(".form-group").removeClass('hide');

    });

    req.fail(function(xhr, textStatus, errorThrown) {
        $(city).closest(".form-group").removeClass('hide');
        $(state).closest(".form-group").removeClass('hide');
    });

    $(state).closest(".form-group").removeClass('hide');
    $(state).closest(".form-group").show();
}

function get_auto_opts(previousStepContainer, currentStepContainer, type, opts, frmbldr) {
    var form = jQuery(previousStepContainer).closest("form");
    switch (type) {
        case 'year':
            var req = jQuery.ajax({
                    method: "POST",
                    url: '/app/auto-api/years',
                    data: {},
                    dataType: "json"
                })
                .done(function(data) {
                    if (typeof data.years !== "undefined") {
                        var car_year = $(form).find('#car_year');
                        $(car_year).empty();
                        $(car_year).append('<option value="">Choose...</option>');
                        for (i = 0; i < data.years.length; i++) {
                            $(car_year).append('<option value="' + data.years[i] + '">' + data.years[i] + '</option>');
                        }
                    }
                })
                .fail(function(xhr, textStatus, errorThrown) {
                    console.log('fail');
                });
            break;
        case 'make':
            var req = jQuery.ajax({
                    method: "POST",
                    url: '/app/auto-api/makes',
                    data: {
                        'year': opts.year
                    },
                    dataType: "json"
                })
                .done(function(data) {
                    if (typeof data.makes !== "undefined") {
                        var car_make = $(form).find('#car_make');
                        if (Array.isArray(data.makes)) {
                            for (i = 0; i < data.makes.length; i++) {
                                $(car_make).append('<option value="' + data.makes[i] + '">' + data.makes[i] + '</option>');
                            }
                        } else {
                            $(car_make).append('<option value="' + data.makes + '">' + data.makes + '</option>');
                        }
                    }
                })
                .fail(function(xhr, textStatus, errorThrown) {
                    console.log('fail');
                });
            break;
        case 'model':
            var req = jQuery.ajax({
                    method: "POST",
                    url: '/app/auto-api/models',
                    data: {
                        'year': opts.year,
                        'make': opts.make
                    },
                    dataType: "json"
                })
                .done(function(data) {
                    console.log(data);
                    if (typeof data.models !== "undefined") {
                        var car_model = $(form).find('#car_model');
                        if (Array.isArray(data.models)) {
                            for (i = 0; i < data.models.length; i++) {
                                $(car_model).append('<option value="' + data.models[i] + '">' + data.models[i] + '</option>');
                            }
                        } else {
                            $(car_model).append('<option value="' + data.models + '">' + data.models + '</option>');
                        }
                    }
                })
                .fail(function(xhr, textStatus, errorThrown) {
                    console.log('fail');
                });
            break;
        case 'trim':
            var req = jQuery.ajax({
                    method: "POST",
                    url: '/app/auto-api/trims',
                    data: {
                        'year': opts.year,
                        'make': opts.make,
                        'model': opts.model
                    },
                    dataType: "json"
                })
                .done(function(data) {
                    console.log(data);
                    if (typeof data.trims !== "undefined") {
                        var car_trim = $(form).find('#car_trim');
                        if (Array.isArray(data.trims)) {
                            for (i = 0; i < data.trims.length; i++) {
                                $(car_trim).append('<option value="' + data.trims[i] + '">' + data.trims[i] + '</option>');
                            }
                        } else if (typeof data.trims == 'undefined') {
                            $(currentStepContainer).find('input,select,textarea').remove();
                            $(frmbldr.formNextButton).trigger('click');
                        } else {
                            $(car_trim).append('<option value="' + data.trims + '">' + data.trims + '</option>');
                        }
                    }
                })
                .fail(function(xhr, textStatus, errorThrown) {
                    console.log('fail');
                });
            break;
        case 'style':
            if (typeof opts.trim == 'undefined') {
                $(currentStepContainer).find('input,select,textarea').remove();
                $(frmbldr.formNextButton).trigger('click');
                return;
            }
            var req = jQuery.ajax({
                    method: "POST",
                    url: '/app/auto-api/styles',
                    data: {
                        'year': opts.year,
                        'make': opts.make,
                        'model': opts.model,
                        'trim': opts.trim
                    },
                    dataType: "json"
                })
                .done(function(data) {
                    console.log(data);
                    if (typeof data.styles !== "undefined") {
                        var car_style = $(form).find('#car_style');
                        if (Array.isArray(data.styles)) {
                            for (i = 0; i < data.styles.length; i++) {
                                $(car_style).append('<option value="' + data.styles[i] + '">' + data.styles[i] + '</option>');
                            }
                        } else if (typeof data.styles == 'undefined') {
                            $(currentStepContainer).find('input,select,textarea').remove();
                            $(frmbldr.formNextButton).trigger('click');
                        } else {
                            $(car_style).append('<option value="' + data.styles + '">' + data.styles + '</option>');
                        }
                    }
                })
                .fail(function(xhr, textStatus, errorThrown) {
                    console.log('fail');
                });
            break;
    }
}

function do_partial_post(previousStepContainer) {
    var data = $(previousStepContainer).closest('form').serialize();
    if (typeof layout_affiliate_id !== 'undefined' && layout_affiliate_id.length) {
        data += "&affiliate_id=" + layout_affiliate_id;
    }
    if (typeof layout_is_iframe !== 'undefined' && layout_is_iframe) {
        data += "&is_iframe=true";
    }
    $.ajax({
        type: "POST",
        url: '/app/lead/partial',
        data: data,
        async: false
    }).done(function(o) {
        if (display_logs) {
            console.log('resp');
            console.log(o);
        }
        try {
            if (o.status == "success" && o.uniqueID.length) {
                $(previousStepContainer).closest('form').find('#unique_id').val(o.uniqueID);
            } else {
                if (display_logs) {
                    console.log('ajax error');
                    console.log(e);
                }
            }
        } catch (e) {
            if (display_logs) {
                console.log('ajax exception');
                console.log(e);
            }
        }
    }).fail(function(r) {
        if (display_logs) {
            console.log('ajax fail');
            console.log(r);
        }
    });
}

function do_soln_search(previousStepContainer) {
    $(previousStepContainer).children().hide();
    $(previousStepContainer).append('<div class="frmblr-searching" style="height:250px;"><h4 class="text-center">Searching for solutions...</h4><br><div class="text-center"><img src="/app/assets/img/ripple.gif"/></div></div>');
    setTimeout(function() {
        $(previousStepContainer).find(".frmblr-searching").hide();
        $(previousStepContainer).append('<div style="height:250px;"><h4 class="text-center">Congratulations!<br>Programs are available in your area.</h4><div style="text-align:center;"><img src="https://loanscanada.ca/app/assets/img/checkmark-green.png" style="width:100px;height:auto;"></div></div>');
    }, 1000);
}

var loan_steps = [{
        "title": '<h4 class="text-center">How much are you looking for?</h4>',
        "fields": {
            "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER,
            "la_duplicate": CONST_FORM_FIELDS.LA_DUPLICATE
        },
    },
    {
        "fields": {
            "product_purpose": CONST_FORM_FIELDS.LOAN_PURPOSE_CENTER
        }
    },
    {
        "before": function(previousStepContainer) {
            var form = jQuery(previousStepContainer).closest("form");
            var purpose = $(form).find('#product_purpose').val();
            var amt = $(form).find('#requested_amount').val();
            // if( purpose == 'Car Repair' ) {
            // 	if (window.self !== window.top) {
            // 		// is iFrame
            // 		if($('#product-selector').length) {
            // 			// we are on iFrame page
            // 			alert('Looks like you selected Car Maintenance. We will take you to our car maintenance financing form instead.');
            // 			$('#product-selector option:selected').prop("selected", false);
            // 			$('.product-select-container').show();
            // 			$('.preloaded_app').each(function(){
            // 				$(this).addClass('hide');
            // 			});
            // 			// $('.btn-restart').hide('slow');
            // 			$('#product-selector').val('vehicle_repair_loan_dev');
            // 			$('#product-selector').trigger("change");
            // 		}
            // 	} else if (window.location.href.indexOf("/app/") == -1) {
            // 		// not inside the /app/ folder, meaning this is likely a modal app or coming from the main website!
            // 		alert('Sit tight! We will now redirect you to our car maintenance financing application.');
            // 		window.location.href="/app/car-repair-loan?requested_amount="+amt;
            // 	} else {
            // 		alert('Sit tight! We will now redirect you to our car maintenance financing application.');
            // 		window.location.href="car-repair-loan?requested_amount="+amt;
            // 	}
            // }
        },
        "fields": {
            "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
    },
    {
        "fields": {
            "income_type": CONST_FORM_FIELDS.EMPLOYMENT
        }
    },
    /*{
    	"before" : function(previousStepContainer, currentStepContainer, frmbldr) {
    		var form = jQuery(previousStepContainer).closest("form");
    		var income_type =  $(form).find('#income_type').val();
    		if( income_type != 'self_employed' ) {
    			// skip this step
    			$(currentStepContainer).find('input,select,textarea').remove();
    			$(frmbldr.formNextButton).trigger('click');
    		}
    	},
    	"fields" : {
    		"is_sole_proprietor" : CONST_FORM_FIELDS.SOLE_PROPRIETOR,
    		"has_business_bank_account" : CONST_FORM_FIELDS.HAS_BIZ_BANK_ACCOUNT,
    		"business_start_date" : CONST_FORM_FIELDS.COMPANY_START_DATE
    	}
    },*/
    {
        "fields": {
            "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
        }
    },
    {
        "before": function(previousStepContainer) {
            fill_city_and_state(previousStepContainer);
        },
        "fields": {
            "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
        }
    },
    {
        "before": function(previousStepContainer) {
            do_soln_search(previousStepContainer);
        },
        "beforeDuration": 3000,
        "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
        "fields": {
            "title": CONST_FORM_FIELDS.TITLE,
            "first_name": CONST_FORM_FIELDS.FIRST_NAME,
            "last_name": CONST_FORM_FIELDS.LAST_NAME,
            "home_phone": CONST_FORM_FIELDS.PHONE,
            "email": CONST_FORM_FIELDS.EMAIL,
            "dob": CONST_FORM_FIELDS.DOB,
            "city": CONST_FORM_FIELDS.CITY,
            "state": CONST_FORM_FIELDS.STATES,
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
        /*,
        "conditional_fields" : {
        	"ssn" : function(event, opts) {
        		var el = opts.element;
        		var form = $(el).closest("form");
        		var form_group = $(el).closest(".form-group");
        		if (typeof $(form).find('#monthly_income') !== 'undefined' && $(form).find('#monthly_income').val() <= '1500') {
        			$(form_group).remove();
        		}
        	}
        }*/
    },
    {
        "title": '<h4 class="text-center">Tell us about your living situation</h4>',
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            do_partial_post(previousStepContainer);
            shorten_form(currentStepContainer, frmbldr);
        },
        "fields": {
            "unique_id": CONST_FORM_FIELDS.UID,
            "address": CONST_FORM_FIELDS.ADDRESS,
            "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
            "own_home": CONST_FORM_FIELDS.OWN_HOME,
            "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
            "property_value": CONST_FORM_FIELDS.HOME_VALUE,
            "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            if ($(form).find('#own_home').val() != 'yes') {
                $(currentStepContainer).find('input,select,textarea').remove();
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "wants_to_sell_home": CONST_FORM_FIELDS.SELL_HOME,
        }
    },
    /*{
    	"title" : '<h4 class="text-center">Do you have a car?</h4>',
    	"fields" : {
    		"own_car" : CONST_FORM_FIELDS.OWN_CAR,
    		"car_value" : CONST_FORM_FIELDS.CAR_VALUE,
    		"car_debt" : CONST_FORM_FIELDS.CAR_DEBT,
    		"car_year" : CONST_FORM_FIELDS.CAR_YEAR,
    		"car_mileage" : CONST_FORM_FIELDS.CAR_MILEAGE
    	}
    },*/
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            shorten_form(currentStepContainer, frmbldr);
        },
        "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
        "fields": {
            "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
            "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
            "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                $(currentStepContainer).find('input,select,textarea').remove();
                $(frmbldr.formNextButton).trigger('click');
            }
            shorten_form(currentStepContainer, frmbldr);
        },
        "title": '<h4 class="text-center">Please enter your income and employment information.</h4>',
        "fields": {
            "employer": CONST_FORM_FIELDS.EMPLOYER,
            "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
            "job_title": CONST_FORM_FIELDS.JOB_TITLE,
            "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
            "direct_deposit": CONST_FORM_FIELDS.DIRECT_DEPOSIT,
            "pay_frequency": CONST_FORM_FIELDS.PAY_FREQUENCY,
            "pay_date1": CONST_FORM_FIELDS.PAY_DATE1,
            "pay_date2": CONST_FORM_FIELDS.PAY_DATE2
        }
    },
    /*{
    	"title" : '<h4 class="text-center">Please enter your banking info.</h4>',
    	"fields" : {
    		"bank_account_type" : CONST_FORM_FIELDS.BANK_ACCOUNT_TYPE,
    		"bank_name" : CONST_FORM_FIELDS.BANK_NAME,
    		"bank_aba" : CONST_FORM_FIELDS.BANK_ABA,
    		"bank_institution_number" : CONST_FORM_FIELDS.BANK_INSTITUTION_NUMBER,
    		"bank_account_number" : CONST_FORM_FIELDS.BANK_ACCOUNT_NUM,
    		"bank_months" : CONST_FORM_FIELDS.BANK_MONTHS,
    	},
    	"footer_note" : '<div class="text-center"><a href="/app/assets/img/void.gif" target="_blank"><img src="/app/assets/img/void.gif" alt="void cheque" style="width:80%;"></a></div>',
    	"before" : function(previousStepContainer, currentStepContainer, frmbldr) {
    		var form = jQuery(previousStepContainer).closest("form");
    		if ( $(form).find('#state').val() != 'QC'
    				|| (['full_time','part_time','self_employed']).indexOf( $(form).find('#income_type').val() ) == -1
    						|| $(form).find('#direct_deposit').val() != 'yes'
    							|| $(form).find('#requested_amount').val() > 2000
    								|| $(form).find('#in_dmp').val() == 'yes'
    								|| $(form).find('#in_consumer_proposal').val() == 'yes'
    									|| $(form).find('#in_bankruptcy').val() == 'yes' ) {
    			$(currentStepContainer).find('input,select,textarea').remove();
    			$(frmbldr.formNextButton).trigger('click');
    		}
    	},
    },*/
    {
        "title": '<h4 class="text-center">This is the last step!</h4>',
        "fields": {
            "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
            "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
            // "monthly_loan_payments" : CONST_FORM_FIELDS.MONTHLY_LOAN_PAYMENTS,
            "opt_in": CONST_FORM_FIELDS.OPT_IN,
            "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH
        }
    }
];

var loan_steps_no_car_repair = jQuery.extend(true, {}, loan_steps);
loan_steps_no_car_repair[1].fields.product_purpose = CONST_FORM_FIELDS.LOAN_PURPOSE_NO_CAR_REPAIR_CENTER;

let loan_steps_with_car_info = Array.from(loan_steps);
const car_info = [{
    "title": '<h4 class="text-center">Tell us about your assets</h4>',
    "fields": {
        "own_car": CONST_FORM_FIELDS.OWN_CAR,
        "car_value": CONST_FORM_FIELDS.CAR_VALUE,
        "car_debt": CONST_FORM_FIELDS.CAR_DEBT,
        "car_year": CONST_FORM_FIELDS.CAR_YEAR
    }
}];

loan_steps_with_car_info.splice(9, 0, car_info[0]); // this adds the step with the car information in step 9

var home_loan_refi_steps = [

    {
        "fields": {
            "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_MORTGAGE_DISCLAIMER
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            // do_soln_search(previousStepContainer);
            Promise.resolve(fill_city_and_state(previousStepContainer)).then(
                function() {
                    var form = jQuery(previousStepContainer).closest("form");
                    var state = $(form).find('#state').val();
                    if (state == 'BC' || state == 'ON') {
                        // skip this step
                        // $(currentStepContainer).find('input,select,textarea').remove();
                        $(currentStepContainer).html('');
                        $(frmbldr.formNextButton).trigger('click');
                    }
                }
            );
        },
        "fields": {
            "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                // skip this step
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                // skip this step
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "monthly_income": CONST_FORM_FIELDS.INCOME,
            "has_proof_of_income": CONST_FORM_FIELDS.HAS_PROOF_OF_INCOME,
            "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
            "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
            "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                // skip this step
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "property_value": CONST_FORM_FIELDS.HOME_VALUE,
            // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
            "property_mortgage": CONST_FORM_FIELDS.MORTGAGE,
            "home_type": CONST_FORM_FIELDS.HOME_TYPE,
            "property_year_of_purchase": CONST_FORM_FIELDS.PROP_YR_PURCHASED,
            "property_mortgage_interest_rate": CONST_FORM_FIELDS.MORTGAGE_INTEREST_RATE,
            "property_mortgage_interest_rate_type": CONST_FORM_FIELDS.MORTGAGE_RATE_TYPE,
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "property_mortgage_late_payments_last_year": CONST_FORM_FIELDS.MORTGAGE_LATE_PAYMENTS_CENTER
        }
    },
    {
        "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
        "fields": {
            "first_name": CONST_FORM_FIELDS.FIRST_NAME,
            "last_name": CONST_FORM_FIELDS.LAST_NAME,
            "home_phone": CONST_FORM_FIELDS.PHONE,
            "email": CONST_FORM_FIELDS.EMAIL,
            "city": CONST_FORM_FIELDS.CITY,
            "state": CONST_FORM_FIELDS.STATES,
            "opt_in": CONST_FORM_FIELDS.OPT_IN
        }
    }
];

var mortgage_steps_contact_info_only = [{
        "fields": {
            "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
        },
        // "footer_note" : CONST_FORM_FIELDS.FOOTER_MORTGAGE_DISCLAIMER
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            fill_city_and_state(previousStepContainer);

            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state != 'QC') {
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE,
        },
    },
    {
        "before": function(previousStepContainer) {
            do_soln_search(previousStepContainer);
        },
        "beforeDuration": 3000,
        "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
        "fields": {
            "title": CONST_FORM_FIELDS.TITLE,
            "first_name": CONST_FORM_FIELDS.FIRST_NAME,
            "last_name": CONST_FORM_FIELDS.LAST_NAME,
            "home_phone": CONST_FORM_FIELDS.PHONE,
            "email": CONST_FORM_FIELDS.EMAIL,
            "city": CONST_FORM_FIELDS.CITY,
            "state": CONST_FORM_FIELDS.STATES,
            "opt_in": CONST_FORM_FIELDS.OPT_IN
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
    },
];

var mortgage_steps = [

    {
        "fields": {
            "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_MORTGAGE_DISCLAIMER
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            // do_soln_search(previousStepContainer);
            Promise.resolve(fill_city_and_state(previousStepContainer)).then(
                function() {
                    var form = jQuery(previousStepContainer).closest("form");
                    var state = $(form).find('#state').val();
                    if (state == 'BC' || state == 'ON') {
                        // skip this step
                        // $(currentStepContainer).find('input,select,textarea').remove();
                        $(currentStepContainer).html('');
                        $(frmbldr.formNextButton).trigger('click');
                    }
                }
            );
        },
        "fields": {
            "purchase_price": CONST_FORM_FIELDS.PURCHASE_PRICE_CENTER
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "monthly_income": CONST_FORM_FIELDS.INCOME,
            "has_proof_of_income": CONST_FORM_FIELDS.HAS_PROOF_OF_INCOME,
            "mortgage_downpayment": CONST_FORM_FIELDS.DOWN_PAYMENT,
            "has_other_mortgage": CONST_FORM_FIELDS.HAS_OTHER_MORTGAGE,
            "has_cosigner": CONST_FORM_FIELDS.HAS_COSIGNER,
            "property_purchase_purpose": CONST_FORM_FIELDS.PROPERTY_PURCHASE_PURPOSE,
            "purchase_property_status": CONST_FORM_FIELDS.PURCHASE_PROPERTY_STATUS,
            "working_with_real_estate_agent": CONST_FORM_FIELDS.HAS_REAL_ESTATE_AGENT,
            "home_type": CONST_FORM_FIELDS.HOME_TYPE,
        }
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE,
        },
        "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
    },
    {
        "before": function(previousStepContainer, currentStepContainer, frmbldr) {
            var form = jQuery(previousStepContainer).closest("form");
            var state = $(form).find('#state').val();
            if (state == 'BC' || state == 'ON') {
                $(currentStepContainer).html('');
                $(frmbldr.formNextButton).trigger('click');
            }
        },
        "fields": {
            "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
            "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER,
            "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
        }
    },
    {
        "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
        "fields": {
            "first_name": CONST_FORM_FIELDS.FIRST_NAME,
            "last_name": CONST_FORM_FIELDS.LAST_NAME,
            "home_phone": CONST_FORM_FIELDS.PHONE,
            "email": CONST_FORM_FIELDS.EMAIL,
            "city": CONST_FORM_FIELDS.CITY,
            "state": CONST_FORM_FIELDS.STATES,
            "opt_in": CONST_FORM_FIELDS.OPT_IN
        }
    }
];

var frmbldrData = {
    "personal_loan": {
        "ProductName": "personal_loan",
        "steps": loan_steps
    },
    "personal_loan_no_car_repair": {
        "ProductName": "personal_loan",
        "steps": loan_steps_no_car_repair
    },

    "education_loan": {
        "ProductName": "personal_loan",
        "steps": loan_steps
    },
    "title_loan": {
        "ProductName": "title_loan",
        "steps": loan_steps_with_car_info
    },
    "asset_based_loan": {
        "ProductName": "asset_based_loan",
        "steps": [{
                "title": '<h4 class="text-center">How much are you looking for?</h4>',
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
                },
            },
            {
                "title": '<h4 class="text-center">Tell us about the asset you want to borrow with</h4>',
                "fields": {
                    'asset_type': CONST_FORM_FIELDS.ASSET_TYPE,
                    'asset_type_custom': CONST_FORM_FIELDS.ASSET_TYPE_CUSTOM,
                    'asset_value': CONST_FORM_FIELDS.ASSET_VALUE,
                    'asset_financed': CONST_FORM_FIELDS.ASSET_FINANCED,
                    'asset_financing_amount': CONST_FORM_FIELDS.ASSET_FINANCING_AMOUNT
                }
            },
            {
                "fields": {
                    "product_purpose": CONST_FORM_FIELDS.LOAN_PURPOSE_CENTER
                }
            },
            {
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    var income_type = $(form).find('#income_type').val();
                    if (income_type != 'self_employed') {
                        // skip this step
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "is_sole_proprietor": CONST_FORM_FIELDS.SOLE_PROPRIETOR,
                    "has_business_bank_account": CONST_FORM_FIELDS.HAS_BIZ_BANK_ACCOUNT,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
                /*,
                "conditional_fields" : {
                	"ssn" : function(event, opts) {
                		var el = opts.element;
                		var form = $(el).closest("form");
                		var form_group = $(el).closest(".form-group");
                		if (typeof $(form).find('#monthly_income') !== 'undefined' && $(form).find('#monthly_income').val() <= '1500') {
                			$(form_group).remove();
                		}
                	}
                }*/
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "before": function(previousStepContainer) {
                    do_partial_post(previousStepContainer);
                },
                "fields": {
                    "unique_id": CONST_FORM_FIELDS.UID,
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE,
                    "monthly_expenses": CONST_FORM_FIELDS.MONTHLY_EXPENSES
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your assets</h4>',
                "fields": {
                    "own_car": CONST_FORM_FIELDS.OWN_CAR,
                    "car_value": CONST_FORM_FIELDS.CAR_VALUE,
                    "car_debt": CONST_FORM_FIELDS.CAR_DEBT,
                    "car_year": CONST_FORM_FIELDS.CAR_YEAR
                }
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER,
                }
            },
            {
                "title": '<h4 class="text-center">Please enter your income and employment information.</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "job_title": CONST_FORM_FIELDS.JOB_TITLE,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "direct_deposit": CONST_FORM_FIELDS.DIRECT_DEPOSIT,
                    "pay_frequency": CONST_FORM_FIELDS.PAY_FREQUENCY,
                    "pay_date1": CONST_FORM_FIELDS.PAY_DATE1,
                    "pay_date2": CONST_FORM_FIELDS.PAY_DATE2
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
            },
            /*{
            	"title" : '<h4 class="text-center">Please enter your banking info.</h4>',
            	"fields" : {
            		"bank_account_type" : CONST_FORM_FIELDS.BANK_ACCOUNT_TYPE,
            		"bank_name" : CONST_FORM_FIELDS.BANK_NAME,
            		"bank_aba" : CONST_FORM_FIELDS.BANK_ABA,
            		"bank_institution_number" : CONST_FORM_FIELDS.BANK_INSTITUTION_NUMBER,
            		"bank_account_number" : CONST_FORM_FIELDS.BANK_ACCOUNT_NUM,
            		"bank_months" : CONST_FORM_FIELDS.BANK_MONTHS,
            	},
            	"footer_note" : '<div class="text-center"><a href="/app/assets/img/void.gif" target="_blank"><img src="/app/assets/img/void.gif" alt="void cheque" style="width:80%;"></a></div>',
            	"before" : function(previousStepContainer, currentStepContainer, frmbldr) {
            		var form = jQuery(previousStepContainer).closest("form");
            		if ( $(form).find('#state').val() != 'QC'
            				|| (['full_time','part_time','self_employed']).indexOf( $(form).find('#income_type').val() ) == -1
            						|| $(form).find('#direct_deposit').val() != 'yes'
            							|| $(form).find('#requested_amount').val() > 2000
            								|| $(form).find('#in_dmp').val() == 'yes'
            								|| $(form).find('#in_consumer_proposal').val() == 'yes'
            									|| $(form).find('#in_bankruptcy').val() == 'yes' ) {
            			$(currentStepContainer).find('input,select,textarea').remove();
            			$(frmbldr.formNextButton).trigger('click');
            		}
            	},
            },*/
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH
                }
            }
        ]
    },
    "vehicle_repair_loan": {
        "ProductName": "car_repair_loan",
        "steps": loan_steps
    },
    "vehicle_repair_loan_dev": {
        "ProductName": "car_repair_loan",
        "steps": [{
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ($(form).find('#requested_amount').val().length) {
                        if ($(form).valid()) { //check if form is valid, in case we were redireted here from the standard loan page, in which case we can skip this step.
                            $(frmbldr.formNextButton).trigger('click');
                        }
                    }
                },
                "title": '<h4 class="text-center">How much money do you need?</h4>',
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER,
                    "product_purpose": CONST_FORM_FIELDS.LOAN_PURPOSE_CAR_REPAIR_HIDDEN
                },
            },
            {
                "title": '<h4 class="text-center">If you know the name of the auto shop you want to use for the maintenance you require, please enter it below or click Next to skip this step.</h4>',
                "fields": {
                    "garage_name": CONST_FORM_FIELDS.GARAGE_NAME,
                },
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    fill_city_and_state(previousStepContainer);
                    setTimeout(function() {
                        var state = $(previousStepContainer).closest('form').find('#state').val();
                        if (state == 'ON') {
                            get_auto_opts(previousStepContainer, currentStepContainer, 'year', {}, frmbldr);
                        }
                    }, 500); // give time for the postal code api to do its magic
                },
                "fields": {
                    "own_car": CONST_FORM_FIELDS.OWN_CAR_LMTD,
                    "car_value": CONST_FORM_FIELDS.CAR_VALUE,
                    "car_debt": CONST_FORM_FIELDS.CAR_DEBT,
                    "car_year": CONST_FORM_FIELDS.CAR_YEAR_CBB,
                    "car_mileage": CONST_FORM_FIELDS.CAR_MILEAGE
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var state = $(previousStepContainer).closest('form').find('#state').val();
                    if (state == 'ON') {
                        var year = $(previousStepContainer).closest('form').find('#car_year').val();
                        get_auto_opts(previousStepContainer, currentStepContainer, 'make', {
                            'year': year
                        }, frmbldr);
                    } else {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "car_make": CONST_FORM_FIELDS.CAR_MAKE_CBB,
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = $(previousStepContainer).closest('form');
                    var state = $(form).find('#state').val();
                    if (state == 'ON') {
                        var year = $(form).find('#car_year').val();
                        var make = $(form).find('#car_make').val();
                        get_auto_opts(previousStepContainer, currentStepContainer, 'model', {
                            'year': year,
                            'make': make
                        }, frmbldr);
                    } else {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "car_model": CONST_FORM_FIELDS.CAR_MODEL_CBB,
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = $(previousStepContainer).closest('form');
                    var state = $(form).find('#state').val();
                    if (state == 'ON') {
                        var year = $(form).find('#car_year').val();
                        var make = $(form).find('#car_make').val();
                        var model = $(form).find('#car_model').val();
                        get_auto_opts(previousStepContainer, currentStepContainer, 'trim', {
                            'year': year,
                            'make': make,
                            'model': model
                        }, frmbldr);
                    } else {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "car_trim": CONST_FORM_FIELDS.CAR_TRIM_CBB,
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = $(previousStepContainer).closest('form');
                    var state = $(form).find('#state').val();
                    if (state == 'ON') {
                        var year = $(form).find('#car_year').val();
                        var make = $(form).find('#car_make').val();
                        var model = $(form).find('#car_model').val();
                        var trim = $(form).find('#car_trim').val();
                        get_auto_opts(previousStepContainer, currentStepContainer, 'style', {
                            'year': year,
                            'make': make,
                            'model': model,
                            'trim': trim
                        }, frmbldr);
                    } else {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "car_style": CONST_FORM_FIELDS.CAR_STYLE_CBB,
                }
            },
            {
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES
                }
                /*,
                "conditional_fields" : {
                	"ssn" : function(event, opts) {
                		var el = opts.element;
                		var form = $(el).closest("form");
                		var form_group = $(el).closest(".form-group");
                		if (typeof $(form).find('#monthly_income') !== 'undefined' && $(form).find('#monthly_income').val() <= '1500') {
                			$(form_group).remove();
                		}
                	}
                }*/
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "before": function(previousStepContainer) {
                    do_partial_post(previousStepContainer);
                },
                "fields": {
                    "unique_id": CONST_FORM_FIELDS.UID,
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE,
                    "monthly_expenses": CONST_FORM_FIELDS.MONTHLY_EXPENSES
                }
            },
            /*{
            	"title" : '<h4 class="text-center">Tell us about your assets</h4>',
            	"fields" : {
            		"own_car" : CONST_FORM_FIELDS.OWN_CAR,
            		"car_value" : CONST_FORM_FIELDS.CAR_VALUE,
            		"car_debt" : CONST_FORM_FIELDS.CAR_DEBT,
            		"car_year" : CONST_FORM_FIELDS.CAR_YEAR
            	}
            },*/
            {
                "title": '<h4 class="text-center">Please enter your income and employment information.</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "direct_deposit": CONST_FORM_FIELDS.DIRECT_DEPOSIT,
                    "pay_frequency": CONST_FORM_FIELDS.PAY_FREQUENCY,
                    "pay_date1": CONST_FORM_FIELDS.PAY_DATE1,
                    "pay_date2": CONST_FORM_FIELDS.PAY_DATE2
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
            }
        ]
    },
    "car_loan": {
        "ProductName": "car_loan",
        "steps": [{
                "title": '<h4 class="text-center">Auto Financing Request</h4>',
                "fields": {
                    "car_request_type": CONST_FORM_FIELDS.CAR_REQUEST_TYPE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CAR_DISCLAIMER
            },
            {
                "fields": {
                    "car_request_monthly_budget": CONST_FORM_FIELDS.CAR_REQUEST_MONTHLY_BUDGET
                },
            },
            {
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "fields": {
                    "has_proof_of_income": CONST_FORM_FIELDS.HAS_PROOF_OF_INCOME_BTN
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "fields": {
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT
                    /*"property_value" : CONST_FORM_FIELDS.HOME_VALUE,
                    "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage" : CONST_FORM_FIELDS.MORTGAGE*/
                }
            },
            /*{
            	"title" : '<h4 class="text-center">Tell us about your current vehicle</h4>',
            	"fields" : {
            		"own_car" : CONST_FORM_FIELDS.OWN_CAR,
            		"car_value" : CONST_FORM_FIELDS.CAR_VALUE,
            		"car_debt" : CONST_FORM_FIELDS.CAR_DEBT,
            		"car_year" : CONST_FORM_FIELDS.CAR_YEAR
            	}
            },*/
            {
                "title": '<h4 class="text-center">Please enter your employment information</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "job_title": CONST_FORM_FIELDS.JOB_TITLE,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                }
            },
            {
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH_CAR,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
                /*,
                "conditional_fields" : {
                	"ssn" : function(event, opts) {
                		var el = opts.element;
                		var form = $(el).closest("form");
                		var form_group = $(el).closest(".form-group");
                		if (typeof $(form).find('#monthly_income') !== 'undefined' && $(form).find('#monthly_income').val() <= '1500') {
                			$(form_group).remove();
                		}
                	}
                }*/
            }
        ]
    },
    "car_refinancing": {
        "ProductName": "car_refinancing",
        "steps": [{
                "title": '<h4 class="text-center">Tell us about your current vehicle</h4>',
                "fields": {
                    "own_car": CONST_FORM_FIELDS.OWN_CAR_LMTD,
                    "car_value": CONST_FORM_FIELDS.CAR_VALUE,
                    "car_debt": CONST_FORM_FIELDS.CAR_DEBT,
                    "car_year": CONST_FORM_FIELDS.CAR_YEAR,
                    "car_mileage": CONST_FORM_FIELDS.CAR_MILEAGE,
                    "car_make": CONST_FORM_FIELDS.CAR_MAKE,
                    "car_model": CONST_FORM_FIELDS.CAR_MODEL,
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your current car financing</h4>',
                "fields": {
                    "current_loan_lender": CONST_FORM_FIELDS.CURRENT_LOAN_LENDER,
                    "current_loan_rate": CONST_FORM_FIELDS.CURRENT_LOAN_RATE,
                    "current_loan_monthly_payment": CONST_FORM_FIELDS.CURRENT_LOAN_MONTHLY_PAYMENT,
                    "current_loan_remaining_months": CONST_FORM_FIELDS.CURRENT_LOAN_REMAINING_MONTHS,
                }
            },
            {
                "title": '<h4 class="text-center">Auto Refinancing Request</h4>',
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "fields": {
                    "has_proof_of_income": CONST_FORM_FIELDS.HAS_PROOF_OF_INCOME_BTN
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "fields": {
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
                }
            },
            {
                "title": '<h4 class="text-center">Please enter your employment information</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "job_title": CONST_FORM_FIELDS.JOB_TITLE,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                }
            },
            {
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH_CAR,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
            }
        ]
    },
    "debt_consolidation": {
        "ProductName": "debt_consolidation",
        "steps": [{
                "title": '<h4 class="text-center">Debt Relief Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "monthly_income": CONST_FORM_FIELDS.INCOME
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center">Almost done!<br>We just need your contact information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "test": {
        "ProductName": "test",
        "steps": [{
                "fields": {
                    "car_request_type": CONST_FORM_FIELDS.CAR_REQUEST_TYPE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CAR_DISCLAIMER
            },
            {
                "fields": {
                    "car_request_monthly_budget": CONST_FORM_FIELDS.CAR_REQUEST_MONTHLY_BUDGET
                },
            },
            {
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER,
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "fields": {
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your current vehicle</h4>',
                "fields": {
                    "own_car": CONST_FORM_FIELDS.OWN_CAR,
                    "car_value": CONST_FORM_FIELDS.CAR_VALUE,
                    "car_debt": CONST_FORM_FIELDS.CAR_DEBT,
                    "car_year": CONST_FORM_FIELDS.CAR_YEAR
                }
            },
            {
                "title": '<h4 class="text-center">Please enter your employment information</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "job_title": CONST_FORM_FIELDS.JOB_TITLE,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                }
            },
            {
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
                /*,
                "conditional_fields" : {
                	"ssn" : function(event, opts) {
                		var el = opts.element;
                		var form = $(el).closest("form");
                		var form_group = $(el).closest(".form-group");
                		if (typeof $(form).find('#monthly_income') !== 'undefined' && $(form).find('#monthly_income').val() <= '1500') {
                			$(form_group).remove();
                		}
                	}
                }*/
            }
        ]
    },
    // "test" : {
    // 	"ProductName" : "test",
    // 	"steps" : [
    // 		{
    // 			"fields" : {
    // 				"first_name" : CONST_FORM_FIELDS.FIRST_NAME,
    // 				"last_name" : CONST_FORM_FIELDS.LAST_NAME,
    // 				"email" : CONST_FORM_FIELDS.EMAIL,
    // 				"postal_code" : CONST_FORM_FIELDS.POSTAL_CODE
    // 			}
    // 		},
    // 		{
    // 			"before" : function(previousStepContainer) {
    // 				do_partial_post(previousStepContainer);
    // 			},
    // 			"title" : '<h4 class="text-center">Almost done!<br>We just need your contact information.</h4>',
    // 			"footer_note" : CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
    // 			"fields" : {
    // 				"title" : CONST_FORM_FIELDS.TITLE,
    // 				"home_phone" : CONST_FORM_FIELDS.PHONE,
    // 				"city" : CONST_FORM_FIELDS.CITY,
    // 				"state" : CONST_FORM_FIELDS.STATES,
    // 				"opt_in" : CONST_FORM_FIELDS.OPT_IN,
    // 				"unique_id" : CONST_FORM_FIELDS.UID
    // 			}
    // 		}
    // 	]
    // },
    "debt_settlement": {
        "ProductName": "debt_settlement",
        "steps": [{
                "title": '<h4 class="text-center">Debt Relief Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "monthly_income": CONST_FORM_FIELDS.INCOME
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation.</h4>',
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center">Almost done!<br>We just need your contact information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "bankruptcy": {
        "ProductName": "bankruptcy",
        "steps": [{
                "title": '<h4 class="text-center">Bankruptcy Information Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "monthly_income": CONST_FORM_FIELDS.INCOME
                }
            },
            {
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER
                }
            },
            {
                "fields": {
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER
                }
            },
            {
                "fields": {
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center">Almost done!<br>We just a little more information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "consumer_proposal": {
        "ProductName": "consumer_proposal",
        "steps": [{
                "title": '<h4 class="text-center">Consumer Proposal Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "cc_debt_amount": CONST_FORM_FIELDS.CC_DEBT,
                    "unsecured_debt_amount": CONST_FORM_FIELDS.UNSECURED_DEBT,
                    "monthly_income": CONST_FORM_FIELDS.INCOME
                }
            },
            {
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER
                }
            },
            {
                "fields": {
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER
                }
            },
            {
                "fields": {
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center">Almost done!<br>We just a little more information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "credit_repair": {
        "ProductName": "credit_repair",
        "steps": [{
                "title": '<h4 class="text-center">Credit Rehab Program Request</h4>',
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">Almost done!<br>We just need a little more information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "cell_phone": CONST_FORM_FIELDS.CELL_PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "credit_fix": {
        "ProductName": "credit_fix",
        "steps": [{
                "title": '<h4 class="text-center">Credit Repair Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">Almost done!<br>We just need a little more information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "cp_payoff_loan": {
        "ProductName": "cp_payoff_loan",
        "steps": [{
                "title": '<h4 class="text-center">Consumer Proposal Payoff</h4>',
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Let\'s go over your financial profile</h4>',
                "fields": {
                    "in_bankruptcy": CONST_FORM_FIELDS.IN_BANKRUPTCY_CENTER,
                    "in_dmp": CONST_FORM_FIELDS.IN_DMP_CENTER,
                    "in_consumer_proposal": CONST_FORM_FIELDS.IN_CONSUMER_PROPOSAL_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">Almost done!<br>We just need a little more information.</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "cell_phone": CONST_FORM_FIELDS.CELL_PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "business_loan": {
        "ProductName": "business_loan",
        "steps": [{
                "title": '<h4 class="text-center">Business Financing Request</h4>',
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE_CENTER
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    var business_start_date = $(form).find('#business_start_date').val();
                    var timeInPast = new Date()
                    timeInPast.setMonth(timeInPast.getMonth() - 6);
                    let isStartup = timeInPast.getTime() < new Date(business_start_date).getTime();
                    // if NOT a startup
                    if (!isStartup) {
                        // skip this step
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE,
                }
            },
            {
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    var business_start_date = $(form).find('#business_start_date').val();
                    var timeInPast = new Date()
                    timeInPast.setMonth(timeInPast.getMonth() - 6);
                    let isStartup = timeInPast.getTime() < new Date(business_start_date).getTime();
                    // if NOT a startup
                    if (!isStartup) {
                        // skip this step
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
                "fields": {
                    "canadian_status": CONST_FORM_FIELDS.CANADIAN_STATUS,
                    "income_noa_1": CONST_FORM_FIELDS.BUSINESS_INCOME_NOA1,
                    "income_noa_2": CONST_FORM_FIELDS.BUSINESS_INCOME_NOA2,
                    "equity_liquid": CONST_FORM_FIELDS.BUSINESS_EQUITY_LIQUID,
                    "equity_non_liquid": CONST_FORM_FIELDS.BUSINESS_EQUITY_NON_LIQUID,
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "payment_processor": CONST_FORM_FIELDS.COMPANY_PAY_PROCESSOR
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "barter_loan": {
        "ProductName": "barter_loan",
        "steps": [{
                "title": '<h4 class="text-center">Speak With A Barter Exchange Specialist</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "title": '<h4 class="text-center">Speak With A Barter Exchange Specialist</h4>',
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "asset_based_commercial_loan": {
        "ProductName": "asset_based_commercial_loan",
        "steps": [{
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    'asset_type': CONST_FORM_FIELDS.ASSET_TYPE_COMMERCIAL,
                    'asset_type_custom': CONST_FORM_FIELDS.ASSET_TYPE_CUSTOM,
                    'asset_value': CONST_FORM_FIELDS.ASSET_VALUE,
                    'asset_financed': CONST_FORM_FIELDS.ASSET_FINANCED,
                    'asset_financing_amount': CONST_FORM_FIELDS.ASSET_FINANCING_AMOUNT
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "commercial_mortgage": {
        "ProductName": "commercial_mortgage",
        "steps": mortgage_steps_contact_info_only
    },
    "asset_financing": {
        "ProductName": "asset_financing",
        "steps": [{
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "fields": {
                    'new_asset_name': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING,
                    'new_asset_value': CONST_FORM_FIELDS.NEW_PURCHASE_PRICE,
                    'requested_amount': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING_AMOUNT
                }
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "credit_score": CONST_FORM_FIELDS.CREDIT_SCORE
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
            },
            {
                "title": '<h4 class="text-center">Please enter your income and employment information.</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "direct_deposit": CONST_FORM_FIELDS.DIRECT_DEPOSIT,
                    "pay_frequency": CONST_FORM_FIELDS.PAY_FREQUENCY,
                    "pay_date1": CONST_FORM_FIELDS.PAY_DATE1,
                    "pay_date2": CONST_FORM_FIELDS.PAY_DATE2
                },
                "before": function(previousStepContainer, currentStepContainer, frmbldr) {
                    var form = jQuery(previousStepContainer).closest("form");
                    if ((['full_time', 'part_time', 'self_employed', 'gig_worker']).indexOf($(form).find('#income_type').val()) == -1) {
                        $(currentStepContainer).find('input,select,textarea').remove();
                        $(frmbldr.formNextButton).trigger('click');
                    }
                },
            },
            {

                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH,
                }
            }
        ]
    },
    "commercial_leasing": {
        "ProductName": "commercial_leasing",
        "steps": [{
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            },
            {
                "fields": {
                    'asset_type': CONST_FORM_FIELDS.ASSET_TYPE_COMMERCIAL,
                    'new_asset_name': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING_COMMERCIAL,
                    'new_asset_value': CONST_FORM_FIELDS.NEW_PURCHASE_PRICE,
                    'requested_amount': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING_AMOUNT
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "mortgage": {
        "ProductName": "mortgage",
        "steps": mortgage_steps_contact_info_only
    },
    "mortgage_refinancing": {
        "ProductName": "mortgage_refinancing",
        "steps": mortgage_steps_contact_info_only
    },
    "heloc": {
        "ProductName": "heloc",
        "steps": mortgage_steps_contact_info_only
    },
    "second_mortgage": {
        "ProductName": "second_mortgage",
        "steps": mortgage_steps_contact_info_only
    },
    "reverse_mortgage": {
        "ProductName": "reverse_mortgage",
        "steps": mortgage_steps_contact_info_only
        // "steps" : [
        // 	{
        // 		"title" : '<h4 class="text-center">Reverse Mortgage Request</h4>',
        // 		"fields" : {
        // 			"postal_code" : CONST_FORM_FIELDS.POSTAL_CODE_CENTER
        // 		},
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_MORTGAGE_DISCLAIMER
        // 	},
        // 	{
        // 		"before" : function(previousStepContainer,currentStepContainer, frmbldr) {
        // 			Promise.resolve( fill_city_and_state(previousStepContainer) ).then(
        // 				function(){
        // 					var form =   jQuery(previousStepContainer).closest("form");
        // 					var state =  $(form).find('#state').val();
        // 					if( state == 'BC' || state == 'ON' ) {
        // 						// skip this step
        // 						// $(currentStepContainer).find('input,select,textarea').remove();
        // 						$(currentStepContainer).html('');
        // 						$(frmbldr.formNextButton).trigger('click');
        // 					}
        // 				}
        // 			);
        // 		},
        // 		"fields" : {
        // 			"credit_score" : CONST_FORM_FIELDS.CREDIT_SCORE
        // 		},
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
        // 	},
        // 	{
        // 		/* "before" : function(previousStepContainer) {
        // 			fill_city_and_state(previousStepContainer);
        // 			do_soln_search(previousStepContainer);
        // 		}, */
        // 		"before" : function(previousStepContainer,currentStepContainer, frmbldr) {
        // 			var form =   jQuery(previousStepContainer).closest("form");
        // 			var state =  $(form).find('#state').val();
        // 			if( state == 'BC' || state == 'ON' ) {
        // 				$(currentStepContainer).html('');
        // 				$(frmbldr.formNextButton).trigger('click');
        // 			}
        // 		},
        // 		"beforeDuration" : 3000,
        // 		"fields" : {
        // 			"monthly_income" : CONST_FORM_FIELDS.INCOME,
        // 			"has_proof_of_income" : CONST_FORM_FIELDS.HAS_PROOF_OF_INCOME,
        // 			"cc_debt_amount" : CONST_FORM_FIELDS.CC_DEBT,
        // 			"unsecured_debt_amount" : CONST_FORM_FIELDS.UNSECURED_DEBT,
        // 			"in_bankruptcy" : CONST_FORM_FIELDS.IN_BANKRUPTCY
        // 		}
        // 	},
        // 	{
        // 		"before" : function(previousStepContainer,currentStepContainer, frmbldr) {
        // 			var form =   jQuery(previousStepContainer).closest("form");
        // 			var state =  $(form).find('#state').val();
        // 			if( state == 'BC' || state == 'ON' ) {
        // 				$(currentStepContainer).html('');
        // 				$(frmbldr.formNextButton).trigger('click');
        // 			}
        // 		},
        // 		"fields" : {
        // 			"property_value" : CONST_FORM_FIELDS.HOME_VALUE,
        // 			// "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
        // 			"property_mortgage" : CONST_FORM_FIELDS.MORTGAGE,
        // 			"home_type" : CONST_FORM_FIELDS.HOME_TYPE,
        // 			"property_year_of_purchase" : CONST_FORM_FIELDS.PROP_YR_PURCHASED,
        // 		}
        // 	},
        // 	{
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
        // 		"fields" : {
        // 			"first_name" : CONST_FORM_FIELDS.FIRST_NAME,
        // 			"last_name" : CONST_FORM_FIELDS.LAST_NAME,
        // 			"home_phone" : CONST_FORM_FIELDS.PHONE,
        // 			"email" : CONST_FORM_FIELDS.EMAIL,
        // 			"city" : CONST_FORM_FIELDS.CITY,
        // 			"state" : CONST_FORM_FIELDS.STATES,
        // 			"opt_in" : CONST_FORM_FIELDS.OPT_IN
        // 		}
        // 	}
        // ]
    },
    "payment_processing": {
        "ProductName": "payment_processing",
        "steps": [{
                "title": '<h4 class="text-center">Payment Acceptance Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE,
                    "payment_processor": CONST_FORM_FIELDS.COMPANY_PAY_PROCESSOR
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "rent_to_own_home": {
        "ProductName": "rent_to_own_home",
        "steps": mortgage_steps_contact_info_only
    },
    "mca": {
        "ProductName": "mca",
        "steps": [{
                "title": '<h4 class="text-center">Business Financing Request</h4>',
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "fields": {
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "payment_processor": CONST_FORM_FIELDS.COMPANY_PAY_PROCESSOR
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "commission_advance": {
        "ProductName": "commission_advance",
        "steps": [{
                "title": '<h4 class="text-center">Commission Advance Request</h4>',
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "rent_to_own": {
        "ProductName": "rent_to_own",
        "steps": [{
                "fields": {
                    "requested_amount": CONST_FORM_FIELDS.REQUESTED_AMOUNT_RTO_CENTER
                }
            },
            {
                "fields": {
                    "income_type": CONST_FORM_FIELDS.EMPLOYMENT
                }
            },
            {
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                },
                "fields": {
                    "monthly_income": CONST_FORM_FIELDS.INCOME_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "title": '<h4 class="text-center col-md-10 col-md-offset-1">We just need a little more information to continue...</h4>',
                "fields": {
                    "title": CONST_FORM_FIELDS.TITLE,
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "dob": CONST_FORM_FIELDS.DOB,
                }
            },
            {
                "title": '<h4 class="text-center">Tell us about your living situation</h4>',
                "fields": {
                    "address": CONST_FORM_FIELDS.ADDRESS,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "address_length_months": CONST_FORM_FIELDS.ADDRESS_MONTHS,
                    "own_home": CONST_FORM_FIELDS.OWN_HOME,
                    "rent_mortgage_payment": CONST_FORM_FIELDS.MONTHLY_RENT,
                    "property_value": CONST_FORM_FIELDS.HOME_VALUE,
                    // "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
                    "property_mortgage": CONST_FORM_FIELDS.MORTGAGE
                }
            },
            {
                "fields": {
                    "own_car": CONST_FORM_FIELDS.OWN_CAR
                }
            },
            {
                "title": '<h4 class="text-center">Please enter your employment information</h4>',
                "fields": {
                    "employer": CONST_FORM_FIELDS.EMPLOYER,
                    "job_title": CONST_FORM_FIELDS.JOB_TITLE,
                    "employed_months": CONST_FORM_FIELDS.JOB_MONTHS,
                    "work_phone": CONST_FORM_FIELDS.WORK_PHONE,
                    "credit_auth": CONST_FORM_FIELDS.CREDIT_AUTH,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN,
                },
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER
            }

        ]
    },
    "bridge_loan": {
        "ProductName": "bridge_loan",
        "steps": mortgage_steps_contact_info_only
    },
    "mortgage_renewal": {
        "ProductName": "mortgage_renewal",
        "steps": mortgage_steps_contact_info_only
        // "steps" : [
        // 	{
        // 		"title" : '<h4 class="text-center">Mortgage Renewal Request</h4>',
        // 		"fields" : {
        // 			"postal_code" : CONST_FORM_FIELDS.PROPERTY_POSTAL_CODE_CENTER
        // 		},
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_MORTGAGE_DISCLAIMER
        // 	},
        // 	{
        // 		"before" : function(previousStepContainer,currentStepContainer, frmbldr) {
        // 			Promise.resolve( fill_city_and_state(previousStepContainer) ).then(
        // 				function(){
        // 					var form =   jQuery(previousStepContainer).closest("form");
        // 					var state =  $(form).find('#state').val();
        // 					if( state == 'BC' || state == 'ON' ) {
        // 						// skip this step
        // 						// $(currentStepContainer).find('input,select,textarea').remove();
        // 						$(currentStepContainer).html('');
        // 						$(frmbldr.formNextButton).trigger('click');
        // 					}
        // 				}
        // 			);
        // 		},
        // 		"beforeDuration" : 3000,
        // 		"fields" : {
        // 			"monthly_income" : CONST_FORM_FIELDS.INCOME,
        // 			"cc_debt_amount" : CONST_FORM_FIELDS.CC_DEBT,
        // 			"unsecured_debt_amount" : CONST_FORM_FIELDS.UNSECURED_DEBT,
        // 			"property_value" : CONST_FORM_FIELDS.HOME_VALUE,
        // 			// "property_municipal_value" : CONST_FORM_FIELDS.HOME_CITY_VALUE,
        // 			"property_mortgage" : CONST_FORM_FIELDS.MORTGAGE
        // 		}
        // 	},
        // 	{
        // 		"before" : function(previousStepContainer,currentStepContainer, frmbldr) {
        // 			var form =   jQuery(previousStepContainer).closest("form");
        // 			var state =  $(form).find('#state').val();
        // 			if( state == 'BC' || state == 'ON' ) {
        // 				$(currentStepContainer).html('');
        // 				$(frmbldr.formNextButton).trigger('click');
        // 			}
        // 		},
        // 		"fields" : {
        // 			"credit_score" : CONST_FORM_FIELDS.CREDIT_SCORE
        // 		},
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_CREDIT_DISCLAIMER
        // 	},
        // 	{
        // 		"footer_note" : CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
        // 		"fields" : {
        // 			"first_name" : CONST_FORM_FIELDS.FIRST_NAME,
        // 			"last_name" : CONST_FORM_FIELDS.LAST_NAME,
        // 			"home_phone" : CONST_FORM_FIELDS.PHONE,
        // 			"email" : CONST_FORM_FIELDS.EMAIL,
        // 			"city" : CONST_FORM_FIELDS.CITY,
        // 			"state" : CONST_FORM_FIELDS.STATES,
        // 			"opt_in" : CONST_FORM_FIELDS.OPT_IN
        // 		}
        // 	}
        // ]
    },
    "equipment_financing": {
        "ProductName": "equipment_financing",
        "steps": [{
                "title": '<h4 class="text-center">Equipment Financing Request</h4>',
                "fields": {
                    "postal_code": CONST_FORM_FIELDS.POSTAL_CODE_CENTER
                }
            },
            {
                "before": function(previousStepContainer) {
                    fill_city_and_state(previousStepContainer);
                    do_soln_search(previousStepContainer);
                },
                "beforeDuration": 3000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            },
            {
                "fields": {
                    'asset_type': CONST_FORM_FIELDS.ASSET_TYPE_COMMERCIAL,
                    'new_asset_name': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING_COMMERCIAL,
                    'new_asset_value': CONST_FORM_FIELDS.NEW_PURCHASE_PRICE,
                    'requested_amount': CONST_FORM_FIELDS.NEW_PURCHASE_FINANCING_AMOUNT
                }
            },
            {
                "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
                "fields": {
                    "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                    "last_name": CONST_FORM_FIELDS.LAST_NAME,
                    "home_phone": CONST_FORM_FIELDS.PHONE,
                    "email": CONST_FORM_FIELDS.EMAIL,
                    "city": CONST_FORM_FIELDS.CITY,
                    "state": CONST_FORM_FIELDS.STATES,
                    "opt_in": CONST_FORM_FIELDS.OPT_IN
                }
            }
        ]
    },
    "video": {
        "ProductName": "video",
        "steps": [{
                "fields": {
                    'requested_amount': CONST_FORM_FIELDS.LOAN_AMOUNT_CENTER
                }
            },
            {
                "fields": {
                    'first_name': CONST_FORM_FIELDS.FIRST_NAME,
                    'last_name': CONST_FORM_FIELDS.LAST_NAME,
                    'cell_phone': CONST_FORM_FIELDS.PHONE,
                    'email': CONST_FORM_FIELDS.EMAIL
                }
            },
            {
                "before": function(previousStepContainer) {
                    $(previousStepContainer).children().hide();
                    $(previousStepContainer).append('<div class="frmblr-searching" style="height:250px;"><h4 class="text-center">Searching for solutions...</h4><br><div class="text-center"><img src="/app/assets/img/ripple.gif"/></div></div>');
                    setTimeout(function() {
                        $(previousStepContainer).find(".frmblr-searching").hide();
                        $(previousStepContainer).append('<div style="height:250px;"><h4 class="text-center">Congratulations!<br><br>Multiple Loan Offers Found</h4><div style="text-align:center;"><img src="https://loanscanada.ca/app/assets/img/checkmark-green.png" style="width:100px;height:auto;"></div></div>');
                    }, 800);
                },
                "beforeDuration": 100000,
                "fields": {
                    "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                    "monthly_gross_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_REV,
                    "monthly_card_sales": CONST_FORM_FIELDS.COMPANY_MONTHLY_DEBIT_CREDIT,
                    "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY,
                    "business_start_date": CONST_FORM_FIELDS.COMPANY_START_DATE
                }
            }
        ]
    },
    "pos_financing": {
        "ProductName": "pos_financing",
        "steps": [{
            // "title" : '<h4 class="text-center">Point of Sale Financing</h4>',
            "footer_note": CONST_FORM_FIELDS.FOOTER_DISCLAIMER,
            "fields": {
                "first_name": CONST_FORM_FIELDS.FIRST_NAME,
                "last_name": CONST_FORM_FIELDS.LAST_NAME,
                "home_phone": CONST_FORM_FIELDS.PHONE,
                "email": CONST_FORM_FIELDS.EMAIL,
                "address": CONST_FORM_FIELDS.ADDRESS,
                "state": CONST_FORM_FIELDS.STATES,
                "company_name": CONST_FORM_FIELDS.COMPANY_NAME,
                "business_type": CONST_FORM_FIELDS.COMPANY_INDUSTRY_POS,
                "opt_in": CONST_FORM_FIELDS.OPT_IN
            }
        }, ]
    },
};