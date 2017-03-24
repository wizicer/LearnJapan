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
      data => this.list = data,
      error => console.log(error));
  }

  ionViewDidLoad() {
  }

  openItem(item: Item) {
    this.navCtrl.push(RecitePage, {
      item: item
    });
  }

}
