import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import { map } from '../../service/edrsChartService';

import Highcharts, { Chart, Chart as HighchartsChart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
require('highcharts/modules/map')(Highcharts);

const data = [
  ['sa-4293', 10], ['sa-tb', 11], ['sa-jz', 12], ['sa-nj', 13],
  ['sa-ri', 14], ['sa-md', 15], ['sa-ha', 16], ['sa-qs', 17],
  ['sa-hs', 18], ['sa-jf', 19], ['sa-sh', 20], ['sa-ba', 21],
  ['sa-as', 22], ['sa-mk', 23]
];
export const options = {
 

title: {
    text: 'Saudi Arabia'
},

subtitle: {
    text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/sa/sa-all.topo.json">Saudi Arabia</a>'
},

mapNavigation: {
    enabled: true,
    buttonOptions: {
        verticalAlign: 'left'
    }
},

colorAxis: {
    min: 0
},

series: [{
    data: data,
    name: 'Random data',
    states: {
        hover: {
            color: 'green'
        }
    },
    dataLabels: {
        enabled: true,
        format: '{point.name}'
    }
}]
};



export default function HomePage() {
  const [isLoading, setLoading] = useState<boolean>();
  const [chartOptions, setOptions] = useState<any>();

  useEffect(() => {
    setLoading(true);
    map().then((res: any) => {
      setOptions({
        ...options,
        chart: {
          map: res.data
      },
      })
      setLoading(false)
    }).catch((err: any) => {
      setLoading(false)
    });
  }, []);



  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full bg-white justify-items-center text-center">
    <HighchartsReact
    options={chartOptions}
    constructorType={'mapChart'}
    highcharts={Highcharts}
  />
  </div>
  )
}
