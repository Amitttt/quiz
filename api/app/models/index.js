const sequelize = require("../models/db.js");
const Sequelize = require('sequelize');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.stateModel = require("./state.model")(sequelize, Sequelize);
db.userModel = require("./user.model")(sequelize, Sequelize);
db.tokenModel = require("./token.model")(sequelize, Sequelize);
db.questionModel = require("./question.model")(sequelize, Sequelize);



module.exports = db;
