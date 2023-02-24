import {sequelize} from '../database/database.js'
import modelosInit from '../models/init-models.js'
import {Op} from "sequelize";
let models = modelosInit(sequelize)

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

export const addMultimedia = async (req,res) =>{
    
    let cuerpo = req.body;

    if('isColor' in cuerpo && !('ranking'in cuerpo)){
        if('imagenes'in cuerpo && !('volumes'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.books)
            res.status(200).json(aux_res);
            return;
        }else if('volumes'in cuerpo && !('imagenes'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.mangas)
            res.status(200).json(aux_res);
            return;
        }else if(!('volumes'in cuerpo) && !('imagenes'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.comics)
            res.status(200).json(aux_res);
            return;
        }else{
            res.status(500).json({"Error":"Tu peticion es invalida"});
            return;
        }
    }else if('ranking' in cuerpo  && !('isColor'in cuerpo)){
        if('isSequel'in cuerpo && !('volumes'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.movie)
            res.status(200).json(aux_res);
            return;
        }else if('seasons'in cuerpo && !('isSequel'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.series)
            res.status(200).json(aux_res);
            return;
        }else if(!('seasons'in cuerpo) && !('isSequel'in cuerpo)){
            let aux_res = await addAudio(cuerpo,models.social_videos)
            res.status(200).json(aux_res);
            return;
        }else{
            res.status(500).json({"Error":"Tu peticion es invalida aqui"});
            return;
        }
    }else if(!('isColor'in cuerpo) && !('ranking'in cuerpo) ){
        
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

    }else{
        res.status(500).json({"Error":"Tu peticion es invalida aca"});
        return;  
    }

    res.status(200).json(cuerpo);
}

const addAudio = async (cuerpo,modelo) =>{
    let response;
    let publisher_id;
    let creator_id;
    let multimedia_id;
    let tipo_archivo_id;
    let audio_id;
    let {name,last_name,age,bio} = cuerpo.creator;
    let modelo_name = modelo.name
    
    try {

        let w_publisher = {"name": cuerpo.publisher.trim()}
        let w_creator = { "name":name, "last_name":last_name }
        let objCreator = {"name":name.trim(),"last_name":last_name.trim(),"age":age,"bio":bio.trim()}
        let w_tarchivo = {"extension":cuerpo.extension.trim()}

        publisher_id = await validations(models.publishers,w_publisher,w_publisher)
        
        creator_id = await validations(models.creators,w_creator,objCreator)

        let objMultimedia = {
            "name": cuerpo.name,
            "lang": cuerpo.lang,
            "release_year": cuerpo.release_year,
            "description": cuerpo.description,
            "creator_id": creator_id,
            "publisher_id": publisher_id
        }

        
        response = await models.multimedias.create(objMultimedia)

        multimedia_id =  response.dataValues.id_multimedia;
        
        tipo_archivo_id = await validations(models.tipo_archivo,w_tarchivo,w_tarchivo)

        //aqui empieza creacion de audio
        
        //let objAudio = {"multimedia_id":multimedia_id,"tipo_archivo_id":tipo_archivo_id}
        
        //response = await models.audios.create(objAudio)

        //audio_id = response.dataValues.id_audio;

        
        /*let selector ={
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
        }*/
        
        //let json_aux = selector[modelo_name]
        
        //response = await modelo.create(json_aux)

        console.log(seleccionMedia(modelo,modelo_name,multimedia_id,tipo_archivo_id,cuerpo))

        return {"Estatus":"Registro exitoso"};

        // Selecciones de audio

    } catch (e) {
        
        return {"error": e.message}
    } 
};

// modelo -> modelos de la base --- params -> {"name":Natalia,"last_name"Lafourcade}
const validations = async (modelo,w_params,creationOBJ) => {

    let id_return;
    let model_name = modelo.name;
    let selector;
    let validation = await modelo.findAll({
        where: w_params
    });

    if(validation.length == 0){
        let response = await modelo.create(creationOBJ)
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

const seleccionMedia = async (modeloFinal,model_name,multimedia_id,tipo_archivo_id,cuerpo) => {
    let jsonAudio = {"multimedia_id":multimedia_id,"tipo_archivo_id":tipo_archivo_id}
    let jsonTexto = {"multimedia_id":multimedia_id,"tipo_archivo_id":tipo_archivo_id,"sheets":cuerpo.sheets,"iscolor":cuerpo.isColor}
    let jsonVideo = {"multimedia_id":multimedia_id,"tipo_archivo_id":tipo_archivo_id,"main_casting":cuerpo.main_casting,"ranking":cuerpo.ranking}
    let jsonMedia = {
        "songs":[
            models.audios,
            jsonAudio,
            
        ],
        "podcasts":[
            models.audios,
            jsonAudio,
        ],
        "audio_books":[
            models.audios,
            jsonAudio,
        ],
        "mangas":[
            models.texts,
            jsonTexto,
        ],
        "books":[
            models.texts,
            jsonTexto,
        ],
        "comics":[
            models.texts,
            jsonTexto,
        ],
        "movie":[
            models.videos,
            jsonVideo,
        ],
        "series":[
            models.videos,
            jsonVideo,
        ],
        "social_videos":[
            models.videos,
            jsonVideo,
        ],
    };

    

    let objSelector = jsonMedia[model_name]

    let response =  await objSelector[0].create(objSelector[1])

    let jsonID = {
        "songs":response.dataValues.id_audio,
        "podcasts":response.dataValues.id_audio,
        "audio_books":response.dataValues.id_audio,
        "mangas":response.dataValues.id_text,
        "books":response.dataValues.id_text,
        "comics":response.dataValues.id_text,
        "movie":response.dataValues.id_video,
        "series":response.dataValues.id_video,
        "social_videos":response.dataValues.id_video
    };

    let response_id = jsonID[model_name]

    console.log(response_id)

    let selectorMedia ={
        "songs":{
            "duration":cuerpo.duration,
            "audio_id":response_id
        },
        "podcasts":{
            "duration_p_e":cuerpo.duration_p_e,
            "noepisodes":cuerpo.noepisodes,
            "audio_id":response_id
        },
        "audio_books":{
            "duration":cuerpo.duration,
            "chapters":cuerpo.chapters,
            "audio_id":response_id
        },
        "mangas":{
            "chapters":cuerpo.chapters,
            "volumes":cuerpo.volumes,
            "text_id": response_id
        },
        "books":{
            "chapters":cuerpo.chapters,
            "imagenes":cuerpo.imagenes,
            "text_id": response_id
        },
        "comics":{
            "chapters":cuerpo.chapters,
            "text_id": response_id
        },
        "movie":{
            "duration":cuerpo.duration,
            "issequel":cuerpo.isSequel,
            "video_id": response_id
        },
        "series":{
            "duration_p_e":cuerpo.duration_p_e,
            "noepisodes": cuerpo.noepisodes,
            "seasons": cuerpo.seasons,
            "video_id": response_id
        },
        "social_videos":{
            "duration":cuerpo.duration,
            "social_media": cuerpo.social_media,
            "video_id": response_id
        }
    }

    objSelector = selectorMedia[model_name]

    response = await modeloFinal.create(objSelector)
    
    return response;
}