---
layout: page
title: "MIDORI卡片"
description: "MIDORI卡片"
category: tools
---

<div class="list-group">
<div class="list-group-item">
  <input id="l1bylesson" type="checkbox">
  <label for="l1bylesson">初级单词按课文分</label>
</div>
<div class="list-group-item">
  <input id="l1byunit" type="checkbox">
  <label for="l1byunit">初级单词按单元分</label>
</div>
<div class="list-group-item">
  <input id="l2bylesson" type="checkbox">
  <label for="l2bylesson">中级单词按课文分</label>
</div>
<div class="list-group-item">
  <input id="verbbylevel" type="checkbox">
  <label for="verbbylevel">动1+2按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="suruverbbylevel" type="checkbox">
  <label for="suruverbbylevel">动3按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="allsuruverb" type="checkbox">
  <label for="allsuruverb">所有动3</label>
</div>
<div class="list-group-item">
  <input id="adj1bylevel" type="checkbox">
  <label for="adj1bylevel">形1按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="adj2bylevel" type="checkbox">
  <label for="adj2bylevel">形2按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="adjbylevel" type="checkbox">
  <label for="adjbylevel">所有形容词按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="alladj" type="checkbox">
  <label for="alladj">所有形容词</label>
</div>

</div>
<button class="downloadMidoriCards btn btn-primary">下载MIDORI卡片</button>

<script>
$(document).ready(function() {
  let kanjimap = {};
  kanjimap["ついていく"] = "付いて行く";
  kanjimap["なめる"] = "舐める";

  // adj
  kanjimap["おもしろい"] = "面白い";
  kanjimap["つまらない"] = "詰まらない";
  kanjimap["おいしい"] = "美味しい";
  kanjimap["まずい"] = "不味い";
  kanjimap["あつい"] = "熱い";
  kanjimap["すばらしい"] = "素晴らしい";
  kanjimap["かわいい"] = "可愛い";
  kanjimap["きれい"] = "綺麗";
  kanjimap["にぎやか"] = "賑やか";
  kanjimap["だめ"] = "駄目";
  kanjimap["まじめ"] = "真面目";
  kanjimap["うるさい"] = "煩い";
  kanjimap["うれしい"] = "嬉しい";
  kanjimap["おかしい"] = "可笑しい";
  kanjimap["すてき"] = "素敵";
  kanjimap["ひどい"] = "酷い";
  kanjimap["へん"] = "変";
  kanjimap["ぜいたく"] = "贅沢";
  kanjimap["おとなしい"] = "大人しい";
  kanjimap["さわやか"] = "爽やか";
  kanjimap["ありがたい"] = "有難い";
  kanjimap["かわいそう"] = "可哀そう";
  kanjimap["わずか"] = "僅か";
  kanjimap["わがまま"] = "我儘";
  kanjimap["くやしい"] = "悔しい";
  kanjimap["さまざま"] = "様々";
  kanjimap["みっともない"] = "見っともない";
  kanjimap["よろしい"] = "宜しい";
  kanjimap["ばか"] = "馬鹿";
  kanjimap["うらやましい"] = "羨ましい";
  kanjimap["とんでもない"] = "飛んでもない";
  kanjimap["ちょっとした"] = "一寸した";
  kanjimap["もっとも"] = "最も";
  kanjimap["あわただしい"] = "慌しい";
  kanjimap["おめでたい"] = "御愛でたい";
  kanjimap["さんざん"] = "散々";
  kanjimap["おしゃべり"] = "御喋り";
  kanjimap["かわいらしい"] = "可愛らしい";
  kanjimap["おろそか"] = "疎か";
  kanjimap["いいかげん"] = "好い加減";
  kanjimap["めったに"] = "滅多に";
  kanjimap["ずるい"] = "狡い";
  kanjimap["かゆい"] = "痒い";
  kanjimap["おおざっぱ"] = "大雑把";
  kanjimap["ずうずうしい"] = "図々しい";
  kanjimap["はるか"] = "遥か";
  kanjimap["だるい"] = "怠い";

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  function convertMasuToJisyo(word, pos) {
    let cjisyo = {};
    cjisyo["き"] = "く";
    cjisyo["ぎ"] = "ぐ";
    cjisyo["び"] = "ぶ";
    cjisyo["み"] = "む";
    cjisyo["に"] = "ぬ";
    cjisyo["ち"] = "つ";
    cjisyo["り"] = "る";
    cjisyo["い"] = "う";
    cjisyo["し"] = "す";
    let jisyo  = word.replace(/ます$/g, "");
    if (pos.endsWith('2')) {
      jisyo += "る";
    } else if (pos.endsWith('3')) {
      jisyo = jisyo.slice(0, -1) + "する";
    } else {
      jisyo = jisyo.slice(0, -1) + cjisyo[jisyo.slice(-1)];
    }

    return jisyo;
  }
  function getWords(lesson, data, filterCallback) {
    let d = data;
    if (filterCallback != undefined) {
      d = d.filter(filterCallback);
    }
    d = d
    .filter(_ => _[5].indexOf(lesson) > -1)
    .map(function(p) {
      let word = p[4];
      let pos = p[2];
      let pp = word;
      if (word.endsWith("ます") && pos.startsWith("动")) // only process verb in masu
        pp = convertMasuToJisyo(word, pos);
      let display = pp.replace(/!(.*?)\((.*?)\)/g, '$1') // remove ruby
                      .replace(/～/g, '') // remove ～
                      .replace(/([\u4E00-\u9FAF]{2})する/g, '$1') // remove する
                      .replace(/^[おご]([\u4E00-\u9FAF]+)/g, '$1') // remove おご
                      ;
      if (kanjimap.hasOwnProperty(display)) display = kanjimap[display]; // replace with custom kanji map
        //let display = p.replace(/\<rt\>(.*?)\<\/rt\>/g, '')
        //              .replace(/\<ruby\>(.*?)\<\/ruby\>/g, '$1');
        return { t:1, i:display }});
    return d;
  }
  function pushWordsByLevel(arr, data, suffix, filter) {
    for(let i = 1; i <= 2; i++) {
      let warr = [];
      for(let j = 1; j <= 24; j++) {
        let lesson = (i - 1) * 24 + j;
        let lid = " " + ("00" + lesson).slice(-3);
        warr = warr.concat(getWords(lid, data, filter));
      }
      arr.push({ n:"N" + (6 - i) + suffix, b:warr });
    }
    for(let i = 1; i <= 2; i++) {
      let warr = [];
      for(let j = 1; j <= 16; j++) {
        let lesson = (i - 1) * 16 + j;
        let lid = "m" + ("0" + lesson).slice(-2);
        warr = warr.concat(getWords(lid, data, filter));
      }
      arr.push({ n:"N" + (4 - i) + suffix, b:warr });
    }
  }
  function pushAllWords(arr, data, name, filter) {
    let warr = [];
    for(let i = 1; i <= 2; i++) {
      for(let j = 1; j <= 24; j++) {
        let lesson = (i - 1) * 24 + j;
        let lid = " " + ("00" + lesson).slice(-3);
        warr = warr.concat(getWords(lid, data, filter));
      }
    }
    for(let i = 1; i <= 2; i++) {
      for(let j = 1; j <= 16; j++) {
        let lesson = (i - 1) * 16 + j;
        let lid = "m" + ("0" + lesson).slice(-2);
        warr = warr.concat(getWords(lid, data, filter));
      }
    }
    arr.push({ n:name, b:warr });
  }
  function formatToMidoriOutput(name, arr) {
    // example output: {version:1,data:{n:"漢字2",b:[{t:1,i:"生"},{t:1,i:"下"}]},isroot:0}
    let json = JSON.stringify({version:1,data:{n:name,f:arr},isroot:0});
    return json.replace(/"version":/g, 'version:')
                      .replace(/"data":/g, 'data:')
                      .replace(/"n":/g, 'n:')
                      .replace(/"b":/g, 'b:')
                      .replace(/"t":/g, 't:')
                      .replace(/"f":/g, 'f:')
                      .replace(/"i":/g, 'i:')
                      .replace(/"isroot":/g, 'isroot:');
  }
  $('button.downloadMidoriCards').on('click', function(e) {
    e.preventDefault();
    $.ajax('{{basepath}}/words.json', { dataType: "json" })
      .done(function (res) {
        let arr = [];
        if ($("#l1bylesson").prop('checked')) {
          for(let i = 1; i <= 48; i++) {
            let lid = " " + ("00" + i).slice(-3);
            arr.push({ n:"初级第" + i + "课", b:getWords(lid, res.data) });
          }
        }
        if ($("#l1byunit").prop('checked')) {
          for(let i = 1; i <= 12; i++) {
            let warr = [];
            for(let j = 1; j <= 4; j++) {
              let lesson = (i - 1) * 4 + j;
              let lid = " " + ("00" + lesson).slice(-3);
              warr = warr.concat(getWords(lid, res.data));
            }
            arr.push({ n:"初级第" + i + "单元", b:warr });
          }
        }
        if ($("#l2bylesson").prop('checked')) {
          for(let i = 1; i <= 32; i++) {
            let lesson = "m" + ("0" + i).slice(-2);
            arr.push({ n:"中级第" + i + "课", b:getWords(lesson, res.data) });
          }
        }
        if ($("#verbbylevel").prop('checked')) {
          let filterVerb = _ => _[2] == "动1" || _[2] == "动2"
          pushWordsByLevel(arr, res.data, "动1+2", filterVerb);
        }
        if ($("#suruverbbylevel").prop('checked')) {
          let filterVerb = _ => _[2] == "动3"
          pushWordsByLevel(arr, res.data, "する動詞", filterVerb);
        }
        if ($("#adj1bylevel").prop('checked')) {
          let filterAdj = _ => _[2] == "形1"
          pushWordsByLevel(arr, res.data, "形1", filterAdj);
        }
        if ($("#adj2bylevel").prop('checked')) {
          let filterAdj = _ => _[2] == "形2"
          pushWordsByLevel(arr, res.data, "形2", filterAdj);
        }
        if ($("#adjbylevel").prop('checked')) {
          let filterAdj = _ => _[2] == "形1" || _[2] == "形2"
          pushWordsByLevel(arr, res.data, "形容词", filterAdj);
        }
        if ($("#alladj").prop('checked')) {
          let filterAdj = _ => _[2] == "形1" || _[2] == "形2"
          pushAllWords(arr, res.data, "形容词", filterAdj);
        }
        if ($("#allsuruverb").prop('checked')) {
          let filterVerb = _ => _[2] == "动3"
          pushAllWords(arr, res.data, "する動詞", filterVerb);
        }
        let name = '标日词汇';
        let output = formatToMidoriOutput(name, arr);
        download(name + ".midori", output);
      });
  });
});
</script>
