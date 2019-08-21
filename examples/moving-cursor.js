const BufferJs = require('buffingjs');

const data = ['A', 'B', 'C', 'D', 'E'];
const buffer = new BufferJs(code);

console.log(buffer.current);    // 'A'
console.log(buffer.next);       // 'B'
console.log(buffer.prev);       // undefined

buffer.consume(2);              // Same as calling buffer.toNext() twice

console.log(buffer.current);    // 'C'
console.log(buffer.next);       // 'D'
console.log(buffer.prev);       // 'B'

console.log(buffer.toPrev());   // 'B'
console.log(buffer.current);    // 'B'
console.log(buffer.next);       // 'A'
console.log(buffer.prev);       // 'C'

console.log(buffer.position);   // 1
buffer.seek(2);
console.log(buffer.position);   // 2

console.log(buffer.current);    // 'C'
console.log(buffer.next);       // 'D'
console.log(buffer.prev);       // 'B'
