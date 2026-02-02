const z = require("zod")


const bodySchema = z.strictObject({
    user_id: z.int(),
    payment_status:z.enum(["PENDING","PAID","CANCELLED","FAILED"]),
order_value:z.number().min(0)

   
})
 const validateWithZod =
  
    async (req,res,next) => {
        try {
            console.log
           

          await  bodySchema.parse(req.body);

            console.log("validated")

           
            return next();
     } catch (err) {
         

         console.log(err);
         return res.status(400).json(err);
     }
};

module.exports=validateWithZod



