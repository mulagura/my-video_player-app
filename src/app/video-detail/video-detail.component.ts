import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['vivo'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {

  public editTitle:Boolean = false;

  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.editTitle = false;
  }

 onEditTitle(){
    this.editTitle = true;
 }

 updateVideo(video){
   //console.log("in video detail html");
   //console.log(video);
   //console.log(this.video);
    this.updateVideoEvent.emit(video);
 }

 deleteVideo(video){
     this.deleteVideoEvent.emit(video);
 }

}
