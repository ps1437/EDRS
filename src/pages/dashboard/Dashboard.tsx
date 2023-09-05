import { Suspense, useEffect, useState } from "react";
import AccordionLayout from "../../components/AccordionLayout";
import Loader from "../../components/Loader";
import { getStep1, getStep3, getStep4 } from "../../service/edrsChartService";
import { Population } from "../../service/interface/Population";
import { barChartOptions, lineChartOptions, negativeBartChartOptions } from "./config/chartConfig";
import DeathReports from "./DeathReports";
import IcdCodes from "./IcdCodes";
import IcdCodesNot from "./IcdCodesNot";
import IcdDeath from "./IcdDeath";
import PopulationCharts from "./Population";


export const getYears = () => {
  const year = new Date().getFullYear();
  var years = [];
  for (var i = year - 15; i <= year + 3; i++) {
    years.push({ key: i, value: i });
  }
  return years;
};


export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<any>();
  const [chart1, setChart1] = useState<Population>();
  const [chart3, setChart3] = useState<Population>();
  const [chart4, setChart4] = useState<Population>();

  useEffect(() => {
    getStep1(selectedYear).then((data: any) => {
      setChart1(data);
    })
    getStep3(selectedYear).then((data: any) => {
      setChart3(data);
    })
    getStep4(selectedYear).then((data: any) => {
      setChart4(data);
    })
  }, [selectedYear])

  return (
    <Suspense fallback={<Loader />}>
      <div className="max-h-32 justify-end items-center flex ">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={`form-select w-32 bg-gray-50 block rounded max-h-32`}
        >
          {getYears()?.map((object: any) => (
            <option value={object?.key}>{object?.value} </option>
          ))}
        </select>
      </div>

      <AccordionLayout title="1.1 Population">
        <PopulationCharts
          isPopulatopnChart={true}
          data={chart1} header="Population, by age and sex" options={negativeBartChartOptions} />
      </AccordionLayout>

      <AccordionLayout title="1.2 Check: Total number of deaths">
        <DeathReports />
      </AccordionLayout>

      <AccordionLayout title="1.3 Check: Distribution of deaths, by sex and age group">
        <PopulationCharts
          isPerRequried={false}
          headerRow={<Step3Heders />}
          data={chart3} options={barChartOptions} />
      </AccordionLayout>

      <AccordionLayout title="1.4 Check: Age-specific mortality rates, all causes">
        <PopulationCharts
          headerRow={<Step4Heders />}
          isPerRequried={false}
          data={chart4} options={lineChartOptions} />
      </AccordionLayout>

      <AccordionLayout title="1.5 Check: Deaths coded to invalid ICD codes, by sex and age group">
        <IcdDeath />
      </AccordionLayout>

      <AccordionLayout title="1.6 Check: ICD codes inconsistent with age and sex">
        <IcdCodes />
      </AccordionLayout>

      <AccordionLayout title="1.7 Check: ICD codes not to be used for underlying cause of death">
        <IcdCodesNot />
      </AccordionLayout>
    </Suspense>
  );
}

const Step4Heders = () => {
  return <tr className="text-medium font-medium text-center">
    <td >
    </td>
    <td colSpan={2}>
      Age-specific mortality rate per 100,000

    </td >
  </tr>

}


const Step3Heders = () => {
  return <tr className="text-medium font-medium text-center">
    <td >
    </td>
    <td colSpan={2}>
      Number of deaths
    </td>
    <td colSpan={2}>
      Percentage of total deaths
    </td >
  </tr>

}
