import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Chart } from '@antv/g2';
import { useRedis } from "@/hooks/use-redis";
import { useIntervalAsync } from "@/hooks/use-intervalAsync";
import { getTargetData } from "@/lib/api";
import { Slider } from "@/components/ui/slider"

const RoseGraph = ({ isDisplay }: { isDisplay: boolean }) => {
  const { redisData, setRedisData, targetId } = useRedis()


  // todo migrate to zustand state
  const rose = useRef<any[]>([])
  const graph_container = useRef<any>(null)
  const graph = useRef<any>()
  const graph_color = useRef<string[]>(['#d2d2d2', '#d29c5d', '#3787d2'])
  const index = useRef<number>(10)
  const [step, setStep] = useState<number>(1)


  const handleGraphInit = async () => {
    if (!redisData) return
    rose.current = []
    // redisData.map((r, index) => {
    //   if (index > 9) return
    //   return rose.current.push({ ...r, frame: r.game_info.frame })
    // })
    // let index = 1
    // for (const i of redisData) {
    //   index++;
    //   if (index < 10) {
    //     rose.current.push({ ...i, frame: i.game_info.frame, uv_rose: i.uv_rose + Math.random() * 100 })
    //   } else {
    //     return Promise.resolve(1)
    //   }
    // }
    // redisData.map((r, index) => {
    //   if (index < 10) {
    //     return rose.current.push({ ...r, frame: r.game_info.frame, uv_rose: r.uv_rose + Math.random() * 100 })
    //   }
    // })
  }

  useEffect(() => {
    handleGraphInit()
  }, [isDisplay, redisData])

  useEffect(() => {
    /**
    * A recreation of this demo: https://observablehq.com/@d3/radial-stacked-bar-chart
    */
    if (!graph_container.current || !redisData) return

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
      width: 240,
      height: 240,
    });

    graph.current = chart

    chart.coordinate({ type: 'polar', outerRadius: 0.9 });

    chart
      .interval()
      .transform({ type: 'groupX', x: "first" })
      .data({
        type: 'inline',
        value: redisData,
        transform: [{
          type: 'map',
          callback: (datum: any) => {
            return { ...datum, frame: datum.game_info.frame }
          },
        }],
      })
      .encode({ x: 'frame', y: 'uv_rose' })
      .axis('x', {
        line: true, label: true, labelFill: "#fff", lineStroke: "#fff", lineLineWidth: "2", tickStroke: "#fff", title: false
      })
      .axis('y', {
        tickFilter: (datum, index, data, Vector) => {
          console.log(datum, index, data, Vector);
          return true
        },
        label: false,
        title: false
      })
      .style('fill', (datum: any) => {
        const { uv_rose } = datum
        const val = uv_rose * 1 + (Math.random() * 10)

        if (val > 0 && val < 30) {
          return graph_color.current[0];
        } else if (val >= 30 && val < 130) {
          return graph_color.current[1];
        } else {
          return graph_color.current[2];
        }
      })
      // .style('fillOpacity', 0.8)
      // .legend({ color: { layout: { flexDirection: 'column', justifyContent: "center" }, 'position': "bottom" } })
      // .scrollbar({
      //   'x': {
      //     value: 1, ratio: 0.7
      //   }
      // });
      .tooltip(false)
    // .animate('enter', { type: 'waveIn' })
    // .tooltip({ channel: 'y', valueFormatter: '~s' });

    chart.render();

    return () => {
      chart.destroy()
    }
  }, [isDisplay])

  const handleRender = useCallback((data: any) => {
    if (data.length <= 10) {
      data = data.map((i: any) => ({ ...i, frame: i.game_info.frame }))
      setRedisData(data);
    } else {
      if (data.length > 110) {

      } else {
        setStep(Number((100 / (data.length - 10)).toFixed(1)))
      }
      data = data.slice(data.length - index.current).map((i: any) => ({ ...i, frame: i.game_info.frame }))
      // data = data.map((i: any) => ({ ...i, frame: i.game_info.frame }))
      setRedisData(data);
    }
    window.requestIdleCallback(() => {
      graph.current.changeData(data);
    })
  }, [index.current])

  const handleRequest = useCallback(async () => {
    let { data } = await getTargetData(targetId)
    console.log("fetch", data);
    handleRender(data)
  }, [targetId])

  useIntervalAsync(handleRequest, 1000)

  let preNum = 0;
  const onValueChange = useCallback((value: number[]) => {
    if (preNum < value[0]) {
      index.current += 1
    } else {
      index.current -= 1
    }
    preNum = value[0]
  }, [preNum])

  return <div className="relative">
    <div ref={graph_container} id="graph_container" />
    <div className="flex flex-col justify-center items-center">
      <Slider defaultValue={[0]} max={100} step={step} onValueChange={onValueChange} />
      <span className=" text-sm mt-1">Historical Petal</span>
    </div>
  </div>
}

export default memo(RoseGraph)