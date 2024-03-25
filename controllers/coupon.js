import Coupon from "../Models/coupon.js";
import User from "../Models/user.js";

export const addCoupon = async (req, res) => {
  const { expiry, name, discount } = req.body;
  if (!name) {
    return res.json({
      success: false,
      message: "please enter the name",
    });
  }
  if (!expiry) {
    return res.json({
      success: false,
      message: "please enter the expiry",
    });
  }
  if (!discount) {
    return res.json({
      success: false,
      message: "please enter the discount",
    });
  }
  const newCoupon = await Coupon.create({
    name,
    expiry,
    discount,
  });
  if (newCoupon) {
    res.json({
      success: true,
      message: "Add successful",
      newCoupon,
    });
  }
};

export const allCoupon = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const CouponCount = await Coupon.countDocuments();
  const extractAllCoupon = await Coupon.find()
    .skip(page * limit)
    .limit(limit);

  const pageCount = parseInt(CouponCount / limit);

  if (extractAllCoupon) {
    return res.json({
      success: true,
      CouponCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllCoupon,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Coupon",
    });
  }
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);

  if (coupon) {
    return res.json({
      success: true,
      message: "the Coupon was deleted",
    });
  }
  if (!coupon) {
    return res.json({
      success: false,
      message: "No Coupon found with this ID",
    });
  }
};

export const checkCoupon = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  if (!name) {
    return res.json({
      success: false,
      message: "please enter the coupon",
    });
  }

  try {
    const check = await Coupon.findOne({ name });
    if (!check) {
      return res.json({
        success: false,
        message: "the coupon is not available",
      });
    }

    const alreadyUsed = check.userID.find(
      (id) => id.toString() === req.user._id.toString()
    );
    if (alreadyUsed) {
      return res.json({
        success: false,
        message: "you already used this coupon",
      });
    } else {
      let couponData = await Coupon.findOneAndUpdate(
        { name: name },
        {
          $push: { userID: _id },
        },
        {
          new: true,
        }
      );
      return res.json({
        success: true,
        message: "added coupon successfully",
        discount: check.discount,
        couponData,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
