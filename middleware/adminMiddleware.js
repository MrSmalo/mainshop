const jwt = require('jsonwebtoken')
const user = require('../models/user')

const adminProtect = async (req,res,next)=>{
    let token
    if (req.cookies.token) {
        try{
            token = jwt.verify(req.cookies.token,process.env.JWT_SECRET)
            if (req.user.name === 'admin') {
                res.user = await user.findById(token.id)
                next()
            }else{
                res.redirect('/')
            }
            
        }
        catch(error){
            console.log(error);
            res.redirect('/');
        }
    }else{
        res.redirect('/')
    }
}

module.exports = {adminProtect}