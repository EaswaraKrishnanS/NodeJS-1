const express = require('express')
const router = express.Router()
const uuid = require('uuid')

let User = require('../../User');

//get all user 

router.get('/',(req,res) => {
    res.json(User)
});

//get user by id

router.get('/:id',(req,res) => {
    const found = User.some(User => User.id === parseInt(req.params.id))

    if(found){
        res.json(User.filter(User => User.id === parseInt(req.params.id)))
    }else{
        res.sendStatus(400)
    }
})


//create a new user 

router.post('/',(req,res) => {
    const newUser = {
        id : uuid.v4(),
        name : req.body.name,
        location : req.body.location
    }

    if(!newUser.name || !newUser.location) {
        return res.sendStatus(400)
    }

    User.push(newUser)
    res.json(User)
})

//update user

router.put('/:id',(req,res) => {
    const found = User.some(User => User.id === parseInt(req.params.id))
    
    if(found) {
        const updateUser = req.body;
        User.forEach(User => {
            if(User.id === parseInt(req.params.id)){
                User.name = updateUser.name ? updateUser.name : User.name
                User.location = updateUser.location ? updateUser.location : User.location
                res.json({msg : 'User Upadted Succesfully', User})
            }
        })
    }
})

//delete user

router.delete('/:id',(req,res) => {
    const found = User.some(User => User.id === parseInt(req.params.id))

    if (found) {
        User = User.filter(User => User.id !== parseInt(req.params.id))
        res.json({msg : 'User Deleted Successfully',User})
    } else {
        res.sendStatus(400)
    }
});

module.exports = router