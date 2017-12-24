---
layout: post
title:  "动词整理-变形表格"
introduction: '动词各种变形整理表格'
date:   2016-12-25 8:33:00 +0800
tags: 语法
category: grammar

---

{% include base.html %}
<table id="verbtable" class="display nowrap japan">
  <thead>
    <tr>
      <th></th>
      <th>課</th>
      <th>類别</th>
      <th>敬体形</th>
      <th>简体形</th>
      <th>可能敬体形</th>
      <th>可能简体形</th>
      <th>其他形</th>
      <th>意味</th>
      <th>搭配</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<style>
#verbtable { width: 100% !important; }
</style>

{% include wordhelper.html %}
<!-- obj.respect = joincell( [ obj.masu, obj.masen, obj.masita, obj.masendesita ] ); -->
<!-- obj.simple = joincell( [ obj.jisyo, obj.nai, obj.ta, obj.nakatta ] ); -->
<!-- obj.kanourespect = joincell( [ obj.kanoumasu, obj.kanoumasen, obj.kanoumasita, obj.kanoumasendesita ] ); -->
<!-- obj.kanousimple = joincell( [ obj.kanou, obj.kanounai, obj.kanouta, obj.kanounakatta ] ); -->
<!-- obj.other = joincell( [ obj.te, obj.meirei, obj.isi, obj.ba ] ); -->
<!-- var links = obj.goolink + "|" + obj.ojadlink + "|" + obj.xdlink; -->
<!-- obj.desclinks = joincell( [ obj.desc, links ] ); -->

<script>
$(document).ready(function() {
  table = $('table').DataTable({
    ajax: {
      cache: true,
      url: '{{ basepath }}/verb.json',
      dataSrc: function ( json ) {
        var d = wordhelper.parseverbdata(json);
        return d;
      }
    },
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.childRowImmediate,
        type: 'column',
      }
    },
    dom: 'Bfrtip',
    buttons: [
      'pageLength', 'colvis'
    ],
    stateSave: true,
    deferRender: true,
    pageLength: 5,
    lengthMenu: [[1, 2, 5, 10, 50, -1], [1, 2, 5, 10, 50, "All"]],
    columns: [
      { data: function() { return ""; } },
      { data: "lesson" },
      { data: "pos" },
      { data: "respect" },
      { data: "simple" },
      { data: "kanourespect" },
      { data: "kanousimple" },
      { data: "other" },
      { data: "desclinks" },
      { data: "idioms" },
    ],
    columnDefs: [
      {
        render: function ( data, type, row ) { return japanruby(data); },
        targets: '_all'
      },
      { visible: false,  targets: [ 2 ] },
      {
        className: 'control',
        orderable: false,
        targets:   0
      }
    ],
  });
});
</script>

