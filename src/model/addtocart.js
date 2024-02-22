import mongoose from "mongoose";
const addToCartShema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    ProductId: {
      type: Number,
      required: true,
      trim: true,
    },
    status:{
      type:Boolean,
      default:true,
      
    }
  },
  { timestamps: true }
);
 let AddToCart = mongoose.model("addtocart", addToCartShema);
 export default AddToCart
