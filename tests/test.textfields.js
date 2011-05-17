
describe('text inputs', function() {

  it('creates one entry per text input', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="foo" />' + 
        '<input type="text" name="bar" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(Object.keys(form).length).toBe(2);    
  });

  it('uses the text input values as the object values', function() {
    var fixture = $(
      '<form>' + 
        '<input name="foo" value="one" />' + 
        '<input name="bar" value="two" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: 'one',
    	bar: 'two'
    });
  });
  
  it('considers text inputs with no values as empty strings', function() {
    var fixture = $(
      '<form>' + 
        '<input name="foo" />' + 
      '</form>'
    );
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: ''
    });
  });
  
});

