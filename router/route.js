const router = require("express").Router();
const authenticateCustomer = require("../authentication/authenticateCustomer");
const {
  login,
  getUserDetails,
  getProductDetails,
} = require("../controller/controller");
const {
  loginValidation,
  getUserDetailsValidation,
  getProductDetailsValidation,
} = require("../validation/validationController");

router.get("/", (req, res, next) => res.send("Server Running"));
router.post("/login", loginValidation, login);
router.get(
  "/get-user-details",
  getUserDetailsValidation,
  authenticateCustomer,
  getUserDetails
);
router.get(
  "/get-product-details",
  getProductDetailsValidation,
  getProductDetails
);

module.exports = router;
