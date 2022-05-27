/*$(function(){
    var modal_frmbldr = new FormBuilder(frmbldrData);
    $(".btn-product-modal").on("touchstart click",function(e){
        e.preventDefault();
        var product = $(this).data("product");
        var parentElementID = "#modal-appform-container";
        var nextBtn = '.btn-modal-appform-next'; 
        modal_frmbldr.buildForm({
          "parentElementID" : parentElementID,
          "product" : product,
          "formAction" : "/whatever",
          "formNextButton" : nextBtn,
          "isModal" : true,
          "done" : function() {
            // disable modal closing
            if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').hide();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = false;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = 'static';
            }
            $(nextBtn).after('<h4 class="nextbtn-helper text-center">Please wait up to 5 minutes while we search for the best possible service provider. Do not leave or refresh this page. Thank you.</h4>');
            alert('AJAX ready');
            var r = $.ajax({
              type: "POST",
              url: theme_dir + "/app/supersayan.php",
              data: $(parentElementID+" form").serialize() + "&action=application&lang="+lang,
              async: false
            }).responseText;
            console.log(r);
            o = $.parseJSON(r);
            try {
              o = $.parseJSON(r);
              if (o.status=="Success") {
                if (typeof(o.redirectURL) !== 'undefined' && o.redirectURL.length > 0) {
                  window.location.href = '/redirect.php?url=' + o.redirectURL;
                } else {
                  window.location.href=ty_page_url;
                }
              } else {
                if (typeof(o.errors) !== 'undefined') {
                  alert( o.errors.join("\n") );
                } else {
                  alert( "Something went wrong" );
                }
                // enable next button once again
                $(nextBtn).button("reset");
                // enable closing modal
                $('.nextbtn-helper').remove();
                if(this.isModal) {
                    $(parentElementID).closest('.modal').find('button.close').show();
                    $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                    $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
                }
              }
            } catch(e) {
              console.log(e);
              alert('Something went wrong.');
              $(nextBtn).button("reset");
              // enable closing modal
              $('.nextbtn-helper').remove();
              if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').show();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
              }
            }
          }
        });
    });

    var dynamic_frmbldr = new FormBuilder(frmbldrData);
    $(".btn-product").on("touchstart click",function(e){
        e.preventDefault();
        var product = $(this).data("product");
        var parentElementID = "#appform-container-"+product;
        var nextBtn = '.btn-appform-next'; 
        $(nextBtn).show();
        $('.app-form-container').addClass('hide');
        $(parentElementID).removeClass('hide');
        dynamic_frmbldr.buildForm({
          "parentElementID" : parentElementID,
          "product" : product,
          "formAction" : "/whatever",
          "formNextButton" : nextBtn,
          "done" : function() {
            // disable modal closing
            if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').hide();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = false;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = 'static';
            }
            $(nextBtn).after('<h4 class="nextbtn-helper text-center">Please wait up to 5 minutes while we search for the best possible service provider. Do not leave or refresh this page. Thank you.</h4>');
            alert('AJAX ready');
            var r = $.ajax({
              type: "POST",
              url: theme_dir + "/app/supersayan.php",
              data: $(parentElementID+" form").serialize() + "&action=application&lang="+lang,
              async: false
            }).responseText;
            console.log(r);
            o = $.parseJSON(r);
            try {
              o = $.parseJSON(r);
              if (o.status=="Success") {
                if (typeof(o.redirectURL) !== 'undefined' && o.redirectURL.length > 0) {
                  window.location.href = '/redirect.php?url=' + o.redirectURL;
                } else {
                  window.location.href=ty_page_url;
                }
              } else {
                if (typeof(o.errors) !== 'undefined') {
                  alert( o.errors.join("\n") );
                } else {
                  alert( "Something went wrong" );
                }
                // enable next button once again
                $(nextBtn).button("reset");
                // enable closing modal
                $('.nextbtn-helper').remove();
                if(this.isModal) {
                    $(parentElementID).closest('.modal').find('button.close').show();
                    $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                    $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
                }
              }
            } catch(e) {
              console.log(e);
              alert('Something went wrong.');
              $(nextBtn).button("reset");
              // enable closing modal
              $('.nextbtn-helper').remove();
              if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').show();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
              }
            }
          }
        });
    });

    $("div.preloaded_app").each(function(){
        var preloaded_frmbldr = new FormBuilder(frmbldrData);
        var product = $(this).data("product");
        var parentElementID = "#"+product+"_preloaded_form-container";
        var nextBtn = ".btn-"+product+"_preloaded_form-next";
        $(nextBtn).show();
        preloaded_frmbldr.buildForm({
          "parentElementID" : parentElementID,
          "product" : product,
          "formAction" : "/whatever",
          "formNextButton" : nextBtn,
          "done" : function() {
            // disable modal closing
            if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').hide();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = false;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = 'static';
            }
            $(nextBtn).after('<h4 class="nextbtn-helper text-center">Please wait up to 5 minutes while we search for the best possible service provider. Do not leave or refresh this page. Thank you.</h4>');
            alert('AJAX ready');
            var r = $.ajax({
              type: "POST",
              url: theme_dir + "/app/supersayan.php",
              data: $(parentElementID+" form").serialize() + "&action=application&lang="+lang,
              async: false
            }).responseText;
            console.log(r);
            o = $.parseJSON(r);
            try {
              o = $.parseJSON(r);
              if (o.status=="Success") {
                if (typeof(o.redirectURL) !== 'undefined' && o.redirectURL.length > 0) {
                  window.location.href = '/redirect.php?url=' + o.redirectURL;
                } else {
                  window.location.href=ty_page_url;
                }
              } else {
                if (typeof(o.errors) !== 'undefined') {
                  alert( o.errors.join("\n") );
                } else {
                  alert( "Something went wrong" );
                }
                // enable next button once again
                $(nextBtn).button("reset");
                // enable closing modal
                $('.nextbtn-helper').remove();
                if(this.isModal) {
                    $(parentElementID).closest('.modal').find('button.close').show();
                    $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                    $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
                }
              }
            } catch(e) {
              console.log(e);
              alert('Something went wrong.');
              $(nextBtn).button("reset");
              // enable closing modal
              $('.nextbtn-helper').remove();
              if(this.isModal) {
                $(parentElementID).closest('.modal').find('button.close').show();
                $(parentElementID).closest('.modal').data('bs.modal').options.keyboard = true;
                $(parentElementID).closest('.modal').data('bs.modal').options.backdrop = true;
              }
            }
          }
        });
    });
});

*/