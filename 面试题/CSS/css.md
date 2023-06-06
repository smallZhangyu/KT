# CSS 面试题

## 布局篇

1. 盒模型的宽度如何计算？

   ```js
   offsetWidth = width + padding + border; // no margin

   offsetWidth = width； // 设置 box-sizing: border-box; 之后
   ```

2. margin 纵向重叠的问题

   ```js
   // 相邻元素的 margin-top 和 margin-bottom 会发生重叠
   // 空白标签也会重叠
   // 以下 AAA 和 BBB 之间的间距是15px
   p {margin-top: 10px; margin-bottom: 15px;}
   <p>AAA</p>
   <p></p>
   <p></p>
   <p></p>
   <p>BBB</p>
   ```

3. margin 的负值

   ```js
   margin-top 和 margin-left 为负值，会分别向上和向左移动
   margin-right 为负值，右侧元素左移，自身不受影响
   margin-bottom 为负值，下方元素左移，自身不受影响
   ```

4. BFC 理解和应用

   BFC (Block format context): 块级格式化上下文，一块独立渲染区域，内部元素的渲染不会影响边界以外的元素。

   形成 BFC 的常见条件：

   1. float 不是 none；
   2. position 是 absolute 或者 fixed；
   3. overflow 不是 visible;
   4. display 是 flex，inline-block 等

   BFC 的常见应用：清除浮动

5. float 布局的考察，以及 clearfix

   圣杯布局和双飞翼布局的目的：

   1. 三栏布局，中间一栏最先加载和渲染（内容最重要）。
   2. 两侧内容固定，中间内容随宽度自适应。
   3. 一般用于 PC 端

   圣杯布局和双飞翼布局的技术总结：

   1. 使用 float 布局；
   2. 两侧使用 margin 负值，以便和中间内容横向重叠；（左侧内容都是 margin-left：100%；右侧内容，圣杯布局使用 margin-right: -自身宽度；双飞翼布局使用 margin-left: -自身宽度；）
   3. 防止中间内容被两侧覆盖，圣杯布局的方式： container 父容器使用 padding 为左右部分留白。；双飞翼布局的方式：中间内容的**直接子元素**使用 margin 为左右部分留白。

   ```js
    // 手写clearfix，用于container容器
    .clearfix:after {
        content: '';
        display: table;
        clear: both;
    }
    .clearfix {
        *zoom: 1; // 兼容 IE 低版本
    }
   ```

6. flex 的考察，画一个三点色子（左上角一个点，中间一个点，右小角一个点）

   ```css
    flex-direction: 方向上的设置；
    justify-content: 主轴的对齐方式；
    align-items: 负轴的对其方式；
    flex-wrap:
    align-self:
   ```

## 定位篇

1. absolute 和 relative 分别依据什么定位？

   relative 依据自身定位，不影响其他元素；
   absolute 依据最近一层的定位元素（设置有 relative，absolute，fixed，直到 body）定位；

2. 居中对齐有哪些实现方式？

   ```css
    <!-- 水平居中 -->
    inline 元素：text-align: center;
    block 元素：margin: auto;
    absolute 元素(需要知道元素的宽度)：left: 50%; margin-left: 负值（一半自身宽度）

    <!-- 垂直居中 -->
    inline 元素：line-height 的值等于 height 的值
    absolute 元素(需要知道元素的高度)：top: 50%; margin-top: 负值（一半的自身高度）
    absolute 元素(不需要知道元素的宽高度，transform 是CSS3属性，不兼容低版本浏览器)：left: 50%; top: 50%; transform: translate(-50%, -50%);
    absolute 元素(不需要知道元素的宽高度，兼容各种低版本浏览器)：top: 0; left: 0; bottom: 0; right: 0; margin: auto;
    block 元素：父元素使用flex布局(display: flex; justify-content: center; align-items: center;)
   ```

## 图文样式

1. line-height 的继承问题

   1. 父元素的 line-height 是具体数值，如 20px，则直接继承该数值；
   2. 父元素的 line-height 是比例，如 1.5/2，则直接继承该比例值；
   3. 父元素的 line-height 是百分比，如 200%，则继承**计算出来的值**（父元素样式：font-size: 20px; line-height: 200%; 子元素继承的 line-height 为 40px;）；

## 响应式

1. rem 是什么？em，px

   px: 绝对长度单位，最常用。
   em：相对长度单位，相对于父元素，不常用。
   rem：相对长度单位，相对于根元素 html，响应式最常用。
   vh/vw: 网页视口高度/宽度的 1/100
   vmax/vmin: 取 vh/vw 二者的最大值/最小值

2. 如何实现响应式？

   1. media-query，根据不同的屏幕宽度设置根元素的 font-size
   2. 使用 rem，根据根元素的设置值来设置值

3. 网页视口尺寸

   1. 屏幕高度：window.screen.height
   2. 网页视口高度：window.innerHeight
   3. body 高度: document.body.clientHeight

## CSS3
