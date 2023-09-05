import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import AsyncSelect from "react-select/async";
import { InfoIcon } from "../../assets/Icon";
import MaskTextField from "../../components/MaskTextField";
import MultiDatePicker from "../../components/MultiDatePicker";
import Radio from "../../components/Radio";
import { styles } from "../../components/SearchSelect";
import TextField from "../../components/TextField";
import { DATE_TIME_FORMAT } from "../../constant/Constant";
import {
  DEATH_PLACE,
  DEATH_PLACE_HOSPITAL,
  DEATH_PLACE_NOT_HOSPITAL,
  YES_NO_UNK
} from "../../data/DataPopulator";
import { getICDCodes } from "../../service/edrsService";
import edrsForm from "./state/EdrsModel";

export default function DeathDetails(props: any) {
  const { t } = useTranslation();
  const [inputValue, setValue] = useState("");
  const { formField } = edrsForm;
  const { setFieldValue, getFieldProps } = useFormikContext();
  const [field] = useField(props);

  const handleInputChange = (value: string) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (name: any, selectedOption: any) => {
    setFieldValue(name, selectedOption);
  };

  const loadOptions = (inputValue: string) => {
    return getICDCodes(inputValue).then((res) => res.data);
  };
  return (
    <div className="flex flex-col w-full ">
      <Radio
        name={formField.placeOfDeathType}
        label={t("17")}
        options={DEATH_PLACE}
      />
      {field.value[formField.placeOfDeathType] === "1" && (
        <>
          <Radio
            name={formField.deathLocation}
            options={DEATH_PLACE_HOSPITAL}
          />
          <div className="w-full md:w-1/3 my-2 ">
            <TextField
              name={formField.deathLocationDepartment}
              label={t("17AA")}
              classnamelabel="text-sm font-normal text-green"
            />
          </div>
        </>
      )}

      {field.value[formField.placeOfDeathType] === "0" && (
        <>
          <Radio
            name={formField.deathLocation}
            options={DEATH_PLACE_NOT_HOSPITAL}
          />

          {field.value[formField.deathLocation] === "5" && (
            <div className="flex w-full my-2  flex-col md:flex-row">
              <div className="mx-4">
                <TextField
                  name={formField.deathHospitalName}
                  label={t("17BA")}
                  classnamelabel="text-sm font-normal text-green"
                />
              </div>
              <div className="mx-4">
                <TextField
                  name={formField.deathHospitalCountry}
                  label={t("17BB")}
                  classnamelabel="text-sm font-normal text-green"
                />
              </div>
              <div className="mx-4">
                <TextField
                  name={formField.deathHospitalRegion}
                  label={t("17BC")}
                  classnamelabel="text-sm font-normal text-green"
                />
              </div>
              <div className="mx-4">
                <TextField
                  name={formField.deathHospitalGovernorate}
                  label={t("17BD")}
                  classnamelabel="text-sm font-normal text-green"
                />
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex md:space-x-7 my-2 space-y-3 md:space-y-0 flex-col md:flex-row">
        <MultiDatePicker
          format={DATE_TIME_FORMAT}
          name={formField.deathReportDate}
          plugins={[<TimePicker position="bottom" />]}
          label={t("18")}
        />
        <MultiDatePicker
          format={DATE_TIME_FORMAT}
          name={formField.deathDate}
          plugins={[<TimePicker position="bottom" />]}
          label={t("20")}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row   my-2">
        <div>
          <Radio
            name={formField.isSmoker}
            label={t("22A")}
            options={YES_NO_UNK}
          />
        </div>
        <div className="mx-4 mt-4 md:mt-0">
          {field.value[formField.isSmoker] === "1" && (
            <MaskTextField
              name={formField.smokeDuration}
              label={t("22AA")}
              type="number"
            />
          )}
        </div>

        {/* FRAME (A) CAUSE OF DEATH */}
      </div>
      <div
        className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
      >
        <span>{t("23-HEADER")}</span>
      </div>
      <div className="flex  justify-center items-center flex-col md:flex-row">
        <div className="md:w-1/2  md:px-4">
          <label
            className="  tracking-wide  text-md font-medium"
            htmlFor="grid-state"
          >
            <span className={`text-gray-700 `}>{t("23")}</span>

            <div className="flex text-sm py-4">
              <a
                href="https://icd.who.int/ct11/icd11_mms/en/release"
                rel="noreferrer"
                title="ICD-11 Coding Tool Mortality and Morbidity Statistics"
                target="_blank"
                className="cursor-pointer underline"
              >
                <div className="flex">
                  Click here for more info <InfoIcon />
                </div>
              </a>
            </div>
          </label>
        </div>
        <div className="w-full md:w-1/2 md:px-4 ">
          <label
            className="  tracking-wide  text-md font-medium"
            htmlFor="grid-state"
          >
            <span className={`text-gray-700 `}>A</span>
          </label>

          <AsyncSelect
            isDisabled={getFieldProps("isPreview").value}
            cacheOptions
            styles={styles}
            defaultOptions
            value={field.value[formField.causeOfDeathA]}
            getOptionLabel={(e: any) => e.label}
            getOptionValue={(e: any) => e.icd_code}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={(c) => handleChange(formField.causeOfDeathA, c)}
          />
          <label
            className="  tracking-wide  text-md font-medium"
            htmlFor="grid-state"
          >
            <span className={`text-gray-700 `}>B</span>
          </label>

          <AsyncSelect
            isDisabled={getFieldProps("isPreview").value}
            styles={styles}
            cacheOptions
            defaultOptions
            value={field.value[formField.causeOfDeathB]}
            getOptionLabel={(e: any) => e.label}
            getOptionValue={(e: any) => e.icd_code}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={(c) => handleChange(formField.causeOfDeathB, c)}
          />
          <label
            className="  tracking-wide  text-md font-medium"
            htmlFor="grid-state"
          >
            <span className={`text-gray-700 `}>C</span>
          </label>
          <AsyncSelect
            isDisabled={getFieldProps("isPreview").value}
            styles={styles}
            menuPlacement="top"
            cacheOptions
            defaultOptions
            value={field.value[formField.causeOfDeathC]}
            getOptionLabel={(e: any) => e.label}
            getOptionValue={(e: any) => e.icd_code}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={(c) => handleChange(formField.causeOfDeathC, c)}
          />

          <label
            className="  tracking-wide  text-md font-medium"
            htmlFor="grid-state"
          >
            <span className={`text-gray-700 `}>D</span>
          </label>
          <AsyncSelect
            isDisabled={getFieldProps("isPreview").value}
            menuPlacement="top"
            styles={styles}
            cacheOptions
            defaultOptions
            value={field.value[formField.causeOfDeathD]}
            getOptionLabel={(e: any) => e.label}
            getOptionValue={(e: any) => e.icd_code}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={(c) => handleChange(formField.causeOfDeathD, c)}
          />
        </div>
      </div>
    </div>
  );
}
