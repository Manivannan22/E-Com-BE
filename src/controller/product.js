import Product from "../model/product.js";

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

    res.status(200).json({
      data: product,
      message: "Successfully Product Created",
    });

    // product.save((error, product) => {
    //   if (error) {
    //     return res.status(400).json({ error });
    //   } else {
    //     res.status(200).json({
    //       data: product,
    //       message:"Successfully Product Created"
    //     });
    //   }
    // });
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const get_Products = await Product.find({ status: true });
    res.status(200).json({
      data: get_Products,
      message: "Successfully Product Created",
    });
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};

const getSingleProduct = async (req, res) => {
  const {id} = req.query
  try {
    const get_SingleProducts = await Product.find({ status: true, _id:id});
    return res.status(200).json({
      data: get_SingleProducts[0],
      message: "Successfully Product Created",
    });
  } catch (error) {
    console.log("error",error);
    res.status(400).json({ message: "server error" });
  }
};

const getAddToCart = async (req, res) => {
  const {productId, quentity} = req.queryt
  try {
    const get_SingleCart = await Product.create({ status: true, _id:id, quantity: id});
    return res.status(200).json({
      data: get_SingleCart[0],
      message: "Successfully AddToCart",
    });
  } catch (error) {
    console.log("error",error);
    res.status(400).json({ message: "Not Defined" });
  }
};

const addToCart = id => {
  let Cart = [...this.state.cart];
  let Products = [...this.state.storeProducts];
  let Item = cart.find(item => item.id === id);
  if(!item){
    Item = Products.find(item => item.id === id);
    let total = item.prise;
    let cartItem = {...item, count:1, total};
    cart.push(cartItem)
  } else {
    item.count++;
    item.total = item.price * item.count;
  } 
  this.setState({ cart });
};


export { createProduct, getProduct, getSingleProduct, getAddToCart, addToCart };
