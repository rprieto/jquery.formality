$.fn.extend({

  formality: function() {
    var form = {};
    var $inputs = $('input', this);
    
    $inputs.each(function(index, item) {
      var key = $(item).attr('name');
      form[key] = true;
    });
    
    return form;
  }

});
