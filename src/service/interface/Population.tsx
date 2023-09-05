export interface Population {
    series: PopulationSeries[],
    population: PopulationType[]|any,
    totalPopulation: any,
    categories: any,
    headers:any
 }
 
 export interface PopulationType {
    "ageGroup": string,
    "male": number,
    "female": number
    "malePer"?: any
    "femalePer"?: any
 }
 
 export interface PopulationSeries{
    "name": string,
    "data": any[]
 }