import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'

let models = modelosInit(sequelize)

export const getMultimedia = async (req,res) =>{
    let response;
    try {
        response = await models.multimedias.findAll({
            include:{
                model: models.audios,
                as: 'audios',
                include: 'songs'
            }
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json(response);
}

export const addMultimedia = async (req,res) =>{
    let response;
    try {
       
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json(response);
}