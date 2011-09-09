$.fn.extend(
  
    (function() {
        
	//
	// ECMA Script 5 and other functional methods
	// Some of these are implemented by Chrome and Firefox 4, but not older browsers
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

    var groupBy = function(array, getKeyFromItem) {
        var groups = {};
        array.forEach(function(item) {
            var key = getKeyFromItem(item);
            var value = groups[key];
            if (!value) value = groups[key] = [];
            value.push(item);
        });
        return groups;
    };

    var splitBuckets = function(array, splitOn) {
        var groups = groupBy(array, splitOn);
        return reduce(getKeys(groups), function(key, result) {
            result.push(groups[key]);
            return result;
        }, []);
    };

    //
    // Input attributes used to get the target object path
    //

    var getFormalityAttribute = function($item) {
        return $item.attr('name') || $item.attr('id');
    };

    //
    // OGNL module: process an input's attributes and parent contexts
    //              to get the full path in the target object
    //

    var OGNL = function() {

	    var getParentContext = function($root, $input) {
	    	var usefulParents = $input.parents('*[data-formality-context]').get();
	    	return reduce(usefulParents, function(parent, result) {
	    		var contextElements = $(parent).attr('data-formality-context').split('.').reverse();
				return result.concat(contextElements);
	    	}, []).reverse();
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

        var createNode = function(targetObject, pathItem, itemValue) {
            var arrayMatch = pathItem.match(/(.*?)\[(\d)\]/);
	    	if (arrayMatch) {
		   		var arrayName = arrayMatch[1];
	    		var index = arrayMatch[2];
	    		if (!(targetObject[arrayName])) {
	    			targetObject[arrayName] = [];
	    		}
	    		targetObject[arrayName][index] = itemValue(targetObject[arrayName][index]);
	    	} else {
	    		targetObject[pathItem] = itemValue(targetObject[pathItem]);
	    	}
        };

        return {
            getFullPath: getFullPath,
            createNode: createNode
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
			var ognl = OGNL();

			$inputs.each(function(_, input) {
				var fullPath = ognl.getFullPath($root, $(input));
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
            var isMultiple = $item.attr('multiple') === 'multiple' || $item.attr('multiple') === true;
            form[getKey($item)] = isMultiple ? (values || []) : values[0];
            return form;
	    };
	
	    var checkboxes = function(group, form) {
            var key = getKey(group[0]);
            if (group.length == 1) {
                form[key] = group[0].is(':checked') ? 'true' : 'false';
            } else {
                form[key] = reduce(group, function($item, checkedValues) {
                    if ($item.is(':checked')) {
                        checkedValues.push($item.val());
                    }
                    return checkedValues;
                }, []);
            }
            return form;
	    };
    	
    	var ofType = function(type) {
    		return function($input) {
    			return $input.attr('type') === type;
    		}
    	};

		var ofTag = function(tag) {
			return function($input) {
				return $input.get(0).nodeName.toLowerCase() === tag;
			};
		};
    	    	
    	return {
            objectFromValues: function(inputs, includeHidden) {
                var object = {};

				var textTypes = ['text', 'email', 'url', 'tel', 'number', 'range', 'date', 'datetime', 'search'];
				if (includeHidden === true) {
					textTypes.push('hidden');
				}
				
		    	var reduceTextFields = function(type) {
					reduce(inputs.filter(ofType(type)), textsAndRadios, object);
		    	};
    			textTypes.forEach(reduceTextFields);

				reduce(inputs.filter(function($input) { return $input.attr('type') === 'radio' && $input.is(':checked'); }), textsAndRadios, object);
				
				reduce(inputs.filter(ofTag('select')), selects, object);

                // Group checkboxes by name to identify single vs. groups
				var allCheckboxes = inputs.filter(ofType('checkbox'));
                reduce(splitBuckets(allCheckboxes, getKey), checkboxes, object);

                return object;
		    }
    	};
    		
    };    


	//
	// Final object returned by the plugin
	//
	
	var formValues = function($root, options) {

    	var ognl = OGNL();
    	
	    var processLevel = function(level, object) {
	    	var object = inputSet().objectFromValues(level.elements, options.includeHidden);
	    	getKeys(level.children).forEach(function(name) {
	    	    var target = ognl.createNode(object, name, function(leaf) {
	    	        return processLevel(level.children[name], leaf);
	    	    });
	    	});
	    	return object;
	    };

    	var structure = scaffolding().create($root);	        
    	return processLevel(structure);   		
    	
	};

	//
	// Default plugin options
	//
	
	var defaultOptions = {
		includeHidden: false
	};

	//
	// Entry point:  $('#myForm').formality();
	//
	
    return {
        formality: function(options) {
        	return formValues(this, options || defaultOptions);
        }
    }
    
  })()
    
);

