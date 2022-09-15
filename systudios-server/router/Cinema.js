/** 定义电影演员相关的接口 */
const express=require('express')
const router=express.Router()
const Joi=require('joi')
const Response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')

/** 删除电影院接口
 * @param:
 * id  影院id
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/cinema/del',(req,res)=>{
  let {id}=req.body
  let schema = Joi.object({
    id: Joi.string().required(),    // 必填
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行删除操作
  let sql='delete from movie_cinema where id=?'
  pool.query(sql,[id],(error)=>{
    if(error){
      res.send(Response.error(500,error))
    }
    res.send(Response.ok())
  })
})

/** 通过ID查询电影院接口 
 * @param:
 * id  电影院id
 * @return:
 * {code:200,msg:'ok',data:{}}
 */
 router.get('/cinema/query',(req,res)=>{
  let {id}=req.query
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(),    // 必填
  })
  let {error,value} = schema.validate(req.query)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行查询业务
  let sql='select * from movie_cinema where id=?'
  pool.query(sql,[id],(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
    }
    if(result&&result.length==0){
      res.send(Response.ok(null))
    }else{
      res.send(Response.ok(result[0]))
    }
  })
})

/** 查询所有电影院
 * @param:
 * 无
 * @return:
 * {code:200,msg:'ok',data:[{}]}
 */
router.get('/cinemas',(req,res)=>{
  let sql='select * from movie_cinema'
  pool.query(sql,(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
      throw error
    }
    res.send(Response.ok(result))
  })
})

/** 查询所有电影院的标签 
 * @param:
 * 无
 * @return:
 * {code:200,msg:'ok',data:[{}]}
 */
router.get('/cinema/tags',(req,res)=>{
  let sql='select * from movie_cinema_tag'
  pool.query(sql,(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
      throw error
    }
    res.send(Response.ok(result))
  })
})

/** 添加影院接口 
 * @param:
 * 详情接口文档
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/cinema/add', (req, res)=>{
  let {cinema_name,address,province,city,district,longitude,latitude,tags} = req.body   // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    cinema_name:Joi.string().required(),
    address:Joi.string().required(),
    province:Joi.string().required(),
    city:Joi.string().required(),
    district:Joi.string().required(),
    longitude:Joi.number().required(),
    latitude:Joi.number().required(),
    tags:Joi.string().required()
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = `insert into movie_cinema (cinema_name,address,province,city,district,longitude,latitude,tags) values (?,?,?,?,?,?,?,?)`
  pool.query(sql, [cinema_name,address,province,city,district,longitude,latitude,tags], (error)=>{
    if(error){
      res.send(Response.error(500, error))
      throw error;
    }
    res.send(Response.ok())
  })
})

/** 修改影院接口 
 * @param:
 * 详情接口文档
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/cinema/update', (req, res)=>{
  let {id,cinema_name,address,province,city,district,longitude,latitude,tags} = req.body   // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    id:Joi.string().required(),
    cinema_name:Joi.string().required(),
    address:Joi.string().required(),
    province:Joi.string().required(),
    city:Joi.string().required(),
    district:Joi.string().required(),
    longitude:Joi.number().required(),
    latitude:Joi.number().required(),
    tags:Joi.string().required()
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = `update movie_cinema set
  cinema_name=?,address=?,province=?,
  city=?,district=?,longitude=?,latitude=?,tags=? where id=?`
  pool.query(sql, [cinema_name,address,province,city,district,longitude,latitude,tags,id], (error)=>{
    if(error){
      res.send(Response.error(500, error))
      throw error;
    }
    res.send(Response.ok())
  })
})

// 将router对象导出
module.exports=router;