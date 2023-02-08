import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.get("/api/categories", listCategories);
router.post("/api/categories", createCategory);
router.get("/api/categories/:categoryId/products", listProductsByCategory);

router.get("/api/products", listProducts);
router.post("/api/products", upload.single("image"), createProduct);

router.get("/api/orders", listOrders);
router.post("/api/orders", createOrder);
router.patch("/api/orders/:orderId", changeOrderStatus);
router.delete("/api/orders/:orderId", cancelOrder);
