
describe('checkboxes', function() {

  it('returns true/false for single checkboxes', function() {
    var fixture = $(
      '<form>' +
        '<input type="checkbox" name="isChecked" checked="checked" />' +
        '<input type="checkbox" name="notChecked" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form).toEqual({
    	isChecked: 'true',
    	notChecked: 'false'
    });
  });

  it('returns an array of checked values for checkbox groups', function() {
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

  it('returns an array even for a group with a single checked value', function() {
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

