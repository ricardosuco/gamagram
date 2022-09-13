//criando uma variavel para fazer a requisição dos módulos
let mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// Criando uma conexão
let con = mysql.createConnection({
  //criando as variáveis de conexão no BD
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  
});

//conectando ao banco de dados
function connectDB(){
  con.connect( function(err){
    if(err) throw err;
    console.log("Conectado!");
  });
}
 

// Criando banco de dados
function createDB() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
    con.query("CREATE DATABASE IF NOT EXISTS gamagram", function (err, result) {
      if (err) throw err;
      console.log("Database criado com sucesso");
    });
  });
}


const PostsTableSQL= "CREATE TABLE IF NOT EXISTS `gamagram`.`posts` (  `id` INT NOT NULL AUTO_INCREMENT,  `user_id` INT NOT NULL,  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,  `caption` TEXT NOT NULL,  PRIMARY KEY (`id`),  INDEX `user_id` (`user_id` ASC) VISIBLE,  CONSTRAINT posts_ibfk_1`    FOREIGN KEY (`user_id`)    REFERENCES `gamagram`.`users` (`id`)) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;";
function createUserTable() {
  con.connect(function (err) {
    if (err) throw err;
    con.query(PostsTableSQL, function (err, result) {
      if (err) throw err;
      console.log("Tabela posts criada com sucesso!");
    });
  });
}









module.exports = { connectDB, createDB, createUserTable };
