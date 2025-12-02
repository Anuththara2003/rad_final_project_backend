
import { Router } from "express";
import { addProduct, deleteProduct, getProducts, getRecommendations, updateProduct } from "../controller/product.Controller";

const routes = Router();

routes.post("/", addProduct);
routes.get("/", getProducts);
routes.post("/recommend", getRecommendations);
routes.put("/:id", updateProduct);
routes.delete("/:id", deleteProduct);





export default routes;