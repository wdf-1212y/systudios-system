/** 定义电影演员相关的接口 */
const express=require('express')
const router=express.Router()
const Joi=require('joi')
const Response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')

/** 添加剧照接口 
 * @param:详情接口文档
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/movie-thumb/add', (req, res)=>{
  let {url, movie_id} = req.body   // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    url: Joi.string().required(),    // 必填
    movie_id: Joi.string().required()   // 必填
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = 'insert into movie_thumb (url, movie_id) values (?,?)'
  pool.query(sql, [url,movie_id], (error)=>{
    if(error){
      res.send(Response.error(500, error))
      throw error;
    }
    res.send(Response.ok())
  })
})

/** 删除剧照接口
 * @param:
 * id  剧照id
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/movie-thumb/del',(req,res)=>{
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
  let sql='delete from movie_thumb where id=?'
  pool.query(sql,[id],(error)=>{
    if(error){
      res.send(Response.error(500,error))
    }
    res.send(Response.ok())
  })
})

/** 通过movie_id查询所有剧照接口 
 * @param:
 * movie_id  电影id
 * @return:
 * {code:200,msg:'ok',data:{}}
 */
 router.get('/movie-thumbs/movieid',(req,res)=>{
  let {movie_id}=req.query
  // 表单验证
  let schema = Joi.object({
    movie_id: Joi.string().required(),    // 必填
  })
  let {error,value} = schema.validate(req.query)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行查询业务
  let sql='select * from movie_thumb where movie_id=?'
  pool.query(sql,[movie_id],(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
      throw error
    }
    res.send(Response.ok(result))
  })
})

// 将router对象导出
module.exports=router;