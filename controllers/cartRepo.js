const Cart = require("../models/cartModel");
const cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "title price total"
    });;
    return carts[0];
};

const cartById = async (req, res) => {
    const carts = await Cart.findById({ _id: req.params.id });
    res.send(carts)
};

const addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}

module.exports = { cart, addItem, cartById }
