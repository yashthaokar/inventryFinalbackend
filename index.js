const app = require("./app");
const dbConnect = require("./dbconnect");
require("dotenv").config();
const port = process.env.PORT || 5050;

// handling uncaught exceptions
process.on("uncaughtException",(err)=>{
  console.log(`Error: $(err.message)`)
  console.log("server is shutdonw due to uncaught Exception")
  process.exit(1)
})


// database connection and server listening.
dbConnect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  userCreateIndex: true,
})
  .then((data) => {
    const server = app.listen(port, () => {
      console.log(`backend server is running on ${port}`);
    });
  })
  // .catch((err) => {
  //   console.log("error in connection to DB");
  // }); 
  // we comment out this catch because we create beloow function to handler any unhandler promise.



// unhandler Rejection which will shut down our server.

process.on("undhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
