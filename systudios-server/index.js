//引入express模块
const express=require('express')
// 创建服务器对象
const app=express()
const port=3000  //服务端口

const jwt=require('jsonwebtoken')
const JWT_SECRET_KEY='JWT_SECRET_KEY'
const Response=require('./utils/Response.js')

// 配置跨域
const cors=require('cors')
app.use(cors())
// 解析post请求参数
app.use(express.urlencoded({
  extended:true
}));
app.listen(port,()=>{
  console.log('森语影城后端服务已启动...')
})

// 自定义token全局验证中间件
const tokenTools=function(req,res,next){
  // 若请求路径是/user/login则不拦截，直接向后执行
  if(req.path=='/user/login'){
    next()
    return
  }
  // 执行token验证
  let token=req.headers['authorization']
  try {
    let payload=jwt.verify(token,JWT_SECRET_KEY)
    // 将token存储的数据，直接赋值给req,后续业务可以用req.tokenPayload获取这些信息
    req.tokenPayload=payload
    console.log(payload);
  } catch (error) {
    res.send(Response.error(401,'用户验证失败,请重新登录'))
    return
  }
  next()  //继续后续业务的执行
}
app.use(tokenTools)

// 引入外部路由
// let movieActorRouter=require('./router/MovieActor.js')
// app.use(movieActorRouter)
app.use(require('./router/MovieActor.js'))
app.use(require('./router/MovieDirector.js'))
app.use(require('./router/MovieInfo.js'))
app.use(require('./router/MovieThumb.js'))
app.use(require('./router/Cinema.js'))
app.use(require('./router/CinemaRoom.js'))
app.use(require('./router/ShowingonPlan.js'))
app.use(require('./router/Admin.js'))