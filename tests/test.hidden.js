
describe('hidden inputs', function() {

  it('ignores hidden inputs by default', function() {
    var fixture = $(
      '<form>' +
        '<input type="hidden" name="foo" value="one" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({});
  });
  
  it('read hidden input values if the option is turned on', function() {
    var fixture = $(
      '<form>' +
        '<input type="hidden" name="foo" value="one" />' +
      '</form>'
      );
    var form = fixture.formality({ includeHidden: true });
    expect(form).toEqual({ foo: 'one' });
  });


});
