# Blocks Fectcher

Fetch blocks from gist and save the files

```js
const blockfetcher = require("blockfetcher")

const gistId = "WebTrackingCartography/f2bca61a0780f47dca5f618700d76065";

blockfetcher.saveProject(gistId)
  .then(files => console.log(`${files.length} saved!`) )
  .catch(err =>  console.log(err.message))

```
