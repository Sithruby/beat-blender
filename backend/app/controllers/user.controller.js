const db = require('../models');
const User = db.User;

exports.create = (req,res)=>{
    if(!req.body.name || !req.body.email||!req.body.password){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a employee
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    console.log("User", user);
  
    user
    .save()
    .then(data => {
        res.json({ success: true, data });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the user record."
        });
    });
}