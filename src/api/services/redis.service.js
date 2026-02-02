
const   {createClient}  =require( "redis");



const redis = async()=>{
try {
  const client=  await createClient().connect();
  console.log(client)
  return client
} catch (error) {
    console.log("error while connecting with redis",error)
}
}




const setCacheValue= async(key,value)=>{
try{
    const client = await redis();
await client.set(key, value);
    return true
}catch(error){
    return false
}
    
}
const getCacheValue=async(key)=>{
const client = await redis();
    const value = await client.get(key);
    return value
}

module.exports = {setCacheValue,getCacheValue}
