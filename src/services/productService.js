
import Product from "../model/product.js";

const getProductService=async()=>{
    try {
        let result=await Product.find({ status: true })

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

const getSingleProductService=async(id)=>{
    try {
        let result=await Product.find({ id:id })

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

const getAddToCartService=async(productId, quantity)=>{
    try {
        let result=await Product.find({_id: productId, quantity:quantity })

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

const addToCartService=async(userId, productId)=>{
    try {
        let result=await Product.find({userId:userId, productId:productId })

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


export { getProductService, getSingleProductService, getAddToCartService, addToCartService }