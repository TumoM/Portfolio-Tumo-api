const express = require('express');
const axios = require('axios')
let router = express.Router()
const { getPortfolios, getPortfolioById, createPortfolio, updatePortfolio} = require('../controllers/portfolios');
const { withAuth } = require('../middleware/auth')
const { checkJWT, getToken } = require('../controllers/auth')

// Get all portfolios
router.get('', getPortfolios)

// Get a portfolio by id
router.get('/:id', getPortfolioById)

// Todo add middleware to check for admin
// Post new portfolio
router.post('', checkJWT, createPortfolio)

// Update new portfolio
router.patch('/:id', updatePortfolio)



module.exports = router

