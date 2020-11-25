<!--
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-25 09:52:05
 * @LastEditTime: 2020-11-25 17:06:44
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
    type: 'xy',
    text: (type, defaultText, items) => {
      const color = items[0].color;
      if (type === 'x') {
        return {
          offset: 5,
          position: 'end',
          content: defaultText + ' cm',
          style: {
            textAlign: 'center',
            textBaseline: 'top',
            fontSize: 14,
            fontWeight: 'bold',
          },
        };
      }
      return {
        offset: 5,
        content: defaultText + ' kg',
        style: {
          textAlign: 'end',
          fontSize: 14,
          fontWeight: 'bold',
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
    type: 'xy', // crosshairs 类型
    line: {
      // crosshairs 线样式
      style: {
        stroke: '#565656',
        lineDash: [4],
      },
    },
  },
});

```

## 文本标签

```typescript
// 使用label将数值标注在chart上
chart
  .line()
  .position('year*value')
  .label('value');
```

### 文本标签类型
- base 默认类型
- interval 几何标记下所有图形的文本标注
- pie 饼图文本标注
- polar 极坐标系文本标注

### 三种文本布局方案

- overlap label防遮挡,四周偏移剔除放不下的label
- fixedOverlap 不改变label位置情况下对相互重叠的label进行调整
- limitlnShape 剔除容纳不了的label

```typescript
chart
  .polygon()
  .position('longitude*latitude')
  .label('name', {
    layout: {
      // this
      type: 'fixed-overlap',
    },
    offset: 0,
    style: {
      fill: 'black',
      stroke: '#fff',
      lineWidth: 2,
    },
  });
```

## 辅助标记 Annotation

当需要在图表上绘制一些辅助线、辅助框或者图片时，比如增加平均值线、最高值线或者标示明显的范围区域时，可以使用辅助标记 annotation。

## 缩略轴 Slider

当图表中数据量比较多，用户希望关注数据集中在某个特殊区域的时候，可以使用缩略轴组件。缩略轴较适用于折线图。

## 滚动条 Scrollbar

当图表中数据量比较多多，也可以适用滚动条组件来一次只浏览一部分数据。滚动条组件提供水平滚动条、和垂直滚动条。滚动条组件较适用于柱形图和条形图。
