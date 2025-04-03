import userModel from "../Models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for user Login
const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"El usuario no existe"})
        }
        const passwordAuth =  await bcrypt.compare(password,user.password)
        if (passwordAuth){
            const token = createToken(user._id)
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Nombre de usuario o Contraseña invalidos"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// route for user register
const registerUser = async (req,res) =>{
    try {
        const {name, email, password} = req.body;
        // check the user doesnt exsit
        const userRegistered = await userModel.findOne({email});
        if(userRegistered){
            return res.json({success:false, message:"El usuario ya existe"})
        }
        // validating email and password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Ingrese un nombre de usuario valido"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Ingrese una contraseña mas larga"})
        }
        
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPasword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// route for user admin Login
const adminLogin = async (req,res) =>{
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        
    }
}


export {registerUser,loginUser,adminLogin}