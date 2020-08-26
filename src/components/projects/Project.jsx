import React from "react";
import {
  Card,
  Container,
  CardColumns,
  Pagination,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import style from "./Project.module.css";
import { Fade } from "react-reveal";
import ReactCardFlip from "react-card-flip";
import DownloadButton from "../downloadButton/DownloadButton.js";

class Project extends React.Component {
  state = {
    isFlipped: false,

    backgroundColor: "",
    height: {},
    currentPage: 1,
    projectsPerPage: 18,
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
    const indexTest = this.state.currentPage * currentProjects.length - 1;

    return (
      <div className={style.projects}>
        <Container>
          <Row>
            <Col>
              <DownloadButton projects={this.props.projects} />
            </Col>
            <Col>
              <Row className="justify-content-end">
                <small>
                  Showing projects {indexOfFirstProject + 1}-
                  {currentProjects.length < 17
                    ? this.props.projects.length
                    : indexTest + 1}{" "}
                  out of {this.props.projects.length} projects
                </small>
              </Row>
              <Row className="justify-content-end">
                <Pagination>{this.getPages()}</Pagination>
              </Row>
            </Col>
          </Row>
          <CardColumns>
            {currentProjects.map((data, index) => (
              <Fade key={data.id} bottom>
                <ReactCardFlip
                  isFlipped={this.state.isFlipped[data.id]}
                  flipDirection="horizontal"
                >
                  <Card
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                    className="dialog mb-4 p-3"
                    id={data.id}
                    key="front"
                  >
                    <div>
                      {data.activitytype === "organization" ? (
                        <i
                          className={`${style.orgIcon} fas fa-city fa-lg`}
                          size="5x"
                        ></i>
                      ) : (
                        <i
                          className={`${style.projIcon} fas fa-running fa-lg`}
                        ></i>
                      )}

                      <OverlayTrigger
                        overlay={<Tooltip>Click here to find out more</Tooltip>}
                      >
                        <i
                          className={`${style.flipIcon} fas fa-undo`}
                          style={{
                            color: "#a6a6a6",
                          }}
                          onClick={() => this.flipCard(data.id)}
                        ></i>
                      </OverlayTrigger>
                      <br />
                    </div>
                    <p
                      style={{ color: "#455262" }}
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
                  </Card>

                  <Card
                    style={{
                      height: this.state.height[data.id],
                      overflow: "auto",
                      color: "white",
                      marginTop: "20px",
                      textAlign: "center",
                      backgroundColor:
                        data.activitytype === "organization"
                          ? "#ff9244"
                          : "#2c88c8",
                    }}
                    className="p-3"
                    id={data.id}
                    key="back"
                  >
                    <i
                      className={`${style.flipIcon} fas fa-undo`}
                      onClick={() => this.flipCard(data.id)}
                    ></i>

                    <br />

                    <Card.Title>{data.projectname}</Card.Title>
                    <Card.Text>{data.organization}</Card.Text>
                    <small>{data.description}</small>
                    <br />
                    <div style={{ paddingTop: "30px" }}>
                      <a
                        className={style.readMore}
                        href={`${data.website}`}
                        target="_blank"
                      >
                        Read More
                      </a>
                    </div>
                  </Card>
                </ReactCardFlip>
              </Fade>
            ))}
          </CardColumns>

          <Row className="justify-content-center">
            <Pagination>{this.getPages()}</Pagination>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Project;
