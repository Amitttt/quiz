const user = require("../controllers/user.controller.js");
module.exports = app => {
   
    app.post("/api/sign-in", user.login)
    app.post("/api/get-questions", user.getQuestions)

};

