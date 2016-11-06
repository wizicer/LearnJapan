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

{% include wordrecite.md %}
