<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import { scaleBand, scaleLinear } from 'd3-scale';
  import ChartContainer from '../core/ChartContainer.svelte';
  import ChartAxis from '../core/ChartAxis.svelte';
  import Bars from '../layers/Bars.svelte';

  interface DataPoint {
    label: string;
    value: number;
  }

  interface Props {
    data: DataPoint[];
    title?: string;
    width?: number;
    height?: number;
  }

  let {
    data = [],
    title = 'Chart',
    width = 600,
    height = 400
  }: Props = $props();

  const xScale = scaleBand().padding(0.1);
  const yScale = scaleLinear();
</script>

<ChartContainer {title} {width} {height}>
  <LayerCake
    padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
    x="label"
    y="value"
    xScale={xScale}
    yScale={yScale}
    data={data}
  >
    <Svg>
      <ChartAxis type="x" position="bottom" />
      <ChartAxis type="y" position="left" gridLines={true} />
      <Bars animated={true} />
    </Svg>
  </LayerCake>
</ChartContainer>

