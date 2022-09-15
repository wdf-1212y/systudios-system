/**  定义电影院放映厅相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

const jwt=require('jsonwebtoken')
const SECRET_KEY='JWT_SECRET_KEY'
/**
 * 处理登录业务
 */
router.post('/user/login',(req,res)=>{
  let {username,password}=req.body
  // 表单验证
  let schema = Joi.object({
    username: Joi.string().required().pattern(new RegExp('^\\w{3,15}$')),
    password: Joi.string().required().pattern(new RegExp('^\\w{6,15}$')),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 查询数据库，账号密码是否填写正确
  let sql='select * from admin where username=? and password=MD5(?)'
  pool.query(sql,[username,password],(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
      throw error
    }
    if(result.length==0){
      // 1001自定义异常消息
      res.send(Response.error(1001,'账号密码输入错误'))
    }else{
      // 获取登录用户对象
      let user=result[0]
      // 为该用户颁发一个token字符串，未来客户端发送其它请求，需在header中携带token，完成状态管理
      let payload={id:user.id,nickname:user.nickname}
      let token=jwt.sign(payload,SECRET_KEY,{expiresIn:'1d'})
      // 返回user对象与token字符串
      user.password=undefined
      res.send(Response.ok({user,token}))
    }
  })
})

// 将router对象导出
module.exports = router;
