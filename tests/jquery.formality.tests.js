
describe('formality', function() {

  it('returns an empty object for empty forms', function() {
    var fixture = $(
      '<form></form>'
    );
    expect(fixture.formality()).toEqual({});
  });

  it('creates one entry per input', function() {
    var fixture = $(
      '<form>' + 
        '<input name="foo" />' + 
        '<input name="bar" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(Object.keys(form).length).toEqual(2);    
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
  
  it('uses the input values as the object values', function() {
    var fixture = $(
      '<form>' + 
        '<input name="foo" value="one" />' + 
        '<input name="bar" value="two" />' +
      '</form>'
    );
    expect(fixture.formality().foo).toEqual('one');
    expect(fixture.formality().bar).toEqual('two');
  });
  
});
