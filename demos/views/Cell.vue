<template>
  <app-view>
    <app-header withback>cell</app-header>
    <div class="app-body">
      <div class="cells-title">编辑信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-label">手机号码</div>
            <input type="tel" class="cell-input" placeholder="189 1234 1234">
          </div>

          <div class="cell">
            <div class="cell-label">数量</div>
            <input type="text" class="cell-input" pattern="[0-9]*" placeholder="0">
          </div>

          <div class="cell">
            <div class="cell-label">价格</div>
            <input type="text" class="cell-input" placeholder="0.00">
            <div class="cell-ft">元</div>
          </div>
        </div>

        <div class="cells-title">请填写以下信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-label">比较长label测试</div>
            <input type="text" class="cell-input" placeholder="请输入">
          </div>

          <div class="cell">
            <div class="cell-label">文本域</div>
            <autosize class="cell-input" placeholder="请输入文本"></autosize>
          </div>
        </div>

        <div class="cells">
          <div class="cell cell-access">
            <div class="cell-label">请选择</div>
            <select class="cell-input">
              <option>选项1</option>
              <option>选项2</option>
            </select>
          </div>

          <label class="cell">
            <div class="cell-label">匿名购买</div>
            <input type="checkbox">
          </label>
        </div>
        <div class="cells-tip">请选择以上选项</div>

        <div class="cells-title">文本域</div>
        <div class="cells">
          <div class="cell">
            <autosize class="cell-input" placeholder="请输入" rows="3"></autosize>
          </div>
        </div>

        <div class="nodata nodata-l"></div>
    </div>
  </app-view>
</template>
