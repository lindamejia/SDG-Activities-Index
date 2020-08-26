import React from "react";
import {
  Card,
  Container,
  CardColumns,
  Col,
  Pagination,
  Row,
  OverlayTrigger,
  Tooltip,
  Button,
  Collapse,
} from "react-bootstrap";
import style from "./Project.module.css";
import { Fade } from "react-reveal";
import ReactCardFlip from "react-card-flip";
import StackGrid from "react-stack-grid";

class Project extends React.Component {
  state = {
    isFlipped: false,

    backgroundColor: "",
    height: {},
    currentPage: 1,
    projectsPerPage: 11,
    open: false,
  };

  flipCard = (data) => {
    console.log(data);
    let cardHeight = document.getElementById(data).offsetHeight;
    this.setState((prevState) => ({
      isFlipped: {
        ...prevState.isFlipped,
        [data]: !prevState.isFlipped[data],
      },
      height: {
        ...prevState.height,
        [data]: cardHeight,
      },
    }));
  };

  handleOpen = (data) => {
    this.grid.updateLayout();
    this.setState((prevState) => ({
      open: {
        ...prevState.open,
        [data]: !prevState.open[data],
      },
    }));
  };

  getSdgImages = (projectSDGs) => {
    let projectSDGsArr = projectSDGs.split(",");
    let sdgArray = this.props.goals;
    const finalArray = [];
    projectSDGsArr.forEach((projectSDG) =>
      sdgArray.forEach((sdg) => {
        if (projectSDG === sdg.id) {
          const sdgData = { image: sdg.image, sdg };
          finalArray.push(sdgData);
        }
      })
    );
    const sdgImages = finalArray.map((data, index) => (
      <img
        key={index}
        onClick={() => this.props.selectGoal(data.sdg, index)}
        src={data.image}
        width="auto"
        height="60"
        alt="goal"
        className={style.sdgImage}
      />
    ));
    return sdgImages;
  };

  displayThemes = (themes) => {
    let themesArr = themes.split(",");
    const themesDisplay = themesArr.map((data, index) => (
      <span
        key={index}
        className={style.theme}
        onClick={() => this.props.selectTheme(data)}
      >
        {" "}
        {data}
      </span>
    ));
    return themesDisplay;
  };

  getPages = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.projects.length / this.state.projectsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const items = pageNumbers.map((number) => (
      <Pagination.Item
        key={number}
        id={number}
        onClick={(e) => this.handleClick(e)}
        active={number === this.state.currentPage}
      >
        {number}
      </Pagination.Item>
    ));
    return items;
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  resetCurrentPage = () => {
    this.setState({
      currentPage: 1,
    });
  };

  render() {
    const indexOfLastProject =
      this.state.currentPage * this.state.projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - this.state.projectsPerPage;
    const currentProjects = this.props.projects.slice(
      indexOfFirstProject,
      indexOfLastProject
    );
    const { open } = this.state;

    return (
      <div className={style.projects}>
        {/* <Container> */}
        <Row className="justify-content-end">
          <Pagination>{this.getPages()}</Pagination>
        </Row>
        {/* <CardColumns className={"column-count: 2 !important"}>
         */}
        <StackGrid
          gridRef={(grid) => (this.grid = grid)}
          columnWidth={400}
          gutterWidth={20}
          // horizontal="true"
          style={{
            position: "relative",
            transition: "ease-out 0s",
          }}
        >
          {currentProjects.map((data, index) => (
            <Fade key={data.id} bottom>
              <Card
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                }}
                // className="dialog mb-4 "
                id={data.id}
                key="front"
              >
                <Row>
                  <Col>
                    <p
                      style={{ color: "#455262", marginTop: "20px" }}
                      className={style.sector}
                      onClick={() => this.props.selectSector(data.sector)}
                    >
                      {data.sector}
                    </p>

                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "20px",
                          color:
                            data.activitytype === "organization"
                              ? "#ff9244"
                              : "#2c88c8",
                        }}
                      >
                        {data.projectname}
                      </Card.Title>
                      <Card.Text
                        className={style.organization}
                        onClick={() =>
                          this.props.oneOrgSelected(data.organization)
                        }
                      >
                        {data.organization}
                      </Card.Text>
                    </Card.Body>
                    <Card.Text>{this.getSdgImages(data.sdg)}</Card.Text>
                    <div
                      className={style.themes}
                      style={{ display: "inline-block" }}
                    >
                      {this.displayThemes(data.theme)}
                    </div>
                  </Col>

                  <Col
                    className="col-1"
                    style={{
                      backgroundColor:
                        data.activitytype === "organization"
                          ? "#ff9244"
                          : "#2c88c8",
                    }}
                  >
                    <div
                      onClick={() => this.handleOpen(data.id)}
                      aria-controls={data.id}
                      aria-expanded={open[data.id]}
                      className={style.accordion}
                    >
                      See {open[data.id] === true ? "Less " : "More "} About
                      This{" "}
                      {data.activitytype === "organization"
                        ? "Organization"
                        : "Project"}
                    </div>
                  </Col>
                  <Collapse in={open[data.id]} dimension="width">
                    <Col
                      className="col-6"
                      style={{
                        // height: this.state.height[data.id],
                        overflow: "auto",
                        color: "white",
                        textAlign: "center",
                        backgroundColor:
                          data.activitytype === "organization"
                            ? "#ff9244"
                            : "#2c88c8",
                      }}
                    >
                      <Card.Body className="p-3">
                        <Card.Title>{data.projectname}</Card.Title>
                        <Card.Text>{data.organization}</Card.Text>
                        <small>{data.description}</small>
                        <br />
                        <a
                          className={style.readMore}
                          href={`${data.website}`}
                          target="_blank"
                        >
                          Read More
                        </a>
                      </Card.Body>
                    </Col>
                  </Collapse>
                </Row>
              </Card>
            </Fade>
          ))}
          {/* </CardColumns>
           */}
        </StackGrid>

        <Row className="justify-content-center">
          <Pagination>{this.getPages()}</Pagination>
        </Row>
        {/* </Container> */}
      </div>
    );
  }
}
export default Project;
