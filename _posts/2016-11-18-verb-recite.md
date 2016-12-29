---
layout: post
title:  "动词整理-背单词"
introduction: '动词背单词专用页面'
date:   2016-11-18 8:37:00 +0800
tags: 单词
category: word

---

{% include wordhelper.html %}
<button class="toggle-start btn btn-primary">开始记单词</button>
{% include wordrecite.md %}

<script>
$(document).ready(function() {
  $('button.toggle-start').prop('disabled', true);
  $.ajax('/verb.json', { dataType: "json" })
    .done(function (data) {
      var d = wordhelper.parseverbdata(data);
      var quizdata = d
        .filter(function(p) { return !p.pos.endsWith('3'); })
        .map(function(p) {
          var word = p.masu;
          word = word.replace(/ます$/g, "")
                    .replace(/!(.*?)\(.*?\)/g, '$1')
                    .replace(/[\u3040-\u309f\u30a0-\u30ff]/g, "__")
                    .replace(/$/g, 'ます');
          var read = p.masu.replace(/[^\u3040-\u309f\u30a0-\u30ff]/g, "");
          var desc = "<span lang='jp'>" + japanruby(p.masu) + "</span><br />";
          desc += "<span lang='jp'>" + japanruby(p.kana) + "</span>";
          desc += "<span class='card-pos'>[" + p.pos + "]</span>";
          desc += "<a href='#' class='read' data-read='"+ read +"'>[读]</a>";
          var tip = "<span lang='jp'>" + word + "</span>";
          tip += "<br/><span class='card-explain'>" + p.desc + "</span>";
          var rid = "v" + p.lesson + "|" + p.idx;
          return { tip: tip, desc: desc, read: read, rid: rid }});
      $('button.toggle-start').prop('disabled', false);
      $('button.toggle-start').on('click', function(e) {
        e.preventDefault();
        easyquiz.start(quizdata);
      });
    });
});
</script>

<style>
.card-explain {
  font-size: 9pt;
}
</style>

