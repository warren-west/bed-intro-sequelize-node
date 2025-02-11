# An introduction to Sequelize in Node
Using sequelize, a popular ORM for JavaScript. We are using it to connect to a MySql database called "animaldb".

## Topics covered:
We covered a few key points when working with Sequelize:
- Installation of Sequelize with `npm i sequelize`
- Importing it into our project with `const {Sequelize} = require('sequelize')`
- Instantiating a `Sequelize` object and providing a configuration to connect to the database:
  - Database name
  - Username
  - Password
  - Dialect (in our case `mysql`)
- Creating models (in our case `Animal`)
- Using the `.sync()` function to synchronize the database with our code
- Implementing CRUD functionality with our `Animal` model using:
  - `.findAll()`, `.findOne()`, and `.findByPk()`
  - `.create()`
  - `.update()`
  - `.destroy()`
 
## Contributors
@warren-west | Noroff Fagskole AS

## License
MIT
