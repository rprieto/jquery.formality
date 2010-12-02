
describe('radio inputs', function() {

  it('reads the selected value from a dropdown list', function() {
    var fixture = $(
      '<form>' + 
        '<select name="foo">' + 
          '<option value="one" selected="selected">one</option>' +
          '<option value="two">two</option>' +
        '</select>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo).toBe('one');  
  });

  it('uses the first option is no option is selected explicitely', function() {
    var fixture = $(
      '<form>' + 
        '<select name="foo">' + 
          '<option value="one">one</option>' +
          '<option value="two">two</option>' +
        '</select>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo).toBe('one');  
  });

  it('creates an array of values for lists with multiple selections', function() {
    var fixture = $(
      '<form>' + 
        '<select name="foo" multiple="multiple">' + 
          '<option value="one" selected="selected">one</option>' +
          '<option value="two" selected="selected">two</option>' +
          '<option value="three">three</option>' +
        '</select>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo.length).toBe(2);
    expect(form.foo[0]).toBe('one');
    expect(form.foo[1]).toBe('two');
  });

  it('does not create a propery for lists without a selection', function() {
    var fixture = $(
      '<form>' + 
        '<select name="foo" multiple="multiple">' + 
          '<option value="one">one</option>' +
          '<option value="two">two</option>' +
          '<option value="three">three</option>' +
        '</select>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo).toBeUndefined();
  });

});

