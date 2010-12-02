
$.fn.extend(
  
  (function() {
    
    var getKey = function($item) {      
      return $item.attr('name') || $item.attr('id')
    };
    
    var formality = function() {
      var form = {};
      var $inputs = $('input', this);
      
      $inputs.filter(':text').each(function(index, item) {
        form[getKey($(item))] = $(item).val();
      });
      
      $inputs.filter(':radio:checked').each(function(index, item) {        
        form[getKey($(item))] = $(item).val();
		  });
    
      return form;      
    };
    
    return {
      formality: formality
    }
    
  })()
    
);
