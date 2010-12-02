
$.fn.extend(
  
  (function() {
    
    var getKey = function($item) {      
      return $item.attr('name') || $item.attr('id')
    };
    
    var formality = function() {
      var form = {};
      var $inputs = $('input,select', this);
      
      $inputs.filter(':text').each(function(_, item) {
        form[getKey($(item))] = $(item).val();
      });
      
      $inputs.filter(':radio:checked').each(function(_, item) {
        form[getKey($(item))] = $(item).val();
      });
    
      $inputs.filter('select').each(function(index, item) {
        var values = $(item).find('option:selected').map(function(_, option) {
          return $(option).val();
        });
        form[getKey($(item))] = values.length > 1 ? values : values[0];
      });

      return form;      
    };
    
    return {
      formality: formality
    }
    
  })()
    
);
