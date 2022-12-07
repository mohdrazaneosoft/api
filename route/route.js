const expres=require('express')
const { body, validationResult} = require('express-validator');
const jwttoken =require('../middleware/auth')
const path = require('path');
// const validat=validations=>{
//   return async (req,res,next)=>{
//     await Promise.all(validations.map(validation=> validation.run(req)))
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({
//             error:1,
//             errors:errors.array()
//         }) 
//     }
//     next();
//   }
// }
const {addproduct,getproduct,updateproduct,deleteproduct,signup,login,access}=require('../controller/controller')
const router=expres.Router();
//validat([body('name').isLength({min:5}).withMessage("error")])
//,jwttoken()
router.post("/product/add",addproduct);
router.get("/product/get",getproduct)
router.get("/product/delete/:id",deleteproduct);
router.put("/product/update/:id",updateproduct)
router.post("/product/signup",signup)
router.get("/product/login",login)
router.get("/product/access",access)
router.get("/try",(req,res)=>{
    //res.sendFile(path.join(__dirname+'./view/try.html'))
})
module.exports=router;