const express = require('express');
const jwt = require('jsonwebtoken');
const users = express.Router();
const db = require('../config/database');


users.post("/login",async(req,res,next) => {
  const {user_name,user_password} = req.body;
  const query = `SELECT * FROM users WHERE user_name='${user_name}' AND user_password = '${user_password}'`;

  const rows = await db.query(query);

  if(user_name && user_password){
  if(rows.length ==1){
    const token = jwt.sign({
    user_id: rows[0].user_id,
    user_mail: rows[0].user_mail
    }, "debugkey",{expiresIn: 10});
    return res.status(200).json({code:200, message: token })
  }
  else{
  return res.status(200).json({code:401, message:"Usuario y/o contra incorrectos"})
  }
  
}
return res.status(500).json({code:500, message:"Campos incompletos"})
  
});

users.get("/",async(req,res,next) => {
const query = "SELECT * FROM users ";
const rows = await db.query(query);

return res.status(200).json({code:201, mesagge: rows})
});

module.exports = users;