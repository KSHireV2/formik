import React, { useState } from "react";
import "./App.css";
import RecruitmentForm from "./components/RecruitmentForm";
import AdressInformation from "./components/AddressInformation";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormik } from "formik";
import { FormValues, STEP } from "./types";
import { validationSchema } from "./utils/form/validations";
import { initialValues } from "./utils/form/initialValues";

const stepsMap: Record<STEP, any> = {
  [STEP.FIRST_STEP]: {
    component: RecruitmentForm,
    label: "RecruitmentForm",
  },
  [STEP.SECOND_STEP]: {
    component: AdressInformation,
    label: "AdressInformation",
  },
  [STEP.THIRD_STEP]: {
    component: null,
    label: "TODO",
  },
};

function App() {
  const [step, setStep] = useState<STEP>(STEP.FIRST_STEP);

  const globalFormik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: (e) => {
      console.log("TODO: Kepp going only until the last step");
    },
  });

  const handleNextStep: React.FormEventHandler<HTMLElement> = (
    e: React.FormEvent
  ) => {
    setStep((currentStep) => {
      return currentStep + 1;
    });
  };

  const FormFragmentOutlet = stepsMap[step].component;

  return (
    <div className="App">
      <Stepper activeStep={step} alternativeLabel>
        {Object.entries(stepsMap).map(([key, value]) => (
          <Step key={key}>
            <StepLabel>{value.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormFragmentOutlet {...globalFormik} onSubmit={handleNextStep} />
    </div>
  );
}

export default App;
