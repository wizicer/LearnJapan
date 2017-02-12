<div id="wordrecite">
<p>
  <span id="card-summary"></span>
  <div class="card well">
    <p class="text-center" id="content"></p>
  </div>
</p>
<p>
  <div class="row">
    <button class="col-xs-5 toggle-next-left toggle-next btn btn-success">下</button>
    <button class="col-xs-2 toggle-previous btn btn-info">上</button>
    <button class="col-xs-5 toggle-next-right toggle-next btn btn-success">下</button>
  </div>
  <div class="form-horizontal">
    <div class="form-group row">
      <div id="trialdiv" class="col-xs-9 col-md-10">
        <input class="form-control" id="trialtext" type="textbox" />
      </div>
      <div id="remembereddiv" class="checkbox col-xs-3 col-md-2">
        <label>
          <input type="checkbox" id="wordremember">已记住
        </label>
      </div>
    </div>
  </div>
</p>

<div class="compact">
  <p>
  记单词选项：
  </p>
  <p>
    <input id="onlyremember" type="checkbox" checked />
    <label for="onlyremember">自动跳过已记住单词</label>
  </p>
  <p>
    <input id="autoreadword" type="checkbox" checked />
    <label for="autoreadword">自动读单词</label>
  </p>
  <p>
    <input id="autoremember" type="checkbox" checked />
    <label for="autoremember">拼写正确则标记记住</label>
  </p>
  <p>
    <input id="shufflewords" type="checkbox" />
    <label for="shufflewords">随机顺序记忆</label>
  </p>
</div>

</div>

<style>
.card {
  height: 150px;
  width: 100%;
  display: table;
  table-layout: fixed;
}
.card p {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  font-size: 22px;
}
</style>

