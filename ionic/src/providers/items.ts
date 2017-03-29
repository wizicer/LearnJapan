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
  origindata: any;

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  constructor(public http: Http, public api: Api) {
  }

  queryLessons(params?: any) {
    let inAnyProp = (obj: any, props: Array<string>, testStr: string) => {
      for (let i = 0; i < props.length; i++) {
        if (obj[props[i]] != undefined && obj[props[i]].indexOf(testStr) >= 0) {
          return true;
        }
      }
      return false;
    };
    return new Observable(ob => {
      if (this.lessons == undefined) {
        this.api.get('/lessons.json', params)
          .map(resp => resp.json())
          .subscribe(
          data => {
            this.origindata = data;
            this.lessons = this.formatLessons(data);
            ob.next(this.lessons);
            ob.complete();
          },
          error => console.log(error));
      } else {
        if (params != undefined && params.search != undefined) {
          let str = params.search;
          let ret = {
            words: this.origindata.words.filter(w => inAnyProp(w,["kana","kanji","desc"],str)),
            grammar: this.origindata.grammar.filter(w => inAnyProp(w,["expression","explaination","shortexplain"],str)),
          };
          ob.next(ret);
        } else {
          ob.next(this.lessons);
        }
        ob.complete();
      }
    });
  }

  formatLessons(odata) {
    let ldata = Object.assign(odata.level1, odata.level2);
    let trimall = arr => {
      for (let ek in arr) {
        if (arr[ek] != null) {
          arr[ek] = arr[ek].trim();
        }
      }
      return arr;
    };
    let cleanline = (line: string) => {
      return line.replace(/^(> )?\* /, '');
    };
    let splittext = (obj, key) => obj[key] = obj[key].split('\n').map(cleanline).filter(o => o != "");
    let grammar = odata.grammar.map(trimall);
    let words = odata.words.map(trimall);
    let pdata = [];
    for (let key in ldata) {
      let obj = ldata[key];
      let prefix = key.slice(0, 1);
      let num = parseInt(key.slice(1));
      let lkey = (prefix == "l" ? "0" : "m") + this.pad(num, 2);
      obj["key"] = lkey;
      obj["okey"] = key;
      obj["lesson"] = (prefix == "l" ? "初级" : "中级") +  "第" + num + "課";
      if (prefix == "l") {
        obj["title"] = obj.basic4.split('\n')[0].replace('> * ', '').replace('。', '');
      }
      obj["grammar"] = grammar.filter(g => g.lesson == lkey);
      obj["words"] = words.filter(w => w.lesson.startsWith(lkey));
      if (prefix == 'l') {
        for (let entity of ['basic4', 'basicc', 'context', 'basic4t', 'basicct', 'contextt',]) splittext(obj, entity);
      } else {
        for (let entity of ['conversation', 'text',]) splittext(obj, entity);
      }
      pdata.push(obj);
    }
    return pdata;
  }

  pad(num, size) { return ('000000000' + num).substr(-size); }

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
