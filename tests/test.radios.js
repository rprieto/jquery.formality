
describe('radio inputs', function() {

  it('creates one property per radio group', function() {
    var fixture = $(
      '<form>' + 
        '<input type="radio" name="foo" />' + 
        '<input type="radio" name="foo" checked="checked" />' +
        '<input type="radio" name="bar" checked="checked" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(Object.keys(form).length).toEqual(2);  
  });

  it('uses the value of the checked radio button', function() {
    var fixture = $(
      '<form>' + 
        '<input type="radio" name="foo" value="one" checked="checked" />' + 
        '<input type="radio" name="foo" value="two" />' +        
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo).toEqual('one');  
  });
  
});
