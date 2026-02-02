const express=require("express");
const db = require("../../models");
const  validateWithZod  = require("../../middlewares/orders.validate.middleware");
const { getCacheValue, setCacheValue } = require("../../services/redis.service");

const orderRoutes=express.Router();

orderRoutes.get("/get-all-orders",async(req,res)=>{
    try{
        const {page,limit}=req.query;
        
        if(page&&limit){
            let pageNo=page||1;
       let limitNo = limit||5;

       const orders= await db.orders.findAndCountAll({
        attributes:["id","user_id","payment_status","order_value"],
        offset:(page-1)*limit,
        limit:limit,
        subQuery: false
       })

       res.status(200).json({
        success:true,
        data:{
            page,
            totalCount:orders.count,
           data:orders.rows
        }
       })
       return
        }
    let  orders=await getCacheValue("orders");
    if(orders&&orders.length>0){
    
        res.status(200).json(orders);
        return
    }
    orders=await db.orders.findAll({
         attributes:["id","user_id","payment_status","order_value"],
    })
        await setCacheValue("orders");
  res.status(200).json(orders);
    
       

    }catch(error){
console.log("Error while getting the orders",error.message);
res.status(500).json("Internal server error")
    }
})

orderRoutes.post("/create",validateWithZod,async(req,res,next)=>{
try {
   
    const data=req.body;
    
    const newOrder=await db.orders.create({
      
        ...data
    });

    console.log("Order added successfully");
    res.status(201).json({
        success:true,
        data:newOrder
    })
} catch (error) {
    console.log("Error while creating the orders",error.message);
    res.status(500).json("Internal server error")
}
})

orderRoutes.get("/get-by-cache",async(req,res)=>{
    try{
    const orders= await getCacheValue("orders")
     res.status(200).json({
        success:true,
        data:orders
       })

    }catch(error){
console.log("Error while getting the orders",error.message);
res.status(500).json("Internal server error")
    }
})

module.exports= orderRoutes