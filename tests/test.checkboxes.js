
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
    expect(form).toEqual({
    	foo: ['one', 'two']
    });
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
    expect(form).toEqual({
    	foo: ['one']
    });
  });

  it('returns an empty array for checkbox groups with no selections', function() {
    var fixture = $(
      '<form>' + 
        '<input type="checkbox" name="foo" value="one" />' + 
        '<input type="checkbox" name="foo" value="two" />' + 
      '</form>'
    );
    var form = fixture.formality();
    expect(form).toEqual({
    	foo: []
    });
  });
  
});

