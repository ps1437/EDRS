const categories = [
    '0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85-89', '90-94',
    '95-99', '100 + '
  ];

  
export const negativeBartChartOptions = {
    chart: {
      type: "bar",
    },
    colors: ["#eb7134", "#34b7eb"],
    title: {
      text: "Population pyramid",
    },
    accessibility: {
      point: {
        valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
      },
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      title: {
        text: "Age group",
      },
      labels: {
        step: 1
      },
      accessibility: {
        description: 'Age (male)'
      }
    }, { // mirror axis on right side
      opposite: true,
      reversed: false,
      categories: categories,
      linkedTo: 0,
      labels: {
        step: 1
      },
      accessibility: {
        description: 'Age (female)'
      }
    }],
    yAxis: {
      title: {
        text: "% of Population",
      },
  
      accessibility: {
        description: "Percentage population",
        rangeDescription: "Range: 0 to 5%",
      },
    },
    tooltip: {
      style: {
        pointerEvents: "auto",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
  };
  
  export const barChartOptions = {
    chart: {
      type: "column",
    },
    colors: ["#eb7134", "#34b7eb"],
    title: {
      text: "Number of deaths, by age and sex",
    },
    accessibility: {
      point: {
        valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of deaths, by age and sex'
      }
    }
    , xAxis: {
      categories: categories,
      title: {
        text: 'Age group'
      },
      crosshair: true
    },
  
  
    tooltip: {
      style: {
        pointerEvents: "auto",
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
  };
  
  export const lineChartOptions = {
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    colors: ["#eb7134", "#34b7eb"],
    title: {
      text: "Age-specific mortality rate per 100,000",
    },
    accessibility: {
      point: {
        valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Deaths per 100 000 population (logarithmic scale) '
      }
    },
    xAxis: {
      categories: categories,
      crosshair: true
    },
    tooltip: {
      style: {
        pointerEvents: "auto",
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
  };
  