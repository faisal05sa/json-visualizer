import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { VscWarning } from "react-icons/vsc";
import Editor from "@monaco-editor/react";
import {
  switchesArray,
  updateSettings,
  updateJsonInput,
  removeJsonInput,
} from "./formSlice";

import { updateJsonPath } from "../statusbar/statusbarSlice";

import InputNumber from "../counter/script";
import { removeSearchText } from "../statusbar/statusbarSlice";
import { copyTextToClipboard } from "../../app/utils";

import Switch from "./switch";
import {
  Alert,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  FormControl,
  Spinner,
  Table,
  Button,
} from "react-bootstrap";

function FormComponent(props) {
  const editorRef = React.createRef();
  const [localState, setLocalState] = useState({
    isJsonValid: true,
    errorMarkers: [],
  });

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.input.settings);
  const is_dark_mode = settings.darkMode;

  function toggleSettings(event) {
    const target = event.target;
    dispatch(
      updateSettings({
        name: target.name,
        value: target.checked,
      })
    );
  }

  function handleEditorDidMount(editor, monaco) {
    if (editor) {
      editorRef.current = editor;
    }
  }

  function onEditorValidation(errorMarkers) {
    setLocalState({
      ...localState,
      isJsonValid: errorMarkers.length ? false : true,
      errorMarkers,
    });
  }

  function handleJsonInputChanged(value, event) {
    const json_str = value.trim();

    // if input is empty, ignore
    if (!json_str) {
      setLocalState({
        ...localState,
        isJsonValid: true,
        errorMarkers: [],
      });
      dispatch(removeJsonInput());
      dispatch(removeSearchText());
      dispatch(removeSearchText());
      dispatch(updateJsonPath("root"));
      return;
    }

    try {
      // check if input is a valid json
      const json_obj = JSON.parse(json_str);
      setLocalState({
        ...localState,
        isJsonValid: true,
        errorMarkers: [],
      });
      dispatch(updateJsonInput(json_obj));
    } catch (err) {
      setLocalState({
        ...localState,
        isJsonValid: false,
      });
      dispatch(removeJsonInput());
    }
  }

  function renderError() {
    // check if json is valid
    if (localState.isJsonValid) return <React.Fragment />;

    // let err = localState.jsonError;
    // if (!err) return <React.Fragment />;

    return (
      <Alert variant="danger" className="mt-2">
        <Alert.Heading>
          <VscWarning className="me-2" size={25} />
          Uh oh! You got some error(s)!
        </Alert.Heading>
        {localState.errorMarkers && (
          <>
            <Table responsive variant="danger" size="sm">
              <thead style={{ verticalAlign: "center" }}>
                <tr>
                  <th>Message</th>
                  <th>Staring Position</th>
                  <th>Ending Position</th>
                </tr>
              </thead>
              <tbody>
                {localState.errorMarkers.map((marker, index) => {
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
  }

  return (
    <>
      <Row className="mt-3">
        <Col xs={9} style={{ textAlign: "left" }}>
          Please enter your JSON here:
          <Editor
            language="json"
            defaultLanguage="json"
            height="220px"
            onChange={handleJsonInputChanged}
            onMount={handleEditorDidMount}
            onValidate={onEditorValidation}
            theme={is_dark_mode ? "vs-dark" : "light"}
            loading={<Spinner variant="primary" animation="border" />}
            options={{
              wordWrap: "on",
              minimap: { enabled: false },
              showStatusBar: true,
              //lineNumbers: "off",
            }}
          />
        </Col>
        <Col
          xs={3}
          style={{
            float: "none",
            display: "table-cell",
            verticalAlign: "top",
            width: "18rem",
          }}
        >
          <Card
            bg={is_dark_mode ? "secondary" : "light"}
            text={is_dark_mode ? "white" : "dark"}
            style={{ width: "18rem", transition: "height 2s linear" }}
            className="mb-2"
          >
            <Card.Header
              style={{
                width: "80%",
                marginTop: 20,
                marginLeft: "10%",
                borderRadius: "0.5rem",
              }}
            >
              Settings
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              {switchesArray.map((control) => (
                <Switch
                  key={control.name}
                  name={control.name}
                  text={control.text}
                  checked={settings[control.name]}
                  onChange={toggleSettings}
                />
              ))}
              {settings["truncateStrings"] ? (
                <div className="d-flex flex-row bd-highlight">
                  <div className="p-2 bd-highlight align-self-center">
                    Length Limit
                  </div>
                  <div className="p-2 bd-highlightv align-self-center">
                    <InputNumber min={20} max={100} />
                  </div>
                </div>
              ) : null}
            </Card.Body>
            <div className="d-grid gap-1">
              <Button
                size="sm"
                variant={is_dark_mode ? "dark" : "secondary"}
                onClick={() => {
                  const sampleJson =
                    '{"brand": "Harbor Bay", "retailer_sku": "90406", "retailer": "dxl-uk", "currency": "USD", "price": 8136.54, "lang": "en", "market": "UK", "gender": "men", "industry": null, "care": ["60% cotton/40% polyester", "Button-down collar", "Chest pocket", "Faux-horn buttons", "Center back pleat", "Short sleeves", "Straight hem with side vents", " Machine wash; imported", ""], "name": "Harbor Bay Easy-Care Solid Sport Shirt", "url": "https://www.dxl.com/casual-shirts/harbor-bay-easy-care-solid-sport-shirt/cat140076/90406", "uuid": null, "skus": {"cl19083_XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "XL"}, "cl19083_XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "XLT"}, "cl19083_1XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "1XL"}, "cl19083_1XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "1XLT"}, "cl19083_2XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "2XL"}, "cl19083_2XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "2XLT"}, "cl19083_3XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "3XL"}, "cl19083_3XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "3XLT"}, "cl19083_4XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "4XL"}, "cl19083_4XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "4XLT"}, "cl19083_5XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "5XL"}, "cl19083_5XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "5XLT"}, "cl19083_6XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "6XL"}, "cl19083_6XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "6XLT"}, "cl19083_7XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "7XL"}, "cl19083_7XLT": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "7XLT"}, "cl19083_8XL": {"currency": "USD", "colour": "plum heather", "price": "8,136.54", "size": "8XL"}}, "image_urls": {"plum heather_cl19083": ["https://images.dxl.com/is/image/CasualMale/p90406plum_heather"]}}';
                  copyTextToClipboard(sampleJson);
                }}
              >
                Get Sample JSON
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <InputGroup hasValidation>
          <FormControl isInvalid style={{ display: "none" }} />
          <Form.Control.Feedback type="invalid">
            {renderError()}
          </Form.Control.Feedback>
        </InputGroup>
      </Row>
    </>
  );
}

export default FormComponent;
