import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers: [VideoService]
})
export class VideosComponent implements OnInit {

videos: Array<Video>;

selectedVideo: Video;

private hideNewVideo:boolean = true;

  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
                       .subscribe(resVideoData => this.videos = resVideoData);
  }

onSelectVideo(vadas:any){

  this.hideNewVideo = true;
  this.selectedVideo = vadas;
  //console.log(this.selectedVideo);
}

onSubmitAddVideo(vadas:Video){

  this.hideNewVideo = true;
  this._videoService.addVideo(vadas)
                     .subscribe(resNewVideoData => {
                       this.videos.push(resNewVideoData);
   this.selectedVideo = resNewVideoData;

});

}

onUpdateVideoEvent(video:Video){
  this._videoService.updateVideo(video)
                    .subscribe(resNewUpdateVid => video = resNewUpdateVid);
  this.selectedVideo = null;

};

onDeleteVideoEvent(video:Video){
  let videoArray = this.videos;
  this._videoService.deleteVideo(video)
                     .subscribe(resNewDeleteVid => {
             for(let i=0;i<videoArray.length;i++){
               if(videoArray[i]._id === video._id){
                 videoArray.splice(i,1);
               }
             }
                     });
  this.selectedVideo = null;
};

newVideo(){
  this.hideNewVideo = false;
}

}
