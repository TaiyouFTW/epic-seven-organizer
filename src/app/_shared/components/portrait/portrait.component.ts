import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss']
})
export class PortraitComponent implements OnInit {

  @Input() unknown?: string;
  @Input() heroCode?: string;
  @Input() name?: string;
  @Input() role?: string;
  @Input() element?: string;
  @Input() grade?: number;
  @Input() miniPortrait?: boolean;

  imgUrl: string = 'https://static.smilegatemegaport.com/event/live/epic7/guide/images/hero/';

  constructor() {

  }

  ngOnInit(): void {
  }

  onError(event: any) {
    event.target.src = `https://www.e7vau.lt/static/game/face/${this.heroCode}_s.png`;
    // event.target.src = 'https://www.e7vau.lt/static/game/face/unknown_s.png';
  }
}
