import React from "react";
import "./App.css";
import * as spreadsheetData from "./data";
import Project from "./components/projects/Project.jsx";
import FilterMenu from "./components/filterMenu/FilterMenu.jsx";
import UserForm from "./components/form/UserForm.js";
import {
  Button,
  Modal,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SdgDescription from "./components/sdg-description/SdgDescription";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.resetPage = React.createRef();
    this.state = {
      projects: [],
      projectsDisplay: [],
      themes: [],
      sectors: [],
      goals: [],
      modal: false,
      searchError: false,
      loading: true,
      active: {},
      goalDescription: "",
      goalImage: null,
      goalColor: "",
      //Filters
      theme: "",
      sdg: "",
      sdgName: "",
      sector: "",
      activitytype: "",
      organization: "",
      //Radio Checks
      projChecked: false,
      orgsChecked: false,
    };
  }

  async componentDidMount() {
    let pathname = this.props.location.pathname;
    await spreadsheetData.getSpreadsheet().then(this.spreadsheeetSuccess);
    await spreadsheetData.getGoals().then(this.goalsSuccess);
    if (pathname.length > 1) {
      let sdgUrl = pathname.replace("/", "");
      let sdgNameUrl = this.state.goals.filter((item) => item.id === sdgUrl);
      this.setState({
        sdg: sdgUrl,
        sdgName: sdgNameUrl[0].name,
      });
      this.filterProjects();
    }
  }

  spreadsheeetSuccess = (data) => {
    let themesSplit = [];
    let themesList = [];
    const themesArray = data.map((data) => data.theme);
    for (let i = 0; i < themesArray.length; i++) {
      themesSplit.push(themesArray[i].split(","));
    }
    const themesArr = themesSplit.flat(1);
    for (let i = 0; i < themesArr.length; i++) {
      themesList.push(themesArr[i].trim());
    }
    const themesArrayNoDuplicates = Array.from(new Set(themesList));
    const themesAlphabetical = themesArrayNoDuplicates.sort();
    const sectorsArray = data.map((data) => data.sector);
    const sectorsArrayNoDuplicates = Array.from(new Set(sectorsArray));
    const sectorsAlphabetical = sectorsArrayNoDuplicates.sort();
    this.setState({
      projects: data,
      projectsDisplay: data,
      themes: themesAlphabetical,
      sectors: sectorsAlphabetical,
      loading: false,
    });
  };

  goalsSuccess = (data) => {
    this.setState({
      goals: data,
    });
  };

  themeSelected = (data) => {
    this.setState(
      (prevState) => ({
        active: {
          [data]: !prevState.active[data],
        },
        theme: data,
      }),
      () => this.filterProjects()
    );
  };

  sectorSelected = (data) => {
    this.setState(
      (prevState) => ({
        active: {
          [data]: !prevState.active[data],
        },
        sector: data,
      }),
      () => this.filterProjects()
    );
  };

  goalSelected = (data, index) => {
    this.setState(
      (prevState) => ({
        active: {
          [index]: !prevState.active[index],
        },
        sdg: data.id,
        sdgName: data.name,
      }),
      () => this.filterProjects()
    );
  };

  projectsSelected = () => {
    this.setState(
      {
        activitytype: "project",
        projChecked: !this.state.projChecked,
        orgsChecked: false,
      },
      () => this.filterProjects()
    );
  };

  organizationsSelected = () => {
    this.setState(
      {
        activitytype: "organization",
        orgsChecked: !this.state.orgsChecked,
        projChecked: false,
      },
      () => this.filterProjects()
    );
  };

  oneOrgSelected = (data) => {
    this.setState(
      {
        organization: data,
      },
      () => this.filterProjects()
    );
  };

  filterProjects = () => {
    let result = this.state.projects;

    if (this.state.theme) {
      result = result.filter((project) =>
        project.theme.includes(this.state.theme)
      );
    }
    if (this.state.sdg) {
      this.props.history.push(`${this.state.sdg}`);
      result = result.filter((project) =>
        project.sdg.split(",").includes(this.state.sdg)
      );
    }
    if (this.state.sector) {
      result = result.filter((project) => project.sector === this.state.sector);
    }
    if (this.state.organization) {
      result = result.filter(
        (project) => project.organization === this.state.organization
      );
    }
    if (this.state.activitytype) {
      if (this.state.activitytype === "project") {
        result = result.filter((project) => project.activitytype === "project");
      }
      if (this.state.activitytype === "organization") {
        result = result.filter(
          (project) => project.activitytype === "organization"
        );
      }
    }
    this.setState({
      projectsDisplay: result,
      searchError: false,
    });
    if (result.length === 0) {
      this.setState({
        searchError: true,
      });
    }
    this.resetPage.current.resetCurrentPage();
  };

  handleSearch = (value) => {
    const searchArr = this.state.projects.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.includes(value)
      )
    );
    this.setState({
      projectsDisplay: searchArr,
      searchError: false,
    });
    if (searchArr.length === 0) {
      this.setState({
        searchError: true,
      });
    }
    this.resetPage.current.resetCurrentPage();
  };

  resetFilter = () => {
    this.setState({
      projectsDisplay: this.state.projects,
      searchError: false,
      filters: [],
      goalDescription: "",
      goalImage: null,
      goalColor: "",
      theme: "",
      sdg: "",
      sdgName: "",
      sector: "",
      activitytype: "",
      projChecked: false,
      orgsChecked: false,
      organization: "",
    });
    this.resetPage.current.resetCurrentPage();
  };

  handleShow = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  deleteFilter = (value) => {
    console.log(value);
    this.setState(
      (prevState) => ({
        filters: prevState.filters.filter((item) => item !== value),
      }),
      () => this.filterProjects()
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <div style={{ textAlign: "center" }}>
          <Button
            className="add-project"
            type="button"
            onClick={() => {
              this.handleShow();
            }}
          >
            + ADD YOUR PROJECT
          </Button>
          <Modal
            show={this.state.modal}
            onHide={this.handleClose}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Your Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UserForm
                themes={this.state.themes}
                sectors={this.state.sectors}
                goals={this.state.goals}
              />
            </Modal.Body>
          </Modal>
        </div>
        <FilterMenu
          {...this.props}
          themes={this.state.themes}
          sectors={this.state.sectors}
          selectTheme={this.themeSelected}
          selectSector={this.sectorSelected}
          searchProjects={this.handleSearch}
          selectProjects={this.projectsSelected}
          selectOrganizations={this.organizationsSelected}
          resetFilter={this.resetFilter}
          goals={this.state.goals}
          deleteFilter={this.deleteFilter}
          projects={this.state.projectsDisplay}
          selectGoal={this.goalSelected}
          active={this.state.active}
          theme={this.state.theme}
          sdg={this.state.sdg}
          sdgName={this.state.sdgName}
          sector={this.state.sector}
          activitytype={this.state.activitytype}
          projChecked={this.state.projChecked}
          orgsChecked={this.state.orgsChecked}
          organization={this.state.organization}
        />
        <br />
        <SdgDescription
          goalDescription={this.state.goalDescription}
          goalImage={this.state.goalImage}
          goalColor={this.state.goalColor}
        />
        {this.state.searchError ? (
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Alert variant="danger">
                  No cards match your search. Please try redefining your
                  criteria.
                </Alert>
              </Col>
            </Row>
          </Container>
        ) : (
          <span></span>
        )}
        {this.state.loading ? (
          <Spinner
            animation="border"
            variant="info"
            style={{ position: "fixed", left: "50%" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Project
            {...this.props}
            projects={this.state.projectsDisplay}
            goals={this.state.goals}
            ref={this.resetPage}
            sectors={this.state.sectors}
            selectTheme={this.themeSelected}
            selectSector={this.sectorSelected}
            selectGoal={this.goalSelected}
            oneOrgSelected={this.oneOrgSelected}
          />
        )}
      </div>
    );
  }
}

export default withRouter(App);
