const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
    {
        name: String,
        email: String,
        phone: String
    }
);

const Contacts = mongoose.model("contacts", ContactSchema);
module.exports = {Contacts};
