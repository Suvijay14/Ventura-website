"use client";

import { AssessmentProvider, useAssessment } from "./AssessmentContext";
import AssessmentIntro from "./components/AssessmentIntro";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";

function AssessmentContent() {
  const { step } = useAssessment();

  return (
    <>
      {step === 1 && <AssessmentIntro />}
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
      {step === 4 && <StepFour />}
      {step === 5 && <StepFive />}
    </>
  );
}

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
}
