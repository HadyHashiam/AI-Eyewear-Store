const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set('strictQuery', true);
dotenv.config({ path: '.env' });
// mongoose.set('strictQuery', false);
const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/New-I-Glass-25")
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
  // .catch((err) => {
  //   console.error(`Database Error: ${err}`);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;
