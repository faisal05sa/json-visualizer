import React, { Component } from "react";
import { VscWarning } from "react-icons/vsc";
import Editor from "@monaco-editor/react";

import Switch from "./switch";
import {
  Alert,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  FormControl,
  Spinner,
  Table,
} from "react-bootstrap";

class FormComponent extends Component {
  state = {
    jsonError: "",
    errorMarkers: [],
    isJsonValid: true,
  };

  jsonInputRef = null;

  constructor(props) {
    super(props);
    this.jsonInputRef = React.createRef();
    this.editorRef = React.createRef();
    if (props.state.settings.darkMode) {
      document.body.classList.add("bg-dark");
    }
  }

  handleEditorDidMount = (editor, monaco) => {
    this.editorRef.current = editor;
  };

  toggleSettings = (event) => {
    const target = event.target;
    let new_state = { ...this.props.state };
    new_state.settings[target.name] = target.checked;
    this.props.setState(new_state);
    if (target.name === "darkMode") {
      document.body.classList.toggle("bg-dark");
      document.body.classList.toggle("text-white");
    }
  };

  handleEditorValidation = (markers) => {
    this.setState({ errorMarkers: markers });
  };

  handleJsonInputChanged = (json_str, event) => {
    let new_state = { ...this.props.state };
    // if input is empty, ignore
    if (!json_str) {
      new_state.json = undefined;
      new_state.isJsonValid = true;
      new_state.jsonError = null;
      this.props.setState(new_state);
      return;
    }

    try {
      // check if input is a valid json
      const json_obj = JSON.parse(json_str);
      new_state.json = json_obj;
      new_state.isJsonValiderrorMarkers = true;
      new_state.jsonError = null;
      this.props.setState(new_state);
    } catch (err) {
      new_state.json = undefined;
      new_state.isJsonValid = false;
      new_state.jsonError = err;
      this.props.setState(new_state);
    }
  };

  getErrorPosition = (msg, defaultPos) => {
    const index = msg.indexOf("at position ");
    if (index >= 0) {
      const pieces = msg.split(" ");
      const lastOnce = pieces[pieces.length - 1];
      return parseInt(lastOnce);
    }
    return defaultPos;
  };

  goToErrorPosition = (event, errPos) => {
    // let current = this.editorRef.current;
    // console.log(event);
    // this.props.setState(this.props.state, () => {
    //   current.focus();
    //   current.selectionStart = current.selectionEnd = errPos;
    // });
  };

  render() {
    // let textAreaClasses = "form-control";
    // if (!this.props.state.isJsonValid) {
    //   textAreaClasses += " is-invalid";
    // }
    const is_dark_mode = this.props.state.settings.darkMode;

    return (
      <>
        <Row className="mt-3">
          <Col xs={9} style={{ textAlign: "left" }}>
            Please enter your JSON here:
            <Editor
              // ref={ref}
              language="json"
              defaultLanguage="json"
              height="220px"
              onChange={this.handleJsonInputChanged}
              onMount={this.handleEditorDidMount}
              onValidate={this.handleEditorValidation}
              theme={is_dark_mode ? "vs-dark" : "light"}
              loading={<Spinner variant="primary" animation="border" />}
              options={{
                wordWrap: "on",
                minimap: { enabled: false },
                //lineNumbers: "off",
              }}
            />
            {/* <FormControl
              isValid={this.props.state.isJsonValid && this.props.state.json}
              isInvalid={!this.props.state.isJsonValid}
              as="textarea"
              aria-label="With textarea"
              id="jsonTextarea"
              className={textAreaClasses}
              defaultValue={this.props.state.json_str}
              required
              style={{ height: "160px" }}
              onChange={this.handleJsonInputChanged}
              ref={this.jsonInputRef}
              placeholder="Enter you JSON here"
            /> */}
          </Col>
          <Col
            xs={3}
            style={{
              float: "none",
              display: "table-cell",
              verticalAlign: "top",
            }}
          >
            <Card
              bg={is_dark_mode ? "secondary" : "light"}
              text={is_dark_mode ? "white" : "dark"}
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header
                style={{
                  width: "80%",
                  marginToo: 30,
                  marginLeft: "10%",
                  borderRadius: "0.5rem",
                }}
              >
                Settings
              </Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                {this.props.toggleControls.map((control) => (
                  <Switch
                    key={control.name}
                    name={control.name}
                    text={control.text}
                    checked={this.props.state.settings[control.name]}
                    onChange={this.toggleSettings}
                  />
                ))}
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <InputGroup hasValidation>
            {/* a hidden control */}
            <FormControl isInvalid style={{ display: "none" }} />
            <Form.Control.Feedback type="invalid">
              {this.renderError()}
            </Form.Control.Feedback>
          </InputGroup>
        </Row>
      </>
    );
  }

  renderError = () => {
    // check if json is valid
    if (this.props.state.isJsonValid) return <React.Fragment />;

    let err = this.props.state.jsonError;
    if (!err) return <React.Fragment />;

    return (
      <Alert variant="danger" className="mt-2">
        <Alert.Heading>
          <VscWarning className="mr-2" size={25} />
          Ahhh! You got some error(s)!
        </Alert.Heading>
        {this.state.errorMarkers && (
          <>
            <Table responsive variant="danger" size="sm">
              <thead style={{ verticalAlign: "center" }}>
                <tr>
                  <th rowSpan={2}>Message</th>
                  <th colSpan={2}>Error Position</th>
                </tr>
                <tr>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {this.state.errorMarkers.map((marker, index) => {
                  return (
                    <tr key={index}>
                      <th>{marker.message}</th>
                      <td>
                        {marker.startLineNumber}:{marker.startColumn}
                      </td>
                      <td>
                        {marker.endLineNumber}:{marker.endColumn}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Alert>
    );

    const inputRef = this.jsonInputRef.current;

    let json_str = inputRef ? inputRef.value : "";
    let errPos = this.getErrorPosition(err.message, json_str.length);

    return (
      <Alert variant="danger" className="mt-2">
        <Row>
          <Col>
            <Alert.Heading>
              <VscWarning className="mr-2" size={25} />
              {err.name}!
            </Alert.Heading>
            {err.message}.
          </Col>
          <Col xs={"auto"}>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-danger"
                onClick={(event) => this.goToErrorPosition(event, errPos)}
              >
                Locate Error
              </Button>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  };
}

export default FormComponent;
