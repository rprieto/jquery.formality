
$.fn.extend(
  
  (function() {
    
    var getKey = function($item) {      
      return $item.attr('name') || $item.attr('id')
    };
    
    var formality = function() {
      var form = {};
      var $inputs = $('input,select', this);
      
      $inputs.filter(':text').each(function(index, item) {
        form[getKey($(item))] = $(item).val();
      });
      
      $inputs.filter(':radio:checked').each(function(index, item) {
        form[getKey($(item))] = $(item).val();
      });
    
      $inputs.filter('select').each(function(index, item) {
        var value = $(item).find('option:selected:first').val();
        form[getKey($(item))] = value;
      });

      return form;      
    };
    
    return {
      formality: formality
    }
    
  })()
    
);
