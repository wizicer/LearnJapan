import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recite',
  templateUrl: 'recite.html'
})
export class RecitePage {
  wordlist: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.wordlist = navParams.get('item');
  }

  ionViewDidLoad() {
  }

}
