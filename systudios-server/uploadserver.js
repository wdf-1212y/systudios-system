const express=require('express')
const app=express()
const port=9000
const Response=require('./utils/Response.js')
// 处理跨域
const cors=require('cors')
app.use(cors())

// 配置multer中间件,处理文件上传
const multer=require('multer')
const uuid=require('uuid')
const uploadTools=multer({
  // 该存储方法会把文件直接存入磁盘
  storage:multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null,'static')
    },
    filename:(req,file,callback)=>{
      // 通过file获取原始文件名  huangbo.jpg
      let name=file.originalname
      // 获取源文件的后缀.jpg,.png
      let ext=name.substring(name.lastIndexOf('.'))
      // 生成一个随机文件名，调用callback返回即可
      let newName=uuid.v4()+ext
      callback(null,newName)
    }
  })
})

// 配置静态资源托管文件夹 static
// 可以直接通过http://ip:port/文件名访问static目录下的资源
app.use(express.static('static'))

app.post('/upload',uploadTools.single('file'),(req,res)=>{
  // multer中间件将会把文件信息存入req.files
  let url="http://localhost:9000/"+req.file.filename
  console.log(req.file)
  res.send(Response.ok(url))
})

app.listen(port,()=>{
  console.log('上传文件服务已经启动')
})