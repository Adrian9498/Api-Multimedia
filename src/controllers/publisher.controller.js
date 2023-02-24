import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'
import {Op} from "sequelize";
let models = modelosInit(sequelize)

export const getPublishers = async (req,res) =>{
    let response;
    try {
        response = await models.publishers.findAll()
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json(response);
}

export const addPublisher = async (req,res) =>{
    let cuerpo = req.body;
    let publisherOBJ = {
        "name":cuerpo.name.trim()
    }
    try{
        let response = await models.publishers.create(publisherOBJ)
        if(response.dataValues.id_publisher >= 1){
            res.status(200).json({"message":"Publisher registrado."});
        }
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
}


export const editPublisher = async (req,res) =>{
    let cuerpo = req.body;
    let publisherOBJ = {
        "name":cuerpo.name.trim()
    }
    try {
        let response = await models.publishers.update(publisherOBJ, {
            where: {
                id_publisher: cuerpo.id_publisher
            }
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json({"message":"Publisher modificado."});
}



export const deletePublisher = async (req,res) =>{
    let cuerpo = req.body;
    try{
        let response = await models.publishers.destroy({
            where: {
                id_publisher: cuerpo.id_publisher
            }
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json({"message":"Publisher eliminado."});
}