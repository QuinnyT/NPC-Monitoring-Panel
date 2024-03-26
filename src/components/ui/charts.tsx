import React from 'react';
import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
}


const MyChart: React.FC<MyChartProps> = ({option, width, height}) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();

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
      if (option) cInstance.current?.setOption(option);
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
}


  return (
    // <div ref={cRef} style={{width: 500, height: 300}}/>
    <div ref={cRef} style={{width: width, height: height}}
    // className={cn(
    //   "w-full h-full"
    // )}
    />
  );
};

export default MyChart;
