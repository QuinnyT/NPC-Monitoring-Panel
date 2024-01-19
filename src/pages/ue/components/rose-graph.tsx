import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import { useRedis } from "@/hooks/use-redis";
import { useIntervalAsync } from "@/hooks/use-intervalAsync";
import { getTargetData } from "@/lib/api";
import { Slider } from "@/components/ui/slider";

const RoseGraph = ({ isDisplay }: { isDisplay: boolean }) => {
  const { redisData, setRedisData, targetId } = useRedis();

  // todo migrate to zustand state
  const graph_container = useRef<any>(null);
  const graph = useRef<any>();
  const graph_color = useRef<string[]>(["#d2d2d2", "#d29c5d", "#3787d2"]);
  const index = useRef<number>(10);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    /**
     * A recreation of this demo: https://observablehq.com/@d3/radial-stacked-bar-chart
     */
    if (!graph_container.current || !redisData) return;

    // // 定义图形组件
    // function ShapeTriangle(style, context) {
    //   const { document } = context;
    //   return (P, value, defaults) => {
    //     console.log(style, P, value, defaults);
    //     // "M 45.0853 68.0541 L 0.88125 18.7796 L 2.28391 16.1926 C 9.09967 3.62205 23.9577 -2.23967 37.5203 2.29135 L 45.0853 68.0541 Z"
    //     let [p0, p1, p2, p3] = P;
    //     const path = document.createElement('path', {
    //       style: {
    //         ...style
    //       }
    //     }) as HTMLElement

    //     path.setAttribute('d', `M${p2[0]} ${p2[1]} L${p0[0]} ${p0[1]} A${p0[0]} ${p0[1]} ${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} z`)
    //     console.log(path)
    //     return path;
    //   };
    // }

    // // 注册该三角形
    // register('shape.interval.triangle', ShapeTriangle);

    const chart = new Chart({
      container: graph_container.current,
      width: 230,
      height: 230,
    });

    graph.current = chart;

    chart.coordinate({ type: "polar", outerRadius: 0.9 });

    chart
      .interval()
      .transform({ type: "groupX", x: "first" })
      .data({
        type: "inline",
        value: redisData,
        transform: [
          {
            type: "map",
            callback: (datum: any) => {
              return { ...datum, frame: datum.game_info.frame };
            },
          },
        ],
      })
      .encode({ x: "frame", y: "uv_rose" })
      .axis("x", {
        line: true,
        labelFilter: () => false,
        lineStroke: "#fff",
        lineLineWidth: "2",
        tickStroke: "#fff",
        title: false,
      })
      .axis("y", {
        grid: true,
        gridStroke: "#fff",
        gridLineDash: null,
        gridStrokeOpacity: 1,
        gridLineWidth: 1,
        tickFilter: (datum: number) => {
          if (datum <= 30 || datum >= 130) {
            return true;
          }
        },
        label: false,
        title: false,
      })
      .style("fill", (datum: any) => {
        const { uv_rose } = datum;
        const val = uv_rose * 1 + Math.random() * 10;

        if (val > 0 && val < 30) {
          return graph_color.current[0];
        } else if (val >= 30 && val < 130) {
          return graph_color.current[1];
        } else {
          return graph_color.current[2];
        }
      })
      .style("fillOpacity", 0.9)
      .interaction("tooltip", {
        // render 回调方法返回一个innerHTML 或者 DOM
        render: (event: any, { title, items }: any) => `<div>
        <ul>${items.map((d: any) => `<li>${d.value}</li>`)}</ul>
        </div>`,
      });
    // .legend({ color: { layout: { flexDirection: 'column', justifyContent: "center" }, 'position': "top" } })
    // .scrollbar({
    //   'x': {
    //     value: 1, ratio: 0.7
    //   }
    // });
    // .tooltip(false)
    // .animate('enter', { type: 'waveIn' })
    // .tooltip({ channel: 'y', valueFormatter: '~s' });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [isDisplay]);

  const handleRender = useCallback(
    (data: any) => {
      // data = [...data, {
      //   name: "123",
      //   game_info: {
      //     day: 0,
      //     time: 0,
      //     frame: 666,
      //   },
      //   attr_value: {
      //     Survival: 1,
      //     Belonging: 1,
      //     Social: 1,
      //     Intimacy: 1,
      //     Honor: 1,
      //   },
      //   u: 1,
      //   v: 1,
      //   uv_rose: 182,
      // }]
      if (data.length <= 10) {
        data = data.map((i: any) => ({ ...i, frame: i.game_info.frame }));
        setRedisData(data);
      } else {
        if (data.length > 110) {
        } else {
          setStep(Number((100 / (data.length - 10)).toFixed(1)));
        }
        data = data
          .slice(data.length - index.current)
          .map((i: any) => ({ ...i, frame: i.game_info.frame }));
        setRedisData(data);
      }
      window.requestIdleCallback(() => {
        graph.current.changeData(data);
      });
    },
    [index.current]
  );

  const handleRequest = useCallback(async () => {
    let { data } = await getTargetData(targetId);
    console.log("fetch", data);
    handleRender(data);
  }, [targetId]);

  useIntervalAsync(handleRequest, 1000);

  let preNum = 0;
  const onValueChange = useCallback(
    (value: number[]) => {
      if (preNum < value[0]) {
        index.current += 1;
      } else {
        index.current -= 1;
      }
      preNum = value[0];
    },
    [preNum]
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-between gap-y-1 w-[9.5rem] mx-auto text-[#DBDBDB]">
        <div className="flex items-center gap-x-1">
          <div className="w-3 h-3 rounded-full bg-[#D2D2D2]" />
          <span className="text-xs">Surviving</span>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="w-3 h-3 rounded-full bg-[#2B83F6]" />
          <span className="text-xs">Fulfilling</span>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="w-3 h-3 rounded-full bg-[#F1B163]" />
          <span className="text-xs">Thriving</span>
        </div>
      </div>
      <div ref={graph_container} id="graph_container" className="-mt-4" />
      <div className="flex flex-col justify-center items-center -mt-4">
        <Slider
          defaultValue={[0]}
          max={100}
          step={step}
          onValueChange={onValueChange}
        />
        <span className="text-sm mt-2">Historical Petal</span>
      </div>
    </div>
  );
};

export default memo(RoseGraph);
