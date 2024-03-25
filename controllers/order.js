import Cart from "../Models/cart.js";
import Order from "../Models/orders.js";

export const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice, status } = req.body;

  const saveNewOrder = await Order.create({
    user : req.user._id,
    totalPrice,
    orderItems,
    shippingAddress,
    status
  },);
  if (saveNewOrder) {
    await Cart.deleteMany({ userID: req.user._id });
    return res.json({
      success: true,
      message: "Products are on the way !",
    });
  } else {
    return res.json({
      success: false,
      message: "Failed to create a order ! Please try again",
    });
  }
};

export const allOrders = async (req, res) => {

  const extractAllOrders = await Order.find({ user: req.user._id }).populate(
    "orderItems"
  ).sort({createdAt:-1});
  if (extractAllOrders) {
    return res.json({
      success: true,
      data: extractAllOrders,
    });
  } else {
    return res.json({
      success: false,
      message: "Failed to get all orders ! Please try again",
    });
  }
}
export const allOrdersAdmin = async (req, res) => {
  const extractAllOrders = await Order.find().populate(
    "orderItems"
  ).sort({createdAt:-1});
  const extractOrdersCount = await Order.find().countDocuments()
  if (extractAllOrders) {
    return res.json({
      success: true,
      extractOrdersCount,
      data: extractAllOrders,
    });
  } else {
    return res.json({
      success: false,
      message: "Failed to get all orders ! Please try again",
    });
  }
}