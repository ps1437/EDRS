import { Form, Formik } from "formik";
import { useState } from "react";
import { SuccessTick } from "../../assets/Icon";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Model from "../../components/Model";
import Toast from "../../components/Toast";
import { FORM_ERROR } from "../../constant/Constant";
import { submitForm } from "../../service/edrsService";
import DeathDetails from "../esrd/DeathDetails";
import OtherMedicalData from "../esrd/OtherMedicalData";
import PersonalInfo from "../esrd/PersonalInfo";
import formInitialValues from "../esrd/state/edrsInitialState";
import models from "../esrd/state/EdrsModel";
import validationSchema from "../esrd/validation/edrsValidation";
import ErrorResult from "./ErrorResult";

const steps = ["Personal Details", "Death Details", "Other Medical Details", "Preview"];

const { formId, formField } = models;

const Preview = (props: any) => {
  return <>{props.children}</>;
};

function _renderStepContent(message:any,step: number, isPreview: boolean) {
  switch (step) {
    case 0:
      return <PersonalInfo formField={formField} />;
    case 1:
      return <DeathDetails formField={formField} />;
    case 2:
      return <OtherMedicalData formField={formField} isPreview={isPreview} />;
    case 3:
      return (
        <Preview>
          <PersonalInfo formField={formField} />
          <DeathDetails formField={formField} />
          <OtherMedicalData formField={formField} />
        </Preview>
      );
    default:
      return <div className="flex flex-col max-h-full  justify-center items-center">
        <div>
          <SuccessTick />
        </div>  <div>
          <p className="text-lg text-center space-y-5 font-medium h-full">{message}</p>
        </div>
      </div>;
  }
}
export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = validationSchema[activeStep];
  const [isPreview, setPreview] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const [isLoading, setLoader] = useState<boolean>(false);
  const [isValidationFailed, setValidationFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      setLoader(true);
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setPreview(false);
    setValidationFailed(false);
    setActiveStep(activeStep - 1);
    setLoader(false)
  }

  async function _submitForm(values: any, actions: any) {
    setErrors([]);
    setValidationFailed(false);
    submitForm(values).then((res: any) => {
      if (res?.status === 200) {
        actions.setSubmitting(false);
        setFormSubmitted(true);
        setMessage(res?.data)
        setActiveStep(activeStep + 1);
        setLoader(false)
      }
    }).catch((err) => {
      if (err?.response?.status === 400) {
        setErrors(err?.response?.data?.errors);
        setValidationFailed(true);
      }else{
        alert("Something went wrong ! Please try later !!");
      }
      setLoader(false)
      actions.setSubmitting(true);
      setFormSubmitted(false);
    }

    );

  }


  const stepsDisplay = steps.map((label, index) => {
    return (
      <div
        key={index}
        className={
          index !== steps.length - 1
            ? "w-full flex   row justify-center items-center "
            : "flex   justify-center items-center "
        }
      >
        <div className="relative flex flex-col justify-evenly text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-8 w-8 flex items-center justify-center py-3  ${activeStep > index
              ? "bg-green-600 text-white font-bold border border-green-600 "
              : " bg-gray-200"
              }`}
          >
            {activeStep > index ? (
              <span className="text-red font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0  text-center mt-8  -ml-12  justify-center w-32 text-xs font-medium uppercase ${activeStep > index ? "text-green-500" : "text-pink"
              }`}
          >
            {label}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2   transition duration-500 ease-in-out  ${activeStep > index
            ? "border-green-600"
            : "text-black border-gray-300 "
            }  `}
        ></div>
      </div>
    );
  });

  return (
    <div className="flex bg-white flex-col ">
      <div className="flex   mb-4  z-20 w-full ">
        <div className="flex my-4 w-5/6 md:w-1/2 mx-auto ">{stepsDisplay}</div>
      </div>
      {isLoading && <Model />}
      <div
        className="flex flex-col
                    items-center 
                    relative
                     h-full  bg-dark vh-100   rounded px-8 pt-6 pb-8 mb-4"
      >
        {errors.length > 0 &&
          <div className="flex w-full justify-center">
            <ErrorResult errors={errors} />
          </div>
        }

        <Formik
          initialValues={formInitialValues}
          validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              id={formId}
              className="flex justify-center w-11/12 flex-col items-center"
            >
              {_renderStepContent(message,activeStep, isPreview)}
              {!isFormSubmitted &&
                <>

                  {isValidationFailed &&
                    <div className="flex justify-end w-full">
                      <Toast color="red" message={FORM_ERROR} />
                    </div>}
                  <div className="flex mt-6  justify-center items-center ">
                    {activeStep !== 0 && !isFormSubmitted && (
                      <Button
                        disabled={isLoading}
                        onClick={_handleBack}>Back</Button>
                    )}
                    <div>

                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="ml-2 "
                      >
                        {isLastStep ? "Submit" : "Next"}
                      </Button>
                    </div>
                  </div>
                </>

              }
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


