import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemCreatePage } from '../item-create/item-create';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  groups: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    //this.currentItems = this.items.query();
  }
  getHeroes() {
    this.items.query()
      .subscribe(
      data => this.setData(data.data),
      error => console.log(error));
  }

  setData(data) {
    this.currentItems = data;
    this.groups = this.groupBy(data, "lesson");
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getHeroes();
  }

  groupBy(xs, key) {
    let its = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
    let retits = [];
    for (let it in its) {
      let obj = its[it];
      retits.push({ lesson: it, data: obj });
    }
    return retits;
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
