<div id="wordrecite">
<p>
  <button class="toggle-start">开始记单词</button>
  <input id="onlyremember" type="checkbox" checked />
  <label for="onlyremember">自动跳过已记住单词</label>
  <span id="card-summary"></span>
  <div class="card">
    <p id="content"></p>
  </div>
</p>
<p>
  <input id="trialtext" type="textbox" />
  <input id="wordremember" type="checkbox" />
  <label for="wordremember">已记住</label>
  <button class="toggle-next">下</button>
  <button class="toggle-previous">上</button>
  <button class="toggle-next">下</button>
</p>

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
        return { tip: p.explain, desc: desc, rem: rwords[p.rid], rid: p.rid }});
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
    do {
      quizid += offset;
      quiznum = Math.floor(quizid / 2);
      quiz = quizdata[quiznum];
      if (quizid % 2 == 0) $('#trialtext').val('');
    } while (quizid > 0 && quizid < quizdata.length * 2 - 1 && onlyremember && quiz.rem);
  }
  $('#content').on('click', "a.read", function(e) {
    e.preventDefault();
    if('speechSynthesis' in window){
      var speech = new SpeechSynthesisUtterance($(this).data('read'));
      speech.lang = 'ja-JP';
      window.speechSynthesis.speak(speech);
    }
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
#trialtext {
  width: 70%;
}
.card {
  margin-right: 10px;
  width: 80%;
  height: 150px;
  border-radius: 10px;
  background: #fff;
  -webkit-box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
  box-shadow: 3px 3px 7px rgba(0,0,0,0.3);
  display: table;
  margin: 0px auto;
}
.card p {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  font-size: 22px;
}
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
}
button.toggle-previous {
  width: 25%;
}
button.toggle-next {
  width: 35%;
}

/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
}

/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: '';
  position: absolute;
  left:0; top: 2px;
  width: 17px; height: 17px;
  border: 1px solid #aaa;
  background: #f8f8f8;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
}
/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: '✔';
  position: absolute;
  top: 3px; left: 4px;
  font-size: 18px;
  line-height: 0.8;
  color: #09ad7e;
  transition: all .2s;
}
/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}
[type="checkbox"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}
/* disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label:before,
[type="checkbox"]:disabled:checked + label:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #ddd;
}
[type="checkbox"]:disabled:checked + label:after {
  color: #999;
}
[type="checkbox"]:disabled + label {
  color: #aaa;
}
/* accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
  border: 1px dotted blue;
}

/* hover style just for information */
label:hover:before {
  border: 1px solid #4778d9!important;
}
</style>

