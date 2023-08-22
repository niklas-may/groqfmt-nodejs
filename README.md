# groqfmt-nodejs

A Node.js wrapper for [Sanity´s Go implementation](https://github.com/sanity-io/groqfmt).

## Usage

```JavaScript
import { format } from 'groqfmt-nodejs'


const query = `
      *[_type == 'page'] {
            mainSection {
          pageTitle,
          
    gallery[] {}
    `

try {
    const queryFormatted = await format(query);
    // ...
} catch(e) {
    // ...
}
```
