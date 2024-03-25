import sliderImage from "../Models/sliderImage.js";
import cloudinary from "../utils/cloudinary.js";

export const AddSliderImage = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "auto",
    folder: "slider",
  });
  const { link } = req.body;
  if (!upload) {
    return res.json({
      success: false,
      message: "please enter the upload",
    });
  }
  if (!link) {
    return res.json({
      success: false,
      message: "please enter the link",
    });
  }
  try {
    const newSliderImage = await sliderImage.create({
      link,
      image: upload.secure_url,
    });
    if (newSliderImage) {
      res.json({
        success: true,
        message: "Add successful",
        newSliderImage,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const allSlider = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;
  const extractAllSlider = await sliderImage.find()
    .skip(page * limit)
    .limit(limit);

  const sliderCount = await sliderImage.countDocuments();

  const pageCount = parseInt(sliderCount / limit);

  if (extractAllSlider) {
    return res.json({
      success: true,
      sliderCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllSlider,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Slider",
    });
  }
};

export const deleteSlider = async (req, res) => {
  const { id } = req.params;

  const slider = await sliderImage.findByIdAndDelete(id);

  if (slider) {
    return res.json({
      success: true,
      message: "the slider was deleted",
    });
  }
  if (!slider) {
    return res.json({
      success: false,
      message: "No slider found with this ID",
    });
  }
};

export const updateSlider = async (req, res) => {
  const { id } = req.params;
  const { link } = req.body

  const slider = await sliderImage.findByIdAndUpdate({ _id: id },{}, {
    new: true,
  });

  if (slider) {
    return res.json({
      success: true,
      message: "the slider was updated",
    });
  }
  if (!slider) {
    return res.json({
      success: false,
      message: "No slider found with this ID",
    });
  }
};
