---
layout: uwp
category: class
---

<ul>
{% for lid in (1..48) %}
{% assign id = lid | prepend: 'l' %}{% assign lesson = site.data.lessons[id] %}
{% if lesson.title %}{% assign title = lesson.title | prepend: "課　" | prepend: lid | prepend: "第" %}
{% else %}{% assign title = lesson.basic4 | newline_to_br | strip_newlines | split: '<br />' | first | remove: "> * " | prepend: "課　" | prepend: lid | prepend: "第" %}
{% endif %}
<li class="japan"><a href="lesson{{lid}}.html">{{title}}</a></li>{% endfor %}
</ul>

<script>
$(document).ready(function() {
  $('a').each(function() {
    $(this).html(japanruby($(this).html()));
  });
});
</script>
