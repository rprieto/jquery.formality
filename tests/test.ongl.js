
describe('ONGL names to create nested objects', function() {

  it('processes basic ONGL name hierarchies', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="country.name" value="Australia" />' +
        '<input type="text" name="country.monarch" value="Elizabeth II" />' +
	    '<input type="text" name="country.ministers.primeMinister" value="Julia Gillard" />' +
	    '<input type="text" name="country.ministers.foreignAffairs" value="Kevin Rudd" />' +
      '</form>'
    );
    
    var country = fixture.formality();
    
    expect(country).toEqual({
        country: {
            name: 'Australia',
            monarch: 'Elizabeth II',
            ministers: {
                primeMinister: 'Julia Gillard',
                foreignAffairs: 'Kevin Rudd'
            }
        }
    });
  });


  it('processes ONGL array notation to create nested arrays', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="name" value="Australia" />' +
        '<input type="text" name="cities[0].name" value="Sydney" />' +
        '<input type="text" name="cities[0].postcode" value="2000" />' +
        '<input type="text" name="cities[1].name" value="Melbourne" />' +
        '<input type="text" name="cities[1].postcode" value="3000" />' +
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

  it('processes ONGL correctly regardless of the sequence of inputs', function() {
    var fixture = $(
      '<form>' +
        '<input type="text" name="cities[0].name" value="Sydney" />' +
        '<input type="text" name="cities[1].postcode" value="3000" />' +
        '<div>' +
          '<input type="text" name="name" value="Australia" />' +
          '<input type="text" name="cities[0].postcode" value="2000" />' +
        '</div>' +
        '<input type="text" name="cities[1].name" value="Melbourne" />' +
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

