import { Injectable } from '@angular/core';

@Injectable()
export class JapanRuby {

  constructor() { }

  static convert(content: string) {
    function getChar(sentence: string, start: number, len?: number) {
      var lenstr = len == undefined ? "*" : ("{" + len + "}");
      var re = new RegExp("(.[ゅょゃュョャ]?){" + start + "}((.[ゅょゃュョャ]?)" + lenstr + ")");
      var result = re.exec(sentence)[2];
      return result;
    }
    try {
      if (content.indexOf('!') >= 0) {
        content = content.replace(/!(.*?)\((.*?)\)/g, '<rt></rt>$1<rt>$2</rt>');
        return '<ruby>' + content + '</ruby>';
      } else if (content.indexOf('@') >= 0) {
        // support convert text with accent like `おふろ@2に@はいります@4`
        var re = /([\u3040-\u309f\u30a0-\u30ff]*)@((?:\d{1,2})?)/g;
        return content.replace(re, function (_, sen, num) {
          if (num == undefined || num == "") {
            return sen;
          } else if (num == 0) {
            return getChar(sen, 0, 1)
              + "<span class='accent0'>" + getChar(sen, 1) + "</span>";
          } else if (num == 1) {
            return "<span class='accent'>" + getChar(sen, 0, 1) + "</span>"
              + getChar(sen, num);
          } else {
            return getChar(sen, 0, 1)
              + "<span class='accent'>" + getChar(sen, 1, num - 1) + "</span>"
              + getChar(sen, num);
          }
        });
      }
    }
    catch (err) {
      console.error('error parsing "' + content + '"', err);
    }
    return content;
  }

}
