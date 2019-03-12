# Block Fetcher

Fetch blocks from gist and save the files

```js
const blockfetcher = require("blockfetcher")

const gistId="https://bl.ocks.org/clemsos/009f78d9bf410295f63335419aead372".replace('https://bl.ocks.org/','')

blockfetcher.saveProject(gistId, "/tmp")
  .then(files => console.log(`${files.length} saved!`) )
  .catch(err =>  console.log(err.message))
```

You can specify a `dest` destination folder in `saveProject(gistId, dest)` but will save by default in `./blocks`.
