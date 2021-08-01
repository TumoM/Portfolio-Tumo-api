import { Request, Response } from "express"
let mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Project = mongoose.model('Project');
// const Project = mongoose.model('../db/models/project');

exports.getProjects = async (req:Request, res:Response) => {
    const projects = await Project.find({});
    return res.json(projects);
  }

exports.createProject = async (req:any, res:Response) => {
    // const projects = await Project.find({});
    const projectData = req.body;
    // const userId = req.user.sub
    console.log("New Project Data:",projectData)
    const project = new Project(projectData);
    console.log("New Project :",project)
    // console.log("userId :",userId)
    // project.userId = userId;
    try{
      
      const resProject = await project.save();
      console.log("resProject", resProject)
      return res.status(200).json({resProject});
    }
    catch(e){
      console.log(e.toJSON().message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.updateProject = async (req:Request, res:Response) => {
    const { body, params: {id}} = req;

    try{
      const updatedProject = await Project.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true});
      console.log("updatedProject", updatedProject)
      return res.status(200).json({updatedProject});
    }
    catch(e){
      console.log(e.message)
      res.status(e.status || 422).json({message:e.message});
    }
  }

  exports.deleteProject = async (req:Request, res:Response) => {
    const {id} = req.params;

    try{
      const removedProject = await Project.findOneAndRemove({_id: id});
      console.log("removedProject", removedProject)
      if (removedProject?.id){
        return res.status(200).json({_id: removedProject.id});
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

exports.getProjectById = async (req:Request, res:Response) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project){
            return res.status(404).json({message:"Project not found"})
        }
        return res.status(200).json(project);
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 422).json({message:e.message});
        
      }
  }