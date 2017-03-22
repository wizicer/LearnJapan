import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class Items {
  groups: any;
  lessons: any;

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  constructor(public http: Http, public api: Api) {
  }

  queryLessons(params?: any) {
    return new Observable(ob => {
      if (this.lessons == undefined) {
        this.api.get('/lessons.json', params)
          .map(resp => resp.json())
          .subscribe(
          data => {
            this.lessons = this.formatLessons(data);
            ob.next(this.lessons);
            ob.complete();
          },
          error => console.log(error));
      } else {
        ob.next(this.lessons);
        ob.complete();
      }
    });
  }

  formatLessons(data) {
    console.log(data);
    data = Object.assign(data.level1, data.level2);
    let pdata = [];
    for (let key in data) {
      let obj = data[key];
      obj["lesson"] = key;
      pdata.push(obj);
    }
    return pdata;
  }

  query(params?: any) {
    return new Observable(ob => {
      console.log(this.groups);
      if (this.groups == undefined) {
        this.queryRaw(params)
          .subscribe(
          data => {
            this.setData(data.data);
            ob.next(this.groups);
            ob.complete();
            console.log("return retrieved");
          },
          error => console.log(error));
      } else {
        ob.next(this.groups);
        ob.complete();
        console.log("return cache");
      }
    });
  }

  queryRaw(params?: any) {
    return this.api.get('/words.json', params)
      .map(resp => resp.json());
  }

  setData(data) {
    let pdata = data.map(arr => ({ kana: arr[0], kanji:arr[1], pos: arr[2], desc:arr[3], word: arr[4], lesson:arr[5], idx:arr[6] }));
    this.groups = this.groupBy(pdata, "lesson");
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


  add(item: Item) {
  }

  delete(item: Item) {
  }

}
