'use strict';

let text = "Lorem 'ipsum' sit aren't ASD 'qwerty' ";

const regexp = /'/g;
let newstr = text.replace(regexp, '"');
let result = newstr.replace(/"t/g, "'t")

console.log(text);
console.log(result);
