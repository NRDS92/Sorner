import express from "express"

import { placeOrder, gateaway, allOrders, userOrders, updateStatus } from "../controllers/OrderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"


const orderRouter = express.Router()

orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)


orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,gateaway)


orderRouter.post("/userOrders",authUser,userOrders)


export default orderRouter;




