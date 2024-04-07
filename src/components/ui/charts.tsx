import React from 'react';
import { ForwardedRef, useEffect, useState, useRef, useLayoutEffect, useImperativeHandle} from "react";
import { cn } from "@/lib/utils"

import {EChartsType} from 'echarts/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  DatasetComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import {BarChart, BarSeriesOption, LineChart, LineSeriesOption, FunnelChart, FunnelSeriesOption} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {SVGRenderer} from 'echarts/renderers';


import {ECElementEvent, TooltipOption, XAXisOption, YAXisOption} from 'echarts/types/dist/shared.js';
import {newChartSize} from "@/hooks/use-set-size";

echarts.use([
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LineChart,
  BarChart,
  FunnelChart,
  UniversalTransition,
  SVGRenderer,
]);


// const getOption = (): echarts.EChartsOption => {
//   // Define your option object here
//   return {};
// };

// export type MyChartOption = echarts.ComposeOption<FunnelSeriesOption>;
export type MyChartOption = echarts.ComposeOption<
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | FunnelSeriesOption
>;

export interface MyChartProps {
  option: MyChartOption;
  width: number | string;
  height: number | string;
  loading?: boolean;
  onMouseOver?(event: ECElementEvent): any;
  onClick?(event: ECElementEvent): any;
}
export interface MyChartRef {
  instance(): EChartsType | undefined;
}



const MyChartInner: React.ForwardRefRenderFunction<MyChartRef, MyChartProps> = ({option, width, height, loading = false, onMouseOver, onClick}, ref: ForwardedRef<MyChartRef>) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();

  
  // 获取实例
   const instance = () => {
    return cInstance.current;
  }

  // 对父组件暴露的方法
  useImperativeHandle(ref, () => ({
    instance
  }));

  // 初始化注册组件，监听 cRef 和 option 变化
  useEffect(() => {
    if (cRef.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cRef.current);
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, {
          renderer: 'svg',
        });
      }
      // 设置配置项
      // if (option) cInstance.current?.setOption(option, true);
      if (option) cInstance.current?.setOption(Object.assign({}, option, {textStyle: {fontSize: newChartSize(12)}}), true);

      // 绑定鼠标点击事件
      cInstance.current.on('mouseover', (event: ECElementEvent) => {
        const ec = event as ECElementEvent;
        if (ec && onMouseOver) onMouseOver(ec);
      });
      cInstance.current.on('click', (event: ECElementEvent) => {
        const ec = event as ECElementEvent;
        if (ec && onClick) onClick(ec);
      });
    }
  }, [cRef, option]);
  
  // 监听窗口大小变化重绘
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [option]);

  // 监听高度变化
  useLayoutEffect(() => {
    resize();
  }, [width, height]);
  
  // 重新适配大小并开启过渡动画
  const resize = () => {
    cInstance.current?.resize({
      animation: {duration: 300}
    });
    resetSize();
  }

  // 重新设置图形和文字尺寸
  const resetSize = () => {
    if (option) {
      
      if(option.name == "funnelchart") {
        const tooltip = option.tooltip as TooltipComponentOption;
        if( tooltip.textStyle ) {
          tooltip.textStyle.fontSize = newChartSize(12);
        }
        cInstance.current?.setOption(Object.assign({}, option, {textStyle: {fontSize: newChartSize(12)}, tooltip: tooltip}));
      }
      
      if(option.name == "linechart") {
        const xAxis = option.xAxis as XAXisOption;
        const yAxis = option.yAxis as YAXisOption;
        if( xAxis.axisLine && xAxis.axisLabel) {
          const axisLine = xAxis.axisLine;
          if(axisLine) {
            axisLine.symbolSize = [newChartSize(8), newChartSize(10)];
            const lineStyle = axisLine.lineStyle;
            if(lineStyle) {
              lineStyle.width = newChartSize(2);
            }
          }
        }
        if( yAxis.axisLine && yAxis.axisLabel ) {
          yAxis.nameGap = newChartSize(15);
          const axisLine = yAxis.axisLine;
          const axisLabel = yAxis.axisLabel;
          if(axisLine) {
            axisLine.symbolSize = [newChartSize(8), newChartSize(10)];
            const lineStyle = axisLine.lineStyle;
            if(lineStyle) {
              lineStyle.width = newChartSize(2);
            }
          }
          if(axisLabel) {
            axisLabel.fontSize = newChartSize(12);
          }
        }

        const legend = option.legend as LegendComponentOption;
        legend.itemWidth = newChartSize(12);
        legend.itemHeight = newChartSize(12);
        legend.itemGap = newChartSize(15);

        const series = option.series as LineSeriesOption[];
        series.map((item: LineSeriesOption) => {
          if(item.lineStyle) {
            item.lineStyle.width = newChartSize(2);
          }
        })
        cInstance.current?.setOption(Object.assign({}, option, {textStyle: {fontSize: newChartSize(12)}, xAxis: xAxis, yAxis: yAxis, legend: legend, series: series}));
      }
    }
  }


// 展示加载中
useEffect(() => {
  if (loading) cInstance.current?.showLoading();
  else cInstance.current?.hideLoading();
}, [loading]);

  return (
    // <div ref={cRef} style={{width: 500, height: 300}}/>
    <div ref={cRef} style={{width: width, height: height}}/>
    // className={cn(
    //   "w-full h-full"
    // )}
    
  );
};
const MyChart = React.forwardRef(MyChartInner);

export default MyChart;
