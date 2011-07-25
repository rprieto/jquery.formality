
describe('text inputs', function() {


  it('uses the text input values as the object values', function() {
    var fixture = $(
      '<form>' +
        '<input type="text" name="foo" value="one" />' +
        '<input type="text" name="bar" value="two" />' +
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
        '<input type="text" name="foo" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: ''
    });
  });

  it('can handle text fields with quotes and double quotes in the value', function() {
    var fixture = $(
      '<form>' +
        '<input type="text" name="foo" />' +
      '</form>'
      );
    fixture.find('input').val('\'Hello\' \"bob\"');
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: '\'Hello\' \"bob\"'
    });
  });

});

