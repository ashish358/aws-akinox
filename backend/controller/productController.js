// import {v2 as cloudinary } from "cloudinary";
// import { json } from "express";
import productModel from "../model/productModel.js";

// import productModel from "../model/productModel.js";
import s3 from "../config/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

// add product
// const addProduct = async (req,res) => {
//     try {
//         const {name,description, price,category,subCategory,colour,bestseller} = req.body

//         const image1 =req.files.image1 && req.files.image1[0];
//         const image2 =req.files.image2 && req.files.image2[0];
//         const image3 =req.files.image3 && req.files.image3[0];
//         const image4 =req.files.image4 && req.files.image4[0];

//         const images = [image1,image2,image3,image4].filter((item) => item !== undefined )

//         let imgesUrl = await Promise.all(
//             images.map(async (item)  => {
//                 let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
//                 return result.secure_url
//             })
//         )

//         const productData = {
//             name,
//             description,
//             category,
//             price:Number(price),
//             subCategory,
//             bestseller:bestseller === "true" ? true : false,
//             colour: JSON.parse(colour),
//             image : imgesUrl,
//             date: Date.now()
//         }

//         console.log(productData);

//         const product = new productModel(productData);
//         await product.save()

//         res.json({success : true , messasge: "product added"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,messasge:error.messasge})
//     }
// }


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, colour, bestseller } = req.body;

    const files = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0],
    ].filter(Boolean);

    let imageUrls = [];

    for (const file of files) {
      const fileName = `products/${Date.now()}-${file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      imageUrls.push(url);
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      colour: JSON.parse(colour),
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// list product
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false,messasge:error.messasge})
    }
}

// remove product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,messasge:"product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,messasge:error.messasge})
    }
}

// single prod info
const singleProduct = async (req,res) =>{
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({success:false,messasge:error.messasge})
    }
}

export {listProduct,addProduct,removeProduct,singleProduct} 