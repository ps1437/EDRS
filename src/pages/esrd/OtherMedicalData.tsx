import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MultiDatePicker from "../../components/MultiDatePicker";
import Radio from "../../components/Radio";
import SelectField from "../../components/SelectField";
import TextField from "../../components/TextField";
import {
  DECENT_FEMALE,
  EDUCATION,
  MANNER_OF_DEATH,
  YES_NO,
  YES_NO_UNK
} from "../../data/DataPopulator";
import edrsForm from "./state/EdrsModel";

export default function OtherMedicalData(props: any) {
  const { t } = useTranslation();
  const { formField } = edrsForm;
  const [field] = useField(props.formField);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(
      "isPreview",
      props.isPreview === undefined ? true : props.isPreview
    );
  }, []);

  return (
    <div className="flex flex-col w-full ">
      <div className="mt-4">
        <SelectField
          containerClass="w-full md:w-1/3"
          label={t("24")}
          name={formField.cause_of_death_part_B}
          options={MANNER_OF_DEATH}
        />
      </div>
      <div className="flex  flex-col md:flex-row justify-between">
        <div className="mt-4 flex-start flex-row">
          <Radio
            name={formField.autopsyPerformed}
            label={t("25A")}
            options={YES_NO_UNK}
          />
        </div>
        {field.value[formField.autopsyPerformed] === "1" && (
          <div className="mt-4 ">
            <Radio
              name={formField.autopsyFindingsAvailable}
              label={t("25B")}
              options={YES_NO}
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <Radio
          name={formField.exposedToAccidentLast30Days}
          label={t("26A")}
          options={YES_NO}
        />
      </div>
      <div className="mt-4">
        <Radio
          name={formField.accidentLeadToDeath}
          label={t("26B")}
          options={YES_NO}
        />
      </div>

      <div className="mt-4">
        <MultiDatePicker
          label={t("27A")}
          name={formField.dateOfInjuryOrPoisoning}
        />
      </div>
      <div className="mt-4">
        <TextField
          name={formField.detailsOfInjuryOrPoisoning}
          label={t("27B")}
          type="textArea"
        />
      </div>
      <div className="mt-4">
        <SelectField
          label={t("28")}
          name={formField.pregnancyDetails}
          options={DECENT_FEMALE}
        />
      </div>

      <div className="mt-4 ">
        <div
          className=" 
            my-4
            w-full p-b-2 border-2  text-center font-medium bg-gray-200 "
        >
          <span> {t("29A")}</span>
        </div>

        <div className="flex  flex-col md:flex-row justify-between ">
          <Radio
            name={formField.infantMultiplePregnancy}
            label={t("29B")}
            options={YES_NO_UNK}
          />

          <Radio
            name={formField.intrauterineFetalDeath}
            label={t("29C")}
            options={YES_NO_UNK}
          />
        </div>
      </div>
      <div className="mt-4 items-center  ">
        <Radio
          name={formField.isDeathWithIn24HrsBirth}
          label={t("29D")}
          options={YES_NO}
        />
          {field.value[formField.isDeathWithIn24HrsBirth] === "1" && (
                  <div className="flex mt-4 items-center justify-between ">

              <div className="mx-4">
                <TextField
                  name={formField.infantWeightAtBirthInGrams}
                  label={t("29E")}
                  type="number"
                />
              </div>
              <div className="mx-4">
                <TextField
                  name={formField.numberOfGestationalWeeks}
                  label={t("29F")}
                  type="number"
                />
              </div>
              <div className="mx-4">
                <TextField
                  name={formField.ageOfMother}
                  label={t("29G")}
                  type="number"
                />
              </div>
              </div>
          )}
       
      </div>

      <div className="mt-4 items-center  ">
        <Radio
          name={formField.isPerinatalDeath}
          label={t("29H")}
          options={YES_NO}
        />
      </div>

      <div className="mt-4 flex flex-col md:flex-row ">
        <SelectField
          label={t("29I")}
          options={EDUCATION}
          name={formField.fatherEducationLevel}
        />
        <div className="ml-0 mt-4 md:mt-0 md:ml-8">
          <SelectField
            label={t("29J")}
            name={formField.motherEducationLevel}
            options={EDUCATION}
          />
        </div>
      </div>

      <div className="mt-4 items-center  flex flex-col md:flex-row ">
        <Radio
          label={t("30A")}
          name={formField.surgeryInLast4Weeks}
          options={YES_NO_UNK}
        />
        </div>
        {field.value[formField.surgeryInLast4Weeks] === "1" && (
          <div className=" mt-4 space-x-0  md:space-x-6 flex flex-col md:flex-row">
            <div>
              <MultiDatePicker label={t("30B")} name={formField.surgeryDate} />
            </div>
            <div>
              <TextField
                name={formField.surgeryCause}
                label={t("30C")}
                type="text"
              />
            </div>
          </div>
        )}
    </div>
  );
}
