const User = require("../Models/user.js");

module.exports.renderSignupForm =(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res)=>{
   try{
     let {username,email,password}=req.body;
    const newUser = new User({username,email});
    const registedUser = await User.register(newUser,password);
    console.log(registedUser);
    req.login(registedUser,(err)=>{
        if(err){
            next(err);
        }
        else{
              req.flash("success","Welcome to WanderLust");
              res.redirect("/listings");
        }
    });
  
   }
   catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =  async(req,res)=>{
        req.flash("success","Welcome back to WanderLust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);

};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
};