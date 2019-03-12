# Block Fetcher

Fetch blocks from gist and save the files

```js
const blockfetcher = require("blockfetcher")

const gistId="https://bl.ocks.org/clemsos/009f78d9bf410295f63335419aead372".replace('https://bl.ocks.org/','')

blockfetcher.saveProject(gistId, "/tmp", "super-computers")
  .then(files => console.log(`${files.length} saved!`) )
  .catch(err =>  console.log(err.message))
```

### Usage

```js
saveProject(gistId, dest, folderName)
```

- `gistId` : the id from blocks or gist in the form `userId/hash`
- `dest` : destination folder (default: will save by in `./blocks`)
- `folderName` : the name of the folder where project files will be stored (default: will make a slug from the `gistId`)
