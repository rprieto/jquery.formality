
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
    expect(form.foo).toEqual('one');  
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
    expect(form.foo).toEqual('one');  
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
    expect(form.foo.length).toEqual(2);
    expect(form.foo[0]).toEqual('one');
    expect(form.foo[1]).toEqual('two');
  });

});
