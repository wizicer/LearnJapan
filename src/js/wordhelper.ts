class WordHelper {
  spverb: { [id:string] : any} = {};
  cte: { [id:string] : string} = {};
  cnai: { [id:string] : string} = {};
  cjisyo: { [id:string] : string} = {};
  cmeirei: { [id:string] : string} = {};
  cisi: { [id:string] : string} = {};
  verb21tail = "き ぎ び み に ち り い し";
  constructor(){
  this.spverb = {};
  this.cte = {};
  this.cnai = {};
  this.cjisyo = {};
  this.cmeirei = {};
  this.cisi = {};
  this.spverb["!来(き)ます"] = {
    jisyo: "!来(く)る",
    nai: "!来(こ)ない",
    isi: "!来(こ)よう",
    meirei: "!来(こ)い",
    ba: "!来(く)れば",
    kanou: "!来(こ)られる",
    kanoulian        : "!来(こ)られ",
    kanoumasu        : "!来(こ)られます",
    kanoumasen       : "!来(こ)られません",
    kanoumasita      : "!来(こ)られました",
    kanoumasendesita : "!来(こ)られませんでした",
    kanouta          : "!来(こ)られた",
    kanounai         : "!来(こ)られない",
    kanounakatta     : "!来(こ)られなかった",
    ukemi: "!来(こ)られる",
  };
  this.spverb["あります"] = { nai: "ない" };
  this.spverb["!行(い)きます"] = { te: "!行(い)って", ta: "!行(い)った" };
  this.cte["き"] = "いて";
  this.cte["ぎ"] = "いで";
  this.cte["び"] = "んで";
  this.cte["み"] = "んで";
  this.cte["に"] = "んで";
  this.cte["ち"] = "って";
  this.cte["り"] = "って";
  this.cte["い"] = "って";
  this.cte["し"] = "して";

  this.cnai["き"] = "か";
  this.cnai["ぎ"] = "が";
  this.cnai["び"] = "ば";
  this.cnai["み"] = "ま";
  this.cnai["に"] = "な";
  this.cnai["ち"] = "た";
  this.cnai["り"] = "ら";
  this.cnai["い"] = "わ";
  this.cnai["し"] = "さ";

  this.cjisyo["き"] = "く";
  this.cjisyo["ぎ"] = "ぐ";
  this.cjisyo["び"] = "ぶ";
  this.cjisyo["み"] = "む";
  this.cjisyo["に"] = "ぬ";
  this.cjisyo["ち"] = "つ";
  this.cjisyo["り"] = "る";
  this.cjisyo["い"] = "う";
  this.cjisyo["し"] = "す";

  this.cmeirei["く"] = "け";
  this.cmeirei["ぐ"] = "げ";
  this.cmeirei["ぶ"] = "べ";
  this.cmeirei["む"] = "め";
  this.cmeirei["ぬ"] = "ね";
  this.cmeirei["つ"] = "て";
  this.cmeirei["る"] = "れ";
  this.cmeirei["う"] = "え";
  this.cmeirei["す"] = "せ";

  this.cisi["く"] = "こう";
  this.cisi["ぐ"] = "ごう";
  this.cisi["ぶ"] = "ぼう";
  this.cisi["む"] = "もう";
  this.cisi["ぬ"] = "のう";
  this.cisi["つ"] = "とう";
  this.cisi["る"] = "ろう";
  this.cisi["う"] = "おう";
  this.cisi["す"] = "そう";
  }
  makeLink(url: string, title: string) {
    return "<a target='_blank' href='" + url + "'>" + title + "</a>";
  }

  makeGooLink(query: string, title: string) {
    return this.makeLink("http://dictionary.goo.ne.jp/freewordsearcher.html?MT=" + query + "&mode=0&x=0&y=0&kind=jn", title);
  }

  makeOjadLink(query: string, title: string) {
    return this.makeLink("http://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/word:" + query, title);
  }

  makeXdLink(query: string, title: string) {
    return this.makeLink("http://dict.hjenglish.com/jp/jc/" + query, title);
  }

  purify(sen: string) {
    return sen.replace(/!(.*)\(.*\)/g, '$1')
  }

  joincell(arr: Array<string>) {
    return arr.map(function(p) {return p && japanruby(p);}).join("<br />");
  }

  parseverbdataline(od: any, idioms: any) {
    var obj = od;
    obj.pos = obj.pos.replace("动", "動");
    obj.lian = obj.masu.replace(/ます$/g, "");

    // masen // masita // masendesita
    obj.masen = obj.lian + "ません";
    obj.masita = obj.lian + "ました";
    obj.masendesita = obj.lian + "ませんでした";

    // te
    obj.te = obj.lian;
    if (obj.pos.endsWith('1')) {
      obj.te = obj.te.slice(0, -1) + this.cte[obj.te.slice(-1)];
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
      obj.jisyo = obj.jisyo.slice(0, -1) + this.cjisyo[obj.jisyo.slice(-1)];
    }

    // nai
    obj.nai = obj.lian;
    if (obj.pos.endsWith('1')) {
      obj.nai = obj.nai.slice(0, -1) + this.cnai[obj.nai.slice(-1)] + "ない";
    } else {
      obj.nai += "ない";
    }

    // nakatta
    obj.nakatta = obj.nai.slice(0, -1) + "かった";

    // meirei
    obj.meirei = obj.jisyo;
    if (obj.pos.endsWith('2')) {
      obj.meirei = obj.meirei.replace(/る$/g, 'ろ');
    } else if (obj.pos.endsWith('3')) {
      obj.meirei = obj.meirei.replace(/する$/g, 'しろ');
    } else {
      obj.meirei = obj.meirei.slice(0, -1) + this.cmeirei[obj.meirei.slice(-1)];
    }

    // isi
    obj.isi = obj.jisyo;
    if (obj.pos.endsWith('2')) {
      obj.isi = obj.isi.replace(/る$/g, 'よう');
    } else if (obj.pos.endsWith('3')) {
      obj.isi = obj.isi.replace(/する$/g, 'しよう');
    } else {
      obj.isi = obj.isi.slice(0, -1) + this.cisi[obj.isi.slice(-1)];
    }

    // ba
    obj.ba = obj.jisyo;
    if (obj.pos.endsWith('2')) {
      obj.ba = obj.ba.replace(/る$/g, 'れば');
    } else if (obj.pos.endsWith('3')) {
      obj.ba = obj.ba.replace(/する$/g, 'すれば');
    } else {
      obj.ba = obj.ba.slice(0, -1) + this.cmeirei[obj.ba.slice(-1)] + 'ば';
    }

    // kanou
    obj.kanou = obj.jisyo;
    if (obj.pos.endsWith('2')) {
      obj.kanou = obj.kanou.replace(/る$/g, 'られる');
    } else if (obj.pos.endsWith('3')) {
      obj.kanou = obj.kanou.replace(/する$/g, 'できる');
    } else {
      obj.kanou = obj.kanou.slice(0, -1) + this.cmeirei[obj.kanou.slice(-1)] + 'る';
    }

    obj.kanoulian = obj.kanou.slice(0, -1);
    obj.kanoumasu = obj.kanoulian + "ます";
    obj.kanoumasen = obj.kanoulian + "ません";
    obj.kanoumasita = obj.kanoulian + "ました";
    obj.kanoumasendesita = obj.kanoulian + "ませんでした";
    obj.kanouta = obj.kanoulian + "た";
    obj.kanounai = obj.kanoulian + "ない";
    obj.kanounakatta = obj.kanoulian + "なかった";

    // ukemi
    obj.ukemi = obj.nai;
    if (obj.pos.endsWith('2')) {
      obj.ukemi = obj.ukemi.replace(/ない$/g, 'られる');
    } else if (obj.pos.endsWith('3')) {
      obj.ukemi = obj.ukemi.replace(/する$/g, 'される');
    } else {
      obj.ukemi = obj.ukemi.replace(/ない$/g, 'れる');
    }

    obj.ukemilian = obj.ukemi.slice(0, -1);
    obj.ukemimasu = obj.ukemilian + "ます";
    obj.ukemimasen = obj.ukemilian + "ません";
    obj.ukemimasita = obj.ukemilian + "ました";
    obj.ukemimasendesita = obj.ukemilian + "ませんでした";
    //obj.ukemita = obj.ukemilian + "た";
    //obj.ukeminai = obj.ukemilian + "ない";
    //obj.ukeminakatta = obj.ukemilian + "なかった";

    // kanji
    obj.kanji = obj.jisyo.replace(/[!()\u3040-\u309f\u30a0-\u30ff]/g, "");

    // special transformation
    if (this.spverb[obj.masu]) {
      for (var p in this.spverb[obj.masu]) {
        obj[p] = this.spverb[obj.masu][p];
        obj["sp" + p] = true;
      }
    }

    // goo link
    obj.goolink = this.makeGooLink(this.purify(obj.jisyo), "goo");
    // ojad link
    obj.ojadlink = this.makeOjadLink(this.purify(obj.jisyo), "OJAD");
    // xd link
    obj.xdlink = this.makeXdLink(this.purify(obj.jisyo), "小D");

    // compact cells
    obj.respect = this.joincell( [ obj.masu, obj.masen, obj.masita, obj.masendesita ] );
    obj.simple = this.joincell( [ obj.jisyo, obj.nai, obj.ta, obj.nakatta ] );
    obj.kanourespect = this.joincell( [ obj.kanoumasu, obj.kanoumasen, obj.kanoumasita, obj.kanoumasendesita ] );
    obj.kanousimple = this.joincell( [ obj.kanou, obj.kanounai, obj.kanouta, obj.kanounakatta ] );
    obj.other = this.joincell( [ obj.te, obj.meirei, obj.isi, obj.ba ] );
    var links = obj.goolink + "|" + obj.ojadlink + "|" + obj.xdlink;
    obj.desclinks = this.joincell( [ obj.desc, links ] );

    // pronounce
    obj.pronounce = obj.jisyo.replace(/[^\u3040-\u309f\u30a0-\u30ff]/g, "");

    // idioms
    var possiblelist =
      [ obj.masu, obj.masen, obj.masita, obj.masendesita,
        obj.jisyo, obj.nai, obj.ta, obj.nakatta,
        obj.te,
        obj.ba,
        obj.kanou, obj.kanounai, obj.kanouta, obj.kanounakatta,
        obj.kanoumasu, obj.kanoumasen, obj.kanoumasita, obj.kanoumasendesita,
        obj.ukemi, obj.ukemimasu, obj.ukemimasen, obj.ukemimasita, obj.ukemimasendesita,
      ]
      .map((p) => this.purify(p));
    obj.idiomlist = $.extend([], idioms);
    obj.idiomlist = obj.idiomlist
      .filter(function (idiom: string) {
        return possiblelist.some(function (p) { return idiom.indexOf(p) >= 0; });
      });
    obj.idioms = this.joincell(obj.idiomlist);
    // ignore special words to avoid confusion
    if (obj.masu == "あります" || obj.masu == "います" || obj.masu == "します") obj.idioms = "";

    // posclass
    if (obj.pos.endsWith('2')) {
      if (this.verb21tail.indexOf(obj.pronounce.slice(-2, -1)) >= 0) {
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
  };
  parseverbdata(data: any) {
    var d = $.map(data.data, (p) => this.parseverbdataline(p, data.idiom));
    return d;
  };

  parseAdjCommonDataLine(od: any, idioms: any) {
    var obj = od;

    // posclass
    if (obj.pos.endsWith('2')) {
      obj.posclass = "adj2";
    } else {
      obj.posclass = "adj1";
    }

    return obj;
  };

  parseAdj1DataLine(od: any, idioms: any) {
    var obj = this.parseAdjCommonDataLine(od, idioms);

    obj.base = obj.word.slice(0, -1);
    obj.te = "";
    obj.ku = obj.base + "く";
    obj.katta = obj.base + "かった";
    obj.nai = obj.ku + "ない";
    obj.nakatta = obj.ku + "なかった";
    obj.kereba = obj.base + "ければ";

    return obj;
  };

  parseAdj1Data(data: any) {
    var d = $.map(data.data, (p) => this.parseAdj1DataLine(p, null));
    return d;
  };

  parseAdj2DataLine(od: any, idioms: any) {
    var obj = this.parseAdjCommonDataLine(od, idioms);

    obj.na = obj.word + "な";
    obj.te = "";
    obj.ni = "";
    obj.datta = obj.word + "だった";
    obj.nai = obj.word + "ではない";
    obj.nakatta = obj.word + "ではなかった";
    obj.naraba = obj.word + "ならば";
    obj.deareba = obj.word + "であれば";
    obj.denakereba = obj.word + "でなければ";
    obj.da = obj.word + "だ";

    return obj;
  };

  parseAdj2Data(data: any) {
    var d = $.map(data.data, (p) => this.parseAdj2DataLine(p, null));
    return d;
  };

  createCell(klass: string, content: string) {
    return $('<td />', { class: klass }).html(content);
  };

  addCellsToRow(columns: any, row: any, data: any) {
    $.each(columns, (j, name) => row.append(this.createCell(data.posclass + (data["sp" + name] ? " spcell" : ""), data[name])));
  };

  initgrouptable(data: any, table: any, groupby: string, tableRow: any, filter?: any) {
    var groups: { [id:string] : any} = {};
    $.each(data, function (i, a) { if (a[groupby] in groups) groups[a[groupby]].push(a); else groups[a[groupby]] = [a]; } );
    table.children('tbody').remove();
    var count = 0;
    $.each(groups, (i, group) => {
      if (filter != undefined && !filter(group)) return;
      var row = $('<tr />');
      var headcell = $('<td rowspan="' + group.length + '">' + group[0][groupby] + '</td>');
      if (count++ % 2 == 0) headcell = headcell.addClass('althead');
      row.append(headcell);
      $.each(group, (i, item) => {
        this.addCellsToRow(tableRow, row, item);
        table.append(row);
        row = $('<tr />');
        var emptycell = $('<td style="display: none" />');
        row.append(emptycell);
      });
    });
  };

  initTable(data: any, table: any, tableRow: any, filter: any) {
    table.children('tbody').remove();
    $.each(data, (i, item) => {
      var row = $('<tr />');
      this.addCellsToRow(tableRow, row, item);
      table.append(row);
    });
  };
};