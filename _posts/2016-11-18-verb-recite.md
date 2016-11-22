---
layout: post
title:  "动词整理-背单词"
introduction: '动词背单词专用页面'
date:   2016-11-18 8:37:00 +0800
tags: 单词
category: word

---

{% include verb.html %}
{% include wordrecite.md %}

<script>
$(document).ready(function() {
  $.ajax('/verb.json', { dataType: "json" })
    .done(function (data) {
      var d = verbhelper.parseajaxdata(data);
      curlessonquizdata = d.map(function (p) {
        return { kana: p.kana, kanji: p.kanji, pos: p.pos, explain: p.desc, display: p.masu, rid: p.lesson + "|" + p.idx };
      });
    });
});
</script>

