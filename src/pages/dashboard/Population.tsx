


import Highcharts, { Chart, Chart as HighchartsChart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Suspense, useCallback, useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import Loader from "../../components/Loader";
import { PopulationType } from "../../service/interface/Population";
import { Tooltip } from "./Tooltip";

const PupulationCharts: React.FC<any> = ({ data, header,headerRow, options, isPerRequried = true,isPopulatopnChart=false }: any) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const [chartOptions, setOptions] = useState<any>();
  const [totalPopulation, setTotalPopulation] = useState<any>();
  const [population, setPopulation] = useState<any>();
  const [isErorr, setErorr] = useState<boolean>();

  useEffect(() => {
    setErorr(data ===undefined);
    setPopulation(data?.population)
    setTotalPopulation(data?.totalPopulation);
    setOptions({
      ...options,
      "series": data?.series
    })
    console.log(data?.series);
  }, [data,options])


  const callback = useCallback((chart: HighchartsChart) => {
    setChart(chart);
  }, []);

  if (isErorr) {
    return <ErrorPage />
  }
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex shadow-md bg-white px-4 flex-wrap -mx-px overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-2 xl:-mx-1">
        <div className="w-full my-px px-px  overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-1 md:px-1 lg:my-2 lg:px-2 xl:my-1 xl:px-1">
          <div className="w-full text-black py-4 text-sm  font-medium">{header}</div>
          <div id="chart-data" className="flex flex-col max-h-96  w-full">
            <div className="flex-grow overflow-auto">
              <table className="relative w-full ">
                <thead className="bg-white">
                  {headerRow}
                  <tr className="bg-white">
                    {data?.headers?.map((h: any) => <th className="sticky top-0 table-header">{h}</th>)}

                  </tr>
                </thead>
                <tbody className="divide-y ">
                  {population?.map((p: PopulationType) => (
                    <tr>
                      <td className="table-td-text">{p.ageGroup}</td>
                      <td className="table-td-text">{p.female}</td>
                      <td className="table-td-text">{p.male}</td>
                      {p.femalePer && <td className="table-td-text">{p.femalePer}</td>} 
                      {p.malePer && <td className="table-td-text">{p.malePer}</td>} 
                    </tr>

                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <div className="w-full my-px px-px  mt-8 md:mt-0 overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-1 md:px-1 lg:my-2 lg:px-2 xl:my-1 xl:px-1">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            callback={callback}
          />
          <Tooltip
            isPopulatopnChart={isPopulatopnChart}
            isPerRequried={isPerRequried}
            totalPopulation={totalPopulation} chart={chart} />
        </div>
      </div>


    </Suspense>
  )

}


export default PupulationCharts;