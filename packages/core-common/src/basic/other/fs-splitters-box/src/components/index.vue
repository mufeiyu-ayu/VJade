<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
const props = defineProps<{
  /* @description 拆分方向 */
  direction: string
  /* @description 拆分距离 */
  safeDistance: any
  /* @description z-index */
  zIndex?: number
  /* @description 拆分比例 */
  percentA: number
}>()

const active = ref(false)

const enable = ref(false)

const percentX = ref(20) // 20% 中线 x
const percentY = ref(20) // 中线为 y 时使用

const mouseX = ref(0) // 鼠标在 line-pane-view 坐标中的位置
const mouseY = ref(0)

const parentWidth = ref(0) // 父元素 line-pane-view 宽高
const parentHeight = ref(0)

const mouseMove = (e) => {
  // 鼠标没有被按下 或者 没有被触发
  if (e.buttons === 0 || e.which === 0) {
    active.value = false
  }
  if (!active.value) return
  // console.log("鼠标移动:", e,"e.currentTarget:",e.currentTarget);
  const parentRect = e.currentTarget.getBoundingClientRect()
  let x = e.clientX - parentRect.left // 鼠标在 line-pane-view 中的位置
  let y = e.clientY - parentRect.top

  const w = parentRect.width // 父元素 line-pane-view 宽高
  const h = parentRect.height
  const safeDistance = props.safeDistance

  // 判断bu在安全距离内,例外处理：
  x = x < safeDistance[0] ? safeDistance[0] : x
  x = x > w - safeDistance[1] ? w - safeDistance[1] : x
  y = y < safeDistance[0] ? safeDistance[0] : y
  y = y > h - safeDistance[1] ? h - safeDistance[1] : y

  mouseX.value = x
  mouseY.value = y
  parentWidth.value = w
  parentHeight.value = h
  if ((mouseY.value / parentHeight.value) * 100 > 35 && (mouseY.value / parentHeight.value) * 100 < 54) {
    percentX.value = (x / w) * 100
    percentY.value = (y / h) * 100
  }
}

const mouseUp = () => {
  console.log('鼠标松开---整个面板的事件')
  if (active.value) active.value = false
}

// 中线的鼠标事件
const mouseD = () => {
  console.log('鼠标按下')
  if (!active.value) active.value = true
}

/* @description 中线样式 */
const middleLineStyle = computed(() => {
  //中线也需要同步更改
  const left = percentX.value
  const top = percentY.value
  if (props.direction === 'x') {
    return { ['left']: left + '%' }
  } else {
    return { ['top']: top + '%' }
  }
})

/* @description 左右 分时，A 的宽度 */
const paneABstyle = computed(() => {
  // 通过样式改变A、B的长宽度
  // x--中线左右方向分割， 此时A、B 左右 关系，移动中线的时候应该改变A、B的宽度
  const x = percentX.value
  const y = percentY.value

  if (props.direction === 'x') {
    // 同时返回 A、B 的样式
    return [{ ['width']: x + '%' }, { ['width']: 100 - x + '%' }]
  } else {
    return [{ ['height']: y + '%' }, { ['height']: 100 - y + '%' }]
  }
})

/* @description 鼠标样式 */
const cursor = computed(() => {
  // 根据是否激活来设置鼠标的拖动样式
  return active.value ? (props.direction === 'x' ? 'row-resize' : 'col-resize') : ''
})

const close = () => {
  enable.value = false
}

const open = () => {
  enable.value = true
}

defineExpose({
  close,
  open
})

defineSlots<{
  /* @description 主表 */
  leftPart(): any
  /* @description  子表 */
  rightPart(): any
}>()
onMounted(() => {
  percentX.value = props.percentA
  percentY.value = 100 - props.percentA
})
</script>

<template>
  <div class="line-pane-view" :class="{ cursor }" ref="line-pane" @mouseup="mouseUp" @mousemove="mouseMove">
    <div :class="[direction === 'x' ? 'pane-ax' : 'pane-ay']" :style="enable ? paneABstyle[0] : { height: '100%' }">
      <!-- TODO 主表 -->
      <slot name="leftPart"></slot>
    </div>
    <div
      class="middle-line active"
      ref="mouse-ctrl"
      :style="!enable ? { display: 'none' } : middleLineStyle"
      :class="[direction === 'x' ? 'middle-line-x' : 'middle-line-y']"
      @mousedown="mouseD"
    ></div>
    <div :class="[direction === 'x' ? 'pane-bx' : 'pane-by']" :style="!enable ? { display: 'none' } : paneABstyle[1]">
      <!-- TODO 子表 -->
      <slot :style="{ 'z-index': zIndex }" name="rightPart"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.line-pane-view {
  width: 100%;
  height: calc(100vh - 176px);
  position: relative; /* 子绝父相---由于孩子都是绝对的，父亲必须有定位才能困住 */
  user-select: none;
}

.middle-line {
  /* 设置元素的定位方式为绝对定位，相对于最近的定位上下文进行定位 */
  position: absolute;

  /* 设置盒模型为 border-box，元素的宽度和高度包括内容、内边距和边框 */
  //-moz-box-sizing: border-box; /* 适用于 Firefox 浏览器 */
  //-webkit-box-sizing: border-box; /* 适用于 WebKit 内核浏览器（如 Chrome、Safari） */
  box-sizing: border-box; /* 标准写法，适用于大多数现代浏览器 */
  background-color: rgb(22 93 255);

  /* 设置元素的不透明度为 0.1，取值范围为 0（完全透明）到 1（完全不透明）之间 */
  opacity: 0.8;

  /* 设置元素的层叠顺序，用于控制元素在堆叠顺序中的显示优先级 */
  z-index: 2;

  /* 设置背景剪切方式为 padding-box，背景仅绘制在内边距区域 */

  /* 适用于 Firefox 浏览器 */
  background-clip: padding; /* 适用于 WebKit 内核浏览器（如 Chrome、Safari） */
  background-clip: padding-box; /* 标准写法，适用于大多数现代浏览器 */
}

/* x--中线左右方向分割 */
.middle-line-x {
  width: 13px;
  height: 100%;
  margin-left: -5px;
  border-left: 5px solid rgb(22 93 255);
  border-right: 5px solid rgb(22 93 255);
  cursor: col-resize;
}

.middle-line-y {
  height: 13px;
  margin: -5px 0;
  border-top: 5px solid rgb(255 255 255 / 0%);
  border-bottom: 5px solid rgb(255 255 255 / 0%);
  cursor: row-resize;
  width: 100%;
}

// A 代表上、左  | B 代表下、右
.pane-ay {
  position: absolute;
  top: 0; /* 上 --- 中线为 y 时 */
  width: 100%;
}

.pane-by {
  position: absolute;
  bottom: 0; /* 下 --- 中线为 y 时 */
  width: 100%;
  padding-top: 3px;
}

.pane-ax {
  position: absolute;
  left: 0; /* 左 --- 中线为 x 时 */
  height: 100%;
  padding-right: 3px;
}

.pane-bx {
  position: absolute;
  right: 0; /* 右 --- 中线为 x 时 */
  height: 100%;
  padding-left: 3px;
}

.middle-line-y.active:hover {
  background-color: rgb(22 93 255);
}

.middle-line-y.middle-move-line.active {
  background-color: rgb(22 93 255);
}
</style>
