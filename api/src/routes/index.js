const { Router } = require("express");

const addOneSneakerCart = require("./functions/addOneSneakerCart.js");
const addSneakersCart = require("./functions/addSneakersCart.js");
const createUser = require("./functions/createUser.js");
const getBrands = require("./functions/getBrands.js");
const getCategories = require("./functions/getCategories.js");
const getSneakerId = require("./functions/getSneakerId.js");
const getSneakers = require('./functions/getSneakers');
const getSneakersAll = require("./functions/getSneakersAll.js");
const getSneakersCart = require("./functions/getSneakersCart.js");
const getAllUsers = require("./functions/getAllUsers.js");
const deleteUser = require("./functions/deleteUser.js");
const createCategory = require("./functions/createCategory.js");
const deleteCategory = require("./functions/deleteCategory.js");
const createModel = require("./functions/createModel.js");
const createSneaker = require('./functions/createSneaker');
const payment = require("./functions/payment.js");
 const{ emailer}= require("./functions/emailer.js");
const getModels = require("./functions/getModels")
const getColors = require("./functions/getColors");
const getMaterials = require("./functions/getMaterials")
const getSizes = require("./functions/getSizes");
const deleteSneaker = require("./functions/deleteSneaker.js");
const deleteModel = require("./functions/deleteModel.js");
const updateSneaker = require("./functions/updateSneaker.js");
const createOrder = require("./functions/createOrder.js");
const getOrders = require("./functions/getOrders.js")
const getOrdersById = require("./functions/getOrderById");
const getUserById = require("./functions/getUserById.js");
const getOrderByUser = require("./functions/getOrderByUser.js");

const router = Router();


//admin
router.get("/getUser", getAllUsers)
router.get("/getUserBy/:id", getUserById)
router.put("/deleteUser/:id", deleteUser)
router.put("/deleteCategory/:id", deleteCategory)
router.put("/deleteModel/:id", deleteModel)
router.put("/updateSneaker/:id", updateSneaker)
router.post("/createCate", createCategory)
router.post("/createModel", createModel)
router.post("/createSneaker", createSneaker)
router.get("/getModels", getModels)
router.get("/getColors", getColors)
router.get("/materials", getMaterials)
router.get("/sizes", getSizes)
router.put("/deleteSneaker/:id", deleteSneaker)

router.get("/getOrders", getOrders)
router.get("/getOrders/:id", getOrdersById)
router.get("/getOrdUser/:id", getOrderByUser)
router.post("/createOrder", createOrder)

//users
router.post("/user", createUser);
router.get("/sneakers", getSneakers);
router.get("/sneakersall", getSneakersAll);
router.get("/brands", getBrands);
router.get("/categories", getCategories);
router.get("/sneaker/:id", getSneakerId);
router.get("/getSneakersCart/:id", getSneakersCart);
router.post("/addonesneakercart", addOneSneakerCart);
router.post("/addsneakerscart", addSneakersCart);

//Payment
router.post("/payment", payment);

//mailer
 router.post("/send-email",emailer);



module.exports = router;