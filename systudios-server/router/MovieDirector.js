/** 定义电影导演相关的接口 */
const express=require('express')
const router=express.Router()
const Joi=require('joi')
const Response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')

/** 查询所有导演的接口
 * @param:
 * page:1 当前页
 * pagesize:10 每页条目数
 * @return:
 * {code:200,msg:'ok',data:[{导演obj},{导演obj}]}
 */
router.get('/movie-directors',(req,res)=>{
  // 获取请求参数，get请求的参数封装在req.query中
  let {page,pagesize}=req.query
  // 服务端表单验证,验证跳过继续，不通过直接返回参数异常
  let schema=Joi.object({
    page:Joi.number().required(),  ///page必须是数字，必填
    pagesize:Joi.number().integer().max(100).required()  //pagesize必须是不大于100的数字，必填
  })
  let {error}=schema.validate(req.query)
  if(error){
    res.send(Response.error(400,error))
    return  //结束
  }
  // 查询数据库,movie_director
  let startIndex=(page-1)*10
  let size=parseInt(pagesize)
  let sql="select * from movie_director limit ?,?"
  pool.query(sql,[startIndex,size],(err,result)=>{
    if(err){
      res.send(Response.error(500,error))
      throw err
    }
    // 将结果封装返回给客户端
    res.send(Response.ok(result))
  })
})

/** 添加导演接口 
 * @param:
 * directorName  导演名字
 * directorAvatar  导演头像路径
 * @return:
 * {code:200,msg:'ok'}
 */
 router.post('/movie-director/add', (req, res)=>{
  let {directorName, directorAvatar} = req.body   // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    directorName: Joi.string().required(),    // 必填
    directorAvatar: Joi.string().required()   // 必填
  })
  let {error} = schema.validate(req.body)
  if(error){
    res.send(Response.error(400, error))
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = 'insert into movie_director (director_name, director_avatar) values (?,?)'
  pool.query(sql, [directorName, directorAvatar], (error)=>{
    if(error){
      res.send(Response.error(500, error))
      throw error;
    }
    res.send(Response.ok())
  })
})

/** 删除导演接口
 * @param:
 * id  导演id
 * @return:
 * {code:200,msg:'ok'}
 */
router.post('/movie-director/del',(req,res)=>{
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
  let sql='delete from movie_director where id=?'
  pool.query(sql,[id],(error)=>{
    if(error){
      res.send(Response.error(500,error))
    }
    res.send(Response.ok())
  })
})

/** 模糊查询符合导演名称要求的接口
 * @param:
 *   name: 姓名       导演姓名
 * @returns:
 *   {code:200, msg:'ok', data:[{导演Obj},{导演Obj},{导演Obj}]}
 */
 router.post('/movie-directors/name', (req, res)=>{
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
  let sql = "select * from movie_director where director_name like ?"
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