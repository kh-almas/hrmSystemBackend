// require
const express = require("express");
const userVerify = require("../../../middlewares/auth/user.verify");
const {addProductList, getProductList, updateProductList, deleteProductList, addProductOptions, getProductOptions} = require("../../../controllers/inventory-management/product/product-list/product.list.controller");
const addProductListValidation = require("../../../validations/inventory-management/product/product-list/add.product.list.validation");
const paramsValidation = require("../../../validations/shared/params.validation");
const multer = require('multer');
const path = require("path");

// router
const productRouter = express.Router();

// use
productRouter.use(userVerify);

// file upload starts

// storage configuration
const storage = multer.diskStorage({
    // where to save uploaded files
    destination: function (req, file, cb) {
        cb(null, "./src/uploads");
    },
    // what will be the files names
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const newFileName = file.originalname.replace(fileExt, "").toLocaleLowerCase().split(" ").join("-").concat(`-${Date.now()}${fileExt}`);
        cb(null, newFileName);
    },
});

// what kinds files to be accepted
const fileFilter = function (req, file, cb) {
    if (file.fieldname === "images") {
        if (file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(new Error("jpg or jpeg only!"));
        }
    } else {
        cb(new Error("File type error!"));
    }
};

// initialize upload object
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 30000000000000000000,
        fileSize: 30000000, // 2 * 1000 * 1000 in bytes 2 mb
    },
    fileFilter: fileFilter,
});

// to catch file from the frontend with fields and count of files
const cpUpload = upload.fields([
    { name: "images", maxCount: 30 }
]);


const fs = require('fs/promises');

const myMiddleware = async (req, res, next) => {
    try {
        const variantsText = req.body?.variant_sku;

        if (variantsText){
            const sku = JSON.parse(variantsText);
            for (let key in sku) {
                const base64Images = sku?.[key]?.sku_images;
                const variant = sku?.[key]?.variant

                if (base64Images?.length > 0) {
                    for (let i = 0; i < base64Images.length; i++) {
                        const base64String = base64Images[i];

                        const dataUrlRegex = /^data:image\/(\w+);base64,/;
                        const matches = base64String.match(dataUrlRegex);
                        if (!matches || matches?.length < 2) {
                            throw new Error('Invalid base64 image format');
                        }
                        const imageType = matches[1];
                        const base64Data = base64String.replace(dataUrlRegex, '');
                        const buffer = Buffer.from(base64Data, 'base64');
                        const filename = `custom_image_${Date.now()}_${i}.${imageType}`;
                        const folderPath = path.join(__dirname, 'uploads');
                        const filePath = path.join(folderPath, filename);
                        await fs.mkdir(folderPath, { recursive: true });
                        await fs.writeFile(filePath, buffer);
                        sku[key].sku_images[i] = filename;
                    }
                }

                sku[key].variant = JSON.stringify(variant) || {};
            }

            req.body.variant_sku = JSON.stringify(sku);
        }
        next();

    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send('Error: ' + error.message);
    }
};
// post
productRouter.post("/add", [cpUpload, myMiddleware], addProductList);

productRouter.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        if (err instanceof multer.MulterError) {
            return res.status(403).json({
                status: "multer error",
                body: { message: err.message },
            });
        } else {
            return res.status(403).json({
                status: "file error",
                body: { message: err.message },
            });
        }
    } else {
        return res.status(200).json({
            status: "ok",
            body: { message: "success" },
        });
    }
});

// get
productRouter.get("/list", getProductList);

// update
productRouter.put(
  "/update-product/:id",
  [paramsValidation, addProductListValidation],
  updateProductList
);

// delete
productRouter.delete(
  "/delete-product/:id",
  [paramsValidation],
  deleteProductList
);


// post
productRouter.post("/options/add", addProductOptions);

// get
productRouter.get("/options/list", getProductOptions);


// post
productRouter.post("/upload/sku/image", addProductOptions);


// export
module.exports = productRouter;
