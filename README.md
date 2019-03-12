# Blocks Fectcher

Fetch blocks from gist and save the files

```js
const blockfetcher = require("blockfetcher")

const gistId="https://bl.ocks.org/clemsos/009f78d9bf410295f63335419aead372".replace('https://bl.ocks.org/','')

blockfetcher.saveProject(gistId)
  .then(files => console.log(`${files.length} saved!`) )
  .catch(err =>  console.log(err.message))
```
