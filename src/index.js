import express from 'express';
import { sequelize } from './database/database.js';
import multimediaRoutes from './routes/multimedia.routes.js'

async function main(){

    try{
        await sequelize.sync({force:false})
        await sequelize.authenticate();
        console.log("Conexion Exitosa");
    }catch(e){
        console.log(e);
    }


    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(multimediaRoutes);
    app.listen(3000);
    console.log("Server listening on port 3000")
} 

main();