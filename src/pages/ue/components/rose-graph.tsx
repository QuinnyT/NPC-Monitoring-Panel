import { useEffect, useRef } from "react"
import { Chart } from '@antv/g2';
import { useRedis } from "@/hooks/use-redis";

export const RoseGraph = ({ isDisplay }: { isDisplay: boolean }) => {
  const { redisData } = useRedis()


  // todo migrate to zustand state
  const rose = useRef<number[]>([])
  const graph_container = useRef<any>(null)
  const graph = useRef<any>()
  const graph_color = useRef<string[]>(['#bababa', '#d2c7a3', '#a3c9d2'])

  useEffect(() => {
    redisData.map(r => rose.current.push(r.uv_rose))
    console.log(rose.current);

  }, [])

  useEffect(() => {
    /**
    * A recreation of this demo: https://observablehq.com/@d3/radial-stacked-bar-chart
    */
    if (!graph_container.current) return

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
      width: 250,
      height: 250,
    });

    graph.current = chart

    chart.coordinate({ type: 'polar', outerRadius: 0.9 });

    chart
      .interval()
      .transform({ type: 'groupX' })
      .data(rose.current)
      .encode('x', 'frame')
      .encode('y', 'uv')
      // .encode('shape', 'triangle')
      .axis('x', { line: true, labelFilter: () => false, lineStroke: "#fff", lineLineWidth: "2", tickStroke: "#fff" })
      .axis('y', {
        title: false,
        label: false
      })
      .style('fill', (datum: any) => {
        const val = datum
        if (val > 0 && val < 30) {
          return graph_color.current[0];
        } else if (val > 30 && val < 130) {
          return graph_color.current[1];
        } else {
          return graph_color.current[2];
        }
      })
    // .tooltip(false)
    // .animate('enter', { type: 'waveIn' })
    // .tooltip({ channel: 'y', valueFormatter: '~s' });

    chart.render();

    return () => {
      chart.destroy()
    }
  }, [isDisplay])

  return <div ref={graph_container} id="graph_container" />
}