const eventModel = require("../models/EventModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.diskStorage({
  destination:"./uploads",
  filename : function (req, file, cb){
    cb(null, file.originalname)
  },
});

const upload = multer({
  storage:storage,
}).single("image");

const addEvent = async (req, res) => {
  try {
    const savedEvent = await eventModel.create(req.body);
    res.status(201).json({
      message: "Event added successfully",
      data: savedEvent,
    });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await eventModel.find().populate("stateId cityId areaId userId");
    if (events.length === 0) {
      res.status(404).json({ message: "No events found" });
    } else {
      res.status(200).json({
        message: "events found successfully",
        data: events,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventsByUserId = async (req, res) => {
  try {
    const events = await eventModel.find({ userId: req.params.userId }).populate("stateId cityId areaId userId");
    if (events.length === 0) {
      res.status(404).json({ message: "No events found" });
    } else {
      res.status(200).json({
        message: "events found successfully",
        data: events,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addEventWithFile = async (req,res) => {

  upload(req,res,async(err)=>{
    if(err){
      console.log(err);
      res.status(500).json({
        message:err.message
      });
    }
    else{
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloudinaryResponse);
      console.log(req.body)

      req.body.imageUrl = cloudinaryResponse.secure_url;
      const savedEvent = await eventModel.create(req.body);

      res.status(200).json({
        message:"Event Added successfully",
        data: savedEvent
      });

    }
  });
};
module.exports = { addEvent, getEvents, getEventsByUserId, addEventWithFile };