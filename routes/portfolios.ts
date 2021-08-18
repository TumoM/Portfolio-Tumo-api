let express = require('express');
let axios = require('axios')
let router = express.Router()
const { getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio} = require('../controllers/portfolios');
const { withAuth } = require('../middleware/auth')
const { checkJWT, getToken, checkRole } = require('../controllers/auth')

// Get all works
router.get('', getPortfolios)

// Get a work by id
router.get('/:id', getPortfolioById)

// Post new work
router.post('', checkJWT, checkRole('admin'), createPortfolio)

// Update new work
router.patch('/:id', checkJWT, checkRole('admin'), updatePortfolio)

// Delete a work
router.delete('/:id', checkJWT, checkRole('admin'), deletePortfolio)



module.exports = router

