---
layout: post
title:  "动词"
description: '动词的ます形，辞書形，ない形，て形，た形及搭配'
permalink: /verb/index.html

---

<span class="verb1">動1</span>
<span class="verb2">動2</span>
<span class="verb3">動3</span>

| 漢字    | 課 | 類别 | 辞書形 |
| ----    | -- | ---  | ------ |
| loading |
{:.japan#kanjitable}

| 課 | 類别 | ます形                   | 辞書形       | ない形       | て形         | た形         | 特殊 | 搭配                     |
| -- | ---  | -----------------------  | ------------ | ------------ | ------------ | ------------ | ---- | ------------------------ |
|loading|
{:.japan#verbtable}

<style>
.verb1 { background-color: #BAA378; }
.verb2 { background-color: #E6E6DC; }
.verb3 { background-color: #81A594; }
</style>

<script>
$(document).ready(function() {
  var sp = {};
  sp["!来(き)ます"] = { jisyo: "!来(く)る", nai: "!来(こ)ない" }
  sp["あります"] = { nai: "ない" }
  sp["!行(い)きます"] = { te: "!行(い)って" }
  var cte = {};
  var cnai = {};
  var cjisyo = {};
  cte["き"] = "いて";
  cte["ぎ"] = "いで";
  cte["び"] = "んで";
  cte["み"] = "んで";
  cte["に"] = "んで";
  cte["ち"] = "って";
  cte["り"] = "って";
  cte["い"] = "って";
  cte["し"] = "して";

  cnai["き"] = "か";
  cnai["ぎ"] = "が";
  cnai["び"] = "ば";
  cnai["み"] = "ま";
  cnai["に"] = "な";
  cnai["ち"] = "た";
  cnai["り"] = "ら";
  cnai["い"] = "わ";
  cnai["し"] = "さ";

  cjisyo["き"] = "く";
  cjisyo["ぎ"] = "ぐ";
  cjisyo["び"] = "ぶ";
  cjisyo["み"] = "む";
  cjisyo["に"] = "ぬ";
  cjisyo["ち"] = "つ";
  cjisyo["り"] = "る";
  cjisyo["い"] = "う";
  cjisyo["し"] = "す";

  $.ajax('/verb.json')
    .done(function (data) {
      var d = $.map(JSON.parse(data), function (od) {
        var obj = { pos: od[2], lesson: od[5], masu: od[4]};
        obj.pos = obj.pos.replace("动", "動");
        obj.lian = obj.masu.replace(/ます$/g, "");

        // te
        obj.te = obj.lian;
        if (obj.pos.endsWith('1')) {
          obj.te = obj.te.slice(0, -1) + cte[obj.te.slice(-1)];
        } else {
          obj.te += "て";
        }

        // ta
        obj.ta = obj.te;
        obj.ta = obj.ta.replace(/て$/g, 'た');
        obj.ta = obj.ta.replace(/で$/g, 'だ');

        // jisyo
        obj.jisyo = obj.lian;
        if (obj.pos.endsWith('2')) {
          obj.jisyo += "る";
        } else if (obj.pos.endsWith('3')) {
          obj.jisyo = obj.jisyo.slice(0, -1) + "する";
        } else {
          obj.jisyo = obj.jisyo.slice(0, -1) + cjisyo[obj.jisyo.slice(-1)];
        }

        // nai
        obj.nai = obj.lian;
        if (obj.pos.endsWith('1')) {
          obj.nai = obj.nai.slice(0, -1) + cnai[obj.nai.slice(-1)] + "ない";
        } else {
          obj.nai += "ない";
        }

        // kanji
        obj.kanji = obj.jisyo.replace(/[!()\u3040-\u309f\u30a0-\u30ff]/g, "")

        if (sp[obj.masu]) {
          for (p in sp[obj.masu]) {
            obj[p] = sp[obj.masu][p];
          }
        }

        return obj;
      });
      $('#verbtable tbody').remove();
      $.each(d, function(i, item) {
        $('#verbtable').append('<tr><td>'
          +item.lesson+'</td><td>'
          +item.pos+'</td><td>'
          +item.masu+'</td><td>'
          +item.jisyo+'</td><td>'
          +item.nai+'</td><td>'
          +item.te+'</td><td>'
          +item.ta+'</td><td>'
          +''+'</td><td>'
          +''+'</td></tr>');
      });
      var hist = {};
      $.each(d, function (i, a) { if (a.kanji in hist) hist[a.kanji].push(a); else hist[a.kanji] = [a]; } );
      $('#kanjitable tbody').remove();
      $.each(hist, function(i, group) {
        console.log(hist[i]);
        if (group.length == 1 || group.length > 20) return;
        var all = '<tr>';
        all += '<td rowspan="' + group.length + '">' + group[0].kanji + '</td>';
        $.each(group, function(i, item) {
          all += '<td>' + item.lesson + '</td><td>'
            + item.pos + '</td><td>'
            + item.jisyo + '</td></tr><tr>';
        });
        $('#kanjitable').append(all + '</tr>');
      });
      $('td').each(function() {
        $(this).html(japanruby($(this).html()));
      });
    });
});
</script>

