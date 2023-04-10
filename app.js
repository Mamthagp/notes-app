const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./app/models/user')
const PORT = 4040
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
mongoose.connect('mongodb://localhost:27017/notes-app')
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connected to db')
    })

app.use(express.json())
app.use(cors())

app.post('/api/user/register', function(req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.post('/api/user/login', function(req, res){
    const body = req.body
    User.findOne({email: body.email})
        .then((user) => {
            if(user){
                bcrypt.compare(body.password, user.password)
                    .then((match) => {
                        if(match){
                            const tokenData = {
                                id: user._id
                            }
                            const token = jwt.sign(tokenData, 'dct123')
                            res.json({
                                token: `Bearer ${token}`
                            })
                        }else{
                            res.json({
                                errors : 'invalid email or password'
                            })
                        }
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }else{
                res.json({
                    errors : 'invalid email or password'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
})

app.listen(PORT, () => {
    console.log('server running on', PORT)
})