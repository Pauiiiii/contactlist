const express = require("express");
const router = express.Router();
const contactController = require("../controller/contacts.controller");

router.get("/", contactController.getContacts);
router.get("/contact", contactController.getContact );
router.post("/save", contactController.saveContacts);
router.patch("/update", contactController.updateContact);
router.delete("/delete", contactController.deleteContact);
module.exports = router;