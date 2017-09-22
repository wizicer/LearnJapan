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
  <input id="l1byunit" type="checkbox" checked>
  <label for="l1byunit">初级单词按单元分</label>
</div>
<div class="list-group-item">
  <input id="l2bylesson" type="checkbox" checked>
  <label for="l2bylesson">中级单词按课文分</label>
</div>
<div class="list-group-item">
  <input id="verbbylevel" type="checkbox" checked>
  <label for="verbbylevel">动1+2按考试级别分</label>
</div>
<div class="list-group-item">
  <input id="suruverbbylevel" type="checkbox" checked>
  <label for="suruverbbylevel">动3按考试级别分</label>
</div>

</div>
<button class="downloadMidoriCards btn btn-primary">下载MIDORI卡片</button>

<script>
$(document).ready(function() {
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
        //let display = p.replace(/\<rt\>(.*?)\<\/rt\>/g, '')
        //              .replace(/\<ruby\>(.*?)\<\/ruby\>/g, '$1');
        return { t:1, i:display }});
    return d;
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
        if ($("#verbbylevel").prop('checked')) {
          let filterVerb = _ => _[2] == "动1" || _[2] == "动2"
          pushWordsByLevel(arr, res.data, "动1+2", filterVerb);
        }
        if ($("#suruverbbylevel").prop('checked')) {
          let filterVerb = _ => _[2] == "动3"
          pushWordsByLevel(arr, res.data, "する動詞", filterVerb);
        }
        let name = '标日词汇';
        let output = formatToMidoriOutput(name, arr);
        download(name + ".midori", output);
      });
  });
});
</script>
