
describe('performance', function() {

  function getExecutionTime(code) {
	var start = new Date().getTime();
	code();	
	var end = new Date().getTime();
	return end - start;
  }

  it('should process a big form in a reasonable time', function() {
  	
    var fixture = $(
        '<div id="countries">' +
          '<div class="country" data-formality-context="countries[0]">' +
	        '<input type="text" name="name" value="Australia" />' +
	        '<div data-formality-context="government">' +
   	    	  '<div>' + 
	            '<input type="checkbox" name="type" value="Parliamentary" checked="checked" />' + 
	            '<input type="checkbox" name="type" value="Constitutional" checked="checked" />' + 
	            '<input type="checkbox" name="type" value="Republic" />' + 
	            '<input type="checkbox" name="type" value="Monarchy" checked="checked" />' + 
	          '</div>'	+        
	          '<input type="text" name="monarch" value="Elizabeth II" />' +
		      '<div data-formality-context="ministers">' +
		        '<input type="text" name="primeMinister" value="Julia Gillard" />' +
		        '<input type="text" name="foreignAffairs" value="Kevin Rudd" />' +
		      '</div>' +
	        '</div>' +
	        '<div data-formality-context="cities[0]">' +
	          '<input type="text" name="name" value="Sydney" />' +
	          '<input type="text" name="postcode" value="2000" />' +
	          '<form>' +
          	    '<input type="radio" name="visited" value="true" checked="checked" />' +
        	    '<input type="radio" name="visited" value="false" />' +
        	  '</form>' +
	        '</div>' +
	        '<div data-formality-context="cities[1]">' +
	          '<input type="text" name="name" value="Melbourne" />' +
	          '<input type="text" name="postcode" value="3000" />' +
	          '<form>' +
          	    '<input type="radio" name="visited" value="true" checked="checked" />' +
        	    '<input type="radio" name="visited" value="false" />' +
        	  '</form>' +
	        '</div>' +
	      '</div>' +
          '<div class="country" data-formality-context="countries[1]">' +
	        '<input type="text" name="name" value="France" />' +
	        '<div data-formality-context="government">' +
   	    	  '<div>' + 
	            '<input type="checkbox" name="type" value="Parliamentary" />' + 
	            '<input type="checkbox" name="type" value="Constitutional" checked="checked" />' + 
	            '<input type="checkbox" name="type" value="Republic" checked="checked" />' + 
	            '<input type="checkbox" name="type" value="Monarchy" />' + 
	          '</div>'	+        
	          '<input type="text" name="president" value="Nicolas Sarkozy" />' +
  	          '<input type="text" name="ministers.primeMinister" value="Francois Fillon" />' +
	        '</div>' +
	        '<input type="text" name="cities[0].name" value="Paris" />' +
	        '<input type="text" name="cities[0].postcode" value="75001" />' +
	        '<form>' +
          	  '<input type="radio" name="cities[0].visited" value="true" checked="checked" />' +
        	  '<input type="radio" name="cities[0].visited" value="false" />' +
        	'</form>' +
	        '<input type="text" name="cities[1].name" value="Lyon" />' +
	        '<input type="text" name="cities[1].postcode" value="69001" />' +
	        '<form>' +
          	  '<input type="radio" name="cities[1].visited" value="true" />' +
        	  '<input type="radio" name="cities[1].visited" value="false"  checked="checked" />' +
        	'</form>' +
	      '</div>' +
	  	'</div>'
    );
    
    var world;
    
    var timeInMilliseconds = getExecutionTime(function() {
    	world = fixture.formality();
    });
    
    expect(timeInMilliseconds).toBeLessThan(20);
    
    expect(world).toEqual({
    	countries: [
    		{
		    	name: 'Australia',
		    	government: {
		    		type: [	'Parliamentary', 'Constitutional', 'Monarchy' ],
		    		monarch: 'Elizabeth II',
		    		ministers: {
			    		primeMinister: 'Julia Gillard',
			    		foreignAffairs: 'Kevin Rudd'
		    		}
		    	},
		    	cities: [
		    		{
		    			name: 'Sydney',
		    			postcode: '2000',
		    			visited: 'true'
		    		},
		    		{
		    			name: 'Melbourne',
		    			postcode: '3000',
		    			visited: 'true'
		    		},
		    	]
    		},
    		{
		    	name: 'France',
		    	government: {
		    		type: [	'Constitutional', 'Republic' ],		    		
		    		president: 'Nicolas Sarkozy',
		    		ministers: {
			    		primeMinister: 'Francois Fillon'
		    		}
		    	},
		    	cities: [
		    		{
		    			name: 'Paris',
		    			postcode: '75001',
		    			visited: 'true'		    			
		    		},
		    		{
		    			name: 'Lyon',
		    			postcode: '69001',
		    			visited: 'false'		    			
		    		},
		    	]
    		}
    	]
    });
  });

});

