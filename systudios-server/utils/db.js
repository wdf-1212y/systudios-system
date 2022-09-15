//加载MySQL模块
const mysql=require('mysql')
const pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'systudios',
  connectionLimit:20
})

// 为pool新增一个方法，同步执行sql的方法
pool.querySync=(sql,params)=>{
  return new Promise((resolve,reject)=>{
    pool.query(sql,params,(error,result)=>{
      if(error){
        reject(error)
      }else{
        resolve(result)
      }
    })
  })
}

module.exports=pool