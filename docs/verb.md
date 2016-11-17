---
layout: post
title:  "动词"
description: '动词的ます形，辞書形，ない形，て形，た形及搭配'
permalink: /verb/index.html

---

<span class="verb1">五段动词</span>
<span class="verb2-1">上一段动词</span>
<span class="verb2-2">下一段动词</span>
<span class="verb3">動3</span>

| 意味    | 課 | 類别 | 辞書形 | 意味 |
| ----    | -- | ---  | ------ | ---- |
| loading |
{:.japan#imitable}

| 漢字    | 課 | 類别 | 辞書形 | 意味 |
| ----    | -- | ---  | ------ | ---- |
| loading |
{:.japan#kanjitable}

| 音読み  | 課 | 類别 | 辞書形 | 意味 |
| ------  | -- | ---  | ------ | ---- |
| loading |
{:.japan#prontable}

| 課      | 類别 | ます形 | 辞書形 | ない形 | て形 | た形 | 意味 | 特殊 | 搭配 |
| --      | ---  | ------ | ------ | ------ | ---- | ---- | ---- | ---- | ---- |
| loading |
{:.japan#verbtable}

<style>
.verb1 { background-color: #B5F4FE; }
.verb2 { background-color: #69D2E7; }
.verb2-1 { background-color: #69D2E7; }
.verb2-2 { background-color: #52B2E2; }
.verb3 { background-color: #00BCD1; }
.spcell { font-weight: bold; }
.althead { background-color: #C0D8D7; }
</style>

<script>
$(document).ready(function() {
  var sp = {};
  sp["!来(き)ます"] = { jisyo: "!来(く)る", nai: "!来(こ)ない" }
  sp["あります"] = { nai: "ない" }
  sp["!行(い)きます"] = { te: "!行(い)って", ta: "!行(い)った" }
  var cte = {};
  var cnai = {};
  var cjisyo = {};
  var verb21tail = "き ぎ び み に ち り い し";
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

  function purify(sen) {
    return sen.replace(/!(.*)\(.*\)/g, '$1')
  }

  $.ajax('/verb.json')
    .done(function (data) {
      var d = $.map(JSON.parse(data), function (od) {
        var obj = { pos: od[2], lesson: od[5], masu: od[4], desc: od[3]};
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

        // jisyo link
        obj.jisyolink = "<a target='_blank' href='http://dictionary.goo.ne.jp/freewordsearcher.html?MT=" + purify(obj.jisyo) + "&mode=0&x=0&y=0&kind=jn'>" + japanruby(obj.jisyo) + "</a>";

        // masu link
        obj.masulink = "<a target='_blank' href='http://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/word:" + purify(obj.masu) + "'>" + japanruby(obj.masu) + "</a>";

        // nai
        obj.nai = obj.lian;
        if (obj.pos.endsWith('1')) {
          obj.nai = obj.nai.slice(0, -1) + cnai[obj.nai.slice(-1)] + "ない";
        } else {
          obj.nai += "ない";
        }

        // kanji
        obj.kanji = obj.jisyo.replace(/[!()\u3040-\u309f\u30a0-\u30ff]/g, "");

        // special transformation
        if (sp[obj.masu]) {
          for (p in sp[obj.masu]) {
            obj[p] = sp[obj.masu][p];
            obj["sp" + p] = true;
          }
        }

        // pronounce
        obj.pronounce = obj.jisyo.replace(/[^\u3040-\u309f\u30a0-\u30ff]/g, "");

        // posclass
        if (obj.pos.endsWith('2')) {
          if (verb21tail.indexOf(obj.pronounce.slice(-2, -1)) >= 0) {
            obj.posclass = "verb2-1";
          }
          else {
            obj.posclass = "verb2-2";
          }
        } else if (obj.pos.endsWith('3')) {
          obj.posclass = "verb3";
        } else {
          obj.posclass = "verb1";
        }

        return obj;
      });

      function initgrouptable(data, table, groupby, tableRow, filter) {
        function createcell(klass, content) {
          return $('<td />', { class: klass }).html(content);
        };
        var groups = {};
        $.each(data, function (i, a) { if (a[groupby] in groups) groups[a[groupby]].push(a); else groups[a[groupby]] = [a]; } );
        table.children('tbody').remove();
        var count = 0;
        $.each(groups, function(i, group) {
          if (filter != undefined && !filter(group)) return;
          var row = $('<tr />');
          var headcell = $('<td rowspan="' + group.length + '">' + group[0][groupby] + '</td>');
          if (count++ % 2 == 0) headcell = headcell.addClass('althead');
          row.append(headcell);
          $.each(group, function(i, item) {
            $.each(tableRow, function(j, name) {
              row.append(createcell(item.posclass + (item["sp" + name] ? " spcell" : ""), item[name]));
            });
            table.append(row);
            row = $('<tr />');
          });
        });
      };

      initgrouptable(d, $('#kanjitable'), "kanji", [ "lesson", "pos", "jisyo", "desc"], function (group) { return group.length > 1 && group.length < 20; });
      initgrouptable(d, $('#prontable'), "pronounce", [ "lesson", "pos", "jisyo", "desc"], function (group) { return group.length > 1 && group.length < 20; });
      initgrouptable(d, $('#verbtable'), "lesson", [ "pos", "masulink", "jisyolink", "nai", "te", "ta", "desc", "", ""]);
      var dd = d.map(function(item) {
        var desc = item.desc.replace(/；/g, '，').replace(/（.*）/g, '');
        var ss = desc.split('，');
        return ss.map(function(ssitem) { return $.extend({}, item, { imi: ssitem }); } );
      }).reduce(function(a, b) { return a.concat(b);});
      initgrouptable(dd, $('#imitable'), "imi", [ "lesson", "pos", "jisyo", "desc"], function (group) { return group.length > 1 && group.length < 20; });

      $('td').each(function() {
        $(this).html(japanruby($(this).html()));
      });
    });
});
</script>

