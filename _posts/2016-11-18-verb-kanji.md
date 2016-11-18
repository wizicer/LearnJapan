---
layout: post
title:  "动词整理-相同汉字"
introduction: '相同汉字的动词整理表格'
date:   2016-11-18 8:35:00 +0800
tags: 语法
category: grammar

---

<span class="verb1">五段动词</span>
<span class="verb2-1">上一段动词</span>
<span class="verb2-2">下一段动词</span>
<span class="verb3">動3</span>

| 漢字    | 課 | 類别 | 辞書形 | 意味 |
| ----    | -- | ---  | ------ | ---- |
| loading |
{:.japan#kanjitable}

{% include verb.html %}

<script>
$(document).ready(function() {
  $.ajax('/verb.json')
    .done(function (data) {
      var d = $.map(JSON.parse(data), verbhelper.parseajaxdata);
      verbhelper.initgrouptable(d, $('#kanjitable'), "kanji", [ "lesson", "pos", "jisyo", "desc"], function (group) { return group.length > 1 && group.length < 20; });

      $('td').each(function() {
        $(this).html(japanruby($(this).html()));
      });
    });
});
</script>

