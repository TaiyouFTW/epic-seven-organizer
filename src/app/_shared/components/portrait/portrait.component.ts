import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnInit {

  @Input() unknown?: string;
  @Input() code?: string;
  @Input() name?: string;
  @Input() role?: string;
  @Input() element?: string;
  @Input() grade?: number;
  @Input() miniPortrait?: boolean;
  @Input() isArtifact?: boolean = false;

  heroImgUrl: string = 'https://static.smilegatemegaport.com/event/live/epic7/guide/images/hero/';
  artifactImgUrl: string = 'https://static.smilegatemegaport.com/event/live/epic7/guide/wearingStatus/images/artifact/';

  constructor() {

  }

  ngOnInit(): void {
  }

  onError(event: any) {
    event.target.src = `https://www.e7vau.lt/static/game/face/${this.code}_s.png`;
  }
}
