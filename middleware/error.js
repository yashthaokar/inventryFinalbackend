const ErrorHandler = require("../utils/errorhandler")

module.exports= (err, req, res, next)=>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server Error";

    // --- caste error handler (MONDODB errro).
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400) 
        
    } // 400 that mins bad request


    // mongoose duplicate key error-------
    if(err.code==11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message, 400);
    }

     // JWT toekn error-------
     if(err.name === "JsonWebTokenError"){
        const message=`Json web token is invalid, try again`;
        err= new ErrorHandler(message, 400);
    }

    // JWT toekn Expire error-------
    if(err.name === "TokenExpiredError"){
        const message=`Json web token is Expired, try again`;
        err= new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,// it will show our message
        error:err.stack,// it will show path
    })
}