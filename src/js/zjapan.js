function japanruby(content) {
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
  if (content.indexOf('!') >= 0) {
    content = content.replace(/!(.*?)\((.*?)\)/g, '<rt></rt>$1<rt>$2</rt>');
    return '<ruby>' + content + '</ruby>';
  } else if (content.indexOf('@') >= 0) {
    var re = /(.*)@(\d)/g;
    var match = re.exec(content);
    if (!match) return content;
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
    return content;
  }
  return content;
}
