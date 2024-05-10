import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //distructre the req.body json file

  if(                                         //if all the fields are empty so we throw a custom error
    !username || 
    !email || 
    !password || 
    username === '' || 
    email === '' || 
    password === ''
    ){
    next(errorHandler(400, 'All fields are required'));
  };

  const hashedPassword = bcryptjs.hashSync(password, 10);//for decrypting the password
  const newUser = new User({ username, email, password: hashedPassword }); //create newUser using the User model

  try {
    await newUser.save() //save the user on database mongodb
  res.status(201).json("user created successfully!")
  } catch (error) {
    // res.status(500).json(error.message)
    //next(errorHandler(550,'error from the function'))  this will use when we want give error like your password is not strong|custom error function
    next(error);
  }
  
};

export const signin = async (req, res, next) => {
  const { email, password} = req.body;  //get the data from body |destructuring
  try {
      const validUser = await User.findOne({email});//findone is mongodb function{email: email}-> before ES6
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword) return next(errorHandler(401, 'Invalid password!'))
      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET) //to authenticate the user for forther operation(like change the password)
      const {password: pass, ...rest } = validUser._doc;//destructure the password |password is not sent in the response to getting leaked| here above we are using password termas a constant so we cant use it again so we use pass
      res
      .cookie('access_token', token, { httpOnly: true })  //save the token as cookies in browser and send the response(validuser<->rest) -->with no expiry it is sesson
      .status(200)
      .json(rest)
      //res.cookie('access_token', token, { httpOnly: true, expires:new Date(Date.now() + 24 * 60 * 60 *100) }).status(200).json(rest) 
    
  } catch (error) {
    next(error); //by middleware in index.js to handle error
  }
}

export const google = async (req, res, next)=> {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res.cookie('access_teken', token, { httpONly: true})
        .status(200)
        .json(rest);
    }else{
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4), email:req.body.email, password: hashedPassword, avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id}, process.env.JWT-SECRET);
        const { password: pass, ...rest} = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).stauts(200).json(rest);

    }
  } catch (error) {
    next(error)
    
  }
}
