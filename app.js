const express=require("express")
const app= express()
const errorMiddleware = require("./middleware/error")
const cookies= require("cookie-parser")

app.use(express.json())
app.use(cookies())// we use cookie-parser

// Route imports
const product= require('./routes/productRoute')
const user= require("./routes/userRoutes")
const order= require("./routes/orderRoute")

//we are using our routes.
app.use('/api',product)
app.use("/api", user)
app.use("/api", order)

// Errorhandler middlware.
app.use(errorMiddleware);

module.exports= app;