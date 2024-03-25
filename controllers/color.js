import Color from "../Models/color.js";

export const addColor = async (req, res) => {
  const { label } = req.body;
  if (!label) {
    return res.json({
      success: false,
      message: "please enter the label",
    });
  }
  const newColor = await Color.create({
    label,
    value:label
  });
  if (newColor) {
    res.json({
      success: true,
      message: "Add successful",
      newColor,
    });
  }
};
export const allColor = async (req, res) => {
    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 9;
  
    const ColorCount = await Color.countDocuments();
    const extractAllColor = await Color.find()
    .skip(page * limit)
    .limit(limit);
  
    const pageCount = parseInt(ColorCount / limit);
  
    if (extractAllColor) {
      return res.json({
        success: true,
        ColorCount,
        page: page + 1,
        pageCount: pageCount + 1,
        data: extractAllColor,
      });
    } else {
      return res.json({
        success: false,
        message: "No found Color",
      });
    }
  };
  export const deleteColor = async (req, res) => {
    const { id } = req.params;
  
    const color = await Color.findByIdAndDelete(id);
  
    if (color) {
      return res.json({
        success: true,
        message: "the color was deleted",
      });
    }
    if (!color) {
      return res.json({
        success: false,
        message: "No color found with this ID",
      });
    }
  };