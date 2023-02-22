import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'
import {Op} from "sequelize";
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
        validation = await models.publishers.findAll({
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

        let json_aux;
        
        if(modelo_name == "songs"){
            json_aux = {
                "duration":cuerpo.duration,
                "audio_id":audio_id
            }
        }else if(modelo_name == "podcasts"){
            json_aux = {

                "duration_p_e":cuerpo.duration_p_e,
                "noepisodes":cuerpo.noepisodes,
                "audio_id":audio_id
            }
        }else if(modelo_name == "audio_books"){
            json_aux = {
                "duration":cuerpo.duration,
                "chapters":cuerpo.chapters,
                "audio_id":audio_id
            }
        }
        response = await modelo.create(json_aux)

        return {"Estatus":"Registro exitoso"};

    } catch (e) {
        
        return {"error": e.message}
    } 
};