import React, { Component } from "react";
import style from "./SdgDescription.module.css";

export default class SdgDescription extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.props.goalImage != null ? (
          <div
            style={{
              backgroundColor: `${this.props.goalColor}`
            }}
            className={style.mainBox}
          >
            <img
              src={this.props.goalImage}
              alt="goal"
              className={style.image}
              style={{ float: "left" }}
            />

            <span className={style.description}>
              {this.props.goalDescription}
            </span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
