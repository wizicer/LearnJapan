<div id="wordrecite">
<p>
  <span id="card-summary"></span>
  <div class="card well">
    <p class="text-center" id="content"></p>
  </div>
</p>
<p>
  <div class="form-horizontal">
    <div class="form-group row">
      <div class="col-xs-9 col-md-10">
        <input class="form-control" id="trialtext" type="textbox" />
      </div>
      <div class="checkbox col-xs-3 col-md-2">
        <label>
          <input type="checkbox" id="wordremember">已记住
        </label>
      </div>
    </div>
  </div>
  <div class="row">
    <button class="col-xs-5 toggle-next btn btn-success">下</button>
    <button class="col-xs-2 toggle-previous btn btn-info">上</button>
    <button class="col-xs-5 toggle-next btn btn-success">下</button>
  </div>
</p>

<div class="compact">
  <p>
  记单词选项：
  </p>
  <p>
    <input id="onlyremember" type="checkbox" checked />
    <label for="onlyremember">自动跳过已记住单词</label>
  </p>
  <p>
    <input id="autoreadword" type="checkbox" checked />
    <label for="autoreadword">自动读单词</label>
  </p>
  <p>
    <input id="autoremember" type="checkbox" checked />
    <label for="autoremember">拼写正确则标记记住</label>
  </p>
  <p>
    <input id="shufflewords" type="checkbox" />
    <label for="shufflewords">随机顺序记忆</label>
  </p>
</div>

</div>

<script>
var easyquiz = new function () {
  var quizdata;
  var quizid;
  var quiznum;
  var quiz;
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
      if (quizid % 2 == 0) $('#trialtext').val('');
      if (autoreadword && quizid % 2 != 0) speak(quiz.read);
    } while (quizid > 0 && quizid < quizdata.length * 2 - 1 && onlyremember && quiz.rem);
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
  $('button.toggle-previous').on('click', function(e) {
    e.preventDefault();
    rollquiz(-1);
    displayquiz();
  });
};
</script>
<style>
.card {
  height: 150px;
  width: 100%;
  display: table;
  table-layout: fixed;
}
.card p {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  font-size: 22px;
}
</style>

