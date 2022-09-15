const Joi=require('joi')
const schema=Joi.object({
  username:Joi.string().min(3).max(30),
  pagesize:Joi.number().min(10).max(100)
})
const {error,value}=schema.validate({username:'zss',pagesize:'12'})
console.log(error)