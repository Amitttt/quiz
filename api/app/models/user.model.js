module.exports = (sql, Sequelize) => {

  const User = sql.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
   
    name: {
      type: Sequelize.STRING
    },
   
    email: {
        type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.INTEGER
    },
   
    is_active:{
      type: Sequelize.STRING,
      default:1
    },
    
    created_at:{
      type:Sequelize.DATE,
      default:Date.now()
    },
    updated_at:{
      type:Sequelize.DATE,
      default:Date.now()
    },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  },
    {
      timestamps: true,
      timezone: '+5:30'
    });

  //User.sync({ alter: true });
  
  return User
}
