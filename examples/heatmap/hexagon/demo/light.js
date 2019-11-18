import { HeatMapHexagonLayer, HeatMapGrid3dLayer } from '@l7/layers';
import { Scene } from '@l7/scene';
const scene = new Scene({
  id: 'map',
  style: 'dark',
  pitch: 43,
  center: [120.13383079335335,29.651873105004427],
  zoom: 7.068989519212174,
  type: 'mapbox',
});


window.mapScene = scene;

fetch(
  'https://gw.alipayobjects.com/os/basement_prod/a1a8158d-6fe3-424b-8e50-694ccf61c4d7.csv',
)
  .then((res) => res.text())
  .then((data) => {
    const layer = new HeatMapGrid3dLayer({})
      .source(data, {

        parser:{
           type:'csv',
            x:'lng',
            y:'lat',
        },
        transforms: [
          {
            type: 'hexagon',
            size: 2500,
            field: 'v',
            method: 'sum',
          },
        ],
      })
      .size('sum', (sum)=>{
        return sum * 200;
      })
      .shape('hexagon')
      .style({
        coverage: 0.8,
        angle: 0,
        opacity: 1.0,
      })
      .color(
        'sum',
        [
          '#094D4A', '#146968',
          '#1D7F7E', '#289899',
          '#34B6B7', '#4AC5AF',
          '#5FD3A6', '#7BE39E',
          '#A1EDB8', '#C3F9CC',
          '#DEFAC0', '#ECFFB1'
        ]
      );
    scene.addLayer(layer);

  });