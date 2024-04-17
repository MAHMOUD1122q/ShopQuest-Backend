import Product from "../Models/product.js";
import cloudinary from "../utils/cloudinary.js";

export const addProduct = async (req, res) => {
  const {
    name,
    price,
    sku,
    category,
    description,
    color,
    sizes,
    status,
    isShow,
    isSale,
    discount,
  } = req.body;

  if (!name) {
    return res.json({
      success: false,
      message: "please enter the name",
    });
  }
  if (!price) {
    return res.json({
      success: false,
      message: "please enter the price",
    });
  }
  if (!description) {
    return res.json({
      success: false,
      message: "please enter the description",
    });
  }
  if (!category) {
    return res.json({
      success: false,
      message: "please enter the category",
    });
  }
  if (!status) {
    return res.json({
      success: false,
      message: "please enter the status",
    });
  }
  try {
    const images = req.files;
    if (!images) {
      return res.json({
        success: false,
        message: "please enter the images",
      });
    }
    const imageUrls = [];
    for (const image of images) {
      const resalt = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
        folder: "products",
      });
      imageUrls.push(resalt.secure_url);
    }

    req.images = imageUrls;

    const newProduct = await Product.create({
      name,
      price,
      sku,
      category,
      description,
      color,
      sizes,
      status,
      isShow,
      isSale,
      discount,
      images: imageUrls,
    });
    if (newProduct) {
      res.json({
        success: true,
        message: "Add successful",
        newProduct,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const allProducts = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const extractAllProducts = await Product.find({ isShow: true })
    .skip(page * limit)
    .limit(limit);

  const extractSaleProducts = await Product.find({ isSale: true, isShow: true })
    .skip(page * limit)
    .limit(limit);

  const ProdcutCount = await Product.countDocuments({ isShow: true });

  const pageCount = parseInt(ProdcutCount / limit);

  if (extractAllProducts) {
    return res.json({
      success: true,
      ProdcutCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllProducts,
      saleData: extractSaleProducts,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
};
export const allProductsAdmin = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const extractAllProducts = await Product.find()
    .skip(page * limit)
    .limit(limit);

  const ProdcutCount = await Product.countDocuments();

  const pageCount = parseInt(ProdcutCount / limit);

  if (extractAllProducts) {
    return res.json({
      success: true,
      ProdcutCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllProducts,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
};
export const productsByCategory = async (req, res) => {
  const { category } = req.params;
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;
  const extractAllProducts = await Product.find({ category: category })
    .skip(page * limit)
    .limit(limit);
  const ProdcutCount = await Product.countDocuments({ category: category });
  const pageCount = parseInt(ProdcutCount / limit);
  if (extractAllProducts) {
    return res.json({
      success: true,
      ProdcutCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllProducts,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
};

export const SingleProduct = async (req, res) => {
  const { id } = req.query;

  const extractProduct = await Product.findById(id);

  if (extractProduct) {
    return res.json({
      success: true,
      data: extractProduct,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i]);
  }

  if (product) {
    return res.json({
      success: true,
      message: "the product was deleted",
    });
  }
  if (!product) {
    return res.json({
      success: false,
      message: "No product found with this ID",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (product) {
    return res.json({
      success: true,
      message: "the product was updated",
    });
  }
  if (!product) {
    return res.json({
      success: false,
      message: "No product found with this ID",
    });
  }
};

export const rating = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    if (!comment) {
      return res.json({
        success: false,
        message: "please enter the comment",
      });
    }
    if (!rating) {
      return res.json({
        success: false,
        message: "please enter the rating",
      });
    }
    // find product
    const product = await Product.findById(req.params.id);
    // check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.json({
        success: false,
        message: "Product Alredy Reviewed",
      });
    }
    // review object
    const review = {
      name: req.user.username,
      img: req.user.image,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to reviews array
    product.reviews.unshift(review);
    // number or reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();
    res.json({
      success: true,
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Review Comment API",
      error,
    });
  }
};

export const searchProduct = async (req,res) => {
  const search = req.query.search || "";
  const extractSearchProduct= await Product.find({
    name: { $regex: ".*" + search + ".*", $options: "i" },
  })
  const ProductCount = await Product.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  if (extractSearchProduct) {
    return res.json({
      success: true,
      ProductCount,
      data: extractSearchProduct,
    });
  } else {
    return res.json({
      success: false,
      message: "No found Medicen",
    });
  }
}