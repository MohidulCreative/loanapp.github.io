var CMIValidationHelper = new Object();



if (jQuery.validator) {

    jQuery.validator.addMethod("validate_dob", function(value, element) {
        // yyyy-mm-dd
        var re = /^\d{4}-\d{1,2}-\d{1,2}$/;
        var thisyear = new Date().getFullYear();
        return re.test(value) && value.substring(0, 4) != thisyear;
    }, "Date of birth is invalid.");

    jQuery.validator.addClassRules("validate_dob", {
        validate_dob: true
    });

    jQuery.validator.addMethod("postal", function(value, element) {
        if (value.length < 6) {
            return false;
        }
        var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
        if (regex.test(value.toUpperCase())) {
            var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
            if (regex.test(value)) {
                var substr = value.substring(0, 3);
                var substr2 = value.substring(3, 6);
                value = substr + substr2;
            }
            jQuery(element).val(value);
            return true;
        }
        return false;
    }, "Postal code format must be A9A9A9");

    jQuery.validator.addClassRules("validate_postal", {
        postal: true
    });

    jQuery.validator.addMethod("validate_email", function(value, element) {

        var typosDomain = ['xom', 'con', 'xa', 'xon', 'cim', 'cin', 'ocm', 'con', 'cmo', 'copm', 'xom', 'vom', 'comn', 'comj', 'coim', 'cpm', 'colm', 'conm', 'coom', 'om', 'cm', 'co', 'ocm', 'cmo', 'xom', 'dom', 'fom', 'vom', 'cim', 'c9m', 'c0m', 'cpm', 'clm', 'ckm', 'con', 'coj', 'cok', 'xcom', 'cxom', 'dcom', 'cdom', 'fcom', 'cfom', 'vcom', 'cvom', 'ciom', 'coim', 'c9om', 'co9m', 'c0om', 'co0m', 'cpom', 'copm', 'clom', 'colm', 'ckom', 'cokm', 'conm', 'comn', 'cojm', 'comj', 'cokm', 'comk', 'a', 'c', 'ac', 'xa', 'da', 'fa', 'va', 'cq', 'cw', 'cs', 'cx', 'cz', 'xca', 'cxa', 'dca', 'cda', 'fca', 'cfa', 'vca', 'cva', 'cqa', 'caq', 'cwa', 'caw', 'csa', 'cas', 'cxa', 'cax', 'cza', 'caz', 'c', 'q', 'cq', '1c', '2c', 'wc', 'sc', 'ac', 'qx', 'qd', 'qf', 'qv', '1qc', 'q1c', '2qc', 'q2c', 'wqc', 'qwc', 'sqc', 'qsc', 'aqc', 'qac', 'qxc', 'qcx', 'qdc', 'qcd', 'qfc', 'qcf', 'qvc', 'qcv', 'nert', 'nett', 'nrt', 'met', 'ntt', 'col'];

        var typosProvider = ['otmail', 'htmail', 'homail', 'hotail', 'hotmil', 'hotmal', 'hotmai', 'hhotmail', 'hootmail', 'hottmail', 'hotmmail', 'hotmaail', 'hotmaiil', 'hotmaill', 'ohtmail', 'htomail', 'homtail', 'hotamil', 'hotmial', 'hotmali', 'gotmail', 'yotmail', 'uotmail', 'jotmail', 'notmail', 'botmail', 'hitmail', 'h9tmail', 'h0tmail', 'hptmail', 'hltmail', 'hktmail', 'hormail', 'ho5mail', 'ho6mail', 'hoymail', 'hohmail', 'hogmail', 'hofmail', 'hotnail', 'hotjail', 'hotkail', 'hotmqil', 'hotmwil', 'hotmsil', 'hotmxil', 'hotmzil', 'hotmaul', 'hotma8l', 'hotma9l', 'hotmaol', 'hotmall', 'hotmakl', 'hotmajl', 'hotmaik', 'hotmaio', 'hotmaip', 'ghotmail', 'hgotmail', 'yhotmail', 'hyotmail', 'uhotmail', 'huotmail', 'jhotmail', 'hjotmail', 'nhotmail', 'hnotmail', 'bhotmail', 'hbotmail', 'hiotmail', 'hoitmail', 'h9otmail', 'ho9tmail', 'h0otmail', 'ho0tmail', 'hpotmail', 'hoptmail', 'hlotmail', 'holtmail', 'hkotmail', 'hoktmail', 'hortmail', 'hotrmail', 'ho5tmail', 'hot5mail', 'ho6tmail', 'hot6mail', 'hoytmail', 'hotymail', 'hohtmail', 'hothmail', 'hogtmail', 'hotgmail', 'hoftmail', 'hotfmail', 'hotnmail', 'hotmnail', 'hotjmail', 'hotmjail', 'hotkmail', 'hotmkail', 'hotmqail', 'hotmaqil', 'hotmwail', 'hotmawil', 'hotmsail', 'hotmasil', 'hotmxail', 'hotmaxil', 'hotmzail', 'hotmazil', 'hotmauil', 'hotmaiul', 'hotma8il', 'hotmai8l', 'hotma9il', 'hotmai9l', 'hotmaoil', 'hotmaiol', 'hotmalil', 'hotmaill', 'hotmakil', 'hotmaikl', 'hotmajil', 'hotmaijl', 'hotmaikl', 'hotmailk', 'hotmaiol', 'hotmailo', 'hotmaipl', 'hotmailp', 'utlook', 'otlook', 'oulook', 'outook', 'outlok', 'outlok', 'outloo', 'ooutlook', 'ouutlook', 'outtlook', 'outllook', 'outloook', 'outloook', 'outlookk', 'uotlook', 'otulook', 'oultook', 'outolok', 'outloko', 'iutlook', '9utlook', '0utlook', 'putlook', 'lutlook', 'kutlook', 'oytlook', 'o7tlook', 'o8tlook', 'oitlook', 'oktlook', 'ojtlook', 'ohtlook', 'ourlook', 'ou5look', 'ou6look', 'ouylook', 'ouhlook', 'ouglook', 'ouflook', 'outkook', 'outoook', 'outpook', 'outliok', 'outl9ok', 'outl0ok', 'outlpok', 'outllok', 'outlkok', 'outloik', 'outlo9k', 'outlo0k', 'outlopk', 'outlolk', 'outlokk', 'outlooj', 'outlooi', 'outlooo', 'outlool', 'outloom', 'ioutlook', 'oiutlook', '9outlook', 'o9utlook', '0outlook', 'o0utlook', 'poutlook', 'oputlook', 'loutlook', 'olutlook', 'koutlook', 'okutlook', 'oyutlook', 'ouytlook', 'o7utlook', 'ou7tlook', 'o8utlook', 'ou8tlook', 'oiutlook', 'ouitlook', 'okutlook', 'ouktlook', 'ojutlook', 'oujtlook', 'ohutlook', 'ouhtlook', 'ourtlook', 'outrlook', 'ou5tlook', 'out5look', 'ou6tlook', 'out6look', 'ouytlook', 'outylook', 'ouhtlook', 'outhlook', 'ougtlook', 'outglook', 'ouftlook', 'outflook', 'outklook', 'outlkook', 'outolook', 'outloook', 'outplook', 'outlpook', 'outliook', 'outloiok', 'outl9ook', 'outlo9ok', 'outl0ook', 'outlo0ok', 'outlpook', 'outlopok', 'outllook', 'outlolok', 'outlkook', 'outlokok', 'outloiok', 'outlooik', 'outlo9ok', 'outloo9k', 'outlo0ok', 'outloo0k', 'outlopok', 'outloopk', 'outlolok', 'outloolk', 'outlokok', 'outlookk', 'outloojk', 'outlookj', 'outlooik', 'outlooki', 'outloook', 'outlooko', 'outloolk', 'outlookl', 'outloomk', 'outlookm', 'mail', 'gail', 'gmil', 'gmal', 'gmai', 'ggmail', 'gmmail', 'gmaail', 'gmaiil', 'gmaill', 'mgail', 'gamil', 'gmial', 'gmali', 'fmail', 'tmail', 'ymail', 'hmail', 'bmail', 'vmail', 'gnail', 'gjail', 'gkail', 'gmqil', 'gmwil', 'gmsil', 'gmxil', 'gmzil', 'gmaul', 'gma8l', 'gma9l', 'gmaol', 'gmall', 'gmakl', 'gmajl', 'gmaik', 'gmaio', 'gmaip', 'fgmail', 'gfmail', 'tgmail', 'gtmail', 'ygmail', 'gymail', 'hgmail', 'ghmail', 'bgmail', 'gbmail', 'vgmail', 'gvmail', 'gnmail', 'gmnail', 'gjmail', 'gmjail', 'gkmail', 'gmkail', 'gmqail', 'gmaqil', 'gmwail', 'gmawil', 'gmsail', 'gmasil', 'gmxail', 'gmaxil', 'gmzail', 'gmazil', 'gmauil', 'gmaiul', 'gma8il', 'gmai8l', 'gma9il', 'gmai9l', 'gmaoil', 'gmaiol', 'gmalil', 'gmaill', 'gmakil', 'gmaikl', 'gmajil', 'gmaijl', 'gmaikl', 'gmailk', 'gmaiol', 'gmailo', 'gmaipl', 'gmailp', 'ol', 'al', 'ao', 'aaol', 'aool', 'aoll', 'oal', 'alo', 'qol', 'wol', 'sol', 'xol', 'zol', 'ail', 'a9l', 'a0l', 'apl', 'all', 'akl', 'aok', 'aoo', 'aop', 'qaol', 'aqol', 'waol', 'awol', 'saol', 'asol', 'xaol', 'axol', 'zaol', 'azol', 'aiol', 'aoil', 'a9ol', 'ao9l', 'a0ol', 'ao0l', 'apol', 'aopl', 'alol', 'aoll', 'akol', 'aokl', 'aokl', 'aolk', 'aool', 'aolo', 'aopl', 'aolp', 'ahoo', 'yhoo', 'yaoo', 'yaho', 'yaho', 'yyahoo', 'yaahoo', 'yahhoo', 'yahooo', 'yahooo', 'ayhoo', 'yhaoo', 'yaoho', 'tahoo', '6ahoo', '7ahoo', 'uahoo', 'jahoo', 'hahoo', 'gahoo', 'yqhoo', 'ywhoo', 'yshoo', 'yxhoo', 'yzhoo', 'yagoo', 'yayoo', 'yauoo', 'yajoo', 'yanoo', 'yaboo', 'yahio', 'yah9o', 'yah0o', 'yahpo', 'yahlo', 'yahko', 'yahoi', 'yaho9', 'yaho0', 'yahop', 'yahol', 'yahok', 'tyahoo', 'ytahoo', '6yahoo', 'y6ahoo', '7yahoo', 'y7ahoo', 'uyahoo', 'yuahoo', 'jyahoo', 'yjahoo', 'hyahoo', 'yhahoo', 'gyahoo', 'ygahoo', 'yqahoo', 'yaqhoo', 'ywahoo', 'yawhoo', 'ysahoo', 'yashoo', 'yxahoo', 'yaxhoo', 'yzahoo', 'yazhoo', 'yaghoo', 'yahgoo', 'yayhoo', 'yahyoo', 'yauhoo', 'yahuoo', 'yajhoo', 'yahjoo', 'yanhoo', 'yahnoo', 'yabhoo', 'yahboo', 'yahioo', 'yahoio', 'yah9oo', 'yaho9o', 'yah0oo', 'yaho0o', 'yahpoo', 'yahopo', 'yahloo', 'yaholo', 'yahkoo', 'yahoko', 'yahoio', 'yahooi', 'yaho9o', 'yahoo9', 'yaho0o', 'yahoo0', 'yahopo', 'yahoop', 'yaholo', 'yahool', 'yahoko', 'yahook', 'netetrt'];

        var strArray = value.toLowerCase().split("@");
        var providerAndDomain = strArray[strArray.length - 1];

        var providerAndDomainSplit = providerAndDomain.split(".");
        var provider = providerAndDomainSplit[0];

        if (typosProvider.includes(provider))
            return false;

        for (var i = 1; i < providerAndDomainSplit.length; i++) {
            if (typosDomain.includes(providerAndDomainSplit[i]))
                return false;
        }

        return true;

    }, "Email is invalid.");

    jQuery.validator.addClassRules("validate_email", {
        validate_email: true
    });

}

function get_city_province_with_postal_code(postal_code, element) {
    var form = jQuery(element).closest("form");
    var city = jQuery(form).find("#city");
    var state = jQuery(form).find("#state");
    jQuery.ajax({
        url: "http://api.geonames.org/postalCodeLookupJSON?postalcode=" + postal_code + "&country=CA&username=loanscanada",
        dataType: "jsonp",
        success: function(data) {
            console.log(data);
            if (typeof data.postalcodes !== "undefined" && data.postalcodes.length > 0) {
                if (city.length > 0) {
                    $(city).val(data.postalcodes[0]["adminName2"]);
                } else {
                    $(city).closest(".form-group").show();
                }

                if (state.length > 0) {
                    $(state).val(data.postalcodes[0]["adminCode1"]);
                } else {
                    $(state).closest(".form-group").show();
                }
            } else {
                $(city).closest(".form-group").show();
                $(state).closest(".form-group").show();
            }
        },
        fail: function() {
            $(city).closest(".form-group").show();
            $(state).closest(".form-group").show();
        }
    });
}

//Canadian phone numbers start with first digit > 2)
CMIValidationHelper.checkPhone = function(v) {
    var regex = new RegExp(/^[1].*$/);
    return regex.test(v);
}

jQuery.validator.addMethod("phone", function(value, element) {
    if (!CMIValidationHelper.checkPhone(value)) {
        return true;
    }
    return false;
}, "Invalid phone number");

jQuery.validator.addClassRules("validate-phone", {
    phone: true
});


/**
usage:
<input class="validate-postal"> or <input class="validate-phone">
**/