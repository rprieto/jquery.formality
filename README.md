# jQuery formality

*Formality* is a jQuery plugin that can process any part of the DOM and return an object representation of the inputs.
It supports all types of inputs and complex forms, with ONGL syntax for object nesting.

## Simple example

Given the following DOM structure:

```html
<form id="data">
  <input type="text" name="firstName" value="John" />
  <input type="text" name="lastName" value="Doe" />
  <input type="radio" name="gender" value="male" checked="checked" />
  <input type="radio" name="gender" value="female" />
  <select name="interests" multiple="multiple">
    <option value="reading" selected="selected">Likes reading</option>
    <option value="travelling">Likes travelling</option>
    <option value="music" selected="selected">Plays music</option>
  </select>
  <input type="checkbox" name="likesPets" checked="checked">Likes pets</input>
  <input type="checkbox" name="pets" value="dog" checked="checked">Has a dog</input>
  <input type="checkbox" name="pets" value="cat">Has a cat</input>
</form>
```

If you call

```js
$('#data').formality()
```


It will return the following object:

```js
{
  firstName: 'John',
  lastName: 'Doe',
  gender: 'male',
  interests: ['reading', 'music'],
  likesPets: 'true',
  pets: ['dog']
}
```

[Head over to the wiki](https://github.com/rprieto/jquery.formality/wiki) to see how to use *Formality* and learn more about the options.

