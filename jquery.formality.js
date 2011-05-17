$.fn.extend(
  
  (function() {
    
	
    var reduce = function(list, fn, aggregate) {
      list.forEach(function(item) {
        aggregate = fn.apply(this, [item, aggregate]);
      });
      return aggregate;
    };
    
        
    var inputSet = function(inputs) {
    		
	    var getKey = function($item) {      
	      return $item.attr('name') || $item.attr('id')
	    };
		
	    var textsAndRadios = function($item, form) {
	      form[getKey($item)] = $item.val();
	      return form;
	    }
	
	    var selects = function($item, form) {
	      var values = $item.find('option:selected').map(function(_, option) {
	        return $(option).val();
	      }).get();
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
    	
    	return {
    	  createObject: function() {
		      var object = {};   
		      reduce(inputs.filter(function(item) { return item.is(':text') }), textsAndRadios, object);
		      reduce(inputs.filter(function(item) { return item.is(':radio:checked') }), textsAndRadios, object);
		      reduce(inputs.filter(function(item) { return item.is('select') }), selects, object);
		      reduce(inputs.filter(function(item) { return item.is(':checkbox') }), checkboxes, object);
		      return object;      
		    }
    	}
    		
    };    
  
	  
	var defaultObject = function() {
		return {
			elements: [],
			classes: {},
			arrays: {}
		};
	};
		
    var getAttributes = function($root, $input) {
    	var $usefulParents = $input.parents('*[data-formality-class]');
    	return $usefulParents.map(function(_, parent) {
    		return $(parent).attr('data-formality-class');
    	}).get().reverse();
    };
    
    var completeHierarchy = function(object, classes) {
    	var leaf = object;
    	reduce(classes, function(name, result) {
    		if (!(result.classes[name])) {
    			result.classes[name] = defaultObject();
    		}
    		leaf = result.classes[name];
    		return leaf;
    	}, object);
    	return leaf;
    };
    
    var processLevel = function(level, object) {
    	var object = inputSet(level.elements).createObject();
    	Object.keys(level.classes).forEach(function(name) {
    		object[name] = processLevel(level.classes[name], object[name]);
    	});
    	return object;
    };
    
    var formality = function() {
      var $root = this;	
      var $inputs = $('input,select', $root);
 
      var hierarchy = defaultObject();     
      
      $inputs.each(function(_, input) {
      	 var attributes = getAttributes($root, $(input));
		 var leaf = completeHierarchy(hierarchy, attributes);
		 leaf.elements.push($(input));
      });
      

      return processLevel(hierarchy);
      
      // for each input
      //   traverse parents and get data-attributes
      //     data-formality-class
      //     data-formality-array
            
      //  build the final structure, with at each level
      // 
      //    elements: [
      //      $input1, $input2
      //    ],
      //
      //    classes: [
      //      class1: { elements, classes, arrays },
      //      class2: { elements, classes, arrays }
      //    ],
      //
      //    arrays: [
      //      array1: [
      //        { elements, classes, arrays },
      //        { elements, classes, arrays }
      //      ],
      //      array2: [
      //        { elements, classes, arrays },
      //        { elements, classes, arrays }
      //      ]
      //    ]      
     
    };
    
    return {
      formality: formality
    }
    
  })()
    
);

