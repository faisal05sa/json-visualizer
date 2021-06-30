import React, { Component, lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import StatusBar from "./statusbar";
const Visualizer = lazy(() => import("./visualizer"));

class OutputComponent extends Component {
  state = {
    searchText: "",
    selected_json_path: "",
    expand_signal: "",
  };

  custom_themes = {
    light: { backgroundColor: "#ffffff" },
    dark: { backgroundColor: "#212529", color: "white" },
  };

  constructor() {
    super();
    this.selectedJsonRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.data) {
      return { selected_json_path: "" };
    }
    return null;
  }

  selectedJsonUpdated = (path) => {
    let state = { ...this.state };
    state.selected_json_path = path;
    this.setState(state);
  };

  handleExpandCollapseAll = (signal) => {
    let state = { ...this.state };
    state.expand_signal = signal;
    this.setState(state);
  };

  onSearchTextChanged = (new_value) => {
    let state = { ...this.state };
    state.searchText = new_value.toLowerCase();
    this.setState(state);
  };

  render() {
    if (this.props.data === undefined) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <StatusBar
          style={
            this.props.darkMode
              ? this.custom_themes.dark
              : this.custom_themes.light
          }
          darkMode={this.props.darkMode}
          json_path={this.state.selected_json_path}
          jsonRef={this.selectedJsonRef}
          handleExpandCollapseAll={this.handleExpandCollapseAll}
          onSearchTextChanged={this.onSearchTextChanged}
          searchText={this.state.searchText}
        />
        <div
          className={
            "row text-left mt-2 " +
            (this.props.darkMode ? "text-white bg-dark" : "text-dark")
          }
        >
          <h5>Output:</h5>
        </div>
        <div className="row p-3">
          <Suspense
            fallback={
              <h1>
                <Spinner animation="border" variant="primary" />
              </h1>
            }
          >
            <Visualizer
              root={true}
              data={this.props.data}
              darkMode={this.props.darkMode}
              truncateStrings={this.props.truncateStrings}
              showJsonPath={this.selectedJsonUpdated}
              expand_signal={this.state.expand_signal}
              searchText={this.state.searchText}
            />
          </Suspense>
        </div>
      </React.Fragment>
    );
  }
}
export default OutputComponent;
