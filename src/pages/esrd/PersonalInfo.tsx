import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import arabic from "react-date-object/calendars/arabic";
import gregorian from "react-date-object/calendars/gregorian";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import ErrorText from "../../components/ErrorText";
import MaskTextField from "../../components/MaskTextField";
import { CustomInput } from "../../components/MultiDatePicker";
import Radio from "../../components/Radio";
import SearchSelect from "../../components/SearchSelect";
import SelectField from "../../components/SelectField";
import TextField from "../../components/TextField";
import { DATE_FORMAT } from "../../constant/Constant";
import {
  DATE_TYPE, EDUCATION,
  GENDER, HAJ_OMRA, ID_TYPE, MARTIAL_STATUS, REGIONS,
  RELIGION,
  RESIDENTAL_STATUS, YES_NO
} from "../../data/DataPopulator";
import { getCountries, getNationalities } from "../../service/edrsService";
import edrsForm from "./state/EdrsModel";


export default function PersonalInfo(props: any) {
  const { t } = useTranslation();
  const [date, setDate] = useState<any>();
  const { setFieldValue, getFieldProps } = useFormikContext();
  const { formField } = edrsForm;
  const [field,meta] = useField<any>(props.formField);
  const [isLessThenOneMonth, seIsLessThenOneMonth] = useState<any>();
  const [isLessThenOneYear, seIsLessThenOneYear] = useState<any>();



  const handleDateChange = (date: any) => {
    setFieldValue(
      formField.birthDate,
      date?.toString()
    );
    const diffTime = Math.abs(new Date().getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <=1) {
      seIsLessThenOneMonth(true);
      seIsLessThenOneYear(false);
    }else
    if (diffDays > 1 && diffDays < 365) {
      seIsLessThenOneMonth(false);
      seIsLessThenOneYear(true);
    }else{
      seIsLessThenOneMonth(false);
      seIsLessThenOneYear(false);
    }

  };

  useEffect(() => {
    setDate(new Date(field.value[formField.birthDate]));
  }, []);

  return (
    <div className="flex flex-wrap -mx-4 overflow-hidden sm:-mx-2  lg:-mx-2 xl:-mx-2 w-full ">
      <div className="form-col">
        <TextField
          name={formField.firstName}
          label={t("1")}
      
        />
      </div>

      <div className="form-col">
        <TextField name={formField.middleName} label={t("1A")} />
      </div>

      <div className="form-col">
        <TextField
          name={formField.grandfatherName}
          label={t("1B")}
        />
      </div>

      <div className="form-col">
        <TextField name={formField.familyName} label={t("1C")} />
      </div>

      <div className="form-col">
        <Radio
          name={formField.sex}
          label={t("3")}
          options={GENDER}
        />
      </div>

      <div className="form-col overflow-visible">
        <SearchSelect
          label={t("2")}
          name={formField.decedent_nationality}
          options={getNationalities()}
        />
      </div>

      <div className="form-col">
        <SelectField
          name={formField.decedent_religion}
          label={t("4")}
          options={RELIGION}
        />
      </div>

      <div className="form-col">
        <SelectField
          name={formField.idType}
          label={t("4A")}
          options={ID_TYPE}
        />
      </div>

      <div className="form-col">
        <TextField name={formField.idNumber} label={t("4B")} />
      </div>

      <div
        className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
      >
        <span>Birth Details</span>
      </div>
      <div className="form-col ">
          <MaskTextField
            mask="99/99"
            name={formField.days}
            label={t("5C")}
          />

        </div>
    
        <div className="form-col">
          <MaskTextField
            mask="99/99"
            name={formField.minutes}
            label={t("5B")}
          />

        </div>
      <div className="form-col w-full md:w-60">
        
        <div className="flex rounded-md shadow-sm">
          <div className="w-full">
            <label
              className="block   tracking-wide text-gray-700 text-md font-medium "
            >
              {t("6A")}
            </label>
            <DatePicker
              format={DATE_FORMAT}
              calendar={
                field.value[formField.birthDateType] ===
                  "A"
                  ? arabic
                  : gregorian
              }
              render={
                <CustomInput
                  name="date"
                  disabled={getFieldProps("isPreview").value}
                  className=" w-full md:w-28 rounded-r-none"
                />
              }
              value={date}
              onChange={(date: any) => {
                setDate(date);
                handleDateChange(date);
              }}
            />
          </div>

          <SelectField
            name={formField.birthDateType}
            label="*"
            className=" w-36 md:w-28 rounded-l-none bg-gray-100 mt-0"
            options={DATE_TYPE}
          />
        </div>
        {meta &&  meta?.error && getDateError(meta.error)}
      </div>
       
     

      <div className="w-full flex flex-col md:flex-row">
        <div className="form-col overflow-visible">
          <SearchSelect
            label={t("7A")}
            name={formField.birthPlace}
            options={getCountries()}
          />
        </div>
        <div className="form-col">
          <TextField
            name={formField.birthRegion}
            label={t("7AB")}
          />
        </div>
        <div className="form-col">
          <TextField
            name={formField.birthCity}
            label={t("7AC")}
          />
        </div>
      </div>

      <div
        className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
      >
        <span>Address</span>
      </div>

      <div className="form-col overflow-visible">
        <SearchSelect
          label={t("8A")}
          name={formField.addressCountry}
          options={getCountries()}
        />
      </div>

      <div className="form-col">
        <SelectField
          label={t("8B")}
          name={formField.decedentRegion}
          options={REGIONS}
        />
      </div>

      <div className="form-col">
        <TextField
          name={formField.governorates}
          label={t("8C")}
        />
      </div>

      <div className="form-col overflow-visible">
        <TextField
          name={formField.addressCity}
          label={t("8D")}
        />
      </div>

      <div className="form-col">
        <TextField
          name={formField.decedent_village}
          label={t("8E")}
        />
      </div>

      <div className="form-col">
        <TextField
          name={formField.streetAndNum}
          label={t("8F")}
        />
      </div>

      <div className="form-col">
        <TextField
          type="number"
          name={formField.decedent_zip}
          label={t("8G")}
        />
      </div>

      <div className="form-col">
        <Radio
          name={formField.insideCityLimits}
          label={t("8H")}
          options={YES_NO}
        />

      </div>

      <div className="form-col">
        <SelectField
          name={formField.maritalStatus}
          label={t("9")}
          options={MARTIAL_STATUS}
        />
      </div>
      <div
        className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
      >
        <span>Other Details</span>
      </div>

      <div className="form-col">
        <TextField name={formField.fatherName} label={t("10")} />
      </div>
      <div className="form-col">
        <TextField name={formField.motherName} label={t("11")} />
      </div>

      <div className="form-col">
        <SelectField
          name={formField.education}
          label={t("12")}
          options={EDUCATION}
        />
      </div>

      <div className="form-col">
        <Radio
          name={formField.hajOmraStatus}
          label={t("14")}
          options={HAJ_OMRA}
        />
      </div>
      <div className="my-4 px-4 w-full overflow-hidden sm:my-2 sm:px-2  sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/24">
        <Radio
          name={formField.residencyStatus}
          label={t("15")}
          options={RESIDENTAL_STATUS}
        />
      </div>
      <div className="my-4 px-4 w-full overflow-hidden sm:my-2 sm:px-2  sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/2">
        <TextField
          type="textArea"
          name={formField.decedentOccupation}
          label={t("13")}
        />
      </div>

      <div
        className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
      >
        <span>Informant’s Details</span>
      </div>
      <div className="form-col">
        <TextField
          name={formField.informantName}
          label={t("16A")}
        />
      </div>

      <div className="form-col">
        <MaskTextField
          mask="+999 99 999 9999"
          maskChar=" "
          defaultValue="966"
          name={formField.informantPhone}
          label={t("16B")}
        />
      </div>
      <div className="form-col">
        <TextField
          name={formField.informantRelationship}
          label={t("16C")}
        />
      </div>

      <div className="form-col">
        <TextField
          name={formField.informantAddress}
          label={t("16D")}
        />
      </div>
      <div className="form-col">
        <TextField
          name={formField.streetNo}
          label={t("16DA")}
        />
      </div>
      <div className="form-col">
        <TextField
          name={formField.informantCity}
          label={t("16DB")}
        />
      </div>
      <div className="form-col">
        <TextField
          name={formField.informantRegion}
          label={t("16DC")}
        />
      </div>
    </div>
  );
}

const getDateError = (error:any)=>{
  return <ErrorText msg={error["birthDate"]} />;

}