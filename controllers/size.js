import Size from "../Models/size.js";

export const addSize = async (req, res) => {
  const { label} = req.body;
  if (!label) {
    return res.json({
      success: false,
      message: "please enter the label",
    });
  }
  const newSize = await Size.create({
    label,
    value:label
  });
  if (newSize) {
    res.json({
      success: true,
      message: "Add successful",
      newSize,
    });
  }
};

export const allSize = async (req, res) => {
    const page = req.query.page - 1 || 0;
    const limit = req.query.limit || 9;
  
    const SizeCount = await Size.countDocuments();
    const extractAllSize = await Size.find()
    .skip(page * limit)
    .limit(limit);
  
    const pageCount = parseInt(SizeCount / limit);
  
    if (extractAllSize) {
      return res.json({
        success: true,
        SizeCount,
        page: page + 1,
        pageCount: pageCount + 1,
        data: extractAllSize,
      });
    } else {
      return res.json({
        success: false,
        message: "No found Size",
      });
    }
  };
  
  export const deleteSize = async (req, res) => {
    const { id } = req.params;
  
    const size = await Size.findByIdAndDelete(id);
  
    if (size) {
      return res.json({
        success: true,
        message: "the size was deleted",
      });
    }
    if (!size) {
      return res.json({
        success: false,
        message: "No size found with this ID",
      });
    }
  };