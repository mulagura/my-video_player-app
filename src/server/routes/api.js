const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Video = require('../models/video');

// for @ use %40
mongoose.connect('mongodb://room:room@ds233895.mlab.com:33895/videoplayer', { useMongoClient: true }, function(err){
  if(err){
    console.error("error is:" +err);
  }
});

mongoose.Promise = global.Promise;

//get video
router.get('/videos',function(req,res){
  console.log(" get for all videos ");
  Video.find({})
  //videos is
       .exec(function(err,videos){
         if(err){
           console.log("some error");
         }else{
           res.json(videos);
         }

       });
});

//get video by id
router.get('/videos/:id',function(req,res){
  console.log(" get for id videos ");
  Video.findById(req.params.id)
  //videos is
       .exec(function(err,video){
         if(err){
           console.log("some error");
         }else{
           res.json(video);
         }

       });
});

//post video
router.post('/video',function(req,res){
  console.log("posting video");
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err,insertedVideo){
    if(err){
      console.error(err);
    }
    else{
      res.json(insertedVideo);
    }
  });
});

//update video
router.put('/video/:id',function(req,res){
  console.log("updating video by id");
  Video.findByIdAndUpdate(req.params.id,
                        {
                          $set: {title:req.body.title,url:req.body.title,description:req.body.description}
                        },
                        {new:true},function(err,updtedVideo){
    if(err){
      console.error(err);
    }
    else{
      res.json(updtedVideo);
    }
  }
  );
});

//dlete video
router.delete('/video/:id',function(req,res){
  console.log("Delete Video by id");
  Video.findByIdAndRemove(req.params.id,function (err,deletedVideo){
    if(err){
      console.error(err);
    }
    else{
      res.json(deletedVideo);
    }
  });
});





module.exports = router;
