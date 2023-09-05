import httpClient from './api/api';
import { Population, PopulationSeries } from './interface/Population';

interface VisualizeRequest {
    step: string,
    operation: string,
    year: string,

}

export const map = async () => {
    return await httpClient.get(`https://code.highcharts.com/mapdata/countries/sa/sa-all.topo.json`)
}

export const visualize = async (request: VisualizeRequest) => {
    return await httpClient.post(`/api/public/visualize`, request)
}


export const getStep5 =async (year: any) => {

    let request: VisualizeRequest = {
        "step": "1.5",
        "operation": "deathsCodedToInvalidICDCodes",
        "year": year,
    };

    let res: any = await visualize(request);
    let data = res?.data;

    let ageGroup = data.invalidICDCodesByAgeSex.map((r:any) => r.ageGroup);
    let female = data.invalidICDCodesByAgeSex.map((r:any)  => r.female);
    let male = data.invalidICDCodesByAgeSex.map((r:any)  => r.male);
    let total = data.invalidICDCodesByAgeSex.map((r:any)  => r.female + r.male);
    let invalidICDCodesByDeaths = data.invalidICDCodesByDeaths;

    var totalMaleCount = 0;
    var totalFemaleCount = 0;
    data.invalidICDCodesByAgeSex.forEach((r:any) => {
        totalMaleCount += r.male
    })
    data.invalidICDCodesByAgeSex.forEach((r:any) => {
        totalFemaleCount += r.female
    })
    ageGroup.unshift("Total")
    male.unshift(totalMaleCount)
    female.unshift(totalFemaleCount)
    total.unshift(totalFemaleCount + totalFemaleCount)
    let result = {
        "sex": ageGroup,
        "male": male,
        "female": female,
        "total": total,
    }

    let keys = Object.keys(result);
    let invalidICDCodesByDeathsHeaders = Object.keys(invalidICDCodesByDeaths[0])
    let totalInvalidICDcodesDeath = data.invalidICDCodesByDeaths.map((item:any) => item.deaths).reduce((prev:any, curr:any) => prev + curr, 0);

    let dataSetss: any = {
        icdDeaths: result,
        invalidICDCodesByDeaths: invalidICDCodesByDeaths,
        invalidICDCodesByDeathsHeadrs: invalidICDCodesByDeathsHeaders,
        headers: keys,
        totalInvalidICDcodesDeath:totalInvalidICDcodesDeath
    }
    return dataSetss;
}

export const getStep6 = async(year: any) => {
    let request: VisualizeRequest = {
        "step": "1.6",
        "operation": "icdInconsistentWithAgeSex",
        "year": year,
    };

    let res: any = await visualize(request);
    let data = res?.data;


    let unlikelyDeathByAge = data.unlikelyDeathByAge;
    let invalidICDCodesByCause = data.invalidICDCodesByCause;
  
    let headers = ["ICD Code", "Disease", "Ages", "Number of deaths"];
    let invalidICDCodesByCauseHeaders = [
      "ICD Code",
      "Disease",
      "Sex recorded",
      "Number of deaths",
    ];
    let totalInvalidICDCodesByCause = data.invalidICDCodesByCause.map((item:any) => item.deaths).reduce((prev:any, curr:any) => prev + curr, 0);
    let totalUnlikelyDeathByAge = data.unlikelyDeathByAge.map((item:any) => item.deaths).reduce((prev:any, curr:any) => prev + curr, 0);

    let dataSetss: any = {
      unlikelyDeathByAge: unlikelyDeathByAge,
      headers: headers,
      invalidICDCodesByCauseHeaders: invalidICDCodesByCauseHeaders,
      invalidICDCodesByCause: invalidICDCodesByCause,
      totalInvalidICDCodesByCause:totalInvalidICDCodesByCause,
      totalUnlikelyDeathByAge:totalUnlikelyDeathByAge,
    };
    return dataSetss;
  };

export const getStep7 = async (year: any) => {
    let request: VisualizeRequest = {
        "step": "1.7",
        "operation": "invalidICDCodeForCause",
        "year": year,
    };

    let res: any = await visualize(request);
    let data = res?.data?.invalidICDCodesByCause;
    let totalInvalidICDCodesByCause = data.map((item:any) => item.deaths).reduce((prev:any, curr:any) => prev + curr, 0);
    let headers = [
        "ICD Code", "Disease",  "Number of deaths"
    ]
    let dataSetss: any = {
        headers: headers,
        data: data,
        totalInvalidICDCodesByCause:totalInvalidICDCodesByCause
    }
    return dataSetss;
}

export const getStep4 = async(year:any) => {

    let request: VisualizeRequest = {
        "step": "1.4",
        "operation": "ageSpecificMortalityPer100k",
        "year": year,
    };

    let res: any = await visualize(request);
    let data = res?.data?.mortalityRatePer100k;

    let male = data.map((popul:any) => popul.male);
    let female = data.map((popul:any) => popul.female);
    let categories = data.map((popul:any) => popul.ageGroup);
    var chart4Population = data[0];
 
    const series: PopulationSeries[] = [
       {
          name: "Male",
          data: male.slice(1)
       },
       {
          name: "Female",
          data: female.slice(1)
       }
    ]
 
    let headers =[
        "Age group",	"Male",	"Female"

    ]
    const dataSet: Population = {
       series: series,
       population: data,
       categories: categories,
       totalPopulation: chart4Population,
       headers: headers,
    }
    return dataSet;
 }

export const getStep3 = async (year: any) => {

    let request: VisualizeRequest = {
        "step": "1.3",
        "operation": "fetchDeathDistribution",
        "year": year,
    };

    let res: any = await visualize(request);
    let chart3 = res?.data?.deathDistribution;
    let male = chart3.map((popul: any) => popul.male);
    let female = chart3.map((popul: any) => popul.female);
    let categories = chart3.map((popul: any) => popul.ageGroup);
    var chart3Population = chart3[0];

    const series: PopulationSeries[] = [
        {
            name: "Male",
            data: male.slice(1)
        },
        {
            name: "Female",
            data: female.slice(1)
        }
    ]

    chart3.forEach((element: any) => {
        element["malePer"] = ((100 * Math.abs(element.male)) / chart3Population.male).toFixed(2)
        element["femalePer"] = ((100 * Math.abs(element.female)) / chart3Population.female).toFixed(2);
    });

    let headers = [
        "Age group", "Male", "Female", "Male", "Female"
    ]

    const dataSet: Population = {
        series: series,
        population: chart3,
        categories: categories,
        totalPopulation: chart3Population,
        headers: headers,
    }
    return dataSet;
}

export const getStep2 = async (year: any) => {
    let request: VisualizeRequest = {
        "step": "1.2",
        "operation": "fetchDeathsGroupByAgeGroupBySex",
        "year": year,
    };

    let res: any = await visualize(request);
    let deathsAllCauses = res?.data?.deathsAllCauses;
    let deathsAllOtherCodes = res?.data?.deathsAllOtherCodes;
    var keys = Object.keys(deathsAllCauses[0]);
    const dataSetss: any = {
        deathsAllCauses: deathsAllCauses,
        deathsAllOtherCodes: deathsAllOtherCodes,
        headers: keys
    }
    return dataSetss;

}


export const getStep1 = async (year: any) => {
    let request: VisualizeRequest = {
        "step": "1.1",
        "operation": "fetchPopulationGroupByAgeGroupBySex",
        "year": year,
    };

    const populationData = await visualize(request);
    let male = populationData.data.population.map((popul: any) => -popul.male);
    let female = populationData.data.population.map((popul: any) => popul.female);
    let categories = populationData.data.population.map((popul: any) => -popul.ageGroup);
    const series: PopulationSeries[] = [
        {
            name: "Male",
            data: male.slice(1)
        },
        {
            name: "Female",
            data: female.slice(1)
        }]

    let header =["Age group",	"Male",	"Female"]
    const dataSet: Population = {
        series: series,
        population: populationData.data.population,
        categories: categories,
        totalPopulation: populationData.data.population[0],
        headers: header
    }
    return dataSet;
}