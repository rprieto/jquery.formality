
describe('nested', function() {

  it('should process a big form in a reasonable time', function() {
    var fixture = $(
      '<form>' + 
        '<div id="countries">' +
          '<div class="country" data-formality-nested="countries[0]">' +
	        '<input type="text" name="name" value="Australia" />' +
	        '<div data-formality-nested="government">' +
	          '<input type="text" name="monarch" value="Elizabeth II" />' +
		      '<div data-formality-nested="ministers">' +
		          '<input type="text" name="primeMinister" value="Julia Gillard" />' +
		          '<input type="text" name="foreignAffairs" value="Kevin Rudd" />' +
		        '</div>' +
	        '</div>' +
	        '<div data-formality-nested="cities[0]">' +
	          '<input type="text" name="name" value="Sydney" />' +
	          '<input type="text" name="postcode" value="2000" />' +
	        '</div>' +
	        '<div data-formality-nested="cities[1]">' +
	          '<input type="text" name="name" value="Melbourne" />' +
	          '<input type="text" name="postcode" value="3000" />' +
	        '</div>' +
	      '</div>' +
          '<div class="country" data-formality-nested="countries[0]">' +
	        '<input type="text" name="name" value="France" />' +
	        '<div data-formality-nested="government">' +
	          '<input type="text" name="president" value="Nicolas Sarkozy" />' +
		      '<div data-formality-nested="ministers">' +
		          '<input type="text" name="primeMinister" value="François Fillon" />' +
		        '</div>' +
	        '</div>' +
	        '<div data-formality-nested="cities[0]">' +
	          '<input type="text" name="name" value="Paris" />' +
	          '<input type="text" name="postcode" value="75001" />' +
	        '</div>' +
	        '<div data-formality-nested="cities[1]">' +
	          '<input type="text" name="name" value="Lyon" />' +
	          '<input type="text" name="postcode" value="69001" />' +
	        '</div>' +
	      '</div>' +
	  	'</div>'         
      '</form>'
    );
    
    var world = fixture.formality();
    
    expect(world).toEqual({
    	countries: [
    		{
		    	name: 'Australia',
		    	government: {
		    		monarch: 'Elizabeth II',
		    		ministers: {
			    		primeMinister: 'Julia Gillard',
			    		foreignAffairs: 'Kevin Rudd'
		    		}
		    	}
    		},
    		{
		    	name: 'France',
		    	government: {
		    		president: 'Nicolas Sarkozy',
		    		ministers: {
			    		primeMinister: 'Fancois Fillon'
		    		}
		    	}
    		}
    	]
    });
  });

});

