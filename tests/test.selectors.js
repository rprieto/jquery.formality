
describe('selectors', function() {

  it('merges all formality results when called on multiple root elements', function() {
    var fixture = $(
      '<div>' +
        '<form id="a">' +
          '<input type="checkbox" name="isChecked" checked="checked" />' +
        '</form>' +
        '<form id="b">' +
          '<input type="checkbox" name="notChecked" />' +
        '</form>' +
      '</div>'
    );
    var forms = fixture.find('#a, #b');
    var data = forms.formality();
    expect(data).toEqual({
    	isChecked: 'true',
    	notChecked: 'false'
    });
  });

  
});
