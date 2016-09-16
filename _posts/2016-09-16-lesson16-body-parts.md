---
layout: post
title:  "相貌身材"
introduction: '第十六课 补充知识 相貌身材'
date:   2016-09-16 18:35:00 +0800
main-class: 'class'
tags: 补充知识
categories: 初级

---

| 身体部位             | 形容词1                 | 形容词2                   |
| ---                  | ---                     | ---                       |
| !脚(あし)/!指〔ゆび) | !長(なが)い/!太(ふと)い | !短(みじか)い/!細(ほそ)い |
| !足(あし)            | !大(おお)きい           | !小(ちい)さい             |
| !目(め)              | !大(おお)きい           | !小(ちい)さい/!細(ほそ)い |
| !鼻(はな)            | !高(たか)い             | !低(ひく)い               |
| !顔(かお)            | !大(おお)きい           | !小(ちい)さい             |
| !背(せ)              | !高(たか)い             | !低(ひく)い               |
{:.japan}

<style>
.japan, .japan a {
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
}
ruby rt, ruby {
  background-color: black;
}
ruby rt:hover, ruby:hover {
  background-color: inherit;
}
</style>


<script>
$(document).ready(function() {
  function getChar(sentence, start, len) {
    if (len == undefined) {
      len = "*";
    } else {
      len = "{" + len + "}"
    }
    var re = new RegExp("(.[ゅょゃュョャ]?){" + start + "}((.[ゅょゃュョャ]?)" + len + ")");
    var result = re.exec(sentence)[2];
    return result;
  }
  $('td').each(function() {
    var content = $(this).html();
    if (content.indexOf('!') >= 0) {
      content = content.replace(/!(.*?)\((.*?)\)/g, '<rt></rt>$1<rt>$2</rt>');
      $(this).html('<ruby>' + content + '</ruby>');
    } else if (content.indexOf('@') >= 0) {
      var re = /(.*)@(\d)/g;
      var match = re.exec(content);
      var sen = match[1];
      var num = match[2];
      if (num == 0) {
        content = getChar(sen, 0, 1) + "<span class='accent'>" + getChar(sen, 1) + "</span>";
      } else if (num == 1) {
        content = "<span class='accent'>" + getChar(sen, 0, 1) + "</span>"
          + getChar(sen, num);
      } else {
        content = getChar(sen, 0, 1)
          + "<span class='accent'>" + getChar(sen, 1, num - 1) + "</span>"
          + getChar(sen, num);
      }
      $(this).html(content);
    }
  });
});
</script>
