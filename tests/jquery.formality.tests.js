
describe('formality', function() {

  it('returns an empty object for empty forms', function() {
    var fixture = $('<form></form>');
    expect(fixture.formality()).toEqual({});
  });

});
