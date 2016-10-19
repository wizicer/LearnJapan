<div>
模式:
- <a class="toggle-mode" data-column="0|2|3|4|5">普通浏览</a>
- <a class="toggle-mode" data-column="2|3|5|6">看中文忆日文</a>
</div>

| 假名          | 汉字           | 词性         | 解释          | 单词          | 课              | 记忆 | 序号         |
| ----          | ----           | ----         | ----          | ----          | --              | --   | --           | {% for word in site.data.words %}
| {{word.kana}} | {{word.kanji}} | {{word.pos}} | {{word.desc}} | {{word.word}} | {{word.lesson}} |      | {{word.idx}} | {% endfor %}
| ====          | ====           | ====         | ====          | ====          | ==              | ==== | ==           |
| 假名          | 汉字           | 词性         | 解释          | 单词          | 课              | 记忆 | 序号         |
{:.display width="100%"}

<button class="toggle-start">start</button>
<button class="toggle-previous">previous</button>
<div id="card-summary"></div>
<div class="card">
<p id="content">
</p>
</div>
<button class="toggle-next">next</button>

<!--
## 尚未录入的单词

```
2:何なん～∕～歳さい
3:お～∕～階かい∕～円えん∕～曜日ようび
4:ご～
5:～時じ∕～分ふん∕～半はん∕～月がつ∕～日にち∕～年ねん∕ごろ
8:～様さま
9:～用よう
10:～中じゅう
12:～年間ねんかん
13:～冊さつ∕～回かい∕～枚まい∕～個こ∕～杯はい∕～人にん∕～台だい∕～本ほん∕～頭とう∕～匹ひき∕～つ∕～着ちゃく∕～羽わ∕～番ばん∕～足そく∕～度ど∕～キロメートル∕～皿さら
13:～時間じかん∕～週間しゅうかん∕～か月げつ
16:～製せい
16:～料りょう
16:～費ひ
16:～代だい
17:～中じゅうに
19:～たち
21:～過すぎ
22:～以外いがい∕～方かた
23:～によって∕～によります
24:～中ちゅう∕～について
```
-->

<script>
$(document).ready(function() {
  $('td').each(function() {
    $(this).html(japanruby($(this).html()));
  });
  function inittable() {
    table.column(1).visible(false);
    table.column(6).visible(false);
    table.column(7).visible(false);
    table
      .order( [5, 'asc'], [7, 'asc'] )
      .draw();

    initFilters();
  }
  setTimeout(inittable, 300);
  $('table tbody tr td:nth-child(2)').each(function() {
    var content = $(this).html();
    if (content.trim() !== '&nbsp;') {
      $(this).html('<a href="http://kanji.jitenon.jp/cat/search.php?getdata=' + content + '" target="_blank">' + content + '</a>');
    }
  });
  $('table tbody tr td:nth-child(5)')
  .add('table tbody tr td:nth-child(1)')
  .add('table tbody tr td:nth-child(2)')
  .each(function() {
    $(this).addClass('japan');
  });
  $('a.toggle-mode').on('click', function(e) {
    e.preventDefault();
    table.columns().visible(false);
    $.each($(this).attr('data-column').split(/\|/), function (i, cnum) {
        var column = table.column(cnum);
        column.visible(true);
    })
  });
  var quizdata;
  var quizid;
  $('button.toggle-start').on('click', function(e) {
    e.preventDefault();
    quizdata = table.rows({filter: 'applied'}).data()
      .map(function(p) {
        var desc = "<span class='japan'>" + (p[1] == "&nbsp;" ? p[0] : p[4] + "<br />" + p[0]) + "</span>";
        desc += "<span class='card-pos'>[" + p[2] + "]</span>";
        return [p[3], desc]})
      .reduce(function(a, b){ return a.concat(b); });
    quizid = 0;
    displayquiz();
  });
  function displayquiz() {
    $("#content").html(quizdata[quizid]);
    $("#card-summary").html((Math.floor(quizid / 2) + 1) + '/' + (quizdata.length / 2));
  }
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
</style>

<!--
```
exe "normal my" | '<,'>s/∕//g | exe "normal \<C-V>`yI1:\<Esc>"
'<,'>s/\(.\{-}\):\(.\{-}\)\(（\(.\{-}\)）\)\? 〔\(.\{-}\)〕 \(.*\)/\2,\4,\5,\6,!\4(\2),\1,1/g | '<,'>s/!(\(.*\))/\1/g
'<,'>s/\(.\{-}\):\(.\{-}\)\(（\(.\{-}\)）\)\? \(.*\)/\2,\4,熟语,\5,!\4(\2),\1,1/g | '<,'>s/!(\(.*\))/\1/g


'<,'>s/!\(.*\)い(\(.*\)い)/!\1(\2)い/g
'<,'>s/!\(.*\)ます(\(.*\)ます)/!\1(\2)ます/g
'<,'>s/!\(.*\)します(\(.*\)します)/!\1(\2)します/g
'<,'>s/!\(.*\)り(\(.*\)り)/!\1(\2)り/g
'<,'>s/!\(.*\)し(\(.*\)し)/!\1(\2)し/g
'<,'>s/!\(.*\)け(\(.*\)け)/!\1(\2)け/g

from excel version
'<,'>s/\(.\{-}\):\(.\{-}\)\t\(.\{-}\)\t\(.\{-}\)\t\(.\{-}\)\t\(.\{-}\)\t\(.\{-}\)\t/\3@\6,\4,\7,\5,!\4(\3),\1,1/g | '<,'>s/@,/,/g | '<,'>s/!(\(.*\))/\1/g
```
-->
