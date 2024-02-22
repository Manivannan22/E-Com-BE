import Product from "../model/product.js";
import { STATUS_CODE } from "../utils/status.js";
import  {response}  from "../utils/response.js";
import {getProductService, getSingleProductService, getAddToCartService} from '../services/productService.js'
import AddToCart from "../model/addtocart.js";

const createProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      category,
      createdBy: new Date(),
    });
    let resposeData = response(
      "Successfully product",
      product[0],
      true,
      STATUS_CODE.success
    );
    return res.send(resposeData);
    // res.status(200).json({
    //   data: product,
    //   message: "Successfully Product Created",
    // });
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const get_Products = await getProductService()
    console.log(get_Products);
    if(get_Products){
      let resposeData = response(
        "Successfully AddToCart",
        get_Products.data,
        true,
        STATUS_CODE.success
      );
      return res.send(resposeData);
    }
   
    // res.status(200).json({
    //   data: get_Products,
    //   message: "Successfully Product Created",
    // });
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const get_SingleProducts = await getSingleProductService(id);
    if (get_SingleProducts){
      let resposeData = response(
        "Successfully Singleproduct",
        get_SingleProducts[0],
        true,
        STATUS_CODE.success
      );
      return res.send(resposeData);
    }
    // return res.status(STATUS_CODE.success).json({
    //   data: get_SingleProducts[0],
    //   message: "Successfully Product Created",
    // });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "server error" });
  }
};

const getAddToCart = async (req, res) => {
  const { productId, quantity } = req.query;
  try {
    const getSingleCart = await getAddToCartService();
    if(getSingleCart) {
      let resposeData = response(
        "Successfully getAddToCart",
        getSingleCart[0],
        true,
        STATUS_CODE.success
      );
      return res.send(resposeData);
    } 
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Not Defined" });
  }
};

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const addToCart = await AddToCart.create({
      userId: userId,
      ProductId: productId,
    });
    let resposeData = response(
      "Successfully added to Cart",
      addToCart[0],
      true,
      STATUS_CODE.success
    );
    return res.send(resposeData);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Not Defined" });
  }
};

export { createProduct, getProduct, getSingleProduct, getAddToCart, addToCart };
