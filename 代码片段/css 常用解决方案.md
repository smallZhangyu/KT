# CSS 常用的解决方案

## Retina 屏幕的 1px 像素，如何实现?

```css
/* 使用 css伪类 + transform 缩小 */
#box {
  position: relative;
}

#box::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #ddd;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

/** 如果有border-radius 的话，使用 box-shadow 解决
 * X 偏移量 0
 * Y 偏移量 0
 * 阴影模糊半径 0
 * 阴影扩散半径 0.5px
 * 阴影颜色
*/
#box2 {
  border-radius: 5px;
  box-shadow: 0 0 0 0.5px #ddd;
}
```

## 文字超出省略

```css
/* 单行文字 */
#box1 {
  border: 1px solid #ccc;
  width: 100px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 超出省略 */
}

/* 多行文字 */
#box2 {
  border: 1px solid #ccc;
  width: 100px;
  overflow: hidden;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置子元素排列方式 */
  -webkit-line-clamp: 3; /* 显示几行，超出的省略 */
}
```
