/// <reference path="./typings/index.d.ts" />
//import * as $ from "jquery";
class easyquiz {
  quizdata : any;
  quizid : number;
  quiznum : number;
  quiz: any;
  rwords: any;
  constructor() {
    var _self = this;
  if (!this.isLocalstorageExist()) {
    $('#onlyremember').prop('disabled', true);
    $('#wordremember').prop('disabled', true);
  }
  var rwords = JSON.parse(localStorage.getItem("rwords"));
  this.rwords = rwords || {};
  $('#wordremember').change(function() {
    if (this.checked) {
      rwords[_self.quiz.rid] = true;
      _self.quiz.rem = true;
    } else {
      delete rwords[_self.quiz.rid];
      _self.quiz.rem = false;
    }
    localStorage.setItem("rwords", JSON.stringify(rwords));
  });
  $('#trialtext').keypress(function (e) {
    if (e.which == 13) {
      var autoremember = $('#autoremember').prop('checked');
      _self.rollquiz(1);
      _self.displayquiz();
      if (autoremember && $(this).val() == _self.quiz.read) {
        $("#wordremember").prop('checked', true).change();
      }
      return false;
    }
  });
  $('#content').on('click', "a.read", function(e) {
    e.preventDefault();
    _self.speak($(this).data('read'));
  });
  $('button.toggle-next').on('click', function(e) {
    e.preventDefault();
    _self.rollquiz(1);
    _self.displayquiz();
  });
  $('button.toggle-next-left').on('click', function(e) {
    e.preventDefault();
    var remembereddiv = ($('#remembereddiv')).detach();
    ($('#trialdiv')).before(remembereddiv);
  });
  $('button.toggle-next-right').on('click', function(e) {
    e.preventDefault();
    var trialdiv = ($('#trialdiv')).detach();
    ($('#remembereddiv')).before(trialdiv);
  });
  $('button.toggle-previous').on('click', function(e) {
    e.preventDefault();
    _self.rollquiz(-1);
    _self.displayquiz();
  });
  }
  isLocalstorageExist() {
    var mod = 'test';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch(e) {
      return false;
    }
  }
  start(data:any){
    this.quizdata = data;
    for (var i = 0; i < this.quizdata.length; i++) {
      this.quizdata[i].rem = this.rwords[this.quizdata[i].rid];
    }
    var shufflewords = $('#shufflewords').prop('checked');
    if (shufflewords) this.quizdata = this.quizdata.sort(function() { return 0.5 - Math.random() });;
    this.quizid = -1;
    this.rollquiz(1);
    this.displayquiz();
  };
  displayquiz() {
    $("#content").html(this.quizid % 2 == 0 ? this.quiz.tip : this.quiz.desc);
    $("#card-summary").html((this.quiznum + 1) + '/' + (this.quizdata.length) + '(' + this.countRememberedWords() + ')');
    $("#wordremember").prop('checked', this.quiz.rem ? true : false);
  }
  countRememberedWords() {
    var tt = 0;
    for (var i = 0; i < this.quizdata.length; i++) {
      if (this.rwords[this.quizdata[i].rid]) tt++;
    }
    return tt;
  }
  rollquiz(offset:number) {
    if (this.quizid + offset < 0 || this.quizid + offset >= this.quizdata.length * 2) return;
    var onlyremember = $('#onlyremember').prop('checked');
    var autoreadword = $('#autoreadword').prop('checked');
    do {
      this.quizid += offset;
      this.quiznum = Math.floor(this.quizid / 2);
      this.quiz = this.quizdata[this.quiznum];
    } while (this.quizid > 0 && this.quizid < this.quizdata.length * 2 - 1 && onlyremember && this.quiz.rem);
    if (this.quizid % 2 == 0) $('#trialtext').val('');
    if (autoreadword && this.quizid % 2 != 0) this.speak(this.quiz.read);
  }
  speak(word: string) {
    if('speechSynthesis' in window){
      var speech = new SpeechSynthesisUtterance(word);
      speech.lang = 'ja-JP';
      window.speechSynthesis.speak(speech);
    }
  }
};