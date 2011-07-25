
describe('inputs', function() {

  it('uses the input names, or the ID if they have no name', function() {
    var fixture = $(
      '<form>' + 
        '<input type="text" name="fooName" />' + 
        '<input type="text" id="barId" />' +
        '<input type="text" name="fizzName" id="fizzId" />' +
      '</form>'
    );
    var form = fixture.formality();
    expect(form.fooName).toBeDefined();    
    expect(form.barId).toBeDefined();    
    expect(form.fizzName).toBeDefined();    
    expect(form.fizzId).toBeUndefined();    
  });

});
