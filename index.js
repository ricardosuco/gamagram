// const express = require ('express')
// const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require('./src/db');
const UserModel = require('./src/models/User')
const morgan = require('morgan');
const helmet = require('helmet');
// const userRoute = require('./routes');
// const authRoute = require('./routes');
const app = require('./src/server');


//fazendo a conexão com o banco
  // db.connectDB();
  // db.createDB();
  // UserModel.createUserTable();
 // UserModel.findUser({email:"mail@birb.com"})
// UserModel.findById({id:3})


  //middleware

  // app.use(express.json());
  // app.use(helmet());
  // app.use(morgan('common'));

  // app.use('/api/user', userRoute);
  // app.use('/api/auth', authRoute);

  // app.get('/', (req,res)=>{
  //   res.send("Welcome to the homepage")
  // })

  // app.get('/users', (req,res)=>{
  //   res.send("Welcome to the User Page")
  // });

  const listener = app.listen(3000, () => {
    console.log('O servidor está on na porta ' + listener.address().port)
})
