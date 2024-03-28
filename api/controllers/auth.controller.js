import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save()
  res.status(201).json("user created successfully!")
  } catch (error) {
    next(error);
    //next(errorHandler(550,'error from the function))  this will use when we want give error like your password is not strong
  }
  
};

export const signin = async (req, res, next) => {
  const { email, password} = req.body;  //get data from body
  try {
      const validUser = await User.findOne({email});//findone is mongodb function{email: email}-> before ES6
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if(!validPassword) return next(errorHandler(401, 'Invalid password!'))
      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET) //to authenticate the user for forther operation(like change the password)
      const {password: pass, ...rest } = validUser._doc;//password is not sent in the response to getting leaked
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest) //save as cookies in browser and send the response(validuser<->rest)
    
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
