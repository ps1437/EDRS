import { City, Country, State } from 'country-state-city';
import { NATIONALITIES } from '../data/nationalities';
import httpClient from './api/api';

export const getICDCodes = async (searchValue: string | undefined) => {
   return await httpClient.get(`/api/public/findICD10Matches?query=${searchValue}&limit=30`)
}

const getBirthPlace= (values:any)=>{
   
  var birthPlace = null;
   if(values?.birthPlace !== undefined){
      birthPlace=birthPlace + values?.birthPlace +" "
   }
   if(values?.birthRegion !== undefined){
      birthPlace=birthPlace + values?.birthRegion +" "

   }
   if(values?.birthCity !== undefined){
      birthPlace=birthPlace + values?.birthCity +" "
   }
    return birthPlace;
 }
 
export const submitForm = async (values: any) => {
   const request = {
      ...values,
      "birthPlace": getBirthPlace(values),
      "dateOfInjuryOrPoisoning": values?.dateOfInjuryOrPoisoning != undefined &&  values?.dateOfInjuryOrPoisoning+"T00:00:00",
      "birthDate": values?.birthDate ? values?.birthDate + "T00:00:00" : null,
      "surgeryDate": values?.surgeryDate ? values?.surgeryDate + "T00:00:00" : null,
      "causeOfDeathA": values?.causeOfDeathA?.icd_code,
      "causeOfDeathAInfo": values?.causeOfDeathA?.label?.split(" - ")[1],
      "causeOfDeathB": values?.causeOfDeathB?.icd_code,
      "causeOfDeathBInfo": values?.causeOfDeathB?.label?.split(" - ")[1],
      "causeOfDeathC": values?.causeOfDeathC?.icd_code,
      "causeOfDeathCInfo": values?.causeOfDeathC?.label?.split(" - ")[1],
      "causeOfDeathD": values?.causeOfDeathD?.icd_code,
      "causeOfDeathDInfo": values?.causeOfDeathD?.label?.split(" - ")[1],

   };
   return await httpClient.post(`/api/public/add`, request)
}


export const getNationalities = () => {
   const countires = NATIONALITIES.map(name => {
      const container = { label: "", value: "" };
      container["label"] = name;
      container["value"] = name;
      return container;
   })

   return countires;
}
export const getCountries = () => {
   const countires = Country.getAllCountries().map(item => {
      const container = { label: "", value: "" };
      container["label"] = item.name;
      container["value"] = item.isoCode;
      return container;
   })

   return countires;
}

export const getState = () => {
   const states = State.getStatesOfCountry("d").map(item => {
      const container = { label: "", value: "" };
      container["label"] = item.name;
      container["value"] = item.isoCode;
      return container;
   })
   return states;
}

export const getCities = (countyrCode: string) => {
   if (countyrCode) {
      const cities = City.getCitiesOfCountry(countyrCode)?.map(item => {
         const container = { label: "", value: "" };
         container["label"] = item.name;
         container["value"] = item.stateCode;
         return container;
      })


      return cities;
   }
   return null;
}

