import  Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    "railway", // Nombre DB
    "postgres", // Usuario
    "O7sCyvJnZ0YDOOohRM7y", // Password
    {
        host:"containers-us-west-78.railway.app",
        port:"7857",
        dialect: "postgres"
    }
);