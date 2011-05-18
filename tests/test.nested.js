
describe('nested', function() {

  it('processes the data-formality-nested attribute to create nested objects', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="name" value="Australia" />' +
        '<div data-formality-nested="government">' +
          '<input type="text" name="monarch" value="Elizabeth II" />' +
	      '<div data-formality-nested="ministers">' +
	          '<input type="text" name="primeMinister" value="Julia Gillard" />' +
	          '<input type="text" name="foreignAffairs" value="Kevin Rudd" />' +
	        '</div>' +
        '</div>' +
      '</form>'
    );
    
    var country = fixture.formality();
    
    expect(country).toEqual({
    	name: 'Australia',
    	government: {
    		monarch: 'Elizabeth II',
    		ministers: {
	    		primeMinister: 'Julia Gillard',
	    		foreignAffairs: 'Kevin Rudd'
    		}
    	}
    });
  });


  it('processes the data-formality-nested attribute with indexes to create arrays', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="name" value="Australia" />' +
        '<div data-formality-nested="cities[0]">' +
          '<input type="text" name="name" value="Sydney" />' +
          '<input type="text" name="postcode" value="2000" />' +
        '</div>' +
        '<div data-formality-nested="cities[1]">' +
          '<input type="text" name="name" value="Melbourne" />' +
          '<input type="text" name="postcode" value="3000" />' +
        '</div>' + 
      '</form>'
    );
    
    var country = fixture.formality();
    
    expect(country).toEqual({
    	name: 'Australia',
    	cities: [
    		{
    			name: 'Sydney',
    			postcode: '2000'
    		},
    		{
    			name: 'Melbourne',
    			postcode: '3000'
    		},
    	]
    });
  });


});

