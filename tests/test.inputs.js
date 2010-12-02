
describe('inputs', function() {

  it('returns an empty object when no inputs are found', function() {
    var fixture = $(
      '<form></form>'
    );
    expect(fixture.formality()).toEqual({});
  });

  it('uses the input names, or the ID if they have no name', function() {
    var fixture = $(
      '<form>' + 
        '<input name="fooName" />' + 
        '<input id="barId" />' +
        '<input name="fizzName" id="fizzId" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.fooName).toBeDefined();    
    expect(form.barId).toBeDefined();    
    expect(form.fizzName).toBeDefined();    
    expect(form.fizzId).toBeUndefined();    
  });
  
});
