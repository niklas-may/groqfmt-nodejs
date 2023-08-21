# groqfmt-nodejs

A Node.js wrapper for [Sanity´s Go implementation](https://github.com/sanity-io/groqfmt).

## Usage

```JavaScript
import formatGroq from 'groqfmt-nodejs'

try {
    return await formatGroq(groqQueryString)
} catch(e) {
    return e
}
```
