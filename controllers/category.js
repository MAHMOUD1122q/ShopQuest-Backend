import Category from "../Models/category.js";
import cloudinary from "../utils/cloudinary.js";


export const addCategory = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "auto",
    folder: "slider",
  });
  const { name } = req.body;
  if (!upload) {
    return res.json({
      success: false,
      message: "please enter the upload",
    });
  }
  if (!name) {
    return res.json({
      success: false,
      message: "please enter the link",
    });
  }
  try {
    const newCategory = await Category.create({
      name,
      image: upload.secure_url,
    });
    if (newCategory) {
      res.json({
        success: true,
        message: "Add successful",
        newCategory,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  const {id} = req.params

  const category = await Category.findByIdAndUpdate({_id:id},req.body,{new:true});

  if (category) {
    return res.json({
      success: true,
      message: "the category was updated",
      data: category,
    });
  } else {
    return res.json({
      success: false,
      message: "No found category",
    });
  }
}

export const allCategory = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const categoryCount = await Category.countDocuments();
  const extractAllCategory = await Category.find()
  .skip(page * limit)
  .limit(limit);

  const pageCount = parseInt(categoryCount / limit);

  if (extractAllCategory) {
    return res.json({
      success: true,
      categoryCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllCategory,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Category",
    });
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

    await cloudinary.uploader.destroy(
      category.image
    );


  if (category) {
    return res.json({
      success: true,
      message: "the category was deleted",
    });
  }
  if (!category) {
    return res.json({
      success: false,
      message: "No category found with this ID",
    });
  }
};
