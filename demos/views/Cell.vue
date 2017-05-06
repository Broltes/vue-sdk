<template>
  <app-view>
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

      <div class="cell">
        <div class="cell-label">比较长label测试</div>
        <input type="text" class="cell-input" placeholder="请输入">
      </div>
    </div>
    <div class="cells-tip">请放心填写</div>
  </app-view>
</template>
