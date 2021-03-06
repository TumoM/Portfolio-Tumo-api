import { Request, Response } from "express"
let mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Portfolio = mongoose.model('Portfolio');
// const Portfolio = mongoose.model('../db/models/portfolio');

exports.getPortfolios = async (req:Request, res:Response) => {
    const portfolios = await Portfolio.find({}).sort({"startDate": -1});
    return res.json(portfolios);
  }

exports.createPortfolio = async (req:any, res:Response) => {
    // const portfolios = await Portfolio.find({});
    const portfolioData = req.body;
    // const userId = req.user.sub
    console.log("New Portfolio Data:",portfolioData)
    const portfolio = new Portfolio(portfolioData);
    console.log("New Portfolio :",portfolio)
    // console.log("userId :",userId)
    // portfolio.userId = userId;
    try{
      
      const resPortfolio = await portfolio.save();
      console.log("resPortfolio", resPortfolio)
      return res.status(200).json({resPortfolio});
    }
    catch(e){
      console.log(e.toJSON().message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.updatePortfolio = async (req:Request, res:Response) => {
    const { body, params: {id}} = req;

    try{
      const updatedPortfolio = await Portfolio.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true});
      console.log("updatedPortfolio", updatedPortfolio)
      return res.status(200).json({updatedPortfolio});
    }
    catch(e){
      console.log(e.message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.deletePortfolio = async (req:Request, res:Response) => {
    const {id} = req.params;

    try{
      const removedPortfolio = await Portfolio.findOneAndRemove({_id: id});
      console.log("removedPortfolio", removedPortfolio)
      if (removedPortfolio?.id){
        return res.status(200).json({_id: removedPortfolio.id});
      }
      else{
        return res.status(422).json({message: `Resource not removed`});
      }
    }
    catch(e){
      console.log(e.message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

exports.getPortfolioById = async (req:Request, res:Response) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio){
            return res.status(404).json({message:"Portfolio not found"})
        }
        return res.status(200).json(portfolio);
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 422).json({message:e.message});
        
      }
  }