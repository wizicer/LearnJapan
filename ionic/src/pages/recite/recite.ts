import { JapanRuby } from './../../providers/japan-ruby';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var SpeechSynthesisUtterance: any;

interface IQuizCard {
  title: string;
  subtitle?: string;
  read?: string;
}
interface IQuizData {
  rid: string;
  rem?: boolean;
  tip: IQuizCard;
  desc: IQuizCard;
}

@Component({
  selector: 'page-recite',
  templateUrl: 'recite.html'
})
export class RecitePage {
  wordlist: any;

  onlyremember = true;
  wordremember = false;
  autoremember = false;
  disableonlyremember = false;
  disablewordremember = false;
  trialtext: string;
  autoreadword = true;
  lefthandmode = true;

  originquizdata: Array<IQuizData>;
  quizdata: Array<IQuizData>;
  quizid: number;
  quiznum: number;
  quiz: IQuizData;
  rwords: { [id: string]: boolean };

  quizcontent: IQuizCard;
  cardsummary: string;
  shufflewords = false;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.wordlist = navParams.get('item');
    if (!this.isLocalstorageExist()) {
      this.disableonlyremember = true;
      this.disablewordremember = true;
    }
    this.rwords = JSON.parse(localStorage.getItem("rwords")) || {};

    let quizdata: Array<IQuizData> = this.wordlist
      .map((p): IQuizData => {
        p.kana = JapanRuby.convert(p.kana);
        p.purekana = p.kana.replace(/[^\u3040-\u309f\u30a0-\u30ff]/g, "");
        p.display = JapanRuby.convert(p.word);
        p.rid = `${p.lesson}|${p.idx}`;
        let desctitle = "<span class='japan'>" + (p.kanji == "" ? p.kana : p.display) + "</span>";
        let descsubtitle = "<span class='japan'>" + p.kana + "</span>" + "<span class='card-pos'>[" + p.pos + "]</span>";
        let tip = "<span class='card-explain'>" + p.desc + "</span>";
        tip += "<span class='card-pos'>[" + p.pos.slice(0, 1) + "]</span>";
        return { tip: { title: tip }, desc: { title: desctitle, subtitle: descsubtitle, read: p.purekana }, rid: p.rid }
      });

    this.start(quizdata);
  }
  changewordremember() {
    if (this.wordremember) {
      this.rwords[this.quiz.rid] = true;
      this.quiz.rem = true;
    } else {
      delete this.rwords[this.quiz.rid];
      this.quiz.rem = false;
    }
    localStorage.setItem("rwords", JSON.stringify(this.rwords));
  }
  trialtextchallenge(e) {
    if (e.which == 13) {
      let autoremember = this.autoremember;
      this.rollquiz(1);
      this.displayquiz();
      if (autoremember && this.trialtext == this.quiz.desc.read) {
        this.wordremember = true;
      }
      return false;
    }
  }
  read(sentence) {
    this.speak(sentence);
  }
  next() {
    this.rollquiz(1);
    this.displayquiz();
  }
  nextleft() {
    this.lefthandmode = true;
    this.next();
  }
  nextright() {
    this.lefthandmode = false;
    this.next();
  }
  previous() {
    this.rollquiz(-1);
    this.displayquiz();
  }

  ionViewDidLoad() {
  }
  isLocalstorageExist() {
    var mod = 'test';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
  start(data?: Array<IQuizData>) {
    if (data != undefined) this.originquizdata = data;
    this.quizdata = this.originquizdata.slice();
    for (var i = 0; i < this.quizdata.length; i++) {
      this.quizdata[i].rem = this.rwords[this.quizdata[i].rid];
    }
    if (this.shufflewords)
      this.quizdata = this.quizdata.sort(() => 0.5 - Math.random());
    this.quizid = -1;
    this.rollquiz(1);
    this.displayquiz();
  };

  displayquiz() {
    this.quizcontent = this.quizid % 2 == 0 ? this.quiz.tip : this.quiz.desc;
    this.cardsummary = (this.quiznum + 1) + '/' + (this.quizdata.length) + '(' + this.countRememberedWords() + ')';
    this.wordremember = this.quiz.rem ? true : false;
  }
  countRememberedWords() {
    var tt = 0;
    for (var i = 0; i < this.quizdata.length; i++) {
      if (this.rwords[this.quizdata[i].rid]) tt++;
    }
    return tt;
  }
  rollquiz(offset: number) {
    if (this.quizid + offset < 0 || this.quizid + offset >= this.quizdata.length * 2) return;
    do {
      this.quizid += offset;
      this.quiznum = Math.floor(this.quizid / 2);
      this.quiz = this.quizdata[this.quiznum];
    } while (this.quizid > 0 && this.quizid < this.quizdata.length * 2 - 1 && this.onlyremember && this.quiz.rem);
    if (this.quizid % 2 == 0) this.trialtext = '';
    if (this.autoreadword && this.quizid % 2 != 0) this.speak(this.quiz.desc.read);
  }
  speak(word: string) {
    if ('speechSynthesis' in window) {
      var speech = new SpeechSynthesisUtterance(word);
      speech.lang = 'ja-JP';
      window["speechSynthesis"].speak(speech);
    }
  }
}