import { sequelize } from '../database/database.js';
import modelos from '../models/init-models.js'

let modelos2 = modelos(sequelize)
export const getAllMultimedia = async (req,res) =>{
    let response;
    try{    
        response = await modelos2.multimedias.findAll({
            include:{
                model: modelos2.audios,
                as: 'audios',
                include: 'songs'
            }
        });

    }catch(e){
        res.status(500).json({"Error": e.message});
    }
    
    res.status(200).json(response);
};