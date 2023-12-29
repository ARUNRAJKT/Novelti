const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')
const userModel = require('./Models/User')
const app = express()
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})



app.post('/create', async (req, res) => {
    UserModel.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

app.put('/update/:id',async(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        zipcode: req.body.zipcode,
    }).then(user=>res.json(user)).catch(err=>res.json(err))
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        UserModel.findByIdAndDelete({ _id: id })
        console.log(deleteId)
        res.status(201).json({ success: true, error: false, message: "User deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: true, message: "not found", data: error })
    }
})


const database = 'mongodb+srv://arunraj44799:arunraj44799@cluster0.lz4ns0y.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(database).then(() => {
    app.listen(4004, () => {
        console.log("Server started at http://localhost:4004");
    });
}).catch((err) => {
    console.log(err)
})