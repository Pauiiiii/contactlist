const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://paupauabrenica16:wGIhFW4PIAVZZvGS@paulodb.p5afqbq.mongodb.net/ContactList")
.then(
    () => {
        console.log("Successfully connected");
    },
    (err) =>{
        console.log(err);
    }
)

module.exports = mongoose;

