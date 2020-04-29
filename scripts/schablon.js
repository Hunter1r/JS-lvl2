'use strict';

let text = "Lorem 'ipsum' sit aren't ASD 'qwerty' ";

 const regexp = /'/g;
 //let newstr = text.match(regexp);
 let newstr = text.replace(regexp, '"');

 //let newnew = newstr.replace(/"t/g,"'t")
  
 console.log(text);
 console.log(newstr);
  