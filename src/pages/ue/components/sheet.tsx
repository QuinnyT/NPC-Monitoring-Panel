import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdownmenu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/event-hover-card";

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
// import RoseGraph from "./rose-graph";
// import { UVBar } from "./uv-bar";
// import { text } from "stream/consumers";
// import { setInterval } from "timers/promises";
// import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";


type Info = {
  label: string;
  name: string;
  icon: LucideIcon;
};
const infos: Info[] = [
  {
    label: "Survival",
    name: "荣誉",
    icon: Award,
  },
  {
    label: "Belonging",
    name: "亲密",
    icon: Heart,
  },
  {
    label: "Social",
    name: "社交",
    icon: Users2,
  },
  {
    label: "Intimacy",
    name: "生理",
    icon: ShieldCheck,
  },
  {
    label: "Honor",
    name: "金钱",
    icon: BadgeJapaneseYen,
  },
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
  ]);

  // const [currentData, setCurrentData] = useState<RedisData[]>([
  //   {
  //     name: "",
  //     game_info: {
  //       day: 0,
  //       time: "",
  //       frame: 0
  //     },
  //     attr_value: currentAttrValues,
  //     u: 0,
  //     v: 0,
  //     uv_rose: 0,
  //     action: ""
  //   }
  // ])
  const [currentData, setCurrentData] = useState<NewRedisData[]>([
    {
      name: "",
      game_info: {
        day: 0,
        time: "",
        frame: 0
      },
      attr_value: currentAttrValues[0],
      u: 0,
      v: 0,
      uv_rose: 0,
      action: ""
    }
  ])
  
  
  const [historyEvent, setHistoryEvent] = useState<AgentEvent[]>([
    {
      frame: 10,
      name: "Test1",
      attr_value: currentAttrValues[0]
    },
    {
      frame: 100,
      name: "Test2",
      attr_value: currentAttrValues[1]
    }
  ])

  const [isClicking, setIsClicking] = useState<number>(-1);
  // const [currentIndex, setCurrentIndex] = useState<number>(-1);
  // const [attrList, setAttrList] = useState<AttrValue[]>([
  //   {
  //     Survival: 0,
  //     Belonging: 0,
  //     Social: 0,
  //     Intimacy: 0,
  //     Honor: 0,
  //   }
  // ])

  const { redisData } = useRedis();
  const box = useRef(null);
  const [isDisplay, setIsDisplay] = useState(false);
  
  const [UV, setUV] = useState<{ u: number; v: number }>({ u: 0, v: 0 });

  const [selectedEvent, setSelectedEvent] = useState("");
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

  const funnelChartOption: MyChartOption = {
    // title: {
    //   text: 'Funnel'
    // },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '47'
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
    series: [
      {
        type: 'funnel',
        left: '20%',
        top: '5%',
        width: '60%',
        height: '90%',
        label: {
          formatter: '{b}',
          position: 'inside',
          color: '#fff',
          fontSize: 14,
          textBorderColor: '#000',
          textBorderWidth: 2
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          // opacity: 0.7,
          // color: {
          //   type: 'linear',
          //   x: 0,
          //   y: 0,
          //   x2: 0,
          //   y2: 1,
          // }
        },
        emphasis: {
          disabled: true
        },
        sort: 'ascending',
        data: [
          // { value: 100, name: '活着' },
          // { value: 90, name: '活着' },
          // { value: 80, name: '活着' },
          // { value: 70, name: '活着' },
          // { value: 60, name: '活得好' },
          // { value: 50, name: '活得好' },
          // { value: 40, name: '活得好' },
          // { value: 30, name: '活得好' },
          // { value: 20, name: '活得有意义' },
          // { value: 10, name: '活得有意义' },
          // { value: 33.6, name: '活得有意义', itemStyle: { color: '#867A6A'}},
          // { value: 66.6, name: '活得好', itemStyle: { color: '#B5B5A9'}},
          // { value: 100, name: '活着', itemStyle: { color: '#D0D0CE'}},
          // { value: 33.6, name: '活得有意义', itemStyle: { color: 'rgba(134, 122, 106, 0)', borderWidth: 1}},
          // { value: 66.6, name: '活得好', itemStyle: { color: 'rgba(181, 181, 169, 0)', borderWidth: 1}},
          // { value: 100, name: '活着', itemStyle: { color: 'rgba(208, 208, 206, 0)', borderWidth: 1}},
          { 
            value: 33.3,
            name: '活得有意义',
            itemStyle: {
              color: 'rgba(134, 122, 106, 0)',
              borderWidth: 1
          }},
          { 
            value: 66.6,
            name: '活得好',
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
                    offset: 0.4, color: 'rgba(181, 181, 169, 0)'
                }, {
                  offset: 0.4, color: 'rgba(181, 181, 169, 1)'
                }, {
                   offset: 1, color: 'rgba(181, 181, 169, 1)'
                }],
              },
              borderWidth: 1
          }},
          { 
            value: 100,
            name: '活着',
            itemStyle: {
              color: 'rgba(208, 208, 206, 1)',
              borderWidth: 1
          }},
        ]
      },
      {
        name: 'Expected',
        type: 'funnel',
        left: '20%',
        top: '5%',
        width: '60%',
        height: '90%',
        label: {
          position: 'leftBottom',
          fontWeight: 'lighter',
          color: '#DBDBDB'
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          color: 'rgba(134, 122, 106, 0)'
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
            name: '30',
          }
        ]
      },
    ]
  } 

  // const lineChartOption: MyChartOption = {
  //   // title: {
  //   //   text: 'Stacked Line'
  //   // },
  //   tooltip: {
  //     // trigger: 'axis'
  //   },
  //   legend: {
  //     show: true,
  //     right: 0,
  //     left: '10%',
  //     itemWidth: 10,
  //     itemHeight: 10,
  //     icon: 'circle',
  //     textStyle: {
  //       color: '#DBDBDB' 
  //     },
  //     // selectedMode: 'multiple',
      
  //     data: ['购物力', '依恋感', '安全感', '信念感', '分享欲']
  //   },
  //   grid: {
  //     containLabel: true,
  //     left: '0%',
  //     top: '20%',
  //     width: '90%',
  //     height: '70%'
  //   },
  //   // toolbox: {
  //   //   feature: {
  //   //     saveAsImage: {}
  //   //   }
  //   // },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     axisLine: {
  //       symbol: ['none', 'arrow'],
  //       lineStyle: {
  //         color: '#DBDBDB'
  //       }
  //     },
  //     axisTick: {
  //       show: false
  //     },
  //     data: ['1', '18', '523', '591', '613', '815', '857', '951', '1281', '1470']
  //   },
  //   yAxis: {
  //     splitLine:{
  //       show: false
  //     },
  //     type: 'value',
  //     axisLine: {
  //       show: true,
  //       symbol: ['none', 'arrow'],
  //       lineStyle: {
  //         color: '#DBDBDB'
  //       }
  //     },
  //     axisTick: {
  //       show: false
  //     }
  //   },
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
  //       data: [72, 72, 89, 72, 72, 65, 72, 72, 55, 72]
  //     }
  //   ]
  // }
  const [lineChartOption, setLineChartOption] = useState<MyChartOption>({
    // title: {
    //   text: 'Stacked Line'
    // },
    tooltip: {
      show: true,
      trigger: 'axis',
      position: [20, -25],
      padding: 0,
      textStyle: {
        height: 4,
        fontSize: 12,
      },
      backgroundColor: "rgba(233,233,233,1)",
      formatter: function(params) {
        let html = 
        `<div style="height:auto;width:170px;display:flex;flex-flow:wrap;">
          ${params.map(( item ) => 
           `<div style="font-size:12px;color:#808080;display:flex;align-items:center;line-height:1.5; margin-left:8px">
              <span style="margin-right:8px;border-radius:6px;width:6px;height:6px;background-color: ${item.color};"></span>
              <span>${item.seriesName}</span>
              <span style="flex:1;margin-left:8px;">${item.value}</span>
           </div>`).join("")}
        </div>`
        return html;
      },
    },
    legend: {
      show: true,
      right: 0,
      width: '60%',
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      textStyle: {
        color: '#DBDBDB' 
      },
      // selectedMode: 'multiple',
      
      data: ['购物力', '依恋感', '安全感', '信念感', '分享欲']
    },
    grid: {
      containLabel: true,
      left: '5%',
      top: '25%',

      width: '90%',
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
      nameGap: 5,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        symbol: ['none', 'arrow'],
        lineStyle: {
          color: '#DBDBDB'
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
      nameGap: 15,
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
        lineStyle: {
          color: '#DBDBDB'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '购物力',
        type: 'line',
        smooth: true,
        symbol: 'none',
        emphasis: {
          disabled: false,
          focus: 'self',
        },
        triggerLineEvent: true,
        data: [16, 16, 16, 35, 45, 50, 45, 66, 62, 68]
      },
      {
        name: '依恋感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        emphasis: {
          disabled: false,
          focus: 'self',
        },
        triggerLineEvent: true,
        data: [58, 78, 76, 44, 43, 55, 55, 40, 40, 40]
      },
      {
        name: '安全感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        emphasis: {
          disabled: false,
          focus: 'self',
        },
        triggerLineEvent: true,
        data: [45, 56, 30, 46, 29, 29, 29, 35, 32, 40]
      },
      {
        name: '信念感',
        type: 'line',
        smooth: true,
        symbol: 'none',
        emphasis: {
          disabled: false,
          focus: 'self',
        },
        triggerLineEvent: true,
        data: [12, 12, 12, 12, 16, 17, 13, 10, 14, 18]
      },
      {
        name: '分享欲',
        type: 'line',
        smooth: true,
        symbol: 'none',
        emphasis: {
          disabled: false,
          focus: 'self',
        },
        triggerLineEvent: true,
        data: [72, 72, 89, 72, 72, 65, 72, 72, 55, 72]
      }
    ]
  });

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

  // setTimeout(() => {
  //   if (currentAttrValues.length < latestData.length) {
  //     // console.log("before currentAttrValues", currentAttrValues)
  //     setCurrentAttrValues((prevValue => prevValue.concat([latestData[currentAttrValues.length]])));
  //   }
  // }, 3000);
  useEffect(() => {
    // console.log("latestData", latestData)
    console.log("currentAttrValues", currentAttrValues)
  }, [currentAttrValues])

  useEffect(() => {
    console.log("redisData", redisData)
    if (redisData && redisData.length > 0) {
      // setCurrentData(redisData);
      // setAttrValues(redisData[redisData.length - 1].attr_value);
      // setUV({
      //   u: redisData[redisData.length - 1].u,
      //   v: redisData[redisData.length - 1].v,
      // });
      setUV({
        u: redisData[redisData.length - 1].u,
        v: redisData[redisData.length - 1].v,
      });
      
      const historyEvent: AgentEvent[] = [];
      const showingData = JSON.parse(JSON.stringify(redisData));
      
      const lineChartData: number[][] =  [[], [], [], [], []];

      for (let index = 0; index < redisData.length; index++) {
        

        
        // 改写attr数据（添加差值）
        let attr = redisData[index].attr_value;
        if( index == 0 ) {
          let newAttr: any = {
            Survival: {},
            Belonging: {},
            Social: {},
            Intimacy: {},
            Honor: {}
          };
          for(let key in attr) {
            newAttr[key] = {
              value: attr[key],
              trend: "none",
              diff: 0
            }
          }
          showingData[index].attr_value = newAttr
        }
        else {
          let newAttr: any = {
            Survival: {},
            Belonging: {},
            Social: {},
            Intimacy: {},
            Honor: {}
          };
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
            newAttr[key] = {
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
        })

        // linechart 数据
        const numberOfKeys = Object.keys(attr);
        for (let keyIndex = 0; keyIndex < numberOfKeys.length; keyIndex++) {
          lineChartData[keyIndex].push(attr[numberOfKeys[keyIndex]])
        }
      }
      
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
    }
  }, [redisData]);

  // useEffect(() => {
  //   console.log("currentData", currentData)
  //   console.log("currentAttrValues", currentAttrValues)
  // }, [currentData, currentAttrValues]);

  // useEffect(() => {
  //   if( isClicking ) {
  //     setAttrValues(attrList[isClicking]);
  //   }
  //   else {
  //     setAttrValues(attrList[attrList.length - 1]);
  //   }
  //   console.log("attrList", attrList)
  // }, [isClicking, attrList]);

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
    Survival: any;
    Belonging: any;
    Social: any;
    Intimacy: any;
    Honor: any;
    [key: string]: any;
  };
  const attrNodes: AttrNode = {
    Survival: null,
    Belonging: null,
    Social: null,
    Intimacy: null,
    Honor: null,
  };

  const clickItemRef = useRef(null);
  const showingAttrRef = useRef(null);

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

  function handleInput(e: any, label: string) {
    let value = e.target.innerText;
    value = value.replace(/[^\d]/g,'');
    value = Number(value);
    if( value < 0 || value > 100) {
      return
    }
    editingAttrValues[label].value = value;
    setEditingAttrValues(editingAttrValues);
  }

  function handleConfirm() {
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
    currentAttrValues.push(newAttr)
    setCurrentAttrValues(currentAttrValues);
    console.log("currentAttrValues", currentAttrValues);
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
      attrNodes[key].innerText = showingAttr[key].value;
    }
    setIsEditing(false);
  }

  function clickHistoryEvent(e: any, index: number) {
    setIsClicking(index);
  }

  useEffect(() => {
    if ( isEditing ) {
      handleEdit();
    }
  }, [isClicking])

  function handleClick(event: any) {
    // console.log("event", event);
    event.preventDefault();
    event.stopPropagation();
    if( !clickItemRef.current.contains(event.target) ) {
      setIsClicking(-1)
    }
  }
  
  function insertNewEvent() {
    console.log("selectedEvent", selectedEvent)
    setSelectedEvent("");
  }

  return (
    <div>
      <div
        onClick={(e) => handleClick(e)}
        className="absolute z-40 top-0 right-0 h-full flex items-center rounded-r-2xl overflow-x-hidden bg-[#6F6F6FCC]/50 backdrop-blur transition-all ease-in-out"
        style={{
          width: isDisplay ? "26vw" : "3vw",
          transitionDuration: isDisplay ? "700ms" : "600ms",
          animationDuration: isDisplay ? "700ms" : "600ms",
        }}
        ref={box}
      >
        <Button
          onClick={() => setIsDisplay(!isDisplay)}
          variant="ghost"
          className="-mt-16 hover:bg-transparent"
        >
          <ChevronLeft
            className="transition-all duration-500 text-white"
            style={{ rotate: isDisplay ? "180deg" : "" }}
          />
        </Button>
        {isDisplay && (
          <div className="flex flex-col h-full py-2 text-white">
            <div className="my-4 -ml-8 text-2xl font-semibold tracking-wider flex">
              CURRENT AGENT INFO
            </div>
            
            <div className="w-[24.5vw] h-[28vh] -ml-10 p-2 px-3 bg-[#1F1F1FB2] rounded-3xl relative">
              <div className="w-full h-[15%] flex justify-between items-center mb-2">
                <div
                  className="my-2 pl-4 text-2xl font-semibold"
                  style={{ letterSpacing: "0.625rem" }}
                >
                  李白
                </div>
              </div>

              <div className="w-full h-[2%] flex justify-end items-center pr-8" onClick={ e => e.stopPropagation()}>
                {/* <div className="pr-5 text-xs" style={{ display: isEditing ? "flex" : "none" }}>改变最新状态</div> */}
                <img 
                  src="/UI_edit.png"
                  className="cursor-pointer"
                  style={{ display: isEditing ? "none" : "block" }}
                  onClick={() => { handleEdit() }}
                  alt=""
                />
                <div className=" justify-end gap-x-3 items-center" style={{ display: isEditing ? "flex" : "none" }}>
                  <img className="cursor-pointer" src="/UI_confirm.png" onClick={() => handleConfirm()} alt="" />
                  <img className="cursor-pointer" src="/UI_cancel.png" onClick={() => handleCancel()} alt="" />
                </div>
              </div> 

              <div className="flex w-full h-[80%]">
                <div className="w-[10vw] h-full relative">
                <div className="flex justify-between items-center mb-2">
                <div
                  className="my-1 pl-4 text-xl"
                  style={{ letterSpacing: "0.625rem" }}
                >
                  事件
                </div>
                </div>
                {/* <div className="w-[50%] p-1 mx-auto text-lg text-center font-semibold bg-[#5E5840]/90">{redisData.length ? redisData[0].name : ""}</div> */}
                <div className="flex flex-col h-3/4 gap-y-3 pl-3 "> 
                  <div className="flex items-center justify-between h-[12%]">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-[75%] text-[0.7rem] flex jusify-between border border-[#F5EFEF] opacity-50 p-px rounded ">
                        <div className="w-[80%] flex jusify-between gap-x-2">
                          <img className="w-4 ml-1" src="/UI_insert.png" />
                          <div className="truncate"> {selectedEvent != "" ? selectedEvent:"选择输入事件"}</div>
                        </div>
                        <img src="/UI_down.png" />
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent className="w-full bg-white text-[0.7rem] rounded border-x border-b border-[#C3C3C3] border-opacity-50 animate-slideDownAndFade">
                          {selectEventList.map((item) => (
                            <DropdownMenuItem
                              className="h-7 bg-[#262526] text-white hover:bg-[#C3C3C3] hover:text-[#333333] border-b border-[#C3C3C3]"
                              key={item.name}
                              onClick={() => setSelectedEvent(item.name)}
                            >
                              {item.name}
                            </DropdownMenuItem>
                            
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                    <Button className="w-[20%] h-full rounded text-[0.7rem] bg-[#F4F1F1]" onClick={() => insertNewEvent()}>确定</Button>
                  </div>
              
                  {/* <div className="flex h-1/6 bg-white gap-x-4">
                  </div> */}
                  <div className="h-[80%]">
                    <div className="w-full h-1/4 flex items-center gap-x-4 text-[#D9D2D2] text-md font-semibold border-y border-[#C9C9C9]">
                      <div className="w-[30%] pl-2">帧</div>
                      <div className="w-[70%]">历史事件</div>
                    </div>
                    <div ref={clickItemRef} className="w-full h-3/4 gap-x-4 border-b border-[#C9C9C9] overflow-y-scroll">
                    {historyEvent.map((event, index) => (
                      <HoverCard openDelay={400} closeDelay={100}>
                        <HoverCardTrigger className="cursor-pointer" >
                          <div
                            key={event.frame}
                            className={`${ index == isClicking ? 'text-[#D1CDAC]' : 'text-[#B6B0B0]' } w-[96%] h-1/3 flex items-center gap-x-4 text-md border-b border-[#606060] hover:text-[#D1CDAC] text-sm`}
                            onClick={(e) => clickHistoryEvent(e, index)}
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
                <div className="w-[12vw] relative ml-6 mt-1">
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
                  <div className="flex flex-col justify-between h-[80%] gap-y-3 pl-3 mt-5" ref={showingAttrRef} onClick={ e => e.stopPropagation() }>
                    {infos.map((info) => {
                      let showingAttr = isClicking >= 0 ? historyEvent[isClicking].attr_value![info.label] : currentAttrValues[currentAttrValues.length - 1]![info.label];
                      return (
                        <div key={info.label} className="flex items-center ">
                          <div className="flex items-center gap-x-2 w-26">
                            <info.icon className="w-6 h-6" />
                            <span className="text-l w-10">
                              {info.name}
                            </span>
                          </div>
                          <Progress
                            value={showingAttr.value}
                            // value={isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : currentAttrValues![info.label]}
                            // value={currentAttrValues![info.label]}
                            className="w-24 mr-2 transition-all duration-200"
                          />
                          <div
                            className="w-8 h-6 px-1 text-l justify-center items-center bg-transparent border border-[#F4F1F1] border-opacity-0"
                            style={{ display: isEditing ? "none" : "flex"}}
                          >
                            {showingAttr.value}
                            {/* {isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : currentAttrValues![info.label]} */}
                            {/* {currentAttrValues![info.label]} */}
                          </div>
                          <div
                            id="edit div"
                            className="w-8 h-6 px-1 text-l flex justify-center items-center bg-transparent border  border-[#F4F1F1] rounded"
                            style={{ display: isEditing ? "flex" : "none"}}
                            ref={node => { attrNodes[info.label] = node }}
                            contentEditable
                            onInput={(e) => {handleInput(e, info.label)}}
                          >
                            {editingAttrValues[info.label].value}
                          </div>
                          <div
                            className="w-8 h-6  flex justify-center items-center text-xs"
                            style={{ opacity: !isEditing && showingAttr.diff != 0 ? 1 : 0 }}
                          >
                            <img src={'/UI_' + `${isClicking >= 0 ? showingAttr.trend : showingAttr.trend}`+ '.png'  } alt="" />
                            {isClicking >= 0 ? showingAttr.diff : showingAttr.diff}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              
            </div>
            


            <div className="mt-16 mb-4 -ml-8 text-2xl font-semibold tracking-wider">
              DATA ANALYSIS
            </div>
            <div className="relative w-[24.5vw] h-[36vh] -ml-10 px-2 flex justify-between items-center bg-[#1F1F1FB2] rounded-3xl">
              <div className="w-[45%] h-[32vh] ml-2 flex flex-col items-center gap-y-3">
                <p className="text-xl font-semibold">内在价值状态</p>
                {/* <UVBar UV={UV} /> */}
                <MyChart option={funnelChartOption} width="100%" height="100%" ></MyChart>
              </div>
              <div className="w-[50%] h-[32vh] mr-4 flex flex-col items-center gap-y-8">
                <p className="text-xl font-semibold">历史属性状态</p>
                {/* <RoseGraph isDisplay /> */}
                <MyChart option={lineChartOption} width="100%" height="90%"></MyChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
