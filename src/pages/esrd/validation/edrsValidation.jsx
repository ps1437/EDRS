import * as Yup from "yup";
import edrsForm from "../state/EdrsModel";

const {
  formField: {
    firstName,
    familyName,
    decedent_nationality,
    sex,
    smokeDuration,
    ageOfMother,
    numberOfGestationalWeeks,
    decedent_religion,
    decedent_zip,
    infantWeightAtBirthInGrams
  },
} = edrsForm;

//YUP +
export default [

  Yup.object().shape({
    [firstName]: Yup.string().required("First Name is required"),
    [familyName]: Yup.string().required("Family Name is required"),
    [decedent_nationality]: Yup.string().required("Nationality is required"),
    [sex]: Yup.string().required("Gender is required"),
    [decedent_religion]: Yup.string().required("Religion is required"),
    [decedent_zip]:Yup.string().max(11, 'Must be less then or equal to 11 digits'),

  }),

  Yup.object().shape({
    [smokeDuration]: Yup.number().max(100,"Smoker Duration must be less than or equal to 100"),
  }),

  Yup.object().shape({
    [infantWeightAtBirthInGrams]: Yup.number().max(20000,"Please Enter a valid weight"),
    [ageOfMother]: Yup.number().max(150,"Please Enter a valid Mother age"),
    [numberOfGestationalWeeks]: Yup.number().max(1000,"Pleas Enter a valid Gestational weeks")
   
  }),
];
