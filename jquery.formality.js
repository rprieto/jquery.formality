
$.fn.extend(
  
  (function() {
    
    var getKey = function($item) {      
      return $item.attr('name') || $item.attr('id')
    };

    var reduce = function($inputs, fn, aggregate) {
      $inputs.each(function(_, item) {
        aggregate = fn.apply(this, [$(item), aggregate]);
      });
      return aggregate;
    };

    var textsAndRadios = function($item, form) {
      form[getKey($item)] = $item.val();
      return form;
    }

    var selects = function($item, form) {
      var values = $item.find('option:selected').map(function(_, option) {
        return $(option).val();
      });
      form[getKey($item)] = values.length > 1 ? values : values[0];
      return form;
    };

    var checkboxes = function($item, form) {
      var name = getKey($item);
      if (!(name in form)) {
        form[name] = [];
      }
      if ($item.is(':checked')) {
        form[name].push($item.val());
      }
      return form;
    };

    var formality = function() {
      var form = {};
      var $inputs = $('input,select', this);      
      reduce($inputs.filter(':text,:radio:checked'), textsAndRadios, form);
      reduce($inputs.filter('select'), selects, form);
      reduce($inputs.filter(':checkbox'), checkboxes, form);
      return form;      
    };
    
    return {
      formality: formality
    }
    
  })()
    
);

