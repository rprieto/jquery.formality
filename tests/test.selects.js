
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
  
});
