// we creat this to create token and saving in cookies.
// we also create this to reduce code of usercontroller file. while wirting same code repeating we will write onely one line of code ther by using this.


const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // options for cookies
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // what ever number we give it will mulitply as a  day.
  };
  res.status(statusCode).cookie("token", token, options).json({
    success:true,
    user,
    token,
  });
};

module.exports= sendToken;
