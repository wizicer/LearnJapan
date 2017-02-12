import * as $ from "jquery";
var easyquiz = new function () {
  var quizdata : any;
  var quizid : number;
  var quiznum : number;
  var quiz : any;
  function isLocalstorageExist() {
    var mod = 'test';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
  }
  if (!isLocalstorageExist()) {
    $('#onlyremember').prop('disabled', true);
    $('#wordremember').prop('disabled', true);
  }
  var rwords = JSON.parse(localStorage.getItem("rwords"));
  rwords = rwords || {};
  this.start = function(data){
    quizdata = data;
    for (var i = 0; i < quizdata.length; i++) {
      quizdata[i].rem = rwords[quizdata[i].rid];
    }
    var shufflewords = $('#shufflewords').prop('checked');
    if (shufflewords) quizdata = quizdata.sort(function() { return 0.5 - Math.random() });;
    quizid = -1;
    rollquiz(1);
    displayquiz();
  };
  function displayquiz() {
    $("#content").html(quizid % 2 == 0 ? quiz.tip : quiz.desc);
    $("#card-summary").html((quiznum + 1) + '/' + (quizdata.length) + '(' + countRememberedWords() + ')');
    $("#wordremember").prop('checked', quiz.rem ? true : false);
  }
  function countRememberedWords() {
    var tt = 0;
    for (var i = 0; i < quizdata.length; i++) {
      if (rwords[quizdata[i].rid]) tt++;
    }
    return tt;
  }
  $('#wordremember').change(function() {
    if (this.checked) {
      rwords[quiz.rid] = true;
      quiz.rem = true;
    } else {
      delete rwords[quiz.rid];
      quiz.rem = false;
    }
    localStorage.setItem("rwords", JSON.stringify(rwords));
  });
  function rollquiz(offset) {
    if (quizid + offset < 0 || quizid + offset >= quizdata.length * 2) return;
    var onlyremember = $('#onlyremember').prop('checked');
    var autoreadword = $('#autoreadword').prop('checked');
    do {
      quizid += offset;
      quiznum = Math.floor(quizid / 2);
      quiz = quizdata[quiznum];
    } while (quizid > 0 && quizid < quizdata.length * 2 - 1 && onlyremember && quiz.rem);
    if (quizid % 2 == 0) $('#trialtext').val('');
    if (autoreadword && quizid % 2 != 0) speak(quiz.read);
  }
  function speak(word) {
    if('speechSynthesis' in window){
      var speech = new SpeechSynthesisUtterance(word);
      speech.lang = 'ja-JP';
      window.speechSynthesis.speak(speech);
    }
  }
  $('#trialtext').keypress(function (e) {
    if (e.which == 13) {
      var autoremember = $('#autoremember').prop('checked');
      rollquiz(1);
      displayquiz();
      if (autoremember && $(this).val() == quiz.read) {
        $("#wordremember").prop('checked', true).change();
      }
      return false;
    }
  });
  $('#content').on('click', "a.read", function(e) {
    e.preventDefault();
    speak($(this).data('read'));
  });
  $('button.toggle-next').on('click', function(e) {
    e.preventDefault();
    rollquiz(1);
    displayquiz();
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
    rollquiz(-1);
    displayquiz();
  });
};