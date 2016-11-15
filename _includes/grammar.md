<div>
显示列:
- <a class="toggle-vis" data-column="0">句型、表达</a>
- <a class="toggle-vis" data-column="1">解释</a>
- <a class="toggle-vis" data-column="2">课次</a>
- <a class="toggle-vis" data-column="3">序</a>
</div>

| 句型、表达             | 解释                    | 课次               | 序              |
| ----                   | ----                    | ----               | --              | {% for grammar in site.data.grammar %}
| {{grammar.expression}} | {{grammar.explanation}} | {{grammar.lesson}} | {{grammar.idx}} | {% endfor %}
| ====                   | ====                    | ====               | ==              |
| 句型、表达             | 解释                    | 课次               | 序              |
{:.display width="100%"}

<script>
$(document).ready(function() {
  $('a.toggle-vis').on('click', function(e) {
    e.preventDefault();
    var column = table.column( $(this).attr('data-column') );
    column.visible(!column.visible());
  });
  function inittable() {
    table.column(3).visible(false);
    table
      .order( [3, 'asc'] )
      .draw();

    initFilters();
  }
  setTimeout(inittable, 300);
  $('table tbody tr td:nth-child(1)')
  .each(function() {
    $(this).addClass('japan');
  });
  $('table tbody tr td:nth-child(2)')
  .each(function() {
    $(this).html($(this).html().replace(/\\n/g, "<br />"));
  });
});
</script>
