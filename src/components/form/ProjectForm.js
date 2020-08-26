import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  ListItemText,
  Chip,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, OverlayTrigger } from "react-bootstrap";
import themesInfo from "../../themesInfo.png";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const validationSchema = yup.object().shape({
  projectname: yup
    .string()
    .required("*Project name is required")
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters"),
  description: yup
    .string()
    .max(250, "*Description must be less than 250 characters"),
  organization: yup
    .string()
    .min(2, "*Organiation name must have at least 2 characters")
    .max(100, "*Organization name can't be longer than 100 characters"),
  website: yup.string(),
  // .matches(
  //   "/^([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$/",
  //   "*Must enter URL in http://www.example.com format"
  // ),
});

export const ProjectForm = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  sectors,
  themes,
  goals,
}) => {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={(values) => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Field
              name="projectname"
              label="Project Name *"
              margin="normal"
              as={TextField}
              error={touched.projectname && errors.projectname}
              helperText={touched.projectname && errors.projectname}
              fullWidth
            />
            <Field
              name="organization"
              label="Organization"
              margin="normal"
              as={TextField}
              error={touched.organization && errors.organization}
              helperText={touched.organization && errors.organization}
              fullWidth
            />
            <Field
              name="description"
              label="Description"
              margin="normal"
              as={TextField}
              error={touched.description && errors.description}
              helperText={touched.description && errors.description}
              fullWidth
            />
            <Field
              name="website"
              label="Website *"
              margin="normal"
              as={TextField}
              error={touched.website && errors.website}
              helperText={touched.website && errors.website}
              fullWidth
            />

            <Field
              select
              name="sector"
              label="Sector"
              margin="normal"
              as={TextField}
              fullWidth
            >
              {sectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </Field>

            <Field
              select
              name="themes"
              label="Themes (Select all that apply)"
              margin="normal"
              as={TextField}
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                ),
              }}
              fullWidth
            >
              {themes.map((theme) => (
                <MenuItem key={theme} value={theme}>
                  <ListItemText primary={theme} />
                </MenuItem>
              ))}
            </Field>

            <Field
              select
              name="sdg"
              label={
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Popover>
                      <img
                        src={themesInfo}
                        width="550px"
                        height="auto"
                        alt="SDG Guide"
                      />
                    </Popover>
                  }
                >
                  <span>
                    SDGs (Select all that apply)
                    <i
                      style={{ margin: "5px" }}
                      className="fas fa-info-circle"
                    ></i>
                  </span>
                </OverlayTrigger>
              }
              margin="normal"
              as={TextField}
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                ),
              }}
              fullWidth
            >
              {goals.map((goal) => (
                <MenuItem key={goal.id} value={goal.name}>
                  <ListItemText primary={`${goal.id}. ${goal.name}`} />
                </MenuItem>
              ))}
            </Field>
            <div>
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
                onClick={() => prevStep()}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

ProjectForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
