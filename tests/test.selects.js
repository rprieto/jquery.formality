
describe('select inputs', function() {

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
    expect(form).toEqual({
    	foo: 'one'
    });  
  });

  it('relies on the browser defaulting to the first option', function() {
    var fixture = $(
      '<form>' + 
        '<select name="foo">' + 
          '<option value="one">one</option>' +
          '<option value="two">two</option>' +
        '</select>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: 'one'
    });  
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
    expect(form).toEqual({
    	foo: ['one', 'two']
    });
  });

  it('creates an empty array for multiple selects without a selection', function() {
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
    expect(form).toEqual({
        foo: []
    });
  });

});

