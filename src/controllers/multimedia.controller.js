import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'
import {Op} from "sequelize";
let models = modelosInit(sequelize)

// Funcion Get All que obtiene toda la tabla Multimedias
export const getMultimedia = async (req,res) =>{
    let response;
    try {
        response = await models.multimedias.findAll({
            include:[{
                model: models.audios,
                as: 'audios',
                include: 'songs'
            },{
                model: models.creators,
                as : 'creator'
            }]
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json(response);
}

// Funcion AddMultimedia que permite la insercion de multiples multimedias segun el tipo de cuerpo
export const addMultimedia = async (req,res) =>{
    
    let cuerpo = req.body;

    if('chapters'in cuerpo && !('noepisodes'in cuerpo)){
        
        let aux_res = await addAudio(cuerpo,models.audio_books)
        res.status(200).json(aux_res);
        return;
    }else if('noepisodes'in cuerpo && !('chapters'in cuerpo)){
        let aux_res = await addAudio(cuerpo,models.podcasts)
        res.status(200).json(aux_res);
        return;
    }else if(!('noepisodes'in cuerpo) && !('chapters'in cuerpo)){
        
        let aux_res = await addAudio(cuerpo,models.songs)
        res.status(200).json(aux_res);
        return;
    }else{
        res.status(500).json({"Error":"Tu peticion es invalida"});
        return;
    }

    res.status(200).json(cuerpo);
}

// Funcion AddAudio que permite procesar las inserciones de Audio de AddMultimedia()
const addAudio = async (cuerpo,modelo) =>{
    let response;
    let validation;
    let publisher_id;
    let creator_id;
    let multimedia_id;
    let tipo_archivo_id;
    let audio_id;
    let {name,last_name,age,bio} = cuerpo.creator;
    let modelo_name = modelo.name
    
    try {
        validation = await models.publishers.findAll({ // Modelo,parametros de busqueda
            where: {"name": cuerpo.publisher}
        })
        
        if(validation.length == 0){
            response = await models.publishers.create({
                "name":cuerpo.publisher.trim()
            })

            publisher_id = response.dataValues.id_publisher;
        }else{
            publisher_id = validation[0].dataValues.id_publisher;
        }

        
        
        validation = await models.creators.findAll({
            where: {
                "name":name,
                "last_name":last_name
            }
        })

        if(validation.length == 0){
            response = await models.creators.create({
                "name":name.trim(),
                "last_name":last_name.trim(),
                "age":age,
                "bio":bio.trim()
            })

            creator_id = response.dataValues.id_creator;
        }else{
            creator_id = validation[0].dataValues.id_creator;
        }

        

        response = await models.multimedias.create({
            "name": cuerpo.name,
            "lang": cuerpo.lang,
            "release_year": cuerpo.release_year,
            "description": cuerpo.description,
            "creator_id": creator_id,
            "publisher_id": publisher_id
        })

        multimedia_id =  response.dataValues.id_multimedia;
        
        validation = await models.tipo_archivo.findAll({
            where: {
                "extension":cuerpo.extension,
            }
        })
        
        if(validation.length == 0){
            response = await models.tipo_archivo.create({
                "extension":cuerpo.extension.trim(),
            })

            tipo_archivo_id = response.dataValues.id_tipo_archivo;
        }else{
            tipo_archivo_id = validation[0].dataValues.id_tipo_archivo;
        }

        response = await models.audios.create({
           "multimedia_id":multimedia_id,
           "tipo_archivo_id":tipo_archivo_id
        })

        audio_id = response.dataValues.id_audio;

        
        let selector ={
            "songs":{
                "duration":cuerpo.duration,
                "audio_id":audio_id
            },
            "podcasts":{
                "duration_p_e":cuerpo.duration_p_e,
                "noepisodes":cuerpo.noepisodes,
                "audio_id":audio_id
            },
            "audio_books":{
                "duration":cuerpo.duration,
                "chapters":cuerpo.chapters,
                "audio_id":audio_id
            }
        }
        
        let json_aux = selector[modelo_name]
        
        response = await modelo.create(json_aux)

        return {"Estatus":"Registro exitoso"};

    } catch (e) {
        
        return {"error": e.message}
    } 
};

// Funcion Validations que permite procesar las validaciones de las inserciones
// modelo -> modelos de la base --- params -> {"name":Natalia,"last_name"Lafourcade}
const validations = async (modelo,w_params,creationOBJ) => {

    let id_return;
    let model_name = modelo.name;
    let selector;
    let validation = await modelo.findAll({
        where: w_params
    });

    if(validation.length == 0){
        response = await modelo.create(creationOBJ)
        selector ={
            "publishers":response.dataValues.id_publisher,
            "creators":response.dataValues.id_creator,
            "tipo_archivo":response.dataValues.id_tipo_archivo
        }
        id_return = selector[model_name]
    }else{
        selector ={
            "publishers":validation[0].dataValues.id_publisher,
            "creators":validation[0].dataValues.id_creator,
            "tipo_archivo":validation[0].dataValues.id_tipo_archivo,
        }
        id_return = selector[model_name]
    }

    return id_return;
}

// getCreators, getPublishers, getTipoArchivo, addCreator, addPublisher, addTipoArchivo, deleteCreator, deletePublisher, deleteTipoArchivo

export const getCreators = async (req, res) => {
    console.log("Get Creators");
    let response; 
    try{
        response = await models.creators.findAll()
    }
    catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json(response);
}

export const getPublishers = async (req, res) => {
    console.log("Get Publishers");
    let response; 
    try{
        response = await models.publishers.findAll()
    }
    catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json(response);
}

export const getTipoArchivo = async (req, res) => {
    console.log("Get Tipo Archivo");
    let response; 
    try{
        response = await models.tipo_archivo.findAll()
    }
    catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json(response);
}

export const addCreator = async (req, res) => {
    console.log("Add Creator");
    const {name, last_name, age, bio} = req.body;
    let response;
    try{
        response = await models.creators.create({
            name, 
            last_name, 
            age, 
            bio
        })
    } catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json({"Registro Exitoso": response.dataValues})
}

export const addPublisher = async (req, res) => {
    console.log("Add Publisher");
    const {name} = req.body;
    let response;
    try{
        response = await models.publishers.create({
            name
        })
    } catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json({"Registro Exitoso": response.dataValues})
}

export const addTipoArchivo = async (req, res) => {
    console.log("Add Tipo Archivo");
    const {extension} = req.body;
    let response;
    try{
        response = await models.tipo_archivo.create({
            extension
        })
    } catch (e) {
        res.status(500).json({"Error": e.message});
    }
    res.status(200).json({"Registro Exitoso": response.dataValues})
}

export const deleteCreator = async (req, res) => {
    console.log("Delete Creator");
    const {id_creator} = req.params;
    let response;
    try {
        response = await models.creators.destroy({
            where:{id_creator}
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json({"Estado:": response})
}

export const deletePublisher = async (req, res) => {
    console.log("Delete Publisher");
    const {id_publisher} = req.params;
    let response;
    try {
        response = await models.publishers.destroy({
            where:{id_publisher}
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json({"Estado:": response})
}

export const deleteTipoArchivo = async (req, res) => {
    console.log("Delete Tipo Archivo");
    const {id_tipoarchivo} = req.params;
    let response;
    try {
        response = await models.creators.destroy({
            where:{id_tipoarchivo}
        })
    } catch (e) {
        res.status(500).json({"error": e.message})
    }
    res.status(200).json({"Estado:": response})
}