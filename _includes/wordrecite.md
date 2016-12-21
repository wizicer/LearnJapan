<div id="wordrecite">
<p>
  <button class="toggle-start btn btn-primary">开始记单词</button>
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
var lessonquizdata = {};
var curlessonquizdata;
$(document).ready(function() {
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
  $('button.toggle-start').on('click', function(e) {
    e.preventDefault();
    quizdata = ((lessonquizdata && lessonquizdata["l{{page.lesson}}"])
      || (curlessonquizdata)
      || table.rows({filter: 'applied'}).data().map(function(p) { return { kana: p[0], kanji: p[1], explain: p[3], display: p[4], pos: p[2], rid: p[5] + '|' + p[6]}}))
      .map(function(p) {
        p.kana = japanruby(p.kana);
        p.purekana = p.kana.replace(/[^\u3040-\u309f\u30a0-\u30ff]/g, "");
        p.display = japanruby(p.display);
        var desc = "<span class='japan'>" + (p.kanji == "&nbsp;" ? p.kana : p.display + "<br />" + p.kana) + "</span>";
        desc += "<span class='card-pos'>[" + p.pos + "]</span>";
        desc += "<a href='#' class='read' data-read='"+p.purekana+"'>[读]</a>";
        var tip = "<span class='card-explain'>" + p.explain + "</span>";
        tip += "<span class='card-pos'>[" + p.pos.slice(0,1) + "]</span>";
        return { tip: tip, desc: desc, read: p.purekana, rem: rwords[p.rid], rid: p.rid }});
    var shufflewords = $('#shufflewords').prop('checked');
    if (shufflewords) quizdata = quizdata.sort(function() { return 0.5 - Math.random() });;
    quizid = -1;
    rollquiz(1);
    displayquiz();
  });
  function displayquiz() {
    $("#content").html(quizid % 2 == 0 ? quiz.tip : quiz.desc);
    $("#card-summary").html((quiznum + 1) + '/' + (quizdata.length));
    $("#wordremember").prop('checked', quiz.rem ? true : false);
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
});
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

