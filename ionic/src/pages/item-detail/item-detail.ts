import { Component, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';

@Component({
  selector: 'page-item-detail',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ])
      ]
    ),
  ],
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  playerenable = false;
  playing = false;
  @ViewChild('audioplayer') player;
  playsrc: string;
  playercontrols = false;
  playprogress = 0;
  playprogressmax = 100;
  remember: boolean;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get('item');
    if (this.item.idx && this.item.lesson) {
      let rwords = JSON.parse(localStorage.getItem("rwords")) || {};
      let key = `${this.item.lesson}|${this.item.idx}`
      this.remember = rwords[key];
    }
  }

  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  ngAfterViewInit() {
    let player = this.player.nativeElement;
    let addMultipleListener = (el, s, fn) => s.split(' ').forEach(e => el.addEventListener(e, fn, false));

    addMultipleListener(player, "play pause", () => {
      this.playing = !player.paused;
    });

    player.addEventListener('timeupdate', () => {
      this.playprogress = player.currentTime;
    });
    player.addEventListener('ended', () => {
      this.playerenable = false;
    });
    player.addEventListener('durationchange', () => {
      this.playprogressmax = player.duration;
    });
  }

  progressChange(ev): void {
    this.player.nativeElement.currentTime = ev.value;
  }
  play(): void {
    this.player.nativeElement.play();
  }

  pause(): void {
    this.player.nativeElement.pause();
  }

  backward(time: number): void {
    this.player.nativeElement.currentTime -= time;
  }

  setPlaybackRate(rate: number): void {
    this.player.nativeElement.playbackRate = rate;
  }

  startplay(item: Item, type: string) {
    let player = this.player.nativeElement;
    player.src = `assets/site/assets/audio/${type}/${item["okey"]}.mp3`;
    player.load();
    player.play();
    this.playerenable = true;
  }

  toggleRemember(item: any) {
    let rwords = JSON.parse(localStorage.getItem("rwords")) || {};
    let key = `${item.lesson}|${item.idx}`
    rwords[key] = this.remember;
    localStorage.setItem("rwords", JSON.stringify(rwords));
  }
}
