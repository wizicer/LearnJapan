---
layout: page
title: "学习记录"
description: "学习记录提取和更新"
category: tools
---
导出或导入学习记录文件，用于备份或同步到其他设备。
<textarea class="form-control" id="storageData" rows="20"></textarea>
<button id="btnSave" class="btn btn-warning">写入记录</button>

<script>
$(document).ready(function() {
  var rwords = localStorage.getItem("rwords");
  $('#storageData').val(rwords);
  $('#btnSave').on('click', function(e) {
    e.preventDefault();
    if (confirm("您确定吗？\n如果学习记录代码无效，所有数据均可能会丢失。此操作不可撤销。")) {
      try {
        var rwords = JSON.parse($('#storageData').val());
        localStorage.setItem("rwords", JSON.stringify(rwords));
        alert("恢复记录成功！");
      } catch (err) {
        alert("恢复记录失败，有可能是因为记录代码无效，请检查后重试！");
      }
    }
  });
});
</script>
