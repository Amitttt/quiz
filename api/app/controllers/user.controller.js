require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const response = require('../_helpers/response')
const status = require('../_helpers/status.conf')
const db = require("../models");
const authHistoryModel= db.authHistoryModel;
const AES = require("../_helpers/AES")
const UserModel = db.userModel;
const tokenModel = db.tokenModel;
const questionModel = db.questionModel;

const encryptResponse = require('../_helpers/encrypt-response')
// const sequelize = require('sequelize');
const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;


class UserController {

  
  static login = async (req, res) => {
    console.log("Dsadsadasd")
    if (!req.body) {
      return encryptResponse(res, "Request missing", 400)
    }
    const { user_id, password } = req.body;
    let mobile = user_id
    let role_id = 1

    try {

      if (typeof user_id === 'undefined' || user_id === '' || user_id === null) {

        return encryptResponse(res, "Email id or Mobile number missing", 400, {})
      }

      if (typeof password === 'undefined' || password === null || password === '') {

        return encryptResponse(res, "Password missing", 400, {})
      }

      let data = await UserModel.findAll({
        where: {
          user_id: {
            [Op.eq]: user_id
          },
          
          // role_id: role_id,
          is_active: '1'
        }, attributes: ['*'], raw: true
      });


      if (data && data[0] && bcrypt.compareSync(password, data[0].password)) {

       
        let user_id = data[0].id;
        data = data[data.length - 1]
        let dataset = [];

        let token;
        delete data["password"];
        // delete data["user_id"];

        // token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn:'8h'});
        token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {});

        dataset = ({ ...data, token })

        const saveToken = tokenModel.build({ token: token, user_id: user_id });
        await saveToken.save()
      
        return encryptResponse(res, "Login success", 200, dataset)

      } else {
        return encryptResponse(res, "Invalid credentials", 404, {})
      }
    } catch (error) {
      console.log("error",error)
      return encryptResponse(res, "Unexpected error", 500, {})
    }
  }

  static getQuestions = async (req, res) => {
    if (!req.body) {
      return encryptResponse(res, "Request missing", 400)
    }
  

    try {

      let data = await questionModel.findAll({
        where: {
          
          is_active: '1'
        }, attributes: ['*'], raw: true
      });
      console.log("data", data)


      if (data.length) {
        let   questions = {"questionText": "", "options":"","explanation": ""}
        let dateSet =[];
        for (let i = 0; i < data.length; i++) {
          // text += cars[i] + "<br>";
          questions['questionText'] = data[i]['question_Text']
          let options =  {'option_A': false, 'option_B': false, 'option_C': false, 'option_D': false}
          if(data[i]['correct_option'] == 'a'){
            options.option_A  = true
          }else if(data[i]['correct_option'] == 'b'){
            options.option_B = true
          }else if(data[i]['correct_option'] == 'c'){
            options.option_C  = true
          }else if(data[i]['correct_option'] == 'd'){
            options.option_D  = true
          }
          questions['options'] = [
                                    {"text": data[i]['option_A'], "correct": options.option_A},
                                    {"text": data[i]['option_B'], "correct": options.option_B},
                                    {"text": data[i]['option_C'], "correct": options.option_C},
                                    {"text": data[i]['option_D'], "correct": options.option_D}
                                    ]

          // questions['question_id'] = data[i]['question_id']
          questions['explanation'] = 'test'
          dateSet[i] =  questions
        }

        return encryptResponse(res, "Data found", 200, dateSet)

      } else {
        return encryptResponse(res, "No data found", 404, {})
      }
    } catch (error) {
      console.log("error",error)
      return encryptResponse(res, "Unexpected error", 500, {})
    }
  }
  static test = async (req, res) => {
    try {

        response(res, status.DATA_NOT_SAVE, 200, "Success")
      
    } catch (error) {
      console.log(error)
      response(res, status.DATA_NOT_SAVE, 500)
    }
  }
  
}
module.exports = UserController


