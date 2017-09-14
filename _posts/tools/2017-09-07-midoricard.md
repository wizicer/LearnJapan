---
layout: page
title: "MIDORI卡片"
description: "MIDORI卡片"
category: tools
---

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
  $('button.downloadMidoriCards').on('click', function(e) {
    e.preventDefault();
    $.ajax('{{basepath}}/words.json', { dataType: "json" })
      .done(function (res) {
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
        function getWords(lesson, data) {
          let d = data
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
        let arr = [];
        for(let i = 1; i <= 12; i++) {
          let warr = [];
          for(let j = 1; j <= 4; j++) {
            let lesson = (i - 1) * 4 + j;
            let lid = " " + ("00" + lesson).slice(-3);
            //arr.push({ n:"初级第" + i + "课", b:getWords(lid, res.data) });
            warr = warr.concat(getWords(lid, res.data));
          }
          arr.push({ n:"初级第" + i + "单元", b:warr });
        }
        for(let i = 1; i <= 32; i++) {
          let lesson = "m" + ("0" + i).slice(-2);
          arr.push({ n:"中级第" + i + "课", b:getWords(lesson, res.data) });
        }
        let name = '标日词汇';
        let output = JSON.stringify({version:1,data:{n:name,f:arr},isroot:0});
        //let output = JSON.stringify({version:1,data:{n:name,b:Array.from(list)},isroot:0});
        output = output.replace(/"version":/g, 'version:')
                      .replace(/"data":/g, 'data:')
                      .replace(/"n":/g, 'n:')
                      .replace(/"b":/g, 'b:')
                      .replace(/"t":/g, 't:')
                      .replace(/"f":/g, 'f:')
                      .replace(/"i":/g, 'i:')
                      .replace(/"isroot":/g, 'isroot:');
        /* example output: {version:1,data:{n:"漢字2",b:[{t:1,i:"生"},{t:1,i:"下"}]},isroot:0} */
        download(name + ".midori", output);
        //console.log(output);
      });
  });
});
</script>
