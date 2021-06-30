import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { Container, Navbar, Row } from "react-bootstrap";
import FormComponent from "./components/form";
import OutputComponent from "./components/output";
import { ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    settings: {},
    json: undefined,
  };

  constructor() {
    super();
    this.setState = this.setState.bind(this); //bind setState because it is passing down somewhere else

    this.toggleControls = [
      { name: "darkMode", text: "Dark Mode", default: false },
      { name: "monospaceFont", text: "Preserve Space", default: true },
      {
        name: "truncateStrings",
        text: "Truncate Long Strings",
        default: false,
      },
    ];

    let settings = {};
    this.toggleControls.forEach((control) => {
      settings[control.name] = control.default;
    });
    this.setState(settings);
  }

  render() {
    return (
      <div
        className={
          "App " + (this.state.settings.darkMode ? "bg-dark" : "bg-light")
        }
      >
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />

        <Navbar
          variant="dark"
          style={{ borderRadius: 0, backgroundColor: "#20232a" }}
        >
          <Container fluid>
            <Navbar.Brand>
              <img
                src="logo.svg"
                alt=""
                width="30"
                height="24"
                className="d-inline-block align-text-top"
              />
              JSON to HTML Visualizer
            </Navbar.Brand>
          </Container>
        </Navbar>

        <div className="container-fluid">
          <Row variant={this.state.settings.darkMode ? "dark" : "secondary"}>
            <div className="col-12">
              <FormComponent
                state={this.state}
                setState={this.setState}
                toggleControls={this.toggleControls}
              />
            </div>
            <div
              className={
                "col-12 " +
                (this.state.settings.monospaceFont ? "text-monospace" : "")
              }
            >
              <OutputComponent
                data={this.state.json}
                darkMode={this.state.settings.darkMode}
                truncateStrings={this.state.settings.truncateStrings}
              />
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
