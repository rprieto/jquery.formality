
describe('html5 inputs', function() {

  it('can read an email field', function() {
    var fixture = $(
      '<form>' +
        '<input type="email" name="foo" value="bob@test.com" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: 'bob@test.com' });
  });

  it('can read a URL field', function() {
    var fixture = $(
      '<form>' +
        '<input type="url" name="foo" value="http://www.google.com/foobar" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: 'http://www.google.com/foobar' });
  });

  it('can read a telephone field', function() {
    var fixture = $(
      '<form>' +
        '<input type="tel" name="foo" value="0123456789" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: '0123456789' });
  });

  it('can read a numeric field', function() {
    var fixture = $(
      '<form>' +
        '<input type="number" name="foo" value="123" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: '123' });
  });

  it('can read a range field', function() {
    var fixture = $(
      '<form>' +
        '<input type="range" name="foo" value="20" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: '20' });
  });
  
  it('can read a date field', function() {
    var fixture = $(
      '<form>' +
        '<input type="date" name="foo" value="30/12/2010" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: '30/12/2010' });
  });  
  
  it('can read a datetime field', function() {
    var fixture = $(
      '<form>' +
        '<input type="datetime" name="foo" value="30/12/2010 09:28pm" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: '30/12/2010 09:28pm' });
  });  

  it('can read a search field', function() {
    var fixture = $(
      '<form>' +
        '<input type="search" name="foo" value="keyword" />' +
      '</form>'
      );
    var form = fixture.formality();
    expect(form).toEqual({ foo: 'keyword' });
  });  
    
});

