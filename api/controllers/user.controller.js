import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res) => {
    res.json({
        message: 'Hello World!',
    })
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !==req.params.id) return next(errorHandler(401, "You can only update your own account:"))
    try {
        if(req.body.password){
            req.body.passwordn= bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{             //we use set because some we want to update some data not all
                username: req.body.username,
                eamil: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },
        {new: true}) //updated with new information

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next (error)
    }
};

