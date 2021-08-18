import  express from 'express';
import  axios from 'axios'
let  router = express.Router()
const { getWorks, getWorkById, createWork, updateWork, deleteWork } = require('../controllers/works');
let  { withAuth } = require('../middleware/auth')
let  { checkJWT, getToken, checkRole } = require('../controllers/auth')

// Get all works
router.get('', getWorks)

// Get a work by id
router.get('/:id', getWorkById)

// Post new work
router.post('', checkJWT, checkRole('admin'), createWork)

// Update new work
router.patch('/:id', checkJWT, checkRole('admin'), updateWork)

// Delete a work
router.delete('/:id', checkJWT, checkRole('admin'), deleteWork)



module.exports = router

