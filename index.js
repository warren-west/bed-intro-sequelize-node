// installed and used the Sequelize dependency
const { DataTypes, Sequelize, Op } = require('sequelize')

// created our Sequelize object that connects to the DB
const sequelize = new Sequelize('animaldb', 'root', 'admin', {
    dialect: 'mysql',
    // in the course notes:
    // A: They put databasename, username, password, etc. here in the {} config
    // B: They also specify the host, and dialectModel properties, which we don't actually need, because default properties suffice
})// this semicolon prevents the JS engine from "currying" this set of parenthesis with the following set

// test the connection to the database
// NB: Make sure the database has been created first, else you will get an error.
// (async function testConnection() {
//     return await sequelize.authenticate()
// })();

// Create model class (this class models the Animal entity in the database)
const Animal = sequelize.define('Animal', {
    weight: DataTypes.DOUBLE(10, 2),
    height: DataTypes.DOUBLE(10, 2),
    dob: DataTypes.DATE,
    name: {
        type: DataTypes.STRING,
        // If you want more than 255 characters, use the validate with a max value
        // validate: {
        //     len: [20, 30000]
        // }
    },
    species: {
        type: DataTypes.STRING,
        defaultValue: "unknown",
    }
    },
    {
        paranoid: true // instead of having hard deletes, you have a deletedAt column, and avoid losing sensitive info
    }
);

// Using the .sync() method, we can synchronize the sequelize object with the database,
// and update the database to include the models we've defined
(async function syncSequelize() {
    await sequelize.sync({ force: false })
})() // IIFE (Immediately Invoked Function Expression)

// We've successfully created a table with the fields we want,
// now let's attempt some CRUD stuff:
// CREATE   -> .create()
// READ     -> .findAll() / .findOne()
// UPDATE   -> .update()
// DELETE   -> .destroy() [You can set up soft deletes]
// A soft delete will set a "isDeleted" property on the object to true

// CREATE
// (async function createBingo() {
//     await Animal.create({
//         weight: 3.66,
//         height: 0.55,
//         dob: new Date(2017, 3, 13),
//         name: "Snowflake",
//     })
// })();

// READ
// (async function getAnimals() {
//     const results = await Animal.findAll()
//     console.log(results)

//     const animalsFromQuery = []

//     for (let animal of results) {
//         const { createdAt, updatedAt, ...rest } = animal
//         animalsFromQuery.push(rest)
//     }
// })();

// async function getAnimalById() {
//     const results = await Animal.findOne({
//         where: {
//             name: {
//                 [Op.substring]: "o"
//             } 
//         }
//     })
//     console.log(results)
// }
// getAnimalById()


// Destructuring trick to exclude a certain property
// const daisy = {
//     name: "Daisy",
//     height: 12.33,
//     dob: new Date(2020, 11, 16)
// }

// const { name, height, dob } = daisy
// console.log(name, height, dob)

// const { dob: dateOfBirth, ...everythingElse } = daisy
// console.log(everythingElse)

// UPDATE
async function updateAnimal(id, name, species) {
    const results = await Animal.update({
        name,
        species,
    }, {
        where: {
            id
        }
    })
    console.log(results)
}
// updateAnimal(1, "Bongo", "Dog")

// DELETE
async function deleteAnimal(id) {
    const result = await Animal.destroy({
        where: { id }
    })
    console.log(result)
}
// deleteAnimal(1)