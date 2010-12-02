
describe('formality', function() {

  it('returns an empty object for empty forms', function() {
    var fixture = $('<form></form>');
    expect(fixture.formality()).toEqual({});
  });

  it('uses input names as properties in the returned object', function() {
    var fixture = $(
      '<form>' + 
        '<input name="foo" />' + 
        '<input name="bar" />' +
        '</form>'
    );
    expect(fixture.formality().foo).toBeDefined();
    expect(fixture.formality().bar).toBeDefined();
  });
  
});
