<!--
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-25 09:52:05
 * @LastEditTime: 2020-11-26 16:38:58
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/docs/antv.md
 * @LICENSE: Apache-2.0
-->

# 概念

## 基本元素

- 数据 -> Data : 可视化数据来源
- 图形属性 -> Attribute : 数据中变量映射到图形
- 几何标记 -> Geometry: 点,线,多边形等几何标记
- 度量 -> Scale: 数据空间到图形空间的转换接口
- 坐标系 -> Coordinate: 笛卡尔,极坐标,螺旋坐标
- 可视化组件 -> Component: Legent,Tooltip,Annotation,Slider
- 分面 -> Facet: 数据分面,一图拆多图

## 视觉通道

### 这是什么

- 数据属性 -> 标记：直观的代表数据的性质分类，通常是几何图形元素，例如：点、线、面、体。

- 数据值 -> 视觉通道：用于表现数据属性的定量信息，包括标记的位置、大小、形状、方向、色调、饱和度、亮度等。

> tips: 数据的属性对应几何标记,比如 age 属性为一个点,那么 age=15 可能是水平方向一条由点连接成的 15 长度的直线,所以视觉通道为属性对应的几何元素和值对应的通道组合而成的图案

- 定性（分类）的视觉通道，如形状、颜色的色调、控件位置。

- 定量（连续、有序）的视觉通道，如直线的长度、区域的面积、空间的体积、斜度、角度、颜色的饱和度和亮度等。

### 数据映射

- 1:1 映射

```typescript
// 班级映射到位置,人数到数值
chart.interval().position("班级" * "人数");
```

- 1:n 映射

```typescript
// 班级映射到位置,人数到数值
// 班级映射到颜色
chart.interval().position("班级*人数").color("班级");
```

- n:1 映射

```typescript
// 班级和颜色共同决定了颜色的映射所以为n:1
chart
  .interval()
  .position("班级*人数")
  .color("班级*人数", (grade, count) => {
    if (grade == "1" || count > 40) {
      return "red";
    }
    return "green";
  });
```

## 视觉通道

- position 位置 二维坐标 x,y 三维坐标 x,y,z
- color 颜色 色调饱和度亮度
- size 大小 二维坐标 x,y 三维坐标 x,y,z
- shape 形状 点图:圆点,三角.线图:折线,曲线,点线.

## 语法设计

```typescript
chart.<geomType>().<attrType>(dims, [callback]);
```

- geom 图表类型
- attr 图表类型的属性,对应视觉通道
- dims 单个视觉通道映射的字段
- callback 解析视觉通道

# 可视化概念

## 几何图形 Geometry

点，线，面这些几何图形,不同的几何标记包含对应的 Attribute

## 坐标轴 Axis

每个图表通常包含两个坐标轴，在直角坐标系（笛卡尔坐标系）下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。

### 组成

- title 标题
- tickLine 刻度线
- grid 网格线
- label 文本
- line 轴线

```typescript
// 配置坐标轴
char.axis();
char.axis("x", {
  title: {
    style: {
      fill: "#1890ff",
    },
  },
});
```

> demo

```Typescript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

// 设置数据
chart.data(data)

//  key对应维度的标题
chart.scale('sales',{
  alias:'销售量'
})

chart.axis('sales', {
  title: {},
});

// 位置year,值sales 建立视觉通道
chart.interval().position('year*sales')
// 渲染
chart.render()

```

## 图例 Legend

图例作为图表的辅助元素，用于标定不同的数据类型以及数据的范围，辅助阅读图表，帮助用户在图表中进行数据的筛选过滤。

### 分类图例

- title 标题
- marker 分类图标
- itemName 分类名称

### 连续图例

- label 数值
- track 选择区间
- handler 卡尺
- rail 未选择区间

```typescript
chart.legent("x", false);
chart.legent("x", {
  position: "bottom",
});
```

## 提示信息 Tooltip

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

- crosshairs 辅助线
- marker 数据点
- tooltip 提示板

```typescript
// 展示 Tooltip 辅助线
chart.tooltip({
  showCrosshairs: true,
});

// 散点图在xy辅助线上显示数据
chart.tooltip({
  showCrosshairs: true,
  crosshairs: {
    type: "xy",
    text: (type, defaultText, items) => {
      const color = items[0].color;
      if (type === "x") {
        return {
          offset: 5,
          position: "end",
          content: defaultText + " cm",
          style: {
            textAlign: "center",
            textBaseline: "top",
            fontSize: 14,
            fontWeight: "bold",
          },
        };
      }
      return {
        offset: 5,
        content: defaultText + " kg",
        style: {
          textAlign: "end",
          fontSize: 14,
          fontWeight: "bold",
        },
      };
    },
    textBackground: null,
  },
});
// 雷达图
chart.tooltip({
  shared: true, // 合并数据项
  follow: true, // tooltip 跟随鼠标
  showCrosshairs: true, // 展示 crosshairs
  crosshairs: {
    // 配置 crosshairs 样式
    type: "xy", // crosshairs 类型
    line: {
      // crosshairs 线样式
      style: {
        stroke: "#565656",
        lineDash: [4],
      },
    },
  },
});
```

## 文本标签

```typescript
// 使用label将数值标注在chart上
chart.line().position("year*value").label("value");
```

### 文本标签类型

- base 默认类型
- interval 几何标记下所有图形的文本标注
- pie 饼图文本标注
- polar 极坐标系文本标注

### 三种文本布局方案

- overlap label 防遮挡,四周偏移剔除放不下的 label
- fixedOverlap 不改变 label 位置情况下对相互重叠的 label 进行调整
- limitlnShape 剔除容纳不了的 label

```typescript
chart
  .polygon()
  .position("longitude*latitude")
  .label("name", {
    layout: {
      // this
      type: "fixed-overlap",
    },
    offset: 0,
    style: {
      fill: "black",
      stroke: "#fff",
      lineWidth: 2,
    },
  });
```

## 图形标注

标注类型

- arc 辅助弧线
- image 图片
- line 辅助线
- text 辅助文字
- region 辅助框
- regionFilter 区域着色
- dataMarker 数据点标注
- dataRegion 特殊区间标注

```typescript
// 语法
chart.annotation().<type>({})
// 清空
chart.annotation().clear()
// 清空图形标注和配置
chart.annotation().clear(true)
```

## 滑块

数据范围的选择插件

```typescript
chart.option("slider", {
  end: 0.8,
});
```

## 滚动条

```typescript
chart.option("scrollbar", {
  // 滚动条类型： 'horizontal' / 'vertical'
  type: "horizontal",
});
```

## 几何图形

图表类型

- point 点图
  - 'circle'
  - 'square'
  - 'bowtie'
  - 'diamond'
  - 'hexagon'
  - 'triangle'
  - 'triangle-down'
  - 'hollow-circle'
  - 'hollow-square'
  - 'hollow-bowtie'
  - 'hollow-diamond'
  - 'hollow-hexagon'
  - 'hollow-triangle'
  - 'hollow-triangle-down'
  - 'cross'
  - 'tick'
  - 'plus'
  - 'hyphen'
- 'line'
  - 'line'
  - 'dot'
  - 'dash'
  - 'smooth'
  - 'hv'
  - 'vh'
  - 'hvh'
  - 'vhv'
- path 路径图
- area 区域图
  - 'area'
  - 'smooth'
  - 'line'
  - 'smooth-line'
- interval 区间图
  - 'rect'
  - 'hollow-rect'
  - 'line'
  - 'tick'
  - 'funnel
  - 'pyramid'
- polygon 多边形
  - 'polygon'
- heatmap 热力图
- schema 自定义
  - 'box'
  - 'candle'

## 交互语法

# 交互过程

将交互拆分为几个环节

- 示能 表示交互可以被出发
- 开始 start:交互开始
- 持续 processing:交互持续
- 结束 end:交互结束
- 暂停 pause:交互暂停
- 回滚 rollback: 取消交互,恢复初始状态

每个环节拆分为两步

- 触发
  - 对象: 操作图表的对象
  - 事件: 鼠标移入，移出
- 反馈
  - 对象: 被操作的图表
  - 结果: 反馈对象发生的变化,鼠标变化,图表样式变化,数据变化

## 上下文

- 当前进行的交互有哪些交互环节,正在执行到哪一步,哪一步已经完成
- 当前对象,容器的状态

## 约束

### 同一交互环节顺序约束

初始状态->交互状态->新状态->交互回滚  
初始状态->交互状态->持续交互->新状态->交互回滚  
初始状态->交互状态->持续交互->交互取消->交互回滚

### 不同交互间的约束

1.相同的触发,不同的反馈

- 框选过滤图形交互：触发——鼠标移入 view，反馈——鼠标变成“十字”；触发——拖拽，反馈——出现框选 mask；
- 拖拽 view 交互：触发——鼠标移入 view ，反馈——鼠标变成”手型“，触发——拖拽，反馈—— view 移动。

  2.不同的触发,相同的反馈

- 点击 view 的绘图区域交互：触发——点击，反馈——显示临近的图形的 tooltip；
- 在 view 的绘图区域移动交互：触发——移动，反馈——显示临近图形的 tooltip。

## 规范

### 触发 - Trigger

触发对象主要有

- 图表:chart
- 子视图:view
- 容器的状态量: selectedElements,cursorInfo
- Element 名称: interval,line,point,area
- Element 内部的图形元素的名称: line-label， point-label 等
- 组件的名称：legend, axis, annotation
- 组件的组成部分: legend-item, annotaion-line

语法

一个触发 Trigger 是对象名称与事件名称的组合

```typescript
interval: click;
```

### 反馈 — Action

#### Action 对象

Action 对触发进行响应,Action 的对象必须与前面的对象触发关联

- 可以是前面触发的对象，
- 也可以是位置信息计算出来的对象，
- 还可以是触发对象关联的其他对象

#### Action 结果

反馈的结果，无法直接用 name + method 来定义，可以在回调函数中指定，为了组合成交互语法，每个 Action 可以事先定义，在交互语法中直接指定 Action 名称即可。

## 视图

组合多个视图(图表)为一个图表

```typescript
const chart = new Chart({
  container: "container",
  autoFit: true,
  height: 400,
  padding: [10, 40, 40, 40],
});

const kView = chart.createView({
  region: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0.7 },
  },
});

kView.Schema().position();

const barView = chart.createView({
  region: {
    start: { x: 0, y: 0.7 },
    end: { x: 1, y: 1 },
  },
});

barView.Schema().line();
```

## 坐标系

- cartesian / rect 笛卡尔坐标系，G2 默认的坐标系。 chart.coordinate('rect') 或 chart.coordinate('cartesian')
- polar 极坐标系，角度和半径构建成的二维坐标系。 chart.coordinate('polar')
- helix 螺旋坐标系，基于阿基米德螺旋线。 chart.coordinate('helix')
- theta 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 chart.coordinate('theta') 或者 chart.coordinate('polar').transpose()

### 坐标系变换

- rotate: 按照坐标系中心旋转 chart.coordinate().rotate(-Math.PI \* 0.25);

- scale: 缩放,按照坐标系中心缩放 chart.coordinate('rect').scale(0.7, 1.2);

- transpose: x，y 轴置换，例如柱状图转换成水平柱状图（条形图） chart.coordinate('rect').transpose();

- reflect: 镜像，沿 x 方向镜像或者沿 y 轴方向映射 chart.coordinate().reflect('x'); chart.coordinate().reflect('y');

### 属性

- start 坐标系的起始点。
- end 坐标系的结束点。

### 方法

- convert(point) 将数据从 0-1 空间映射到画布空间。
- invert(point) 将数据从画布空间反转回 0-1 空间。
- translate(x,y) 平移。
- rotate(angle) 旋转。
- scale(sx,sy) 方法、缩小。
- transpose() x、y 交换。
- reflect('x'|'y') 沿着 x 或者 y 进行镜像变换。

### 极坐标的特殊属性

- radius 半径长度，0-1 范围内的数值，最终的半径长度 = min(长，宽) / 2 \* radius。
- innerRadius plus 坐标系下，内部空白的半径大小，空白的半径 = min(长，宽) / 2 \* inner。
- startAngle 极坐标的起始角度。
- endAngle 极坐标的结束角度。

## 数据调整

- stack(层叠），将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。

- jitter(扰动散开），将数据的位置轻微的调整，使得映射后的图形位置不再重叠。

- dodge(分组散开），将同一个分类的数据进行分组在一个范围内均匀分布。

- symmetric(数据对称），使得生成的图形居中对齐。
  对于各种数据调整我们从以下几个方面介绍：

```typescript
chart
  .interval()
  .position("State*population")
  .color("age", (age) => {
    return colorMap[age];
  })
  .tooltip("age*population", (age, population) => {
    return {
      name: age,
      value: population,
    };
  })
  // 调整数据
  .adjust([
    {
      type: "dodge",
      dodgeBy: "type", // 按照 type 字段进行分组
      marginRatio: 0, // 分组中各个柱子之间不留空隙
    },
    {
      type: "stack",
    },
  ]);
```
