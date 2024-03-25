import Address from "../Models/address.js";

export const AddNewAddress = async (req, res) => {
  const { fullName, address, mobile, anotherMobile, country } = req.body;
  if (!fullName) {
    return res.json({
      success: false,
      message: "please enter fullname",
    });
  }
  if (!address) {
    return res.json({
      success: false,
      message: "please enter address",
    });
  }
  if (!mobile) {
    return res.json({
      success: false,
      message: "please enter mobile",
    });
  }
  if (!country) {
    return res.json({
      success: false,
      message: "please enter country",
    });
  }
  const newlyAddedAddress = await Address.create({ fullName, address, mobile, anotherMobile, country, userID : req.user._id });
  
  if (newlyAddedAddress) {
    return res.json({
      success: true,
      message: "Address added successfully",
    });
  } else {
    return res.json({
      success: false,
      message: "failed to add an address ! Please try again later",
    });
  }
};

export const deleteAddress =async (req, res) => {
    const {id} = req.params

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (deletedAddress) {
      return res.json({
        success: true,
        message: "Address is deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "failed to delete address ! Please try again",
      });
    }
}

export const allAddress = async (req, res) => {

    const getAllAddresses = await Address.find({ userID: req.user._id });
    if (getAllAddresses) {
        return res.json({
          success: true,
          data: getAllAddresses,
        });
      } else {
        return res.json({
          success: false,
          message: "failed to get addresses ! Please try again",
        });
      }
}
