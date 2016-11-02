<div>
模式:
- <a class="toggle-mode" data-column="0|2|3|4|5">普通浏览</a>
- <a class="toggle-mode" data-column="2|3|5|6">看中文忆日文</a>
</div>

| 假名    | 汉字 | 词性 | 解释 | 单词 | 课 | 序号 |
| ----    | ---- | ---- | ---- | ---- | -- | --   |
| loading |      |      |      |      |    |      |
| ====    | ==== | ==== | ==== | ==== | == | ==   |
| 假名    | 汉字 | 词性 | 解释 | 单词 | 课 | 序号 |
{:.display width="100%"}

<script>
$(document).ready(function() {
  function inittable() {
    table.ajax.url('{{ site.baseurl }}/words.json' ).load(function (){
      table.column(1).visible(false);
      table.column(5).visible(false);
      table.column(6).visible(false);
      table.column(0).nodes().to$().addClass('japan');
      table.column(1).nodes().to$().addClass('japan');
      table.column(4).nodes().to$().addClass('japan');
      table
        .order( [5, 'asc'], [6, 'asc'] )
        .draw();

      initFilters();
    }, false);
    table.on('xhr.dt', function ( e, settings, json, xhr ) {
      json.data.forEach(function(part, index, arr) {
        arr[index][0]=japanruby(arr[index][0]);
        arr[index][4]=japanruby(arr[index][4]);
        var content = arr[index][1];
        arr[index][1] = '<a href="http://kanji.jitenon.jp/cat/search.php?getdata=' + content + '" target="_blank">' + content + '</a>';
      });
    });
  }
  setTimeout(inittable, 300);
  $('a.toggle-mode').on('click', function(e) {
    e.preventDefault();
    table.columns().visible(false);
    $.each($(this).attr('data-column').split(/\|/), function (i, cnum) {
        var column = table.column(cnum);
        column.visible(true);
    })
  });
});
</script>


<button class="toggle-start">start</button>
<button class="toggle-previous">previous</button>
<p>
  <input id="onlyremember" type="checkbox" checked />
  <label for="onlyremember">Skip remembered word</label>
</p>
<div id="card-summary"></div>
<div class="card">
<p id="content">
</p>
</div>
<p>
  <input id="wordremember" type="checkbox" />
  <label for="wordremember">word remembered</label>
</p>

<button class="toggle-next">next</button>

<script>
$(document).ready(function() {
  var quizdata;
  var quizid;
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
    quizdata = table.rows({filter: 'applied'}).data()
      .map(function(p) {
        var desc = "<span class='japan'>" + (p[1] == "&nbsp;" ? p[0] : p[4] + "<br />" + p[0]) + "</span>";
        desc += "<span class='card-pos'>[" + p[2] + "]</span>";
        var rid = p[5]+'|'+p[6];
        return { tip: p[3], desc: desc, rem: rwords[rid], rid: rid }});
    quizid = 0;
    displayquiz();
  });
  function displayquiz() {
    var quiznum = Math.floor(quizid / 2) + 1;
    var quiz = quizdata[quiznum];
    $("#content").html(quizid % 2 == 0 ? quiz.tip : quiz.desc);
    $("#card-summary").html(quiznum + '/' + (quizdata.length / 2));
    $("#wordremember").prop('checked', quiz.rem ? true : false);
  }
  $('#wordremember').change(function() {
    var quiznum = Math.floor(quizid / 2) + 1;
    var quiz = quizdata[quiznum];
    if (this.checked) {
      rwords[quiz.rid] = true;
      quiz.rem = true;
    } else {
      delete rwords[quiz.rid];
      quiz.rem = false;
    }
    localStorage.setItem("rwords", JSON.stringify(rwords));
  });
  $('button.toggle-next').on('click', function(e) {
    e.preventDefault();
    quizid++;
    displayquiz();
  });
  $('button.toggle-previous').on('click', function(e) {
    e.preventDefault();
    quizid--;
    displayquiz();
  });
});
</script>
<style>
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
button.toggle-next {
  width: 80%;
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
