// eslint-disable-next-line no-redeclare
import { useEffect, useState, useRef, MouseEvent, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdownmenu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/event-hover-card";
import { Dialog, DialogContent, DialogOverlay, DialogClose } from "@/components/ui/dialog";

import MyChart, { MyChartOption } from "@/components/ui/charts";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";


import {
  // HelpCircle,
  ChevronLeft,
  Heart,
  Award,
  Users2,
  ShieldCheck,
  BadgeJapaneseYen,
  LucideIcon,
} from "lucide-react";

import { AttrValue, RedisData, useRedis } from "@/hooks/use-redis";
// import { eventClient } from "@/hooks/ioredis"
// import RoseGraph from "./rose-graph";
// import { UVBar } from "./uv-bar";
// import { text } from "stream/consumers";
// import { setInterval } from "timers/promises";
// import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
// import { TopLevelFormatterParams } from "echarts/types/dist/shared.js";
import { newChartSize } from "@/hooks/use-set-size";
import { LineSeriesOption } from "echarts/charts";
// import { FunnelOptions } from "node_modules/@antv/g2/lib/shape/interval/funnel";
import {FunnelSeriesOption} from 'echarts/charts';

import mockRedisData from "@/lib/mock-redis.json";
import idNameMap from "@/lib/id-name-map.json";

type Info = {
  label: string;
  name: string;
  icon: LucideIcon;
};

const infos: Info[] = [
  {
    label: "Survival",
    name: "金钱",
    icon: BadgeJapaneseYen,
  },
  {
    label: "Belonging",
    name: "生理",
    icon: ShieldCheck,
  },
  {
    label: "Social",
    name: "社交",
    icon: Users2,
  },
  {
    label: "Intimacy",
    name: "亲密",
    icon: Heart,
  },
  {
    label: "Honor",
    name: "荣誉",
    icon: Award,
  }
];



type SelectEventList = {
  name: string;
  fullcontent: string;
};
const selectEventList: SelectEventList[] = [
  {
    name: "talk to others",
    fullcontent: "talk with someone",
  },
  {
    name: "quarrel to others",
    fullcontent: "quarreling with someone",
  },
  {
    name: "buy snacks",
    fullcontent: "buy wine and pay the money",
  },
  {
    name: "see the view at tower",
    fullcontent: "see the view in the yellow crane tower",
  },
  {
    name: "dine out at tower",
    fullcontent: "dine out at tower",
  },
  
];

type NewInfoValue = {
  value: number,
  trend: string,
  diff: number
}
type NewAttrValue = {
  Survival: NewInfoValue;
	Belonging: NewInfoValue;
	Social: NewInfoValue;
	Intimacy: NewInfoValue;
	Honor: NewInfoValue;
  [key: string]: NewInfoValue;
}
type NewRedisData = {
	name: string;
	game_info: {
		day: number;
		time: string;
		frame: number;
	};
	attr_value: NewAttrValue;
	u: number;
	v: number;
	uv_rose: number;
	action: string;
};
const latestData: NewAttrValue[] = [
  {
    Survival: {
      value: 30,
      trend: "none",
      diff: 0
    },
    Belonging: {
      value: 21,
      trend: "none",
      diff: 0
    },
    Social: {
      value: 40,
      trend: "none",
      diff: 0
    },
    Intimacy: {
      value: 10,
      trend: "none",
      diff: 0
    },
    Honor: {
      value: 30,
      trend: "none",
      diff: 0
    },
  },
  {
    Survival: {
      value: 29,
      trend: "minus",
      diff: 1
    },
    Belonging: {
      value: 21,
      trend: "none",
      diff: 0
    },
    Social: {
      value: 39,
      trend: "minus",
      diff: 1
    },
    Intimacy: {
      value: 9,
      trend: "minus",
      diff: 1
    },
    Honor: {
      value: 30,
      trend: "none",
      diff: 0
    },
  },
  {
    Survival: {
      value: 29,
      trend: "none",
      diff: 0
    },
    Belonging: {
      value: 21,
      trend: "none",
      diff: 0
    },
    Social: {
      value: 39,
      trend: "none",
      diff: 0
    },
    Intimacy: {
      value: 9,
      trend: "none",
      diff: 0
    },
    Honor: {
      value: 28,
      trend: "minus",
      diff: 2
    },
  },
  {
    Survival: {
      value: 30,
      trend: "plus",
      diff: 1
    },
    Belonging: {
      value: 20,
      trend: "minus",
      diff: 0
    },
    Social: {
      value: 37,
      trend: "minus",
      diff: 2
    },
    Intimacy: {
      value: 9,
      trend: "none",
      diff: 0
    },
    Honor: {
      value: 28,
      trend: "none",
      diff: 0
    },
  },
]

type AgentEvent = {
  frame: number;
  name: string;
  attr_value: NewAttrValue;
  v: number;
};
export const Sheet = () => {
  

  // const [currentAttrValues, setAttrValues] = useState<AttrValue>({
  //   Survival: 0,
  //   Belonging: 0,
  //   Social: 0,
  //   Intimacy: 0,
  //   Honor: 0,
  // });
  const [currentAttrValues, setCurrentAttrValues] = useState<NewAttrValue[]>([
    {
      Survival: {
        value: 30,
        trend: "none",
        diff: 0
      },
      Belonging: {
        value: 21,
        trend: "none",
        diff: 0
      },
      Social: {
        value: 40,
        trend: "none",
        diff: 0
      },
      Intimacy: {
        value: 10,
        trend: "none",
        diff: 0
      },
      Honor: {
        value: 30,
        trend: "none",
        diff: 0
      },
    },
    {
      Survival: {
        value: 28,
        trend: "minus",
        diff: 2
      },
      Belonging: {
        value: 22,
        trend: "plus",
        diff: 1
      },
      Social: {
        value: 40,
        trend: "none",
        diff: 0
      },
      Intimacy: {
        value: 15,
        trend: "plus",
        diff: 5
      },
      Honor: {
        value: 30,
        trend: "none",
        diff: 0
      },
    },
    {
      Survival: {
        value: 24,
        trend: "minus",
        diff: 4
      },
      Belonging: {
        value: 22,
        trend: "none",
        diff: 0
      },
      Social: {
        value: 45,
        trend: "plus",
        diff: 5
      },
      Intimacy: {
        value: 15,
        trend: "none",
        diff: 0
      },
      Honor: {
        value: 30,
        trend: "none",
        diff: 0
      },
    },
  ]);

  // 当前数值，后期应接入后端数据
  const currentData: NewRedisData = {
    name: "",
    game_info: {
      day: 0,
      time: "",
      frame: 0
    },
    attr_value: currentAttrValues[1],
    u: 0,
    v: 0,
    uv_rose: 0,
    action: ""
  }

  
  const [id, setId] = useState<string>("0");

  const [historyEvent, setHistoryEvent] = useState<AgentEvent[]>([
    {
      frame: 10,
      name: "Test1",
      attr_value: currentAttrValues[0],
      v: 18
    },
    {
      frame: 100,
      name: "Test2",
      attr_value: currentAttrValues[1],
      v: 52
    },
    {
      frame: 100,
      name: "Test2",
      attr_value: currentAttrValues[2],
      v: 64
    },
  ])
  const [dialogOpen, setDialogOpen] = useState(false);

  const [resEventList, setResEventList] = useState<string[]>([])

  const [isClicking, setIsClicking] = useState<number>(-1);

  const box = useRef(null);
  const [isDisplay, setIsDisplay] = useState(false);
  
  const [UV, setUV] = useState<{ u: number; v: number }>({ u: 0, v: 0 });

  const [selectedEvent, setSelectedEvent] = useState<SelectEventList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAttrValues, setEditingAttrValues] = useState<NewAttrValue>({
    Survival: {
      value: 0,
      trend: "none",
      diff: 0
    },
    Belonging: {
      value: 0,
      trend: "none",
      diff: 0
    },
    Social: {
      value: 0,
      trend: "none",
      diff: 0
    },
    Intimacy: {
      value: 0,
      trend: "none",
      diff: 0
    },
    Honor: {
      value: 0,
      trend: "none",
      diff: 0
    },
  });
  // const [editingAttrValues, setEditingAttrValues] = useState<AttrValue>({...currentAttrValues}); 
  // const [showingData, setShowingAttrValues] = useState<ShowingAttrValues>({...currentAttrValues, trend: "up", diff: 0}); 
  
  const chartFontSize = newChartSize(12);
  const lineWidth = newChartSize(2);
  const iconSize = newChartSize(10);
  const iconGap = newChartSize(6);
  const axisLabelGap = newChartSize(8);
  const [funnelChartOption, setFunnelChartOption] = useState<MyChartOption>({
    name: 'funnelchart',
    tooltip: {
      show: true,
      position: 'inside',
      trigger: 'item',
      padding: 0,
      backgroundColor: '#1F1F1F',
      // formatter: '47',
      formatter: function() {
        let html = 
        `<div style="height:1.5rem; width:2rem; font-size:0.8rem; display:flex;justify-content:center; align-items:center; color:#ccc">
          47
        </div>`
        return html;
      },
      textStyle: {
        fontSize: chartFontSize,
      },
    },
    toolbox: {
      // feature: {
      //   dataView: { readOnly: false },
      //   restore: {},
      //   saveAsImage: {}
      // }
    },
    legend: {
      data: ['活着', '活得好', '活得有意义'],
      show: false
    },
    textStyle: {
      fontSize: chartFontSize
    },
    series: [
      {
        type: 'funnel',
        left: '20%',
        top: '10%',
        width: '60%',
        height: '90%',
        label: {
          formatter: '{b}',
          position: 'inside',
          fontSize: newChartSize(14),
          textBorderColor: 'rgba(0, 0, 0, 0)'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          disabled: true,
        },
        itemStyle: {
          borderWidth: lineWidth
        },
        sort: 'ascending',
        data: [
          { 
            value: 33.3,
            name: '活得有意义',
            label: {
              color: '#fff'
            },
            itemStyle: {
              color: 'rgba(134, 122, 106, 0)'
            }
          },
          { 
            value: 66.6,
            name: '活得好',
            label: {
              color: '#fff'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(181, 181, 169, 0)'
                }, {
                    offset: 0.8, color: 'rgba(181, 181, 169, 0)'
                }, {
                  offset: 0.8, color: 'rgba(181, 181, 169, 1)'
                }, {
                   offset: 1, color: 'rgba(181, 181, 169, 1)'
                }],
              },
          }},
          { 
            value: 100,
            name: '活着',
            label: {
              color: '#4D4B4B'
            },
            itemStyle: {
              color: 'rgba(208, 208, 206, 1)',
          }},
        ]
      },
      {
        name: 'Expected',
        type: 'funnel',
        left: '20%',
        top: '10%',
        width: '60%',
        height: '90%',
        label: {
          position: 'inside',
          fontWeight: 'lighter',
        },
        // labelLayout: function(params: any) {
        //   return {
        //       // dx: -newChartSize(params.dataIndex*8 + 8),
        //       // dy: -newChartSize(20)
        //       x: `-${params.dataIndex * 10 + 10 }%`,
        //       y: '-15%'
        //   }
        // },
        labelLine: {
          show: false
        },
        itemStyle: {
          color: 'rgba(134, 122, 106, 0)',
          borderWidth: 0
        },
        emphasis: {
          disabled: true
        },
        sort: 'ascending',
        data: [
          { 
            value: 33.3,
            name: '100'
          },
          { 
            value: 66.6,
            name: '60'
          },
          { 
            value: 100,
            name: '30'
          }
        ]
      },
    ]
  } ) 

  // const [isEmphasis, setIsEmphasis] = useState(-1);
  const [lineChartOption, setLineChartOption] = useState<MyChartOption>({
    name: 'linechart',
    tooltip: {
      show: true,
      trigger: 'axis',
      position: ["30%", "0"],
      padding: 0,
      backgroundColor: '#1F1F1F',
      borderColor: '#1F1F1F',
      axisPointer: {
        lineStyle: {
          width: lineWidth
        }
      },
      formatter: function(params: any) {
        let html = 
        `<div style="height:auto;width:9rem; font-size:0.6rem; ">
          <div style="color:#DBDBDB; height:1.2rem; display:flex;justify-content:center; align-items:center;">${params[0].axisValue}</div>
          <div style="display:flex;flex-flow:wrap;">
            ${params.map(( item: { color: string; seriesName: string; value: number;  } ) => 
            `<div style="color:#DBDBDB;display:flex;align-items:center;line-height:2; margin-left:0.4rem">
               <span style="margin-right:0.3rem;border-radius:0.5rem;width:0.5rem;height:0.5rem;background-color: ${item.color};"></span>
               <span>${item.seriesName}</span>
               <span style="flex:1;margin-left:0.3rem;">${item.value}</span>
            </div>`).join("")}
          </div>
        </div>`
        return html;
      },
    },
    legend: {
      show: true,
      top: '5%',
      right: 0,
      width: '60%',
      padding: 0,
      itemWidth: iconSize,
      itemHeight: iconSize,
      itemGap: iconGap,
      borderWidth: 0,
      icon: 'circle',
      textStyle: {
        color: '#DBDBDB',
      },
      // selectedMode: 'multiple',
      
      data: ['购物力', '安全感', '分享欲', '依恋感', '信念感']
    },
    textStyle: {
      fontSize: chartFontSize
    },
    grid: {
      containLabel: true,
      left: '15%',
      top: '38%',
      width: '85%',
      height: '52%'
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      name: '历史属性状态',
      nameLocation: 'middle',
      nameGap: axisLabelGap,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [iconSize, iconSize],
        lineStyle: {
          color: '#DBDBDB',
          width: lineWidth
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      data: ['1', '18', '523', '591', '613', '815', '857', '951', '1281', '1470']
    },
    yAxis: {
      name: '内在价值(V)',
      nameGap: axisLabelGap,
      nameLocation: 'end',
      max: function (value) {
        if( value.max + 20 <= 100 )
          return value.max + 20;
        else
          return value.max;
      },
      // nameTextStyle: {
      //   align: 'left'
      // },
      splitLine:{
        show: false
      },
      type: 'value',
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolSize: [iconSize, iconSize],
        lineStyle: {
          color: '#DBDBDB',
          width: lineWidth
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: chartFontSize,
        margin: axisLabelGap
      },
    },
    series: [
      {
        name: '购物力',
        type: 'line',
        smooth: true,
        symbol: 'none',
        label: {
          show: false
        },
        emphasis: {
          focus: 'self',
        },
        triggerLineEvent: true,
        lineStyle: {
          width: lineWidth
        },
        data: [16, 16, 16, 35, 45, 50, 45, 66, 62, 68]
      },
      {
        name: '安全感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        label: {
          show: false,
        },
        emphasis: {
          focus: 'self'
        },
        triggerLineEvent: true,
        lineStyle: {
          width: lineWidth
        },
        data: [45, 56, 30, 46, 29, 29, 29, 35, 32, 40]
      },
      {
        name: '分享欲',
        type: 'line',
        smooth: true,
        symbol: 'none',
        label: {
          show: false
        },
        emphasis: {
          focus: 'self'
        },
        triggerLineEvent: true,
        lineStyle: {
          width: lineWidth
        },
        data: [72, 72, 89, 72, 72, 65, 72, 72, 55, 72]
      },
      {
        name: '依恋感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        label: {
          show: false
        },
        emphasis: {
          focus: 'self'
        },
        triggerLineEvent: true,
        lineStyle: {
          width: lineWidth
        },
        data: [58, 78, 76, 44, 43, 55, 55, 40, 40, 40]
      },
      {
        name: '信念感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        label: {
          show: false
        },
        emphasis: {
          focus: 'self'
        },
        triggerLineEvent: true,
        lineStyle: {
          width: lineWidth
        },
        data: [12, 12, 12, 12, 16, 17, 13, 10, 14, 18]
      }
    ]
  });

  // function changeLineChart() {
  //   console.log("changeLineChart");
  //   setLineChartOption(Object.assign({}, lineChartOption, { fontStyle: {fontSize: setFontSize(14)}}));
  // }

  // window.addEventListener('resize', () => changeLineChart());
 
  // window.addEventListener('resize', resetFont);
  // useEffect(() => {
  //   console.log("chartFontChanged")
  //   setLineChartOption(Object.assign({}, lineChartOption, {textStyle: {fontSize: chartFontSize}}));
  // }, [chartFontSize])


  // const [redisData, setRedisData] = useState<any>(mockRedisData.data1);
  // setTimeout(() => {
  //   setRedisData(mockRedisData.data1);
  // }, 5000);
  // setTimeout(() => {
  //   setRedisData(mockRedisData.data2);
  // }, 8000);
  

  // var timer = Number(setInterval(() => {    
  //   if (currentAttrValues.length < latestData.length) {
  //     console.log("before currentAttrValues", currentAttrValues)
  //     currentAttrValues.push(latestData[currentAttrValues.length]);
  //     setCurrentAttrValues(currentAttrValues);
  //   } else {
  //     clearInterval(timer);
  //   }
  // }, 3000));
  // var timer = window.setInterval(() => {    
  //   if (currentAttrValues.length < latestData.length) {
  //     console.log("before currentAttrValues", currentAttrValues)
  //     // currentAttrValues.push(latestData[currentAttrValues.length]);
  //     setCurrentAttrValues((prevValue => prevValue.concat(latestData[currentAttrValues.length])));
  //   } else {
  //     clearInterval(timer);
  //   }
  // }, 3000);
  // var count = latestData.length;

  // 模拟数据更新
  // setTimeout(() => {
  //   if (currentAttrValues.length < latestData.length) {
  //     // console.log("before currentAttrValues", currentAttrValues)
  //     setCurrentAttrValues((prevValue => prevValue.concat([latestData[currentAttrValues.length]])));
  //   }
  // }, 3000);


  const { redisData } = useRedis();
  
  useEffect(() => {
    console.log("redisData", redisData)

    if (redisData && redisData.length > 0) {
      // setCurrentData(redisData);
      // setAttrValues(redisData[redisData.length - 1].attr_value);
      // setUV({
      //   u: redisData[redisData.length - 1].u,
      //   v: redisData[redisData.length - 1].v,
      // });

    
      setId(getKeyByValue(idNameMap, redisData[0].name) as string)

      setUV({
        u: redisData[redisData.length - 1].u,
        v: redisData[redisData.length - 1].v,
      });
      
      const historyEvent: AgentEvent[] = [];
      const showingData = JSON.parse(JSON.stringify(redisData));
      
      const lineChartData: number[][] =  [[], [], [], [], []];
      const lineChartXAxis = JSON.parse(JSON.stringify(lineChartOption.xAxis));
      lineChartXAxis.data = []
      const lineChartSeries = JSON.parse(JSON.stringify(lineChartOption.series));

      for (let index = 0; index < redisData.length; index++) {
        
        // 改写attr数据（添加差值）
        let attr = redisData[index].attr_value;
        let newAttr = {
          Survival: {},
          Belonging: {},
          Social: {},
          Intimacy: {},
          Honor: {}
        };
        type arrKeyType = keyof typeof newAttr; 
        if( index == 0 ) {
          for(let key in attr) {
            newAttr[key as arrKeyType] = {
              value: attr[key],
              trend: "none",
              diff: 0
            }
          }
          showingData[index].attr_value = newAttr
        }
        else {
          for(let key in attr) {
            const thisValue = attr[key];
            const frontValue = redisData[index-1].attr_value[key]
            const diff = thisValue - frontValue;
            let trend = "";
            if( diff > 0 ) {
              trend = "plus";
            }
            else if ( diff < 0 ) {
              trend = "minus";
            }
            else {
              trend = "none";
            }
            newAttr[key as arrKeyType] = {
              value: thisValue,
              trend: trend,
              diff: Math.abs(diff),
            }
          }
          showingData[index].attr_value = newAttr
        }

        // history event 数据
        historyEvent.push({
          name: redisData[index].action,
          frame: redisData[index].game_info.frame,
          attr_value: showingData[index].attr_value,
          v: redisData[index].v
        })

        // linechart 数据
        lineChartXAxis.data.push(redisData[index].game_info.frame);

        const numberOfKeys = Object.keys(attr);
        for (let keyIndex = 0; keyIndex < numberOfKeys.length; keyIndex++) {
          lineChartData[keyIndex].push(attr[numberOfKeys[keyIndex]])
        }
      }
      
      setCurrentAttrValues([...currentAttrValues, showingData[showingData.length - 1].attr_value])

      lineChartSeries.map((item: any, index: number) => {
        item.data = lineChartData[index]
      })
      setLineChartOption(Object.assign({}, lineChartOption, { xAxis: lineChartXAxis, series: lineChartSeries}));
      
      setHistoryEvent(historyEvent);
      // setAttrList(showingData);
      // setCurrentData(showingData);
      // setAttrValues(showingData[showingData.length - 1].attr_value);
      
      // setLineChartOption({
      //   series: [
      //     {
      //       name: '购物力',
      //       type: 'line',
      //       smooth: true,
      //       symbol: 'none',
      //       emphasis: {
      //         disabled: false,
      //         focus: 'self',
      //       },
      //       data: [16, 16, 16, 35, 45, 50, 45, 66, 62, 68]
      //     },
      //     {
      //       name: '依恋感',
      //       type: 'line',
      //       smooth: true,
      //       symbol: 'none',
      //       emphasis: {
      //         disabled: false,
      //         focus: 'self',
      //       },
      //       data: [58, 78, 76, 44, 43, 55, 55, 40, 40, 40]
      //     },
      //     {
      //       name: '安全感',
      //       type: 'line',
      //       smooth: true,
      //       symbol: 'none',
      //       emphasis: {
      //         disabled: false,
      //         focus: 'self',
      //       },
      //       data: [45, 56, 30, 46, 29, 29, 29, 35, 32, 40]
      //     },
      //     {
      //       name: '信念感',
      //       type: 'line',
      //       smooth: true,
      //       symbol: 'none',
      //       emphasis: {
      //         disabled: false,
      //         focus: 'self',
      //       },
      //       data: [12, 12, 12, 12, 16, 17, 13, 10, 14, 18]
      //     },
      //     {
      //       name: '分享欲',
      //       type: 'line',
      //       smooth: true,
      //       symbol: 'none',
      //       emphasis: {
      //         disabled: false,
      //         focus: 'self',
      //       },
      //       data: [72, 72, 89, 72, 72, 46, 72, 72, 55, 72]
      //     }
      //   ]
      // })
      
      // const v = transAttrToUV(currentAttrValues[0]);
      const v = transAttrToUV(currentData.attr_value);
      vToOption(v);
      setLabelLayout();
    }
  }, [redisData]);

  useEffect(() => {
    console.log("currentAttrValues", currentAttrValues);
  }, [currentAttrValues])

  // function handleHoverCardOpenChange(open: boolean) {
  //   console.log(box.current);
  //   if (!box.current) return

  //   // eslint-disable-next-line no-undef
  //   const ref = box.current as React.HTMLAttributes<HTMLDivElement>
  //   if (open) {
  //     ref.style!.overflow = "visible";
  //   } else {
  //     ref.style!.overflow = "hidden";
  //   }
  // }

  // let attrNodes: Array<any> = [];
  
  type AttrNode = {
    Survival: HTMLDivElement | null;
    Belonging: HTMLDivElement | null;
    Social: HTMLDivElement | null;
    Intimacy: HTMLDivElement | null;
    Honor: HTMLDivElement | null;
    [key: string]: HTMLDivElement | null;
  };
  const attrNodes: AttrNode = {
    Survival: null,
    Belonging: null,
    Social: null,
    Intimacy: null,
    Honor: null,
  };

  const clickItemRef = useRef<HTMLDivElement | null>(null);
  const showingAttrRef = useRef(null);

  function transAttrToUV(attrValueObj: NewAttrValue) {
    
    // console.log("attrValueObj", attrValueObj)
    var attrValue = [];
    for( let index = 0; index< Object.keys(attrValueObj).length; index++){
      let obj = attrValueObj[Object.keys(attrValueObj)[index]];
      attrValue.push(obj.value)
    }
    let v0 = (attrValue[0] + attrValue[1]) / 2;
    let v1 = (attrValue[2] + attrValue[3]) / 2;
    let v2 = attrValue[attrValue.length - 1];

    let uvValue = 0;
    if (v0 < 30) {
        uvValue = v0;
    } else if (attrValue[0] <= 15) {
        uvValue = attrValue[1] / 4.45 + attrValue[0] / 2;
    } else if (attrValue[1] <= 15) {
        uvValue = attrValue[0] / 4.45 + attrValue[1] / 2;
    } else if (v0 >= 30 && v1 <= 50) {
        uvValue = 30 + (v0 - 30) * 10 / 70;
        uvValue += v1 * 30 / 50;
    } else if (v0 >= 30 && v1 > 50) {
        uvValue = 30 + (v0 - 30) * 10 / 70;
        uvValue += 30 + (v1 - 50) * 10 / 50;
        uvValue += v2 * 20 / 100;
    }
    // console.log("uvValue", uvValue)

    return uvValue;
  }
  function vToOption(v: number) {
    let colorList: (string | object)[] = [];
    if( v <= 30 ) {
      const offset = (30 - v) / 30;
      colorList = ['rgba(134, 122, 106, 0)', 'rgba(181, 181, 169, 0)', {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(208, 208, 206, 0)'
        }, {
            offset: offset, color: 'rgba(208, 208, 206, 0)'
        }, {
          offset: offset, color: 'rgba(208, 208, 206, 1)'
        }, {
           offset: 1, color: 'rgba(208, 208, 206, 1)'
        }],
      }]
    }
    else if( v > 30 && v <= 60) {
      const offset = 1 - (v - 30) / 30;
      colorList = ['rgba(134, 122, 106, 0)', {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(181, 181, 169, 0)'
        }, {
            offset: offset, color: 'rgba(181, 181, 169, 0)'
        }, {
          offset: offset, color: 'rgba(181, 181, 169, 1)'
        }, {
           offset: 1, color: 'rgba(181, 181, 169, 1)'
        }],
      }, 'rgba(208, 208, 206, 1)']
    }
    else if( v > 60) {
      const offset = 1 - (v - 60) / 30;
      colorList = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: 'rgba(134, 122, 106, 0)'
        }, {
            offset: offset, color: 'rgba(134, 122, 106, 0)'
        }, {
          offset: offset, color: 'rgba(134, 122, 106, 1)'
        }, {
           offset: 1, color: 'rgba(134, 122, 106, 1)'
        }],
      }, 'rgba(181, 181, 169, 1)', 'rgba(208, 208, 206, 1)']
    }
    // newseries.map((item: any) => {
    //     item.label.show = false;
    // })

    const newOption = JSON.parse(JSON.stringify(funnelChartOption));
      newOption.tooltip.formatter = function() {
        let html = 
        `<div style="height:1.5rem; width:2rem; font-size:0.8rem; display:flex;justify-content:center; align-items:center; color:#ccc">
          ${v}
        </div>`
        return html;
      }
    
      newOption.series[0].data.map( (item: any, index: number) => {
        item.itemStyle.color = colorList[index];
      })
      // newOption.series[1].labelLayout = function(params: any) {
      //   return {
      //     // dx: - newChartSize(params.dataIndex * 8 + 8),
      //     // dy: - newChartSize(20)
      //     x: `-${params.dataIndex * 10 + 10 }%`,
      //     y: '-15%'
      //   }
      // }
    
    setFunnelChartOption(newOption);
  }

  function setLabelLayout() {
    const newOption = JSON.parse(JSON.stringify(funnelChartOption));
    newOption.series[1].labelLayout = function(params: any) {
      return {
        x: `-${params.dataIndex * 10 + 10 }%`,
        y: '-15%'
      }
    }
    setFunnelChartOption(newOption);
  }

  function getKeyByValue<T extends object, V extends T[keyof T]>(obj: T, value: V): keyof T | undefined {
    const entry = Object.entries(obj).find(([_, v]) => v === value);
    return entry ? (entry[0] as keyof T) : undefined;
  }
  

  function handleEdit() {
    // e.stopPropagation();
    // setEditingAttrValues(editingAttrValues);
    // let showingAttr = isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : currentAttrValues![info.label];
    const showingAttr = JSON.parse(JSON.stringify(isClicking >= 0 ? historyEvent[isClicking].attr_value : currentAttrValues[currentAttrValues.length - 1]));
    
    // for (let key in attrNodes) {
    //   attrNodes[key].innerText = showingAttr[key].value;
    // }
    setEditingAttrValues(showingAttr);
    setIsEditing(true);
  }

  function handleInput(e: FormEvent, label: string) {
    const target = e.target as HTMLInputElement;
    let value = target.innerText;
    value = value.replace(/[^\d]/g,'');
    const valueNum = Number(value);
    if( valueNum < 0 || valueNum > 100) {
      return
    }
    editingAttrValues[label].value = valueNum;
    setEditingAttrValues(editingAttrValues);
  }

  async function handleConfirm() {
    // const showingAttr = JSON.parse(JSON.stringify(isClicking >= 0 ? historyEvent[isClicking].attr_value : currentAttrValues[currentAttrValues.length - 1]));
    const curIndex = currentAttrValues.length - 1;
    const curAttr = currentAttrValues[curIndex];
    const newAttr: NewAttrValue = {...editingAttrValues};
    let key: keyof NewAttrValue;
    for (key in newAttr) {
      const curValue = curAttr[key].value;
      const newValue = editingAttrValues[key].value;
      const diff = newValue - curValue;
      let trend = "";
      if( diff > 0 ) {
        trend = "plus";
      }
      else if ( diff < 0 ) {
        trend = "minus";
      }
      else {
        trend = "none";
      }
      newAttr[key].value = newValue;
      newAttr[key].diff = Math.abs(diff);
      newAttr[key].trend = trend;
    }
    // currentAttrValues.push(newAttr)
    // setCurrentAttrValues(currentAttrValues);
    setCurrentAttrValues([...currentAttrValues, newAttr]);
    const response = await axios.post("http://localhost:3000/change_attr", {
        id: id,
        attr: [newAttr.Survival.value, newAttr.Belonging.value, newAttr.Social.value, newAttr.Intimacy.value, newAttr.Honor.value]
    })
    console.log("response", response)
    setIsEditing(false);
    // setIsClicking(-1);

    // 原逻辑（修改了历史事件值）
    // if ( isClicking >= 0 ) {
    //   currentData[isClicking].attr_value = showingAttr;
    // }
    // else {
    //   currentData[currentData.length - 1].attr_value = showingAttr;
    // }  
    // for (let index = 1; index < currentData.length; index++) {
    //   for(let key in showingAttr) {
    //     const thisValue = currentData[index].attr_value[key].value;
    //     const frontValue = currentData[index-1].attr_value[key].value;
    //     const diff = thisValue - frontValue;
    //     let trend = "";
    //     if( diff > 0 ) {
    //       trend = "plus";
    //     }
    //     else if ( diff < 0 ) {
    //       trend = "minus";
    //     }
    //     else {
    //       trend = "none";
    //     }
    //     currentData[index].attr_value[key].diff = Math.abs(diff);
    //     currentData[index].attr_value[key].trend = trend;
    //   }
    //   setCurrentData(currentData);
    //   setIsEditing(false);
    // }
  }

  function handleCancel() {
    const showingAttr = JSON.parse(JSON.stringify(isClicking >= 0 ? historyEvent[isClicking].attr_value : currentAttrValues[currentAttrValues.length - 1]));
    let key: keyof AttrValue;
    for (key in showingAttr) {
      editingAttrValues[key].value = showingAttr[key].value;
    }
    
    // console.log("showingAttr", showingAttr)
    setEditingAttrValues(editingAttrValues);
    // console.log("when cancel", editingAttrValues)
    for (let key in attrNodes) {
      const attrNode = attrNodes[key] as HTMLDivElement;
      attrNode.innerText = showingAttr[key].value;
    }
    setIsEditing(false);
  }

  function clickHistoryEvent(index: number) {
    setIsClicking(index);
  }

  useEffect(() => {
    if ( isEditing ) {
      handleEdit();
    }
    if ( isClicking < 0 ) {
      vToOption(Number(transAttrToUV(currentData.attr_value).toFixed(1)))
    }
    else {
      vToOption(Number(historyEvent[isClicking].v.toFixed(1)))
    }
  }, [isClicking])

 function handleClick(event: MouseEvent<HTMLDivElement>) {
    // console.log("event", event);
    event.preventDefault();
    event.stopPropagation();
    const current = clickItemRef.current;
    if (current) {
      if( !current.contains(event.target as Node) ) {
        setIsClicking(-1)
      }
    }
  }

  async function insertNewEvent() {
    console.log("selectedEvent", selectedEvent)
    if (selectedEvent != null) {
      const response = await axios.post("http://localhost:3000/history_event", {
        id: id,
        event: selectedEvent.fullcontent
      })
      console.log("response", response)
      setSelectedEvent(null);

      setTimeout(getNewEventList, 1000);
    }
  }

  async function getNewEventList() {
    const res = await axios.get("http://localhost:3000/new_event/" + id);
    console.log("res", res);
    setDialogOpen(true);
    const resEventList = res.data.split("||");
    setResEventList(resEventList)
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (dialogOpen) {
      timer = setTimeout(() => {
        setDialogOpen(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [dialogOpen, setDialogOpen]); // 依赖于 isOpen 和 setIsOpen

  function linesClickEvent(event: any) {
    console.log("event", event)
    event.event.stop("click")
    // const newseries = JSON.parse(JSON.stringify(lineChartOption.series));
    const newseries = lineChartOption.series as LineSeriesOption[];
    newseries.map((item: LineSeriesOption, index: number) => {
      if( item.label && index == event.seriesIndex ) {
        item.label.show = true;
      }
      else if (item.label) {
        item.label.show = false;
      }
    })
    setLineChartOption(Object.assign({}, lineChartOption, { series: newseries }));
  }
  function cancelLabel() {
    // const newseries = JSON.parse(JSON.stringify(lineChartOption.series));
    const newseries = lineChartOption.series as LineSeriesOption[];
    newseries.map((item: LineSeriesOption) => {
        if (item.label) {
          item.label.show = false;
        }
    })
    setLineChartOption(Object.assign({}, lineChartOption, { series: newseries }));
  }

  return (
    <div>
      <div
        onClick={handleClick}
        className="absolute z-40 top-0 right-0 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6F]/[.80] backdrop-blur transition-all ease-in-out"
        style={{
          width: isDisplay ? "26vw" : "3vw",
          transitionDuration: isDisplay ? "700ms" : "600ms",
          animationDuration: isDisplay ? "700ms" : "600ms",
        }}
        ref={box}
      >
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="left-[50%] top-[12%] w-[30rem] text-xs border-0 bg-[#313131]/[.9]" >
              <div>
                <div>当前事件：</div>
                <div className="text-[#FF8139]">- {resEventList[0]}</div>
              </div>
              <div>
                <div>队列事件：</div>
                {resEventList.map((item, index) => {
                  const lastIndex = resEventList.length - 1;
                  if(index > 0 && index < 4 && index < lastIndex)
                  return (
                    <div style={{color: index < Number(resEventList[lastIndex]) ? '#FF8139' : '#6B95FF'}}>
                      - {item}
                    </div>
                  )})}
              </div>
          </DialogContent>
          <DialogOverlay style={{backgroundColor: 'transparent'}}/>
          <DialogClose onClick={() => setDialogOpen(false)}/>
        </Dialog>

        <Button
          onClick={() => setIsDisplay(!isDisplay)}
          variant="ghost"
          className="mt-5 hover:bg-transparent absolute"
        >
          {/* <ChevronLeft
            className="transition-all duration-500 text-white"
            style={{ rotate: isDisplay ? "180deg" : ""}}
          /> */}
          <img src="/UI_left.png" className="w-[0.8rem]" style={{ rotate: isDisplay ? "180deg" : ""}} />
        </Button>


        {isDisplay && (
          <div className="ml-[0.5vw] w-[25vw] flex flex-col h-full py-2 text-white">
            <div className="mt-[2.5%] h-[5%] flex items-center text-2xl font-semibold tracking-wider flex">
              CURRENT AGENT INFO
            </div>
            
            <div className="w-full h-[43%] p-2 px-3 bg-[#313131]/[.9] rounded-3xl relative">
              <div className="w-full h-[15%] flex justify-between items-center mb-2">
                <div
                  className="my-2 pl-4 text-xl font-semibold"
                  style={{ letterSpacing: "0.625rem" }}
                >
                  { redisData[0].name }
                </div>
              </div>


              <div className="flex w-full h-[80%]">
                <div className="w-[40%] h-full relative">
                  <div className="h-[15%] flex justify-between items-center mb-2">
                    <div
                      className="my-1 pl-4 text-l"
                      style={{ letterSpacing: "0.625rem" }}
                    >
                      事件
                    </div>
                  </div>
                  {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
                  <div className="flex flex-col h-[85%] pl-3 "> 
                    <div className="flex items-center justify-between h-[13%]">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-[75%] h-full text-[0.6rem] flex jusify-between border border-[#F5EFEF] opacity-50 p-px rounded ">
                          <div className="w-[80%] flex items-center">
                            <img className="w-[15%] ml-1" src="/UI_insert.svg" />
                            <div className="w-[80%] truncate"> {selectedEvent != null ? selectedEvent.name:"选择输入事件"}</div>
                          </div>
                          <img className="w-[10%] mr-1" src="/UI_down.svg" />
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align="start" className="bg-[#262526] w-[125%] h-24 mt-1 text-[0.6rem] rounded border border-[#C3C3C3] animate-slideDownAndFade overflow-auto">
                            {selectEventList.map((item) => (
                              <DropdownMenuItem
                                className="h-9 text-[#D9D2D2] hover:bg-[#C3C3C3] hover:text-[#333333] justify-start items-center pl-2"
                                key={item.name}
                                onClick={() => setSelectedEvent(item)}
                              >
                                {item.name}
                              </DropdownMenuItem>
                              
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>
                      <Button className="w-[20%] h-full rounded text-[0.6rem] bg-[#F4F1F1]" onClick={() => insertNewEvent()}>确定</Button>
                    </div>
              
                    {/* <div className="flex h-1/6 bg-white gap-x-4">
                    </div> */}
                    <div className="h-[72%] mt-[7%]">
                      <div className="w-full h-1/4 flex items-center gap-x-4 text-[#D9D2D2] text-sm font-semibold border-y border-[#C9C9C9]">
                        <div className="w-[30%] pl-2">帧</div>
                        <div className="w-[70%]">历史事件</div>
                      </div>
                      <div ref={clickItemRef} className="w-full h-3/4 gap-x-4 border-b border-[#C9C9C9] overflow-y-scroll">
                      {historyEvent.map((event, index) => (
                        <HoverCard openDelay={400} closeDelay={100}>
                          <HoverCardTrigger className="cursor-pointer" >
                            <div
                              key={event.frame}
                              className={`${ index == isClicking ? 'text-[#D1CDAC]' : 'text-[#B6B0B0]' } w-[96%] h-1/3 flex items-center gap-x-4 text-md border-b border-[#606060] hover:text-[#D1CDAC] text-xs`}
                              onClick={() => clickHistoryEvent(index)}
                            >
                              <div className="w-[30%] pl-2">{event.frame}</div>
                              <div className="w-[70%] truncate">{event.name}</div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="z-50 w-full h-1/3 bg-[#DBDBDB] text-[#262623] text-sm">{event.name}</HoverCardContent>
                        </HoverCard>
                        
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[55%] h-full relative ml-[5%]">
                  {/* <HoverCard openDelay={50} onOpenChange={handleHoverCardOpenChange}>
                    <HoverCardTrigger asChild className="absolute top-6 right-10">
                      <HelpCircle />
                    </HoverCardTrigger>
                    <HoverCardContent
                      side="right"
                      className="relative top-20 bg-[#D9D9D9]/90 w-48 h-72"
                    >
                      <img
                        className="absolute top-9 right-4 object-cover"
                        src="/UI_triangle.png"
                        alt="Maslow"
                      />
                    </HoverCardContent>
                  </HoverCard> */}
                  
                  {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
                  
                  <div className="w-[80%] h-[15%] pl-[2%] flex justify-between items-center" onClick={ e => e.stopPropagation()}>
                    <div className="pr-5 text-l flex justify-center items-center">
                      { isClicking == -1 ? "实时数值" : "历史数值" }
                    </div>
                    <img 
                      src="/UI_edit.png"
                      className="cursor-pointer w-[1.2rem]"
                      style={{ display: isEditing ? "none" : "block" }}
                      onClick={() => { handleEdit() }}
                      alt=""
                    />
                    <div className="justify-end gap-x-3 items-center" style={{ display: isEditing ? "flex" : "none" }}>
                      <img className="cursor-pointer w-[0.8rem]" src="/UI_confirm.png" onClick={() => handleConfirm()} alt="" />
                      <img className="cursor-pointer w-[0.8rem]" src="/UI_cancel.png" onClick={() => handleCancel()} alt="" />
                    </div>
                  </div> 

                  <div className="flex flex-col justify-between h-[77%] gap-y-3 mt-2" ref={showingAttrRef} onClick={ e => e.stopPropagation() }>
                    {infos.map((info) => {
                      let showingAttr = isClicking >= 0 ? historyEvent[isClicking].attr_value![info.label] : currentAttrValues[currentAttrValues.length - 1]![info.label];
                      return (
                        <div key={info.label} className="flex items-center ">
                          <div className="flex justify-between items-center w-[30%] mr-[5%]">
                            <info.icon className="w-[30%] h-5" />
                            <span className="w-[55%] text-sm">
                              {info.name}
                            </span>
                          </div>
                          <Progress
                            value={showingAttr.value}
                            // value={isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : currentAttrValues![info.label]}
                            // value={currentAttrValues![info.label]}
                            className="w-[30%] mr-[5%] transition-all duration-200"
                          />
                          <div
                            className="w-[15%] h-[1.5rem] px-1 text-sm justify-center items-center bg-transparent border border-[#F4F1F1] border-opacity-0"
                            style={{ display: isEditing ? "none" : "flex"}}
                          >
                            {showingAttr.value}
                            {/* {isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : currentAttrValues![info.label]} */}
                            {/* {currentAttrValues![info.label]} */}
                          </div>
                          <div
                            className="w-[15%] h-[1.5rem] px-1 text-sm flex justify-center items-center bg-transparent border border-[#F4F1F1] rounded fucus:outline-1"
                            style={{ display: isEditing ? "flex" : "none"}}
                            ref={node => { attrNodes[info.label] = node }}
                            contentEditable
                            onInput={(e) => {handleInput(e, info.label)}}
                          >
                            {editingAttrValues[info.label].value}
                          </div>
                          <div
                            className="w-[8%] h-[1.5rem]  flex justify-between items-center text-xs"
                            style={{ opacity: !isEditing && showingAttr.diff != 0 ? 1 : 0 }}
                          >
                            <img className="w-[0.5rem]" src={'/UI_' + `${isClicking >= 0 ? showingAttr.trend : showingAttr.trend}`+ '.png'  } alt="" />
                            {isClicking >= 0 ? showingAttr.diff : showingAttr.diff}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              
            </div>
            


            <div className="mt-[5%] h-[5%] flex items-center text-2xl font-semibold tracking-wider">
              DATA ANALYSIS
            </div>
            <div className="relative w-full h-[42%] py-4 px-2 flex justify-between items-center bg-[#313131]/[.9] rounded-3xl">
              <div className="w-[10vw] h-full ml-[1vw] flex flex-col items-center">
                <p className="h-[10%] flex items-center text-base font-semibold">内在价值状态</p>
                {/* <UVBar UV={UV} /> */}
                <MyChart option={funnelChartOption} width="90%" height="90%" ></MyChart>
              </div>
              <div className="w-[13vw] h-full mr-[1vw] flex flex-col items-center" onClick={() => cancelLabel()}>
                <p className="h-[10%] flex items-center text-base font-semibold">历史属性状态</p>
                {/* <RoseGraph isDisplay /> */}
                <MyChart option={lineChartOption} width="90%" height="95%" onClick={e =>linesClickEvent(e)}></MyChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
