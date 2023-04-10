const express = require('express')
const router = express.Router()
const multer = require('multer')
const usersCltr = require('../app/controllers/usersCltr')
const authenticateUser = require('../app/middlewares/authenticate')
const notesCltr = require('../app/controllers/notesCltr')
const categoriesCltr = require('../app/controllers/categoriesCltr')
const expensesCltr = require('../app/controllers/expensesCltr')
const profilesCltr = require('../app/controllers/profilesCltr')

// auth
router.post('/api/users/register', usersCltr.register)
router.post('/api/users/login', usersCltr.login)
router.get('/api/users/account', authenticateUser, usersCltr.account)
router.delete('/api/users/delete-account', authenticateUser, usersCltr.deleteAccount)

// profile picture
const upload = multer({dest: 'uploads/'})
router.post('/api/upload-profile', upload.single('file'), authenticateUser, usersCltr.profile)
router.get('/api/upload-profile', authenticateUser, usersCltr.getProfile)

// notes CRUD for single user
router.get('/api/notes', authenticateUser, notesCltr.list)
router.post('/api/notes', authenticateUser, notesCltr.create)
router.get('/api/notes/:id', authenticateUser, notesCltr.show)
router.put('/api/notes/:id', authenticateUser, notesCltr.update)
router.delete('/api/notes/:id', authenticateUser, notesCltr.destroy)


// profile info
router.post('/api/profile-info', authenticateUser, profilesCltr.create)
router.get('/api/profile-info', authenticateUser, profilesCltr.show)
router.put('/api/profile-info/:id', authenticateUser, profilesCltr.update)


module.exports = router