module.exports = (sql, Sequelize) => {

  const Question = sql.define('questions', {
    id: {
      type: Sequelize.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
   
    question_Text: {
      type: Sequelize.STRING
    },
    option_A: {
        type: Sequelize.STRING
    },
    option_B: {
        type: Sequelize.STRING,
    },
    option_C: {
      type: Sequelize.STRING
    },
   
    option_D:{
      type: Sequelize.STRING,
    },
    correct_option:{
      type: Sequelize.STRING,
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
  
  return Question
}
