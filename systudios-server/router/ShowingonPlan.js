/**  定义电影院放映厅相关的接口 */
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Response = require("../utils/Response.js");

// 引入mysql连接池
const pool = require("../utils/db.js");

/**
 * 通过ID查询放映厅接口
 * @param:
 *   id:   放映厅id
 * @return:
 *   {code:200, msg:'ok', data:{}}
 */
router.get("/plans/roomid", (req, res) => {
  let { room_id } = req.query;
  // 表单验证
  let schema = Joi.object({
    room_id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 执行查询业务
  let sql = `select 
    sp.id plan_id,
    sp.cinema_id cinema_id,
    sp.cinema_room_id cinema_room_id,
    sp.movie_id movie_id,
    mi.title title,
    sp.showingon_date showingon_date,
    sp.showingon_time showingon_time,
    sp.status status,
    sp.price price
  from 
    showingon_plan sp join movie_info mi on sp.movie_id=mi.id
  where 
    cinema_room_id=? and showingon_date>? 
  ORDER BY 
    showingon_date, showingon_time`;

  let now = new Date();
  let year = now.getFullYear();
  let month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth()+1;
  let day = now.getDate() ? "0" + now.getDate() : now.getDate();
  let time = `${year}-${month}-${day}`;
  pool.query(sql, [room_id, time], (error, result) => {
    if (error) {
      res.send(Response.error(500, error));
      throw error;
    }
    res.send(Response.ok(result));
  });
});

/**
 * 添加排片计划接口
 * @param:
 *   详见接口文档
 * @return:
 *   {code:200, msg:'ok'}
 */
router.post("/plan/add", (req, res) => {
  let {
    cinema_id,
    cinema_room_id,
    movie_id,
    showingon_date,
    showingon_time,
    status,
    price,
  } = req.body; // post请求参数在req.body中
  // 表单验证
  let schema = Joi.object({
    cinema_id: Joi.number().required(),
    cinema_room_id: Joi.number().required(),
    movie_id: Joi.number().required(),
    showingon_date: Joi.string()
      .required()
      .pattern(new RegExp("\\d{4}-\\d{2}-\\d{2}")),
    showingon_time: Joi.string()
      .required()
      .pattern(new RegExp("\\d{2}:\\d{2}")),
    status: Joi.number().required(),
    price: Joi.number().required(),
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 表单验证通过，执行添加操作
  let sql = `insert into showingon_plan (
    cinema_id,
    cinema_room_id,
    movie_id,
    showingon_date,
    showingon_time,
    status,
    price) values (?,?,?,?,?,?,?)`;
  pool.query(
    sql,
    [
      cinema_id,
      cinema_room_id,
      movie_id,
      showingon_date,
      showingon_time,
      status,
      price,
    ],
    (error, result) => {
      if (error) {
        res.send(Response.error(500, error));
        throw error;
      }
      res.send(Response.ok());
    }
  );
});

/**
 * 删除排片计划接口
 */
router.post("/plan/del", (req, res) => {
  let { id } = req.body;
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 执行删除排片计划业务
  let sql = "delete from showingon_plan where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      res.send(Response.error(500, error));
      throw error;
    }
    res.send(Response.ok());
  })
});

/**
 * 修改排片计划接口
 */
router.post("/plan/publish", (req, res) => {
  let { id } = req.body;
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 执行将排片计划设置为发布状态业务
  let sql = "update showingon_plan set status=1 where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      res.send(Response.error(500, error));
      throw error;
    }
    res.send(Response.ok());
  })
});

// 执行将排片计划设置为未发布状态业务
router.post("/plan/no-publish", (req, res) => {
  let { id } = req.body;
  // 表单验证
  let schema = Joi.object({
    id: Joi.string().required(), // 必填
  });
  let { error, value } = schema.validate(req.body);
  if (error) {
    res.send(Response.error(400, error));
    return; // 结束
  }
  // 执行将排片计划设置为发布状态业务
  let sql = "update showingon_plan set status=0 where id=?"
  pool.query(sql, [id], (error, result)=>{
    if (error) {
      res.send(Response.error(500, error));
      throw error;
    }
    res.send(Response.ok());
  })
});

// 将router对象导出
module.exports = router;
