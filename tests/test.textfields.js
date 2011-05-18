
describe('text inputs', function() {

  it('uses the text input values as the object values', function() {
    var fixture = $(' \
      <form> \
        <input name="foo" value="one" /> \
        <input name="bar" value="two" /> \
      </form> \
    ');
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: 'one',
    	bar: 'two'
    });
  });
  
  it('considers text inputs with no values as empty strings', function() {
    var fixture = $(' \
      <form> \
        <input name="foo" /> \
      </form> \
    ');
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: ''
    });
  });
  
});

