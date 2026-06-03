import mongoose from 'mongoose'
import { MONGO_URI } from '../config/config.js'

export async function connect (){
    try {
        console.log(MONGO_URI)
        await mongoose.connect(MONGO_URI)
        console.log('Db connected succesfully')
    } catch (error) {
        console.log(error.message)
    }
}