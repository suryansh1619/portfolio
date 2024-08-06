const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const User=require('./models/userModel')

passport.use(new LocalStrategy(async (email,password,done)=>{
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return done(null,false,{message:'Incorrect Email'});
        }
        const ispassword=await user.comparePassword(password);
        if(!ispassword){
            return done(null,false,{message:'Incorrect Password'});
        }
        return done(null,user)
    }
    catch(err){
        return done(err);
    }
}))

module.exports=passport;