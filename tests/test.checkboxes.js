
describe('checkboxes', function() {

  it('returns an array of checked values for a checkbox group', function() {
    var fixture = $(
      '<form>' + 
        '<input type="checkbox" name="foo" value="one" checked="checked" />' + 
        '<input type="checkbox" name="foo" value="two" checked="checked" />' + 
        '<input type="checkbox" name="foo" value="three" />' + 
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo.length).toBe(2);
    expect(form.foo[0]).toBe('one');  
    expect(form.foo[1]).toBe('two');    
  });
  
});

