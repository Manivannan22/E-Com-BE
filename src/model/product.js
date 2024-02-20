import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
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
 let Product = mongoose.model("Product", productSchema);
 export default Product
