const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/server");

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("O servidor está on na porta " + listener.address().port);
});
