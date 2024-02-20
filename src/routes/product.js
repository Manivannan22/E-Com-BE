import  express  from "express";
import { createProduct ,getProduct, getSingleProduct, getAddToCart, addToCart} from "../controller/product.js";
import { Login, Register } from "../controller/login.js";

const router = express.Router()
router.post("/create_product", createProduct);
router.get("/get_product", getProduct);
router.get("/get_singleproduct", getSingleProduct);
router.post("/add_ToCart", addToCart);
router.get("/get_singleCart", getAddToCart);
router.post("/sign_up", Register);
router.post("/log_in", Login);


export default router

