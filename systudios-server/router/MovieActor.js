/** 定义电影演员相关的接口 */
const express=require('express')
const router=express.Router()
const Joi=require('joi')
const Response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')

/** 通过movieid查询演员列表接口
 * @param:
 * movie_id:1 电影ID
 * @return:
 * {code:200,msg:'ok',data:[{演员obj},{演员obj}]}
 */
router.get('/movie-actors/movieid',(req,res)=>{
  let {movie_id}=req.query
  // 服务端表单验证,验证跳过继续，不通过直接返回参数异常
  let schema=Joi.object({
    movie_id:Joi.string().required(),  //必填
  })
  let {error,value}=schema.validate(req.query)
  if(error){
    res.send(Response.error(400,error))
    return  //结束
  }
  let sql=`select 
      ma.id actor_id,
      mima.movie_id movie_id,
      ma.actor_name actor_name,
      ma.actor_avatar actor_avatar
    from movie_actor ma join movie_info_map_actor mima on ma.id=mima.actor_id
    where mima.movie_id=?`
  pool.query(sql,[movie_id],(error,result)=>{
    if(error){
      res.send(Response.error(500,error))
      throw error
    }
    // 将结果封装返回给客户端
    res.send(Response.ok(result))
  })
})

/** 查询所有演员的接口
 * @param:
 * page:1 当前页
 * pagesize:10 每页条目数
 * @return:
 * {code:200,msg:'ok',data:[{演员obj},{演员obj}]}
 */
router.get('/movie-actors',(req,res)=>{
  // 获取请求参数，get请求的参数封装在req.query中
  let {page,pagesize}=req.query
  // 服务端表单验证,验证跳过继续，不通过直接返回参数异常
  let schema=Joi.object({
    page:Joi.number().required(),  ///page必须是数字，必填
    pagesize:Joi.number().integer().required()  //pagesize必须是不大于100的数字，必填
  })
  let {error}=schema.validate(req.query)
  if(error){
    res.send(Response.error(400,error))
    return  //结束
  }
  // 查询数据库,movie_actor
  let startIndex=(page-1)*10
  let size=parseInt(pagesize)
  let sql="select * from movie_actor limit ?,?"
  pool.query(sql,[startIndex,size],(err,result)=>{
    if(err){
      res.send(Response.error(500,error))
      throw err
    }
    // 将结果封装返回给客户端
    res.send(Response.ok(result))
  })
})

/** 添加演员接口 
 * @param:
 * actorName  演员名字
 * actorAvatar  演员头像路径
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/movie-actor/add', (req, res)=>{
  let {actorName, actorAvatar} = req.body   // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    actorName: Joi.string().required(),    // 必填
    actorAvatar: Joi.string().required()   // 必填
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = 'insert into movie_actor (actor_name, actor_avatar) values (?,?)'
  pool.query(sql, [actorName, actorAvatar], (error)=>{
    if(error){
      res.send(Response.error(500, error))
      throw error;
    }
    res.send(Response.ok())
  })
})

/** 删除演员接口
 * @param:
 * id  演员id
 * @return:
 * {code:200,msg:'ok'}
 */
router.post('/movie-actor/del',(req,res)=>{
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
  let sql='delete from movie_actor where id=?'
  pool.query(sql,[id],(error)=>{
    if(error){
      res.send(Response.error(500,error))
    }
    res.send(Response.ok())
  })
})

/** 模糊查询符合演员名称要求的接口
 * @param:
 *   name: 姓名       演员姓名
 * @returns:
 *   {code:200, msg:'ok', data:[{演员Obj},{演员Obj},{演员Obj}]}
 */
 router.post('/movie-actors/name', (req, res)=>{
  let {name} = req.body 
  //TODO 服务端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema = Joi.object({
      name: Joi.string().required(),    // 必填
  })
  let {error, value} = schema.validate(req.body)
  if(error){
      res.send(Response.error(400, error))
      return; // 结束
  }
  // 执行模糊查询
  let sql = "select * from movie_actor where actor_name like ?"
  pool.query(sql, [`%${name}%`], (err, result)=>{
      if(err){
          res.send(Response.error(500, error))
          throw err
      }
      // 将结果封装，返回给客户端
      res.send(Response.ok(result))
  })
})

// 将router对象导出
module.exports=router;