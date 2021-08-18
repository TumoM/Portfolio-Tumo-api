import { Request, Response } from "express"
const mongoose = require('mongoose');
const Work = mongoose.model('Work');
// const Work = mongoose.model('../db/models/work');

// import WorkApi from '@/lib/api/works';
// const { getAccessToken } = require('@auth0/nextjs-auth0')


exports.getWorks = async (req:Request, res:Response) => {
    const works = await Work.find({});
    return res.json(works);
  }

exports.createWork = async (req:any, res:Response) => {
    // const works = await Work.find({});
    const workData = req.body;
    const userId = req.user.sub
    console.log("New Work Data:",workData)
    const work = new Work(workData);
    console.log("New Work :",work)
    console.log("userId :",userId)
    work.userId = userId;
    try{
      
      const resWork = await work.save();
      console.log("resWork", resWork)
      return res.status(200).json({resWork});
    }
    catch(e){
      console.log(e.toJSON().message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.updateWork = async (req:Request, res:Response) => {
    const { body, params: {id}} = req;

    try{
      const updatedWork = await Work.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true});
      console.log("updatedWork", updatedWork)
      return res.status(200).json({updatedWork});
    }
    catch(e){
      console.log(e.message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.deleteWork = async (req:Request, res:Response) => {
    const {id} = req.params;

    try{
      const removedWork = await Work.findOneAndRemove({_id: id});
      console.log("removedWork", removedWork)
      if (removedWork.id){
        return res.status(200).json({_id: removedWork.id});
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

exports.getWorkById = async (req:Request, res:Response) => {
    try {
        const work = await Work.findById(req.params.id);
        if (!work){
            return res.status(404).json({message:"Work not found"})
        }
        return res.status(200).json(work);
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 422).json({message:e.message});
        
      }
  }