---
layout: uwp
category: class
---

<div class="list-group">
{% for lid in (1..48) %}
{% assign id = lid | prepend: 'l' %}{% assign lesson = site.data.lessons[id] %}
{% if lesson.title %}{% assign title = lesson.title | prepend: "課　" | prepend: lid | prepend: "第" %}
{% else %}{% assign title = lesson.basic4 | newline_to_br | strip_newlines | split: '<br />' | first | remove: "> * " | prepend: "課　" | prepend: lid | prepend: "第" %}
{% endif %}
<a class="japan list-group-item" href="lesson{{lid}}.html">{{title}}</a>{% endfor %}
</div>

<script>
$(document).ready(function() {
  $('a').each(function() {
    $(this).html(japanruby($(this).html()));
  });
});
</script>
