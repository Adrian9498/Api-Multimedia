import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'
import {Op} from "sequelize";
let models = modelosInit(sequelize)

export const getCreators = async (req,res) =>{
    let response;
    try {
        response = await models.creators.findAll()
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json(response);
}

export const addCreator = async (req,res) =>{
    let cuerpo = req.body;
    let creatorOBJ = {
        "name":cuerpo.name.trim(), 
        "last_name":cuerpo.last_name.trim(), 
        "age":cuerpo.age, 
        "bio":cuerpo.bio.trim(), 
        "nickname":cuerpo.nickname.trim()
    }

    let response = await models.creators.create(creatorOBJ)
    console.log(response);
    if(response.dataValues.id_creator >= 1){
        res.status(200).json({"message":"Creador registrado."});
    }
    else{
        res.status(304).json({"message":"Error, no fue posible registrar al creador."});
    }
}


export const editCreator = async (req,res) =>{
    let cuerpo = req.body;

    let creatorOBJ = {
        "name":cuerpo.name.trim(), 
        "last_name":cuerpo.last_name.trim(), 
        "age":cuerpo.age, 
        "bio":cuerpo.bio.trim(), 
        "nickname":cuerpo.nickname.trim()
    }

    let response = await models.creators.update(creatorOBJ, {
        where: {
          id_creator: cuerpo.id_creator
        }
      })
    console.log(response);
    
    res.status(200).json({"message":"Creador modificado."});

}



export const deleteCreator = async (req,res) =>{
    let cuerpo = req.body;

    let response = await models.creators.destroy({
        where: {
          id_creator: cuerpo.id_creator
        }
    })
    console.log(cuerpo);
    
    res.status(200).json({"message":"Creador eliminado."});

}