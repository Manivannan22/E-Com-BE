

const registerService = async(payload)=>{
    try {
        let result=await Product.create(payload)

        if(result){
            return {
                status:true,
                data:result
            }
        }
        else{
            return {
                status:false,
                data:result
            }
        }

    } catch (error) {
        console.log("Error From Product Service -Get Product",error);
        throw error
    }
}


export { registerService }