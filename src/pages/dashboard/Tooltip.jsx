import { useEffect, useState } from "react";

export const Tooltip = ({ chart, totalPopulation, isPerRequried = true ,isPopulatopnChart =false }) => {
  const [context, setContext] = useState(null);
  useEffect(() => {
    if (chart) {
      const formatter = function () {
        setContext(this);

        const data = isPerRequried
          ? "Population:" +
            Math.abs(this.point.y) +
            "<br/>" +
            "Percentage:" +
            (
              (100 * Math.abs(this.point.y)) /
              totalPopulation[this.series.name.toLowerCase()]
            ).toFixed(2) +
            "%"
          : "";

        return (
          "<b>" +
          this.series.name +
          ", age " +
          this.point.category +
          "</b><br/>" +
          data
        );
      };

      var chartYaxis = null;
      if(isPopulatopnChart){
        chartYaxis =   function () {
            return Math.abs(this.value)/1000000   + '%';
          }
      };
      chart.update({
        tooltip: {
          formatter,
          useHTML: true,
        },
        yAxis:{
            labels: {
                formatter:chartYaxis
              }
        }
     
      });
    }
  }, [chart]);

  return <></>;
};
