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

const encryptResponse = require('../_helpers/encrypt-response')
// const sequelize = require('sequelize');
const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;


class AuthController {
  
  static decrypt = async(req, res) =>{
    const { param } = req.body
    const data = AES.cscDecryption(param)
    // console.log(AES.cscDecryption('aHhHWU0M6qU0GI+ZfGNjJ/VGjEUABjTWMe6HOePFrA6LfvTNbmzXpJher54LUsikBw43ifiUqbdQemPIZaGCzg=='))
    res.send(
      {
        status_code: 200,
        data: data
      }
    );
  }
  
  static encrypt = async(req, res) =>{
    const { param } = req.body
    const data = AES.cscEncryption(param)
    res.send(
      {
        status_code: 200,
        data: data
      }
    );
  }

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

        return encryptResponse(res, "Mobile number missing", 400, {})
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

        // if(data[0].role_id==1 && data[0].status===null){
        //   const dataSet = {"type": "pending"}
        //   return encryptResponse(res, status.INVALID_CREDENTIAL, 404, dataSet)
        // }

        let user_id = data[0].id;
        data = data[data.length - 1]
        let dataset = [];

        let token;
        delete data["password"];
        // delete data["user_id"];

        if (typeof data['user_type'] !== 'undefined' && data['user_type'] == 'free') {

          delete data['membership_expires_at'];
        }

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
    console.log("Dsadsadasd")
    if (!req.body) {
      return encryptResponse(res, "Request missing", 400)
    }
    const { user_id, password } = req.body;
    let mobile = user_id
    let role_id = 1

    try {

      if (typeof user_id === 'undefined' || user_id === '' || user_id === null) {

        return encryptResponse(res, "Mobile number missing", 400, {})
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

        // if(data[0].role_id==1 && data[0].status===null){
        //   const dataSet = {"type": "pending"}
        //   return encryptResponse(res, status.INVALID_CREDENTIAL, 404, dataSet)
        // }

        let user_id = data[0].id;
        data = data[data.length - 1]
        let dataset = [];

        let token;
        delete data["password"];
        // delete data["user_id"];

        if (typeof data['user_type'] !== 'undefined' && data['user_type'] == 'free') {

          delete data['membership_expires_at'];
        }

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
}

module.exports = AuthController
