$.fn.extend(
  
  (function() {
        
	//
	// ECMA Script 5 functions implemented by Chrome and Firefox 4, but not older browsers
	//
	
    var reduce = function(list, fn, aggregate) {
      list.forEach(function(item) {
        aggregate = fn.apply(this, [item, aggregate]);
      });
      return aggregate;
    };
    
	var getKeys = function(obj){
		var keys = [];
		for(var key in obj){
			keys.push(key);
		}
		return keys;
	}

    //
    // Helper methods
    //

    var getFormalityAttribute = function($item) {
      return $item.attr('name') || $item.attr('id');
    };

    //
    // ONGL module: process an input's attributes and parent contexts
    //              to get the full path in the target object
    //

    var ONGL = function() {

	    var getParentContext = function($root, $input) {
	    	var $usefulParents = $input.parents('*[data-formality-context]');
	    	return $usefulParents.map(function(_, parent) {
	    		return $(parent).attr('data-formality-context');
	    	}).get().reverse();
	    };

        var getInputPath = function($input) {
            var path = getFormalityAttribute($input).split('.');
            path.pop();
            return path;
        };

        var getFullPath = function($root, $input) {
            var context = getParentContext($root, $input);
            var path = getInputPath($input);
            return context.concat(path);
        };

        return {
            getFullPath: getFullPath
        }

    };

	//
	// Structure of target inputs that mirrors the final hierarchy
	//
	//    elements: [
	//      $input1,
	//      $input2
	//    ],
	//
	//    children: {
	//      myChild:    { elements, children },
	//      myArray[0]: { elements, children }
	//      myArray[1]: { elements, children }
	//    },
	//  	
      
	var scaffolding = function() {
		
		var hierarchyLevel = function() {
			return {
				elements: [],
				children: {}
			};
		};

	    var completeHierarchy = function(object, targetPath) {
	    	var leaf = object;
	    	reduce(targetPath, function(name, result) {
	    		if (!(result.children[name])) {
	    			result.children[name] = hierarchyLevel();
	    		}
	    		leaf = result.children[name];
	    		return leaf;
	    	}, object);
	    	return leaf;
	    };
	    
	    var create = function($root) {	
			var $inputs = $('input,select', $root);
			
			var hierarchy = hierarchyLevel();     
			
			$inputs.each(function(_, input) {
				var fullPath = ONGL().getFullPath($root, $(input));
				var leaf = completeHierarchy(hierarchy, fullPath);
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
	      return getFormalityAttribute($item).split('.').pop();
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
	    	getKeys(level.children).forEach(function(name) {
	    		var arrayMatch = name.match(/(.*?)\[(\d)\]/);
	    		if (arrayMatch) {
		   			var arrayName = arrayMatch[1];
	    			var index = arrayMatch[2];
	    			if (!(object[arrayName])) {
	    				object[arrayName] = [];
	    			}
	    			object[arrayName][index] = processLevel(level.children[name], object[arrayName][index]);
	    		} else {
	    			object[name] = processLevel(level.children[name], object[name]);
	    		}
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

