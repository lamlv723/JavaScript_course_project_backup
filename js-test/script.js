'use strict';

const rest = new Map();
rest.set('name', 'value1');
rest.set('catalog', ['arr1', 'arr2', 'arr3']).set('open', 11).set('close', 12);

console.log('rest');

const question = new Map([
   ['question', 'what is best language?'],
   [1, 'A'],
   [2, 'B'],
   [3, 'C'],
   ['correct', 3],
   [true, 'correct answer'],
   [false, 'wrong!'],
]);
