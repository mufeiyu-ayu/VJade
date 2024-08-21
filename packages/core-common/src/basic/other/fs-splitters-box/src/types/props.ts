export const splittersBoxProps = {
  defaultLeftWidth: { type: Number, default: 350 }, // 左边默认宽度
  leftMinWidth: { type: Number, default: 10 }, // 左边缩小最小宽度
  bottomMinHeight: { type: Number, default: 65 },
  lineColor: { type: String, default: '#f4f4f4' }, // 分割线颜色
  lineColorWidth: { type: Number, default: 18 }, // 分割线宽度
  lineColorHover: { type: String, default: '#d6d6d6' }, // 分割线鼠标悬空颜色
  divisionType: { type: String, default: 'vertical' }, // 竖直(vertical),水平(horizontal)分割
  topMinHeight: { type: Number, default: 10 }, // 顶部缩小最小高度
  rightPart: { type: Boolean, default: false }, // 右边
  defaultTopHeight: { type: String, default: '35%' } // 顶部默认高度
}
