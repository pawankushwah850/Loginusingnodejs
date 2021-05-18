const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken') ;


const UserSchema=new mongoose.Schema(
    {
       first_name:
       {
            type:String,
            required:true
       },
       last_name:
       {
            type:String,
            required:true
       },
       email:
       {
            type:String,
            required:true
       }, 
       password:
       {
            type:String,
            required:true
       },
       tokens:[
            {
                 token:
                 {
                      type:String,
                      required:true
                 }
            }
       ]
    }
    
)


UserSchema.pre('save', async function(next)
{
     if(this.isModified('password'))
     {
          this.password=await bcrypt.hash(this.password,12)
     }
     next()
})

UserSchema.methods.generateAuthToken =async function()
{
     try
     {
          let token=jwt.sign({_id:this._id},process.env.SECRETE_KEY);
          this.tokens=this.tokens.concat({token:token});
          await this.save();
          return token;
          
     }catch(error)
     {
          console.error(error)
     }
}
const User=mongoose.model("User",UserSchema);
module.exports=User