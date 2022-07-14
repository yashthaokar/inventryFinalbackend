class ErrorHandler extends Error{
   constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode

    Error.captureStackTrace(this,this.constructor)
   }
}
module.exports =  ErrorHandler
// class errorhalder se error extends kiya he that mins inherate kiya he. super is contruter of our extends class.
