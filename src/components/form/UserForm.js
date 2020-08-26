import React, { useState } from "react";
import { ProjectForm } from "./ProjectForm";
import { OrgForm } from "./OrgForm";
import { Confirm } from "./Confirm";
import { ConfirmOrg } from "./ConfirmOrg";
import { Success } from "./Success";
import { ActivityType } from "./ActivityType";

const UserForm = (props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    activityType: "",
    projectname: "",
    organization: "",
    description: "",
    website: "".replace(/^(https?:\/\/)?/i, (a) => a || "http://"),
    themes: [],
    sector: "",
    sdg: [],
    timeSubmitted: new Date(),
  });
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  switch (step) {
    case 1:
      return (
        <ActivityType
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      switch (true) {
        case formData.activityType === "project":
          return (
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              sectors={props.sectors}
              themes={props.themes}
              goals={props.goals}
            />
          );
        case formData.activityType === "organization":
          return (
            <OrgForm
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              sectors={props.sectors}
              themes={props.themes}
              goals={props.goals}
            />
          );
      }
      break;
    case 3:
      switch (true) {
        case formData.activityType === "project":
          return (
            <Confirm
              formData={formData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          );
        case formData.activityType === "organization":
          return (
            <ConfirmOrg
              formData={formData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          );
      }
      break;
    default:
      return <Success />;
  }
};

export default UserForm;
