# nounicode

A JavaScript/TypeScript utility to detect and enforce ASCII-only text. Choose between modern (0–255), extended (128–255), or standard (0–127) ASCII checks.

---

## Installation

```bash
npm install nounicode
```

---

## Usage

Import the default function or named helpers:

```ts
import isNoUnicode, {
  isModernASCII,
  isExtendedASCII,
  isStandardASCII,
  ASCIIType
} from 'nounicode';
```


## API Reference

### isNoUnicode(data: string, type: ASCIIType = 'MODERN'): boolean

Validate that every character in a string falls within one of three ASCII ranges.

#### Parameters

- `data`  
  The input string to validate.

- `type`  
  One of the following modes (defaults to `MODERN`):  
  - `MODERN` Checks code points < 256  
  - `EXTENDED` Checks code points > 127 and < 256  
  - `STANDARD` Checks code points < 128

#### Returns

- `true` if **all** characters satisfy the chosen ASCII range.  
- `false` as soon as a character falls outside the specified range.

#### Notes

- Uses `String.prototype.codePointAt` to handle all Unicode code points.  
- Iterates through _code units_, so astral characters (code points > 0xFFFF) are split into two iterations.

#### Examples

```ts
isNoUnicode('Hello, World!');            // true (all < 256)
isNoUnicode('Résumé', 'STANDARD');       // false ('é' is 233)
isNoUnicode('Résumé', 'EXTENDED');       // true  (233 > 127 && 233 < 256)
isNoUnicode('😊', 'MODERN');             // false (128522 ≥ 256)
```

---

### isModernASCII(cc: number): boolean

Check if a Unicode code point is within 0–255.

#### Parameters

- `cc`  
  A Unicode code point (e.g., returned by `str.codePointAt(idx)`).

#### Returns

- `true` if `0 ≤ cc < 256`  
- `false` otherwise

#### Example

```ts
isModernASCII(200);  // true
isModernASCII(300);  // false
```

---

### isExtendedASCII(cc: number): boolean

Check if a Unicode code point is within the extended ASCII range 128–255.

#### Parameters

- `cc`  
  A Unicode code point to test.

#### Returns

- `true` if `128 < cc < 256`  
- `false` otherwise

#### Example

```ts
isExtendedASCII(129);  // true
isExtendedASCII(127);  // false
```

---

### isStandardASCII(cc: number): boolean

Check if a Unicode code point is within the standard ASCII range 0–127.

#### Parameters

- `cc`  
  A Unicode code point to test.

#### Returns

- `true` if `0 ≤ cc < 128`  
- `false` otherwise

#### Example

```ts
isStandardASCII(65);   // true ('A')
isStandardASCII(128);  // false
```

---

### Types

```ts
export type ASCIIType = 'MODERN' | 'EXTENDED' | 'STANDARD';
```

- `MODERN` All byte values (0–255)  
- `EXTENDED` Upper half of byte range (128–255)  
- `STANDARD` Classic ASCII (0–127)  

---

### Performance

Validates a string in O(n) time, where n is the number of UTF-16 code units. Early exits on the first invalid character.

## Examples

```ts
isNoUnicode('Hello World!');       // true
isNoUnicode('Café');               // false (contains 'é')
isNoUnicode('Café', 'EXTENDED');   // true
```
