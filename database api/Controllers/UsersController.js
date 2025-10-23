const { json } = require("express");
const UserModel = require("../Model/UsersSchema");
const bcrypt = require('bcrypt')
let UsersController = {

  register: async (req, res) => {

    let { password, username, email } = req.body
    console.log(req.body)
    try {
      let existinguser = await UserModel.findOne({ email })
      console.log(existinguser)
      if (existinguser) {
        res.json({
          message: "User already exit",
          status: false
        })
      } else {
        let hashpassword = await bcrypt.hash(password, 10)
        console.log(hashpassword)
        let user = {
          username,
          email,
          password: hashpassword
        }
        let users = await UserModel.create(user)
        res.json({
          message: "User Create",
          users,
          status: true
        })
      }


    } catch (error) {
      res.json({
        message: error.message,
        error,
        status: false
      })
    }
  },
  login: async(req,res)=>{
  let {password, email}=req.body
  try {
    let existinguser = await UserModel.findOne({email})
    if (existinguser) {
      let ismatch = await  bcrypt.compare(password, existinguser.password)
      if (ismatch) {
        res.json({
          message:"Login Successfully",
          user: existinguser,
          status:true
        })
        
      } else {
        res.json({
          message:"Invalid Password"
        })
      }
    } else {
      res.json({
        message:"Account does not exist"
      })
      
    }
    
  } catch (error) {
      res.json({
        message: error.message,
        error,
        status: false
      })
    }
}
}
module.exports = UsersController;