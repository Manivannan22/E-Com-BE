import Product from "../model/product.js";
import { STATUS_CODE } from "../utils/status.js";
import { response } from "../utils/response.js";
import {
  getProductService,
  getSingleProductService,
  getAddToCartService,
  addToCartService,
  createProductService,
} from "../services/productService.js";
import AddToCart from "../model/addtocart.js";

const createProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  let payload = {
    name,
    price,
    quantity,
    description,
    category,
    createdBy: new Date(),
  };
  try {
    const product = await createProductService(payload);
    let resposeData = response(
      "Successfully product",
      product[0],
      true,
      STATUS_CODE.success
    );
    return res.send(resposeData);
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const get_Products = await getProductService();
    if (get_Products) {
      let resposeData = response(
        "Successfully AddToCart",
        get_Products.data,
        true,
        STATUS_CODE.success
      );
      return res.send(resposeData);
    }
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

// const getSingleProduct = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const get_SingleProducts = await getSingleProductService(id);
//     console.log(get_SingleProducts);
//     if (get_SingleProducts) {
//       let resposeData = response(
//         "Successfully Singleproduct",
//         get_SingleProducts.data[0],
//         true,
//         STATUS_CODE.success
//       );
//       return res.send(resposeData);
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json({ message: "server error" });
//   }
// };

const getSingleProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const get_SingleProducts = await getSingleProductService(id);
    console.log(get_SingleProducts);
    if (get_SingleProducts) {
      let resposeData = response(
        "Successfully Singleproduct",
        get_SingleProducts.data[0],
        true,
        STATUS_CODE.success
      );
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "server error" });
  }
};

// const getAddToCart = async (req, res) => {
//   const { productId, quantity } = req.query;
//   try {
//     const getSingleCart = await getAddToCartService();
//     if (getSingleCart) {
//       let responseData = response(
//         "Successfully getAddToCart",
//         getSingleCart[0],
//         true,
//         STATUS_CODE.success
//       );
//       return res.send(resposeData);
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.status(400).json({ message: "Not Defined" });
//   }
// };

const getAddToCart = async (req, res) => {
  const { productId, quantity } = req.query;
  try {
    const getSingleCart = await getAddToCartService();
    if (getSingleCart) {
      let responseData = response(
        "Successfully getAddToCart",
        getSingleCart[0],
        true,
        STATUS_CODE.success
      );
      return res.send(responseData);
    }
   } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Not Defined" });
   }
};

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    console.log(req.body, "adding cattttttt");
    const productIdToFind = 2;
    const foundProduct = Product.find(
      (product) => product.id === productIdToFind
    );
                                                  
    if (foundProduct) {
      console.log("Product found:", foundProduct);
      if(addToCart) {
          let resposeData = response(
            "Successfully added to Cart",
            addToCart[0],
            true,
            STATUS_CODE.success
          );
          return res.send(resposeData);
        }
    } else {
      console.log("Product not found");
    }
    // const addToCart = await addToCartService();
    // if(addToCart) {
    //   let resposeData = response(
    //     "Successfully added to Cart",
    //     addToCart[0],
    //     true,
    //     STATUS_CODE.success
    //   );
    //   return res.send(resposeData);
    // }
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Not Defined" });
  }
};

export { createProduct, getProduct, getSingleProduct, getAddToCart, addToCart };
