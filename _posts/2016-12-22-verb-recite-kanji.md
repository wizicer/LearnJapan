---
layout: post
title:  "动词整理-汉字记忆"
introduction: '动词汉字记忆专用页面'
date:   2016-12-22 8:37:00 +0800
tags: 单词
category: word

---

{% include base.html %}
{% include wordhelper.html %}
<div class="container-fluid">
<div id="word-container" class="row">
</div>
</div>
<style>
.word-cell {
  font-size: 16pt;
}
</style>

<div id="cell-template">
  <div class="col-md-3 col-xs-6">
  <div class="well word-cell" lang="jp">
  </div>
  </div>
</div>

<script>
$(document).ready(function() {
  $.ajax('{{basepath}}/verb.json', { dataType: "json" })
    .done(function (data) {
      var d = wordhelper.parseverbdata(data);
      var tp = $('#cell-template').detach();
      tp = tp.find("> div");
      for (var i = 0; i < d.length; i++) {
        if (d[i].pos.endsWith('3')) continue;
        var word = d[i].masu;
        word = word.replace(/ます$/g, "")
                   .replace(/!(.*?)\(.*?\)/g, '$1')
                   .replace(/[\u3040-\u309f\u30a0-\u30ff]/g, "　")
                   .replace(/$/g, 'ます');
        if (word.trim() == 'ます') continue;
        word = word +'[' + d[i].desc.replace(/【(.*)】.*/g, '$1').replace(/自他/g, '混') + ']';
        var cell = tp.clone();
        cell.find('.word-cell').html(word);
        $('#word-container').append(cell);
      }
    });
});
</script>

