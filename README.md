# Block Fetcher

[![npm version](https://badge.fury.io/js/blockfetcher.svg)](https://badge.fury.io/js/blockfetcher)

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

Returns a js [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

### CLI

A command-line tool is also available.

```sh
./node_modules/bin/blockfetcher https://bl.ocks.org/clemsos/009f78d9bf410295f63335419aead372 -d /tmp -n lala
```

Help command

```sh

$ blocksfetcher -h

Usage: blocksfetcher [url] [options]

  url                 bl.ocks.org URL (required)
  --dest,-d           Destination folder (default: ./blocks)
  --name,-n           Name of the folder (default: gist hash)
  --version,-v        Print out the installed version
  --help              Show this help
```
