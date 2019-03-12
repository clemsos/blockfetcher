const fs = require('fs');
const fetch = require('node-fetch');
const url = require("url");
const path = require("path");
const mkdirp = require('mkdirp');
const slugify = require('slugify');

// helpers
const makeCORS = (filename) => (`https://cors.io/?${filename}`)
const gistURL = (gistId) => (`https://gist.github.com/${gistId}`)

const getFilesURLs = async function(id) {
  const cors = `${makeCORS(gistURL(id))}.json`
  // console.log(typeof cors, cors);
  const resp =  await fetch(cors)
  const gist = await resp.json()

  const files = gist.files.map(fn =>
    `https://gist.githubusercontent.com/${id}/raw/${fn}`
  )
  return files
}

const getFile = async function(fn) {
  const resp = await fetch(fn)
  const text = await resp.text()
  return text
}

const writeFile = async (fn, data) => {
  return new Promise( function(fulfill, reject) {
    fs.writeFile(fn, data, function(err) {
        if(err) reject(err)
        fulfill({ 'file' : fn, 'message' : 'The file was saved.'})
    })
  })
}

const createDir= async (dirName) => {
    return new Promise((fulfill, reject) => {
      const dir = `blocks/${dirName}`
      mkdirp(dir, function (err) {
          if (err) reject(err)
          else fulfill(dir)
      });
    })
}

const saveProject = async (gistId) => {

  return new Promise (async (fulfill, reject) => {
    // fetch URLS of files from gist
    const urls = await getFilesURLs(gistId)

    // get all files
    Promise.all(
      urls.map(f => getFile(f))
    )
    .then( async (files) => {
      // create a dir
      const slug = slugify(gistId);
      const dir = await createDir(slug)

      // save files
      const filenames = urls.map(u => {
        const l = url.parse(u)
        const fn = path.basename(l.pathname)
        return path.join(dir,fn)
      })

      // console.log(filenames);

      // save files
      Promise.all(
          files.map((f,i) => writeFile(filenames[i], f))
      )
      .then( saved => fulfill(saved))
      .catch(err => reject(err))
    })
    .catch(err => reject(err))
  })

}

module.exports = {
  saveProject : saveProject
}
