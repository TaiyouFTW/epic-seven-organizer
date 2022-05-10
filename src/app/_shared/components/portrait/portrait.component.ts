import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnInit {

  @Input() unknown?: string;
  @Input() code?: string = 'npc0000';
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
    let codeOnError = this.code == null || this.code == undefined || this.code == '' ? 'npc0000' : this.code;
    event.target.src = `https://www.e7vau.lt/static/game/face/${codeOnError}_s.png`;
  }
}
