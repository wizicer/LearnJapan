import { RecitePage } from './../recite/recite';
import { Items } from './../../providers/providers';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from "../../models/item";

@Component({
  selector: 'page-recite-list',
  templateUrl: 'recite-list.html'
})
export class ReciteListPage {
  list: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.items.queryLessons().subscribe(
      data => this.list = this.format(data),
      error => console.log(error));
  }

  ionViewDidLoad() {
  }

  openItem(item: any) {
    this.navCtrl.push(RecitePage, {
      item: item.words,
      lesson: item.lesson,
    });
  }

  format(data) {
    let rwords = JSON.parse(localStorage.getItem("rwords")) || {};
    for (let i = 0; i < data.length; i++) {
      data[i].rwordnum = this.countRememberedWords(rwords, data[i].key, data[i].words);
    }
    return data;
  }

  countRememberedWords(rwords: { [id: string]: boolean }, lessonKey: string, words: Array<any>): number {
    var tt = 0;
    for (var i = 0; i < words.length; i++) {
      if (rwords[`${words[i].lesson}|${words[i].idx}`]) tt++;
    }
    return tt;
  }

}
