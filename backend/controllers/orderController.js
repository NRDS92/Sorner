import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

// placing order COD

const placeOrder = async (req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()

        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cardData:{}})

        res.json({success:true, message: "Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// placing order stripe

const gateaway = async (req, res)=>{
    
}

// display orders admin

const allOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// user data Frontend

const userOrders = async (req, res)=>{
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// update order status from admin

const updateStatus = async (req, res)=>{
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message:"sStatus Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {placeOrder, gateaway, allOrders, userOrders, updateStatus}