$.fn.extend(
  
  (function() {
        
	//
	// Utils
	//
	
    var reduce = function(list, fn, aggregate) {
      list.forEach(function(item) {
        aggregate = fn.apply(this, [item, aggregate]);
      });
      return aggregate;
    };
    
	//
	// Structure of target inputs that mirrors the final hierarchy
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
	//  	
      
	var scaffolding = function() {
		
		var hierarchyLevel = function() {
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
	    			result.classes[name] = hierarchyLevel();
	    		}
	    		leaf = result.classes[name];
	    		return leaf;
	    	}, object);
	    	return leaf;
	    };
	    
	    var create = function($root) {	
			var $inputs = $('input,select', $root);
			
			var hierarchy = hierarchyLevel();     
			
			$inputs.each(function(_, input) {
				var attributes = getAttributes($root, $(input));
				var leaf = completeHierarchy(hierarchy, attributes);
				leaf.elements.push($(input));
			});
			
			return hierarchy;
	    };
		      
		return {
			create: create	
		};
	          		
	}; 

	//
	// Set of inputs at a given level that can return a flat javascript object
	// The whole set must be processed at once since checkboxes for example generate an array
	//
	    
    var inputSet = function() {
    		
	    var getKey = function($item) {      
	      return $item.attr('name') || $item.attr('id');
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
    	
    	var is = function(type) {
    		return function(item) {
    			return item.is(type);
    		}
    	};
    	
    	return {
    	  objectFromValues: function(inputs) {
		      var object = {};   
		      reduce(inputs.filter(is(':text')), textsAndRadios, object);
		      reduce(inputs.filter(is(':radio:checked')), textsAndRadios, object);
		      reduce(inputs.filter(is('select')), selects, object);
		      reduce(inputs.filter(is(':checkbox')), checkboxes, object);
		      return object;      
		    }
    	}
    		
    };    

	
	//
	// Final object returned by the plugin
	//
	
	var formValues = function($root) {
    	
	    var processLevel = function(level, object) {
	    	var object = inputSet().objectFromValues(level.elements);
	    	Object.keys(level.classes).forEach(function(name) {
	    		object[name] = processLevel(level.classes[name], object[name]);
	    	});
	    	return object;
	    };

    	var structure = scaffolding().create($root);	        
    	return processLevel(structure);   		
    	
	};

	//
	// Entry point:  $('#myForm').formality();
	//
	
    return {
      formality: function() { return formValues(this); }
    }
    
  })()
    
);

