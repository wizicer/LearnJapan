---
layout: uwp
category: class
---
<style>
.panel-heading a:after {
  font-family:'Glyphicons Halflings';
  content:"\e114";
  float: right;
  color: grey;
}
.panel-heading a.collapsed:after {
  content:"\e080";
}
.panel-heading a {
  display: block;
  text-decoration: none;
}
</style>

<div class="panel-group" id="accordion">
{% for guid in (1..20) %}
  {% if guid > 12 %}
    {% assign uid = guid | minus: 12 %}
    {% assign level = "m" %}
    {% assign levelDesc = "中级" %}
    {% assign lessons = site.data.mlessons %}
  {% else %}
    {% assign uid = guid %}
    {% assign level = "l" %}
    {% assign levelDesc = "初级" %}
    {% assign lessons = site.data.lessons %}
  {% endif %}
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
      <a data-toggle="collapse" data-parent="#accordion" href="#collapse{{guid}}">{{levelDesc}} 第 {{uid}} 单元</a>
      </h4>
    </div>
    <div id="collapse{{guid}}" class="panel-collapse collapse list-group">
{% for idx in (1..4) %}
{% assign lid = uid | minus: 1 | times: 4 | plus: idx %}
{% assign id = lid | prepend: level %}{% assign lesson = lessons[id] %}
{% if level == "l" %}
  {% if lesson.title %}{% assign title = lesson.title | prepend: "課　" | prepend: lid | prepend: "第" %}
  {% else %}{% assign title = lesson.basic4 | newline_to_br | strip_newlines | split: '<br />' | first | remove: "> * " | prepend: "課　" | prepend: lid | prepend: "第" %}
  {% endif %}
{% else %}
  {% capture title %}第{{lid}}課　<span class="label label-info">会話</span>{{lesson.contitle}} <span class="label label-info">課文</span>{{lesson.texttitle}}{% endcapture %}
{% endif %}
<a class="japan list-group-item" href="{{level}}/lesson{{lid}}.html">{{title}}</a>{% endfor %}
</div></div>{% endfor %}
</div>
<script>
$(document).ready(function() {
  $('a').each(function() {
    $(this).html(japanruby($(this).html()));
  });
});
</script>
