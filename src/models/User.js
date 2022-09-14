// let mysql = require("mysql2");
// const dotenv = require("dotenv");
// dotenv.config();

// // Criando uma conexão
// let con = mysql.createConnection({
//   //criando as variáveis de conexão no BD
//   host: "localhost",
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });

// const userTableSQL =
//   "CREATE TABLE IF NOT EXISTS `gamagram`.`users` (  `id` INT NOT NULL AUTO_INCREMENT,  `name` TEXT NOT NULL,  `image` TEXT NULL DEFAULT NULL,  `username` TEXT NOT NULL, `email` varchar(50) NOT NULL UNIQUE,  `password` TEXT NOT NULL,  `site` TEXT NULL DEFAULT NULL,  `bio` TEXT NULL DEFAULT NULL,  `phone` TEXT NULL DEFAULT NULL,  `gender` CHAR(1) NULL DEFAULT NULL,  PRIMARY KEY (`id`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;";

// function createUserTable() {
//   con.connect(function (err) {
//     if (err) throw err;
//     con.query(userTableSQL, function (err, result) {
//       if (err) throw err;
//       console.log("Tabela users criada com sucesso!");
//     });
//   });
// }

// function newUser(user){
//     const newUserSql = "INSERT INTO `gamagram`.`users` (`name`, `image`, `username`, `email`, `password`, `site`, `bio`, `phone`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
//     const values = [user.name, user.image, user.username, user.email, user.password, user.site, user.bio, user.phone, user.gender]
//     con.connect(function (err) {
//         if (err) throw err;
//         con.query(newUserSql, values, function (err, result) {
//           if (err) throw err;
//           console.log("Tabela users criada com sucesso!");
//         });
//       });
// }


//  //Select
//  async function findById(data) {
//   const sql = "SELECT * FROM  `gamagram`.`users` where id =?";
//   value = [data.id];

//   const results = await con.promise().query(sql,value)
//   console.log(results[0]);
//   return results[0]
// }

//  async function findUser(data){
//   var sql = "SELECT * FROM  `gamagram`.`users` where email =? LIMIT 1; "
//   value = [data.email];
//   const results = await con.promise().query(sql,value)
  
//   // console.log(results[0].shift().password);
//   //console.log(results[0].shift());
//   return results[0]
// }

// module.exports = {createUserTable, newUser, findUser,findById}