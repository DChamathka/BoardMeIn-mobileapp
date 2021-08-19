const router = require('express').Router()
const cloudinary = require('cloudinary')

const fs = require('fs')


// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Upload image only admin can use
router.post('/upload', (req, res) =>{
try {
  console.log(req.files)
  res.json('test upload')
} catch (error) {
  return res.status(500).json({msg: err.message})
}
})

// Delete image only admin can use
router.post('/destroy', (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router