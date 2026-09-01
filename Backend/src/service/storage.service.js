require("dotenv").config();
const { ImageKit } = require("@imagekit/nodejs");
const fs = require("fs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  // const musicfile = {
  //     file: fs.createReadStream(file.path),
  //     fileName: file.originalname,
  // };

  const response = await client.files.upload({
    file: fs.createReadStream(file.path),
    fileName: file.originalname,
  });

  fs.unlink(file.path, () => {});

  return response;
}

async function bulkupload(files) {
  // console.log(files);
    
  let musiclinks = []

    for(let i = 0; i <= files.length - 1; i++){
        const param = await client.files.upload({
            file: fs.createReadStream(files[i].path),
            fileName: files[i].originalname
        })
        console.log(param.url);
        musiclinks.push(param.url)
        fs.unlink(files[i].path, () =>{});
    }
    // console.log(musiclinks);
    return musiclinks;

}

module.exports = { uploadFile, bulkupload };
