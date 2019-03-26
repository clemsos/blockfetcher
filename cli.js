#!/usr/bin/env node --harmony

const fs = require('fs')
const minimist = require('minimist')

const blockfetcher = require(".")
const version = require('./package').version

// const gistId="https://bl.ocks.org/clemsos/009f78d9bf410295f63335419aead372".replace('https://bl.ocks.org/','')
//
// blockfetcher.saveProject(gistId, "/tmp", "super-computers")
//   .then(files => console.log(`${files.length} saved!`) )
//   .catch(err =>  console.log(err.message))

const argv = minimist(process.argv, {
  alias: {
    v: 'version',
    d: 'dest',
    n: 'name'
  },
  default: {
    d: 'blocks',
    n: null
  },
  boolean: ['version', 'help']
})

const url = argv._[2]

if (argv.version) {
  console.log(version)
  process.exit(0)
}

if (argv.help || (process.stdin.isTTY && !url)) {
  console.error(
    'Usage: blocksfetcher [url] [options]\n\n' +
    '  url                 bl.ocks.org URL (required) \n' +
    '  --dest,-d           Destination folder (default: ./blocks)\n' +
    '  --name,-n           Name of the folder (default: gist hash) \n' +
    '  --version,-v        Print out the installed version\n' +
    '  --help              Show this help\n'
  )
  process.exit(1)
}

if (url) {

  if( !url.includes('https://bl.ocks.org/'))
    console.error('The URL needs to include https://bl.ocks.org/.')

  const gistId = url.replace('https://bl.ocks.org/','')

  blockfetcher.saveProject(gistId, argv.dest, argv.name)
    .then(files => console.log(`${files.length} saved!`) )
    .catch(err =>  console.log(err.message))

}
