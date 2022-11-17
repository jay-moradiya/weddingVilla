const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.post("/cart", cartController.addItemToCart);
router.get("/cart", cartController.getCart);
router.get("/cart/:id", cartController.getCartById);
router.delete("/empty-cart", cartController.emptyCart);

module.exports = router;