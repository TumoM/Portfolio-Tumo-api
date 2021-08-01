let express = require('express');
let axios = require('axios')
let router = express.Router()
const { getProjects, getProjectById, createProject, updateProject, deleteProject} = require('../controllers/projects');
const { withAuth } = require('../middleware/auth')
const { checkJWT, getToken, checkRole } = require('../controllers/auth')

// Get all portfolios
router.get('', getProjects)

// Get a portfolio by id
router.get('/:id', getProjectById)

// Post new portfolio
router.post('', checkJWT, checkRole('admin'), createProject)

// Update new portfolio
router.patch('/:id', checkJWT, checkRole('admin'), updateProject)

// Delete a portfolio
router.delete('/:id', checkJWT, checkRole('admin'), deleteProject)



module.exports = router

