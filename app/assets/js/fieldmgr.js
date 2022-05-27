$(function() {
    $("body").on("change", "#own_car", function() {
        if ($(this).val() == "own" || $(this).val() == "lease") {
            $("#car_value").closest('.form-group').show();
            $("#car_debt").closest('.form-group').show();
            $("#car_year").closest('.form-group').show();
            $("#car_mileage").closest('.form-group').show();
            $("#car_debt").val(0);

            $("#car_value").removeAttr('disabled');
            $("#car_debt").removeAttr('disabled');
            $("#car_year").removeAttr('disabled');
            $("#car_mileage").removeAttr('disabled');
        } else if ($(this).val() == "finance") {
            $("#car_value").closest('.form-group').show();
            $("#car_debt").closest('.form-group').show();
            $("#car_year").closest('.form-group').show();
            $("#car_mileage").closest('.form-group').show();
            $("#car_debt").val(null);
            $("#car_value").removeAttr('disabled');
            $("#car_debt").removeAttr('disabled');
            $("#car_year").removeAttr('disabled');
            $("#car_mileage").removeAttr('disabled');
        } else {
            $("#car_value").closest('.form-group').hide();
            $("#car_debt").closest('.form-group').hide();
            $("#car_year").closest('.form-group').hide();
            $("#car_mileage").closest('.form-group').hide();

            $("#car_value").attr('disabled', 'disabled');
            $("#car_debt").attr('disabled', 'disabled');
            $("#car_year").attr('disabled', 'disabled');
            $("#car_mileage").attr('disabled', 'disabled');
        }
    });
    $("body").on("change", "#own_home", function() {
        if ($(this).val() == "yes") {
            $("#property_value").closest('.form-group').show();
            // $("#property_municipal_value").closest('.form-group').show();
            $("#property_mortgage").closest('.form-group').show();
            $("#property_value").removeAttr('disabled');
            // $("#property_municipal_value").removeAttr('disabled');
            $("#property_mortgage").removeAttr('disabled');
            $("#property_year_of_purchase").removeAttr('disabled');
            $("#property_mortgage_interest_rate").removeAttr('disabled');
            $("#property_mortgage_interest_rate_type").removeAttr('disabled');
            $("#property_mortgage_late_payments_last_year").removeAttr('disabled');
        } else {
            $("#property_value").closest('.form-group').hide();
            // $("#property_municipal_value").closest('.form-group').hide();
            $("#property_mortgage").closest('.form-group').hide();
            $("#property_value").attr('disabled', 'disabled');
            // $("#property_municipal_value").attr('disabled','disabled');
            $("#property_mortgage").attr('disabled', 'disabled');
            $("#property_year_of_purchase").attr('disabled', 'disabled');
            $("#property_mortgage_interest_rate").attr('disabled', 'disabled');
            $("#property_mortgage_interest_rate_type").attr('disabled', 'disabled');
            $("#property_mortgage_late_payments_last_year").attr('disabled', 'disabled');
        }
    });
    $("body").on("change", "#asset_financed", function() {
        if ($(this).val() == "yes") {
            $("#asset_financing_amount").removeAttr('disabled');
            $("#asset_financing_amount").closest('.form-group').show();
            $("#asset_financing_amount").val('');
        } else {
            $("#asset_financing_amount").val(0);
            $("#asset_financing_amount").attr('disabled', 'disabled');
            $("#asset_financing_amount").closest('.form-group').hide();
        }
    });
});