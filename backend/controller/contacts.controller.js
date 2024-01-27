const {Contacts} = require("../model/contact.model")

exports.getContacts = async (req, res) => {
    let contactList = await Contacts.find({});
    if ( contactList) {
        res.status(200).json({message: "Success", data: contactList});
    } else {
        res.status(400).json({message: "Internal Server Error"});
    }  
}

exports.saveContacts = async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
  
    try {
      let existingContact = await Contacts.exists({ phone: phone });
  
      if(existingContact) {
        res.status(400).json({message: "Contact already exist."})
      } else {
        let newContact = new Contacts ({
          name: name,
          email: email,
          phone: phone
        });
    
        if (newContact) {
          let savedContact = await newContact.save();
          res.status(200).json({message: "Success", contact: savedContact});  
        } else {
          res.status(400).json({message: "Bad Request: Invalid data"});
        };  
      }
    } catch(err) {
      console.log(err);
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  exports.updateContact = async (req, res) => {
    let id = req.body._id;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
  
    let contactExist = await Contacts.exists({ _id: id });
    if (contactExist) {
      try {
        let oldValue = await Contacts.findOneAndUpdate(
            { _id: id},
            {$set: {
                "name": name,
                "email": email,
                "phone": phone
            }},
            {useFindAndModify: false}
        );
        let newValue = await Contacts.findOne({ _id: id });
        if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
            res.status(200).json({
                status: 200,
                message: "No changes were made!",
            });  
        } else {
            res.status(200).json({
                status: 200,
                message: "Successfully updated!",
            });  
        };
      } catch (err) {
          res.status(500).json({message: "Internal Server Error!"});
      }
    }
  }

  exports.deleteContact = async (req, res) => {
    let id = req.query._id;
  
    try {
        const contactExist = await Contacts.exists({ _id: id });
        if (contactExist) {
            const result = await Contacts.findOneAndDelete({ _id: id });
            
            if (result) {
                res.status(200).json({
                    status: 200,
                    message: "Successfully deleted!",
                });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };

  exports.getContact = async (req, res) => {
    let id = req.query._id;
    let contact = await Contacts.find({ _id: id });
  
    if (contact) {
        res.status(200).json({message: "Success", data: contact});
    } else {
        res.status(400).json({message: "Internal Server Error"});
    }  
  }
  