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
        function getFolder(name, lesson, data) {
          let d = data
          .filter(_ => _[5].indexOf(lesson) > -1)
            .map(function(p) { return p[4]; })
            .map(function(p) {
              let display = p.replace(/!(.*?)\((.*?)\)/g, '$1');
              //let display = p.replace(/\<rt\>(.*?)\<\/rt\>/g, '')
              //              .replace(/\<ruby\>(.*?)\<\/ruby\>/g, '$1');
              return { t:1, i:display }});
          //console.log(lesson, d);
          return { n:name, b:d };
        }
        let arr = [];
        for(let i = 1; i <= 48; i++) {
          let lesson = ("00" + i).slice(-3);
          arr.push(getFolder("初级第" + i + "课", lesson, res.data));
        }
        for(let i = 1; i <= 32; i++) {
          let lesson = "m" + ("0" + i).slice(-2);
          arr.push(getFolder("中级第" + i + "课", lesson, res.data));
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
