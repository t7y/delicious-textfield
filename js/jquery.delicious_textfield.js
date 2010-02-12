if (typeof jQuery == 'undefined') throw("jQuery could not be found.");

(function($){

  $.fn.delicious_textfield = function(settings){
    var links = settings.option_links;
    var text_field = $(this);
    
    initialize();
    
    function initialize(){
      $.each($("a.tag", links), function(){
        $(this).click(tag_entry);
      });
      update_tags_list();
    };

    function tag_entry(){
      var current_val = text_field.val();
      var selected = $(this).text();
      var array = $.map(current_val.split(", "), function(a){
        return $.trim(a);
      });

      var index = $.inArray(selected, array);
      if(index == -1){
        array.push(selected);
      }
      else{
        array = $.grep(array, function(a){
          return a != selected;
        });
      }
      array = $.grep(array, function(a){
        return a != "";
      });
      text_field.val($.unique(array).join(", "));
      update_tags_list();
      return false;
    }

    function update_tags_list(){
      var input_val = text_field.val();
      $.each($("a.tag", links), function(){
        var index = input_val.indexOf($(this).text());
        if(index == -1){
          $(this).removeClass("selected");
        }
        else{
          $(this).addClass("selected");
        }
      });
      return false;
    }
    
    return false;
  };
  
})(jQuery);