import React from "react";
import { useSelector } from "react-redux";
import { Container, Navbar, Nav, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import MyLogo from "./features/logo/logo";
import FormComponent from "./features/form/form";
import OutputComponent from "./features/output";
import { manageDarkModeClasses } from "./app/utils";

function App() {
  const darkMode = useSelector((state) => state.input.settings.darkMode);
  manageDarkModeClasses(darkMode);

  return (
    <div className={"App " + (darkMode ? "bg-dark" : "bg-light")}>
      <TheNavBar />
      <MainContainer />
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
    </div>
  );
}

function TheNavBar() {
  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: "#20232a", maxHeight: 75 }}
    >
      <Container fluid>
        <Navbar.Brand>
          <MyLogo />
          JSON to HTML Visualizer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function MainContainer() {
  const settings = useSelector((state) => state.input.settings);
  return (
    <div className="container-fluid">
      <Row variant={settings.darkMode ? "dark" : "secondary"}>
        <div className="col-12">
          <FormComponent />
        </div>
        <div
          className={
            "col-12 " + (settings.monospaceFont ? "font-monospace" : "")
          }
        >
          <OutputComponent />
        </div>
      </Row>
    </div>
  );
}

export default App;
