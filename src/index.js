const express = require ('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require('./db');
const UserModel = require('./models/User')
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');


//fazendo a conexão com o banco
  db.connectDB();
  db.createDB();
  UserModel.createUserTable();
 // UserModel.findUser({email:"mail@birb.com"})
// UserModel.findById({id:3})


  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('common'));

  app.use('/api/user', userRoute);
  app.use('/api/auth', authRoute);

  app.get('/', (req,res)=>{
    res.send("Welcome to the homepage")
  })

  app.get('/users', (req,res)=>{
    res.send("Welcome to the User Page")
  });

  const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('O servidor está on na porta ' + listener.address().port)
})
