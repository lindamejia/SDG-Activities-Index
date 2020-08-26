import React, { Component } from "react";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Form,
  Button,
  Container,
  InputGroup,
} from "react-bootstrap";
import style from "./FilterMenu.module.css";

class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.keyword = React.createRef();
  }

  handleProjects = () => {
    this.props.selectProjects();
  };

  handleOrgs = () => {
    this.props.selectOrganizations();
  };

  submit() {
    var keyword = this.keyword.current.value;
    this.props.searchProjects(keyword);
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Container>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <h5 className="filterBy">Filter By</h5>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" lg="4">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <Form.Group controlId="search">
                  <Form.Control
                    type="text"
                    placeholder="Search by Keyword"
                    ref={this.keyword}
                    onChange={() => this.submit()}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs="3" md="3" lg="auto">
              <DropdownButton
                className="dropdown"
                variant="secondary"
                id="dropdown-basic-button"
                title={
                  this.props.sdgName === ""
                    ? "SDG"
                    : [this.props.sdg, ". ", this.props.sdgName]
                }
              >
                {this.props.goals.map((goal, index) => (
                  <Dropdown.Item
                    key={goal.id}
                    onClick={() => this.props.selectGoal(goal, index)}
                    active={this.props.active[index]}
                  >
                    <img src={goal.image} alt="goal" width="30" height="30" />{" "}
                    {goal.id}. {goal.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col xs="3" md="3" lg="auto">
              <DropdownButton
                variant="secondary"
                id="dropdown-basic-button"
                title={this.props.theme === "" ? "Theme" : this.props.theme}
              >
                {this.props.themes.map((theme) => (
                  <Dropdown.Item
                    key={theme}
                    onClick={() => this.props.selectTheme(theme)}
                    active={this.props.active[theme]}
                  >
                    {theme}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col xs="3" md="3" lg="auto">
              <DropdownButton
                variant="secondary"
                id="dropdown-basic-button"
                title={this.props.sector === "" ? "Sector" : this.props.sector}
              >
                {this.props.sectors.map((sector) => (
                  <Dropdown.Item
                    key={sector}
                    onClick={() => this.props.selectSector(sector)}
                    active={this.props.active[sector]}
                  >
                    {sector}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row
            className="justify-content-center offset-lg-1"
            style={{ marginTop: "20px" }}
          >
            <Col xs lg="3">
              <Form.Group controlId="projectsCheckbox">
                <InputGroup>
                  <Form.Check
                    type="radio"
                    label="Projects"
                    style={{ color: "#2c88c8" }}
                    checked={this.props.projChecked}
                    onChange={this.handleProjects}
                  />
                  <i
                    style={{ color: "#2c88c8", padding: "5px" }}
                    className="fas fa-running"
                  ></i>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs lg="3">
              <Form.Group controlId="orgsCheckbox">
                <InputGroup>
                  <Form.Check
                    type="radio"
                    label="Organizations"
                    style={{ color: "#ff9244" }}
                    checked={this.props.orgsChecked}
                    onChange={this.handleOrgs}
                  />
                  <i
                    style={{ color: "#ff9244", padding: "5px" }}
                    className="fas fa-city"
                  ></i>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs="3" md="3" lg="3">
              <Button variant="link" className={style.resetButton} onClick={() => this.props.resetFilter()}>
                Reset Filter
              </Button>
            </Col>
          </Row>
          <Row>
            {this.props.organization === "" ? (
              <p></p>
            ) : (
              <p className={style.organization}>{this.props.organization}</p>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
export default FilterMenu;
