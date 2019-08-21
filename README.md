# BufferJs

An easy yet complete to use iterable data buffer in javascript

Ideal for parsing text data or tokens.

Works with any array-like data.

## Installation

Download from [CDN](https://cdn.jsdelivr.net/npm/buffingjs/dist.browser/buffer.min.js) or install from npm

`npm install --save buffingjs`

## Buffer Api

**`export`** 

**`class`** Buffer

**`template`** T

## Type parameters

▪ **T**

## Hierarchy

* **Buffer**

## Index

### Constructors

* [constructor](buffer.md#constructor)

### Accessors

* [current](buffer.md#current)
* [hasCurrent](buffer.md#hascurrent)
* [hasNext](buffer.md#hasnext)
* [hasPrev](buffer.md#hasprev)
* [length](buffer.md#length)
* [next](buffer.md#next)
* [position](buffer.md#position)
* [prev](buffer.md#prev)

### Methods

* [at](buffer.md#at)
* [consume](buffer.md#consume)
* [drop](buffer.md#drop)
* [extract](buffer.md#extract)
* [iterate](buffer.md#iterate)
* [join](buffer.md#join)
* [restore](buffer.md#restore)
* [rewind](buffer.md#rewind)
* [save](buffer.md#save)
* [seek](buffer.md#seek)
* [toArray](buffer.md#toarray)
* [toNext](buffer.md#tonext)
* [toPrev](buffer.md#toprev)
* [toString](buffer.md#tostring)

## Constructors

###  constructor

\+ **new Buffer**(`data`: ArrayLike‹T›): *[Buffer](buffer.md)*

Defined in buffer.ts:11

Creates an instance of Buffer.

**Parameters:**

Name | Type |
------ | ------ |
`data` | ArrayLike‹T› |

**Returns:** *[Buffer](buffer.md)*

## Accessors

###  current

• **get current**(): *T | undefined*

Defined in buffer.ts:38

The value at the current position

**`readonly`** 

**`type`** (T | undefined)

**Returns:** *T | undefined*

___

###  hasCurrent

• **get hasCurrent**(): *boolean*

Defined in buffer.ts:67

Verify if there is a value to read at the current position

**`readonly`** 

**Returns:** *boolean*

___

###  hasNext

• **get hasNext**(): *boolean*

Defined in buffer.ts:77

Verify if there is a value to read at the next position

**`readonly`** 

**`type`** boolean

**Returns:** *boolean*

___

###  hasPrev

• **get hasPrev**(): *boolean*

Defined in buffer.ts:87

Verify if there is a value to read at the previous position

**`readonly`** 

**`type`** boolean

**Returns:** *boolean*

___

###  length

• **get length**(): *number*

Defined in buffer.ts:28

The length of the buffer

**`readonly`** 

**`type`** number

**Returns:** *number*

___

###  next

• **get next**(): *T | undefined*

Defined in buffer.ts:48

The next value

**`readonly`** 

**`type`** (T | undefined)

**Returns:** *T | undefined*

___

###  position

• **get position**(): *number*

Defined in buffer.ts:97

The current position number

**`readonly`** 

**`type`** number

**Returns:** *number*

___

###  prev

• **get prev**(): *T | undefined*

Defined in buffer.ts:58

The previous read value

**`readonly`** 

**`type`** (T | undefined)

**Returns:** *T | undefined*

## Methods

###  at

▸ **at**(`pos`: number, `mode?`: "absolute" | "relative"): *T | undefined*

Defined in buffer.ts:223

Returns the value at position [pos]
If mode is 'relative' it is considered from the current position instead of 0
Negative values are accepted in the 'relative' mode
In the 'absolute' mode negative values will always yield undefined

**Parameters:**

Name | Type |
------ | ------ |
`pos` | number |
`mode?` | "absolute" \| "relative" |

**Returns:** *T | undefined*

___

###  consume

▸ **consume**(`count?`: undefined | number): *void*

Defined in buffer.ts:117

Consume the value at the current position and move [count] times
Negative values are accepted and move backwards instead

**Parameters:**

Name | Type |
------ | ------ |
`count?` | undefined \| number |

**Returns:** *void*

___

###  drop

▸ **drop**(): *void*

Defined in buffer.ts:155

Remove the latest saved position from the stack

**Returns:** *void*

___

###  extract

▸ **extract**(`filter`: function): *T[]*

Defined in buffer.ts:200

Iterate from the current position untill [filter] return false
or there is no data to process anymore
Return the iterated data

**Parameters:**

▪ **filter**: *function*

▸ (`next`: T, `pos`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`next` | T |
`pos` | number |

**Returns:** *T[]*

___

###  iterate

▸ **iterate**(`filter`: function): *this*

Defined in buffer.ts:183

Iterate from the current position untill [filter] return false
or there is no data to process anymore

**Parameters:**

▪ **filter**: *function*

▸ (`next`: T, `pos`: number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`next` | T |
`pos` | number |

**Returns:** *this*

___

###  join

▸ **join**(`sep`: string): *string*

Defined in buffer.ts:248

Join the data into a string using the separator [sep]

**Parameters:**

Name | Type |
------ | ------ |
`sep` | string |

**Returns:** *string*

___

###  restore

▸ **restore**(): *void*

Defined in buffer.ts:164

Restore to the latest saved position
The position is removed from the stack

**Returns:** *void*

___

###  rewind

▸ **rewind**(): *void*

Defined in buffer.ts:172

Return to the starting position of the buffer

**Returns:** *void*
___

###  save

▸ **save**(): *void*

Defined in buffer.ts:147

Save the current position for later
Saved positions are stored in stack

**Returns:** *void*

___

###  seek

▸ **seek**(`pos?`: undefined | number): *void*

Defined in buffer.ts:107

Change the current position number to [pos]
Values bigger than the buffer legth or less than 0 will be forced to stay in the range

**Parameters:**

Name | Type |
------ | ------ |
`pos?` | undefined \| number |

**Returns:** *void*

___

###  toArray

▸ **toArray**(): *T[]*

Defined in buffer.ts:229

**Returns:** *T[]*

___

###  toNext

▸ **toNext**(): *T | undefined*

Defined in buffer.ts:127

Move to the next position and then return the value

**Returns:** *T | undefined*

___

###  toPrev

▸ **toPrev**(): *T | undefined*

Defined in buffer.ts:137

Move to the previous position and then return the value

**Returns:** *T | undefined*

___

###  toString

▸ **toString**(): *string*

Defined in buffer.ts:238

Return the string representation of the data

**Returns:** *string*
