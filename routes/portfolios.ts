const express = require('express');
const axios = require('axios')
let router = express.Router()
const { getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio} = require('../controllers/portfolios');
const { withAuth } = require('../middleware/auth')
const { checkJWT, getToken, checkRole } = require('../controllers/auth')

// Get all portfolios
router.get('', getPortfolios)

// Get a portfolio by id
router.get('/:id', getPortfolioById)

// Post new portfolio
router.post('', checkJWT, checkRole('admin'), createPortfolio)

// Update new portfolio
router.patch('/:id', checkJWT, checkRole('admin'), updatePortfolio)

// Delete a portfolio
router.delete('/:id', checkJWT, checkRole('admin'), deletePortfolio)



module.exports = router

