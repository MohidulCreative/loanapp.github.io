// // modal fix
// var enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;
// $.fn.modal.Constructor.prototype.enforceFocus = function() {};

/* usage:
 if parentElementID in modal, set isModal flag = true so that formbuilder opens the nearest modal when launched

/*
 * Form builder class.
 * @param object JSON object with form data.
*/

if (typeof display_logs == 'undefined') {
    display_logs = false;
}

function FormBuilder(formData) {

    /**
     * JSON form data.
     */
    this.formData = formData;
    this.formNextButton = '.btn-frmbldr-next';
    this.formAction = "";
    this.parentElementID = "";
    this.isModal = false;
    this.product = "";
    this.productSteps = "";
    this.numProductSteps = 0;
    this.isIFrame = false;
    this.errorMessages = {
        selectOptionFirst: "Please select an option before proceeding."
    }
    this.jQueryValidateOpts = {
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    }

    /**
     * Default done function.
     */
    this.done = function(self) {
        self.processAjax();
    };

    /**
     * Current step number.
     */
    this.currentStep = 0;

    /**
     * Builds HTML form with given options.
     * @param object Collection of key-value options.
     */
    this.buildForm = function(opts) {

        // Identify the target element, to which the form will be appended:
        this.parentElementID = opts.parentElementID;
        var parent = $(this.parentElementID);
        if (typeof(opts.formNextButton) !== 'undefined') {
            this.formNextButton = opts.formNextButton;
        }
        $(this.formNextButton).unbind(); // to kill circular reference in this.initEventListeners()
        // parent.find("form").find('.date').unbind();
        parent.find("form").remove(); // clear the form container

        this.isModal = opts.isModal;
        this.product = opts.product;
        this.productSteps = this.formData[this.product].steps;
        this.numProductSteps = this.countObjectElements(this.productSteps);
        this.setProgressBarValue(this.parentElementID, 0);
        this.currentStep = 0;
        this.formAction = opts.formAction;

        if (typeof opts.done !== 'undefined') {
            this.done = opts.done;
        }

        if (typeof opts.isIFrame !== 'undefined') {
            this.isIFrame = opts.isIFrame;
        }

        $(this.formNextButton).button("reset");

        // Create the form element:
        var form = $('<form class="form frmbldr-form" method="POST"></form>');
        form.attr("action", opts.formAction)
            .addClass(this.product);

        var productInput = $('<input type="hidden">');
        productInput.val(this.formData[this.product].ProductName)
            .attr("name", "product_name");
        form.append(productInput);

        // Loop through the steps:
        for (step in this.productSteps) {
            // <div id="stepX"></div>.
            // Note: every div except 1st will be hidden.
            var stepDiv = $('<div></div>');
            stepDiv.attr("id", "step" + step);

            if (typeof(this.productSteps[step].title) !== 'undefined' && this.productSteps[step].title.length) {
                var stepTitle = this.productSteps[step].title;
                stepDiv.append(stepTitle);
            }

            if (step > 0) {
                stepDiv.css("display", "none");
            }

            // Loop through the fields:
            for (field in this.productSteps[step].fields) {

                // Build the corresponding element and append to the form:
                var elementOpts = this.productSteps[step].fields[field]; // element options
                var element = this.buildElement(elementOpts); // HTML element

                if (step == 0) {
                    // remove disabled attribute from 1st step input element(s)
                    element.find("input,select,textarea").removeAttr("disabled");
                }

                // bind input element with condition field method if exists
                if (typeof(this.productSteps[step].conditional_fields) !== 'undefined' && typeof(this.productSteps[step].conditional_fields[field]) !== 'undefined') {
                    element.bind('conditional_field', this.productSteps[step].conditional_fields[field]);
                    if (display_logs) {
                        console.log('just set condtional_field fn var for ' + field);
                    }
                }

                stepDiv.append(element); // element appended to form
            }

            if (typeof(this.productSteps[step].footer_note) !== 'undefined' && this.productSteps[step].footer_note.length) {
                var footer_note = this.productSteps[step].footer_note;
                stepDiv.append(footer_note);
            }

            form.append(stepDiv);
        }

        // Apply jQuery Validation plugin to form
        form.validate(this.jQueryValidateOpts);

        $.each(FILLABLE_FIELDS, function(k, v) {
            var fillable_element = $(form).find('#' + k);

            if (typeof($(fillable_element)) !== 'undefined') {
                $(fillable_element).val(v);
            }
        });

        // Append the form to the parent element:
        parent.append(form);

        // if parentElement is in modal, launch modal
        if (this.isModal) {
            parent.closest('.modal').modal('show');
        }

        this.initEventListeners();

        // run 1st step before() function
        if (typeof(this.productSteps[this.currentStep]) !== 'undefined' && typeof(this.productSteps[this.currentStep].before) !== 'undefined') {
            this.productSteps[this.currentStep].before(this.parentElementID + " #step" + this.currentStep, this.parentElementID + " #step" + this.currentStep + 1, this);
        }
    };

    /**
     * Build an HTML element based on the options.
     */
    this.buildElement = function(opts) {
        switch (opts.type) {
            case "text":
                // <input type="text" />
                return this.buildInputField(opts);
                break;
            case "checkbox":
                // <input type="checkbox" />
                return this.buildCheckboxField(opts);
                break;
            case "hidden":
                // <input type="hidden" />
                return this.buildHiddenField(opts);
                break;
            case "select":
                // <select>
                return this.buildSelectField(opts);
                break;
            case "select-btn":
                // similar to <select> except it saves value in <input type="hidden">
                // <div> <button>...</button> ... </div>
                return this.buildSelectBtn(opts);
                break;
            default:
                return;
        }
    };

    this.buildSelectBtn = function(opts) {
        if (!opts.options) return;

        // Parent div:
        var parent = $('<div class="frmbldr-select-btn"></div>');
        if (typeof(opts.parentContainerClass) !== 'undefined') {
            parent.addClass(opts.parentContainerClass);
        }

        // Append a hidden input to hold the value:
        var input = $("<input>");
        input.attr("type", "hidden")
            .attr("name", opts.name)
            .attr("id", opts.name);
        parent.append(input);

        // Append a heading:
        if (typeof(opts.labelContainer) !== 'undefined') {
            var heading = $(opts.labelContainer);
        } else {
            var heading = $("<h4></h4>");
        }
        if (typeof(opts.labelContainerClass) !== 'undefined') {
            heading.addClass(opts.labelContainerClass);
        }
        heading.html(opts.label);
        parent.append(heading);

        // For each option, create a div button element and append:
        for (divBtnKey in opts.options) {

            btnOpts = opts.options[divBtnKey]; // options

            var btnContainer = $('<div class="col-md-6"></div>');
            var btn = $('<button class="btn btn-default btn-select-' + opts.name + ' btn-lg btn-block frmbldr-btn"></button>');

            btn.addClass(btnOpts.class)
                .attr("data-value", btnOpts.value)
                .html(btnOpts.label);

            // event listener
            // update hidden input with user selection
            btn.click(function(e) {
                e.preventDefault();
                $('#' + opts.name).val($(this).data("value"));
                $('.btn-select-' + opts.name).removeClass('btn-primary').addClass('btn-secondary');
                $(this).removeClass("btn-secondary").addClass("btn-primary");
                $(this.formNextButton).click();
            })


            btnContainer.attr("id", btnOpts.id)
                .append(btn);

            // Append the div button to the parent div:
            parent.append(btnContainer);
        }

        return parent;
    };

    this.buildSelectField = function(opts) {
        if (!opts.options) return;

        // Parent div:
        var parentClass = "col-md-12";
        if (typeof(opts.parentClass) !== 'undefined') {
            parentClass = opts.parentClass;
        }

        var formGroup = $('<div class="form-group"></div>');
        var label = $('<label></label>');
        var input = $('<select></select>');

        formGroup.addClass(parentClass);

        label.attr("for", opts.id)
            .html(opts.label);

        input.attr("id", opts.id)
            .attr("name", opts.name)
            .addClass(opts.class)
            .attr("disabled", "disabled");

        var selectOpt = $('<option value=""></option>');
        selectOpt.html(opts.placeholder);

        input.append(selectOpt);

        for (i in opts.options) {
            var selectOptLabel = opts.options[i];
            selectOpt = $('<option></option>');
            selectOpt.attr("value", i)
                .html(selectOptLabel);
            input.append(selectOpt);
        }

        formGroup.append(label);
        formGroup.append(input);

        return formGroup;
    };

    this.buildCheckboxField = function(opts) {
        // Parent div:
        var parentClass = "col-md-12";
        if (typeof(opts.parentClass) !== 'undefined') {
            parentClass = opts.parentClass;
        }

        var formGroup = $('<div class="form-group"></div>');
        var label = $('<label></label>');
        var input = $('<input>');

        formGroup.addClass(parentClass);

        input.attr("type", opts.type)
            .attr("id", opts.id)
            .attr("name", opts.name)
            .attr("value", opts.value)
            .attr("disabled", "disabled")
            .addClass(opts.class);

        label.attr("for", opts.id)
            .addClass('checkbox')
            .append(input, opts.label);

        formGroup.append(label);

        return formGroup;
    }

    this.buildHiddenField = function(opts) {
        // Parent div:
        var parentClass = "hide";
        var input = $('<input>');

        var formGroup = $('<div class="form-group"></div>');
        formGroup.addClass(parentClass);

        input.attr("type", opts.type)
            .attr("id", opts.id)
            .attr("name", opts.name)
            .addClass(opts.class)
            .attr("disabled", "disabled");

        if (typeof(opts.default_value) !== 'undefined') {
            input.attr("value", opts.default_value);
        }

        formGroup.append(input);

        return formGroup;
    }

    this.buildInputField = function(opts) {
        // Parent div:
        var parentClass = "col-md-12";
        if (typeof(opts.parentClass) !== 'undefined') {
            parentClass = opts.parentClass;
        }

        var formGroup = $('<div class="form-group"></div>');
        var label = $('<label></label>');
        var input = $('<input>');

        formGroup.addClass(parentClass);

        label.attr("for", opts.id)
            .html(opts.label);

        input.attr("type", opts.type)
            .attr("id", opts.id)
            .attr("name", opts.name)
            .attr("placeholder", opts.placeholder)
            .addClass(opts.class)
            .attr("disabled", "disabled");

        if (typeof(opts.maxlength) !== 'undefined') {
            input.attr("maxlength", opts.maxlength);
        }

        if (typeof(opts.minlength) !== 'undefined') {
            input.attr("minlength", opts.minlength);
        }

        if (typeof(opts.equalTo) !== 'undefined') {
            input.attr("equalTo", opts.equalTo);
        }

        formGroup.append(label);

        // If input-group-addon is specified, then create & append, else append the input only:
        if (typeof(opts['input-group-addon']) !== 'undefined') {
            var inputGroup = $('<div class="input-group"></div>');
            var inputGroupAddOn = $('<span class="input-group-addon"></span>');
            var inputGroupAddOnIcon = $('<i></i>');
            inputGroupAddOnIcon.addClass(opts['input-group-addon'].class);

            inputGroupAddOn.append(inputGroupAddOnIcon);
            inputGroup.append(inputGroupAddOn);
            inputGroup.append(input);

            if (typeof opts['input-group-addon'].popover !== 'undefined') {
                var inputGroupBtn = $('<div class="input-group-btn"></div>');
                var btn = $('<button type="button" class="btn" data-toggle="popover" aria-label="Help"></button>');
                var icon = $('<span></span>').addClass(opts['input-group-addon'].popover.icon);

                btn.data('placement', opts['input-group-addon'].popover.placement)
                    .data('content', opts['input-group-addon'].popover.content)
                    .attr('title', opts['input-group-addon'].popover.title)
                    .append(icon);

                btn.popover();

                inputGroupBtn.append(btn);
                inputGroup.append(inputGroupBtn);
            }

            formGroup.append(inputGroup);
        } else {
            formGroup.append(input);
        }

        return formGroup;
    };

    this.goToNextStep = function() {

        var self = this;
        var form = $(self.parentElementID).find("form");

        // temporary disable next button.
        $(this.formNextButton).button("loading");

        // validate inputs
        var fields = self.productSteps[self.currentStep].fields;

        for (field in fields) {

            // check if select-btn option was selected
            if (fields[field].type == "select-btn") {
                var fieldVal = $('#' + fields[field].id).val();
                if (typeof(fieldVal) !== 'undefined' && fieldVal.length == 0) {
                    alert(self.errorMessages.selectOptionFirst);
                    // enable next button once again
                    $(this.formNextButton).button("reset");
                    return;
                }
            }
        }

        if (!$(form).valid()) {
            // enable next button once again
            $(form).find('.has-error:first').find('input,select,textarea').focus();
            $(this.formNextButton).button("reset");
            return;
        }

        setTimeout(function() {

            var el = self.parentElementID + " #step" + self.currentStep++;
            var nextEl = self.parentElementID + " #step" + self.currentStep;

            var beforeNextStepDuration = 0;

            if (typeof(self.productSteps[self.currentStep]) !== 'undefined' && typeof(self.productSteps[self.currentStep].before) !== 'undefined') {
                self.productSteps[self.currentStep].before(el, nextEl, self);
                beforeNextStepDuration = self.productSteps[self.currentStep].beforeDuration;
            }

            // save customer data
            self.saveCustomerData(form);

            // only show the next step after the next step's before() function has been executed.
            setTimeout(function() {
                self.showNextStep(self, el, nextEl);
            }, beforeNextStepDuration);

        }, 50);

    };

    this.showNextStep = function(self, currEl, nextEl) {
        var cdata = this.getCustomerData();

        if (!$(nextEl).length) {
            // disable next button
            $(this.formNextButton).button("loading");
            if (display_logs) {
                console.log('show next step');
            }

            // clear next btn listeners
            // then, make it so next btn can only call done function
            $(this.formNextButton).unbind();
            $(this.formNextButton).click(function() {
                self.done(self);
            });

            // next step does not exist; form complete.
            self.done(self);

            return;
        }

        $(currEl).hide(); // hide div of the old step

        $(nextEl).find("input,select,textarea").each(function() {

            // attempt to pre-populate
            // this uses localStorage but we are disabling for now, for privacy reasons
            // var id = $(this).attr('id');
            // if(typeof cdata !== undefined && typeof cdata[id] !== undefined && cdata[id] != null && cdata[id].length > 0) {
            // 	$(this).val(cdata[id]);
            // }

            // trigger the conditional_field custom event
            // if it exists.
            $(this).trigger("conditional_field", {
                "element": this
            });
        });

        $(nextEl).show(); // show div of the new step

        $(nextEl).find("input,select,textarea").removeAttr("disabled");
        this.register_form_date_events($(nextEl));

        var progressBarValue = parseFloat($(this.parentElementID + " .progress-bar").attr('aria-valuenow'));
        var progress = progressBarValue + 100 / self.numProductSteps;

        self.setProgressBarValue(self.parentElementID, progress);

        // enable next button once again
        $(this.formNextButton).button("reset");

        var $first = $(nextEl).find("input,select,textarea").first();
        if (typeof $first !== 'undefined' && $first.length) {
            $first.focus();
            $first.scrollTop($first.position().top - 100);
        }
    };

    this.initEventListeners = function() {
        var self = this; // reference to this object

        // Initialize event listeners:
        $(self.formNextButton).click(function(e) {
            e.preventDefault();
            self.goToNextStep();
        });

        var form = $(self.parentElementID).find("form");
        form.find('input,select,textarea').on('keyup', function(e) {
            if (e.keyCode == 13) {
                self.goToNextStep();
            }
        });
    };

    this.countObjectElements = function(obj) {
        var count = 0,
            i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                count++;
            }
        }
        return count;
    }

    this.setProgressBarValue = function(parent, val) {
        var progressBar = $(parent + " .progress-bar");
        progressBar.css('width', val + '%')
            .attr('aria-valuenow', val); // update value of progress bar
    }

    this.register_form_date_events = function(nextEl) {

        if (display_logs) {
            console.log(nextEl);
        }

        nextEl.find('.dob').each(function(i, el) {
            $(el).attr('id', $(el).attr('id') + i);
            $(el).datepicker({
                changeYear: true,
                changeMonth: true,
                yearRange: "-85:",
                maxDate: '-18Y',
                defaultDate: "-30Y",
                dateFormat: 'yy-mm-dd'
            });
        });

        nextEl.find('.paydate1').each(function(i, el) {
            $(el).datepicker({
                minDate: new Date(),
                dateFormat: 'yy-mm-dd',
                disabled: false,
                "beforeShowDay": $.datepicker.noWeekends,
                onSelect: function(dateValue, inst) {
                    nextEl.find('.paydate2').datepicker("option", "minDate", dateValue);
                }
            });
        });
        nextEl.find('.paydate2').each(function(i, el) {
            $(el).datepicker({
                minDate: new Date(),
                disabled: false,
                dateFormat: 'yy-mm-dd',
                "beforeShowDay": $.datepicker.noWeekends
            });
        });

        nextEl.find('.start_biz').each(function(i, el) {
            $(el).datepicker({
                changeYear: true,
                changeMonth: true,
                yearRange: "-50:",
                maxDate: 'Y',
                defaultDate: new Date(),
                dateFormat: 'yy-mm-dd'
            });
        });

        nextEl.find('.date').each(function() {
            $(this).on("focusin", function(e) {
                $(this).prop('readonly', true);
            });
        });

        nextEl.find('.date').each(function() {
            $(this).on("focusout", function(e) {
                $(this).prop('readonly', false);
            });
        });

    }

    this.saveCustomerData = function(form) {
        if (!this.isIFrame) {
            var saveable_fields = ['title', 'first_name', 'last_name', 'email'];
            var cdata = this.getCustomerData();

            if (typeof cdata == "undefined" || cdata == null) {
                cdata = {};
            }

            $(form).find('#' + saveable_fields.join(',#')).each(function(i, element) {
                if ($(element).val().length > 0) {
                    id = $(element).attr('id');
                    cdata[id] = $(element).val();
                }
            });

            localStorage.setItem('customerData', JSON.stringify(cdata));
        }
    }

    this.getCustomerData = function() {
        if (!this.isIFrame) {
            return JSON.parse(localStorage.getItem('customerData'));
        } else {
            return null;
        }
    }

    this.processAjax = function() {
        var self = this;
        var form = $(self.parentElementID).find("form");
        var data = $(form).serialize();
        var nextBtn = self.formNextButton;

        if (self.isIFrame) {
            data += '&is_iframe=true';
        }

        if (typeof(layout_affiliate_id) !== 'undefined' && layout_affiliate_id.length) {
            data += '&affiliate_id=' + layout_affiliate_id;
        }

        // disable modal closing
        if (self.isModal) {
            $(self.parentElementID).closest('.modal').find('button.close').hide();
            $(self.parentElementID).closest('.modal').data('bs.modal').options.keyboard = false;
            $(self.parentElementID).closest('.modal').data('bs.modal').options.backdrop = 'static';
        }

        $(nextBtn).after('<h5 class="frmbldr-nextbtn-helper text-center">Please wait up to 5 minutes while we search for the best possible service provider. Do not leave or refresh this page. Thank you.</h5>');

        $.ajax({
            type: "POST",
            url: self.formAction,
            data: data,
            async: true,
            timeout: 180000
        }).done(function(o) {
            if (display_logs) {
                console.log('resp');
                console.log(o);
            }
            try {
                if (o.status == "success") {
                    if (typeof(o.redirectURL) !== 'undefined' && o.redirectURL.length > 0) {
                        if (self.isIFrame) {
                            window.location.href = '/app/redirect?is_iframe=yes&url=' + encodeURIComponent(o.redirectURL);
                        } else {
                            window.location.href = '/app/redirect?url=' + encodeURIComponent(o.redirectURL);
                        }
                    } else {
                        //Check if coming from PQ version
                        if (ty_page_url.indexOf("?") != -1)
                            var unique_id = "&unique_id=" + o.uniqueID;
                        else
                            var unique_id = "?unique_id=" + o.uniqueID;

                        if (self.isIFrame) {
                            window.location.href = ty_page_url + unique_id;
                        } else {
                            window.location.href = ty_page_url;
                        }
                    }
                } else {
                    if (typeof(o.errors) !== 'undefined') {
                        alert(o.errors.join("\n"));
                    } else {
                        alert("Something went wrong");
                    }
                    // enable closing modal
                    if (self.isModal) {
                        $(self.parentElementID).closest('.modal').find('button.close').show();
                        $(self.parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                        $(self.parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
                    }
                    // enable next button once again
                    $(nextBtn).button("reset");
                    $('.frmbldr-nextbtn-helper').remove();
                }
            } catch (e) {
                if (display_logs) {
                    console.log('ajax exception');
                    console.log(e);
                }
                alert('Something went wrong.');
                // enable closing modal
                if (self.isModal) {
                    $(self.parentElementID).closest('.modal').find('button.close').show();
                    $(self.parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                    $(self.parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
                }
                // enable next button once again
                $(nextBtn).button("reset");
                $('.frmbldr-nextbtn-helper').remove();
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {

            if (display_logs) {
                console.log(errorThrown);
            }

            alert('Request failed. Something went wrong.');

            // enable closing modal
            if (self.isModal) {
                $(self.parentElementID).closest('.modal').find('button.close').show();
                $(self.parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                $(self.parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
            }

            // enable next button once again
            $(nextBtn).button("reset");
            $('.frmbldr-nextbtn-helper').remove();

        });

    }
}