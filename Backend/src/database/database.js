import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'd64mbtp8omnrhv', //database 
    'lyxzouckcdbwnh', //user 
    '3dfd76fa82d99d19b6a7ebc63d64eae85dc0604036dca30df6f9513187354eb8', //pass 
    {
        host: 'ec2-174-129-29-101.compute-1.amazonaws.com', //
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle:10000
        },
        logging: false,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            }
          },
    }
)

/*
export const sequelize = new Sequelize(
    //'FaztCode', //database
    'vshop', //database
    'postgres', //user
    'loquendo', //pass
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle:10000
        },
        logging: false
    }
)
*/