
describe('integration', function() {

  it('returns an empty object when no inputs are found', function() {
    var fixture = $(
      '<form></form>'
    );
    expect(fixture.formality()).toEqual({});
  });

  it('processes a whole form an returns a complete object representation', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="myText" value="bar" />' +
        '<input type="radio" name="myRadio" value="one" checked="checked" />' +
        '<input type="radio" name="myRadio" value="two" />' +
        '<select name="mySelect" multiple="multiple">' +
          '<option value="three" selected="selected">Three</option>' +
          '<option value="four" selected="selected">Four</option>' +
          '<option value="five">Five</option>' +
        '</select>' +
        '<input type="checkbox" name="myCheck" value="six" checked="checked">Six</input>' +
        '<input type="checkbox" name="myCheck" value="seven" checked="checked">Seven</input>' +
        '<input type="checkbox" name="myCheck" value="eight">Eight</input>' +
      '</form>'
    );
    var form = fixture.formality();
    expect(Object.keys(form).length).toBe(4);
    expect(form.myText).toBe('bar');
    expect(form.myRadio).toBe('one');
    expect(form.mySelect.length).toBe(2);
    expect(form.mySelect[0]).toBe('three');
    expect(form.mySelect[1]).toBe('four');
    expect(form.myCheck.length).toBe(2);
    expect(form.myCheck[0]).toBe('six');
    expect(form.myCheck[1]).toBe('seven');
  });

it('only processes the DOM from where it is called', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="foo" value="one" />' +
        '<div id="content">' +
          '<input type="text" name="bar" value="two" />' +
          '<input type="text" name="fizz" value="three" />' +
        '</div>' +
        '<input type="text" name="buzz" value="four" />' +
      '</form>'
    );
    var form = fixture.find('#content').formality();
    expect(Object.keys(form).length).toBe(2);
    expect(form.bar).toBe('two');
    expect(form.fizz).toBe('three');
  });
  
});

