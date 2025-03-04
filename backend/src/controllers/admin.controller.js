import { Song } from "../models/song.model.js"
import { Album } from '../models/album.model.js'
import cloudinary from "../lib/cloudinary.js"

const uploadtoCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        })

        return result.secure_url

    } catch (error) {
        console.log(error, 'cloudinary upload error')
    }
}

export const createSong = async (req, res)=>{
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile){
            res.status(500).json({message: 'internal server error'})
        }
        const {title, artist, albumId, duration} = req.body
        const imageFile = req.files.imageFile
        const audioFile = req.files.audioFile

        const imageUrl = uploadtoCloudinary(imageFile)
        const audioUrl = uploadtoCloudinary(audioFile)
    
        const song = new Song({
            title: title,
            artist: artist,
            imageUrl,
            audioUrl,
            duration: duration,
            albumId : albumId || null
        })
    
        await song.save()

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id}
            })
        }

        return res.status(201).json({message: 'song successfully created'})
        
    } catch (error) {
        console.log('error creating song', error)
        res.status(500).json({message: 'internal server error'})
    }
}

export const deleteSong = async (req, res) =>{
    try{
        const { id } = req.params
        const song = Song.findById(id)
        if (song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            })
        }

        await Song.findByIdAndDelete(id)

        res.status(200).json({message: 'song deleted successfully'})

    }catch(error){
        console.log('error deleting song', error)
        res.status(500).json({message: 'internal server errors'})
    }
}

export const createAlbum = async (req, res)=>{
    try {

        if (!req.files || !req.files.audioFile || !req.files.imageFile){
            res.status(500).json({message: 'internal server error'})
        }

        const {title, artist, releaseYear} = req.body
        const imageFile = req.files.imageFile

        const imageUrl = uploadtoCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })

        await album.save()
        res.status(201).json({message: 'album created'}, album)

    } catch (error) {
        console.log('album creation failed', error)
        res.status(500).json({message: 'internal server error'})
    }
}

export const deleteAlbum = async (req, res) => {
    try{
        const {id} = req.params
        Song.deleteMany({albumId: id})
        Album.findByIdAndDelete(id)
        res.status(200).json({message: 'song deleted successfully'})

    } catch(error){
        console.log('album deletion failed', error)
        res.status(500).json({message: 'internal server error'})
    }
} 

export const checkAdmin =(req, res) =>[
    res.status(200).json({admin: true})
]