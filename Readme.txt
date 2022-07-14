product controler , then productroute, then import it to app.
in product conotroler we create CRUD api for prodcut and import it to productRoute.js and use it and every thing is working properly.

now we are creating error handler which will handler all error of backend and it reduces our main codes by write one line of code. (utils.errorhadler.js) then we make middleware for it then we import it on app.js...... then we use it in productController.
then we create CatchAsyncError file in middlware to catch asycn error to reduce the code fo try-catch...

then we wrrap every all crud product inside catchAsyncErrors().. so now it will throw error but our server will continuely work. not stop by any errors.

then we create 2 error hadnlers one is for unhandler promiss rejection and 2 one is for  handling uncaught exceptions  in index.js file.

then we create mongoDb error handler. which is also called cast error handler. in the same firl middleware. error.js 

so till here all 4 error handlers are working all product contorllers and routes aare working.

then now we add serch and fillter, pagination etc fiuters add. utils folders ke ander apifeatures.js

then we create api featuers like serching and filltering (we can serach our product by name, page, category)... and everything is working. But we can search product by price but we cant give excate amout we have to give amount range in between... fillter me keyword, page, category this are working but price is not working properly.
issue of price serch is solve -------*****

## we are facing problem in filter by prices in apifeauters..... we have to resolve that.
we are done with our productmodel product contorler, api feauters..

now we start to build userAuthication.
then we create usermodel. and import it to userContorller.

so now we create registeruser and its perfectly working. with uniq email, password, name, email is required.

so basically by isAuthenticatedUser this route we can get know that user is register and login or not ,
 
 then we create to check user roles is admin or not. and its working properly,

 then we update in usermodel that when new product is created it will alos take user id with the products.
 so we can get know that who created this product at what time and when.success.

 then we created generating password reset token for using forgot password. in usermdoel.success
 then we create in userContorller when ever any one click forgot password so we generate link and send on email.
 we call the function getResetPasswordToken() form userContorller then its goes on usermodel becuase we write method over there we have in userSchema me resetPasswordToekn field is there, so ve generate has by crypto that add in that so we have to save that user in userContorller, now we get password and we saveit here.
 now we create link to send mail for forgot password,then we create on file in utils send Emials. form where we write all logic of mail service. and we are connecting with userContorller trycatch block matter.
so in email sending we have problem  on 31401.. we slove later.
32313...auth is complited.25...

now we are creating getuserDetails in userContorller..
then we created userudpatepssword... its working but need to test more and more...332

then we create UpdateUserProleROle and DeleteUserProfile in controller and user in it userroute. and both are working properly.( Only can be access by ADmin)....

then we create user can add reviews.. in productcontorllers. jub bhi koi productmodule. banayga ya usme reviews dega same time wo sub productcontroler me reviews me aajgaor reviews create hojayga. in the same place we are creating products ratings also..
getallproduts reviews, deleteproductsreviews both  are  working, for  dleletreviews productid, reviews  id have to given..
User routes  is complet..
then we create order controller model routes.... to newordeer,getsingleorder, myorders..
then we created get all orders admin, updae orders status admin -- where till jub tak delevary nahi hoti order ki tab tak hamare product ke stock quantity me se kum nahi hogo if product is develryed success then it will reduce form our stock. then we create the deleletorder for admin,










