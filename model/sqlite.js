var path = require('path')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: "localhost",
  dialect: "sqlite",
  storage: path.join(__dirname,"../database/database.sqlite")
});

// 在model文件下输入node note.js测试数据库链接是否成功

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

// 确定数据类型
const Note = sequelize.define("note", {
  text:Sequelize.STRING,
  userId: {
    type: Sequelize.STRING
  },
  createTime: Sequelize.STRING
});
// {force:true}

// Note.sync({force:true})
//   .then(() => {
//     Note.create({
//       text: "数据库里的数据"
//     });
//   })
//   //{where:{id:1}}
//   //{raw: true}  
//   .then(function() {
//     Note.findAll().then(note => {
//       console.log("All note:", JSON.stringify(note, null, 4));
//     });
//   });
module.exports.Note = Note