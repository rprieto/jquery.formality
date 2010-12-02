
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

  it('returns an array even for a single checked value', function() {
    var fixture = $(
      '<form>' + 
        '<input type="checkbox" name="foo" value="one" checked="checked" />' + 
        '<input type="checkbox" name="foo" value="two" />' + 
        '<input type="checkbox" name="foo" value="three" />' + 
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo.length).toBe(1);
    expect(form.foo[0]).toBe('one');   
  });

  it('returns an empty array for checkbox groups with no selections', function() {
    var fixture = $(
      '<form>' + 
        '<input type="checkbox" name="foo" value="one" />' + 
        '<input type="checkbox" name="foo" value="two" />' + 
      '</form>'
    );
    var form = fixture.formality();
    expect(form.foo.length).toBe(0);
  });
  
});

