import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdownmenu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/event-hover-card";

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
import RoseGraph from "./rose-graph";
import { UVBar } from "./uv-bar";
import { text } from "stream/consumers";
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


type AgentEvent = {
  frame: number;
  name: string;
};

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

export const Sheet = () => {
  // const [attrValues, setAttrValues] = useState<AttrValue>({
  //   Survival: 0,
  //   Belonging: 0,
  //   Social: 0,
  //   Intimacy: 0,
  //   Honor: 0,
  // });
  const [attrValues, setAttrValues] = useState<NewAttrValue>({
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
  const [historyEvent, setHistoryEvent] = useState<AgentEvent[]>([
    {
      frame: 10,
      name: "Test1",
    },
    {
      frame: 100,
      name: "Test2",
    }
  ])
  // const [currentData, setCurrentData] = useState<RedisData[]>([
  //   {
  //     name: "",
  //     game_info: {
  //       day: 0,
  //       time: "",
  //       frame: 0
  //     },
  //     attr_value: attrValues,
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
      attr_value: attrValues,
      u: 0,
      v: 0,
      uv_rose: 0,
      action: ""
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
  const [editingAttrValues, setEditingAttrValues] = useState<NewAttrValue>({...attrValues});
  // const [editingAttrValues, setEditingAttrValues] = useState<AttrValue>({...attrValues}); 
  // const [showingData, setShowingAttrValues] = useState<ShowingAttrValues>({...attrValues, trend: "up", diff: 0}); 

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

      
      for (let index = 0; index < redisData.length; index++) {
        historyEvent.push({
          name: redisData[index].action,
          frame: redisData[index].game_info.frame
        })
        
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
            console.log("thisValue", thisValue)
            console.log("frontValue", frontValue)
            console.log("diff", diff)
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
      }
      // console.log("redisData", redisData)
      setHistoryEvent(historyEvent);
      // setAttrList(showingData);
      setCurrentData(showingData);
      setAttrValues(showingData[showingData.length - 1].attr_value);
    }
  }, [redisData]);

  console.log("currentData", currentData)
  // useEffect(() => {
  //   console.log("currentData", currentData)
  //   console.log("attrValues", attrValues)
  // }, [currentData, attrValues]);

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

  function handleEdit() {
    setIsEditing(true);
    for (let key in attrNodes) {
      attrNodes[key].innerText = attrValues[key].value;
    }
  }

  function handleInput(e: any, label: string) {
    let value = e.target.innerText;
    value = value.replace(/[^\d]/g,'');
    if( value < 0 || value > 100) {
      return
    }
    editingAttrValues[label].value = value;
    setEditingAttrValues(editingAttrValues);
  }

  function handleConfirm() {
    let key: keyof AttrValue;
    for (key in attrValues) {
      attrValues[key].value = editingAttrValues[key].value;
    }
    setAttrValues(attrValues);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function clickHistoryEvent(index: number) {
    console.log("index", index)
    setIsClicking(index);
  }


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
          className="-mt-10 hover:bg-transparent"
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

              <div className="w-full h-[2%] flex justify-end items-center pr-12">
                
                <img 
                  src="/UI_edit.png"
                  className="cursor-pointer"
                  style={{ display: isEditing ? "none" : "block" }}
                  onClick={() => { handleEdit() }}
                  alt=""
                   />
                
                
                <div className="w-3/5 justify-end gap-x-3 items-center" style={{ display: isEditing ? "flex" : "none" }}>
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
                  <div className="flex items-center justify-between h-[10%]">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-[75%] text-[0.7rem] gap-x-4 border border-[#F4F1F1] opacity-50 p-px rounded ">
                        <img src="/UI_insert.png" />
                        <div> {selectedEvent != "" ? selectedEvent:"选择输入事件"}</div>
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
                    <div className="w-full h-1/4 flex items-center gap-x-4 text-md font-semibold border-y border-white ">
                      <div className="w-[30%] pl-2">帧</div>
                      <div className="w-[70%]">历史事件</div>
                    </div>
                    <div ref={clickItemRef} className="w-full h-3/4 gap-x-4 border-b border-white overflow-y-scroll">
                    {historyEvent.map((event, index) => (
                      <HoverCard openDelay={400} closeDelay={100}>
                        <HoverCardTrigger className="cursor-pointer" >
                          <div
                            key={event.frame}
                            className={`${ index == isClicking ? 'text-[#D1CDAC]' : 'text-white' } w-full h-1/3 flex items-center gap-x-4 text-md border-b border-white border-opacity-50 hover:text-[#D1CDAC]`}
                            onClick={() => clickHistoryEvent(index)}
                          >
                            <div className="w-[30%] pl-2">{event.frame}</div>
                            <div className="w-[70%] truncate">{event.name}</div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="z-50 w-full h-1/3 bg-[#DBDBDB] text-[#262623]">{event.name}</HoverCardContent>
                      </HoverCard>
                      
                    ))}
                    </div>
                  </div>
                </div>

                </div>
                <div className="w-[12vw] relative ml-2 mt-1">
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
                  <div className="flex flex-col justify-between h-[80%] gap-y-3 pl-3 mt-5">
                    {infos.map((info) => {
                      let showingAttr = isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : attrValues![info.label];
                      return (
                        <div key={info.label} className="flex items-center ">
                          <div className="flex items-center gap-x-2 w-26">
                            <info.icon className="w-6 h-6" />
                            <span className="text-l w-10">
                              {info.name}
                            </span>
                          </div>
                          <Progress
                            value={isClicking >= 0 ? showingAttr.value : showingAttr.value}
                            // value={isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : attrValues![info.label]}
                            // value={attrValues![info.label]}
                            className="w-24 mr-2 transition-all duration-200"
                          />
                          <div
                            className="w-8 h-6 px-1 text-l justify-center items-center bg-transparent border border-[#F4F1F1] border-opacity-0"
                            style={{ display: isEditing ? "none" : "flex"}}
                          >
                            {isClicking >= 0 ? showingAttr.value : showingAttr.value}
                            {/* {isClicking >= 0 ? currentData[isClicking].attr_value![info.label] : attrValues![info.label]} */}
                            {/* {attrValues![info.label]} */}
                          </div>
                          <div
                            className="w-8 h-6 px-1 text-l flex justify-center items-center bg-transparent border  border-[#F4F1F1] rounded"
                            style={{ display: isEditing ? "flex" : "none"}}
                            ref={node => {  attrNodes[info.label] = node }}
                            contentEditable
                            onInput={(e) => {handleInput(e, info.label)}}
                          >
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
              <div className=" h-[32vh] ml-2 flex flex-col items-center gap-y-3">
                <p className="text-xl font-semibold">Equilibrium State</p>
                <UVBar UV={UV} />
              </div>
              <div className=" h-[32vh] flex flex-col items-center gap-y-3">
                <p className="text-xl font-semibold">Energy Scale</p>
                <RoseGraph isDisplay />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
