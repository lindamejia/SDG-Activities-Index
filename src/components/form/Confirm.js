import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import { addProject } from "../../data";

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const Confirm = ({ formData, prevStep, nextStep }) => {
  const classes = useStyles();
  const {
    name,
    email,
    activityType,
    projectname,
    organization,
    description,
    website,
    themes,
    sector,
    sdg,
  } = formData;
  return (
    <>
      <div>
        <List>
          <ListItem>
            <ListItemText
              primary="Contact Name"
              secondary={name}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={email}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Activity Type"
              secondary={activityType}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Project Name"
              secondary={projectname}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Organization"
              secondary={organization}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={description}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Website"
              secondary={website}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Sector"
              secondary={sector}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Themes"
              secondary={themes}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="SDGs"
              secondary={sdg}
              className={classes.textCenter}
            />
          </ListItem>
        </List>
        <div className={classes.textCenter}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={() => prevStep()}
          >
            Back
          </Button>

          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => nextStep(addProject(formData))}
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    </>
  );
};

Confirm.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
