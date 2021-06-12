import React, { Component } from "react";
class FormComponent extends Component {
  state = {
    settings: {
      use_mono: false,
      truncate: false,
    },
    jsonInputRef: null,
    json: null,
    jsonError: "",
    isJsonValid: true,
  };

  constructor() {
    super();
    this.state.jsonInputRef = React.createRef();
  }

  handleJsonInputChanged = (event) => {
    let new_state = { ...this.state };
    const new_json_str = event.target.value;

    // if input is empty, ignore
    if (!new_json_str) {
      new_state.json = null;
      new_state.isJsonValid = true;
      new_state.jsonError = <React.Fragment />;
      this.setState(new_state);

      // raise the event to render json into html
      this.props.onInputChange(new_state);
      return;
    }

    try {
      // check if input is a valid json
      const json_obj = JSON.parse(new_json_str);
      new_state.json = json_obj;
      new_state.isJsonValid = true;
      new_state.jsonError = <React.Fragment />;
      this.setState(new_state);

      // raise the event to render json into html
      this.props.onInputChange(new_state);
    } catch (err) {
      // Json is not valid
      new_state.json = null;
      new_state.isJsonValid = false;
      new_state.jsonError = (
        <div className="alert alert-danger">
          <strong>{err.name}:</strong> {err.message}
        </div>
      );

      let errPos = this.getErrorPosition(err.message, new_json_str.length);
      let current = this.state.jsonInputRef.current;
      this.setState(new_state, () => {
        current.selectionStart = current.selectionEnd = errPos;
      });
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

  // handleInputChange = () => {
  //   this.props.onInputChange(this.state);
  // };

  render() {
    let textAreaClasses = "form-control";
    if (!this.state.isJsonValid) {
      textAreaClasses += " is-invalid";
    }

    return (
      <div className="row">
        <div className="col-10 p-3">
          <div className="form-floating">
            <textarea
              id="jsonTextarea"
              className={textAreaClasses}
              defaultValue={this.state.json}
              required
              style={{ height: 200 }}
              onChange={this.handleJsonInputChanged}
              ref={this.state.jsonInputRef}
            />
            <label htmlFor="jsonTextarea">Please enter your JSON here</label>
          </div>
        </div>
        <div className="col-2 p-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Settings</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="text-dark form-check form-switch">
                    <input
                      className="form-check-input"
                      id="flexSwitchTruncate"
                      name="truncate_text"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchTruncate"
                    >
                      Truncate Long Strings
                    </label>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="text-dark form-check form-switch">
                    <input
                      className="form-check-input"
                      id="flexSwitchMonoFont"
                      name="use_mono_font"
                      type="checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchMonoFont"
                    >
                      Use Mono Font
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">{this.state.jsonError}</div>
        {/* <div className="col-1">
          <button
            className="btn btn-success float-end mt-2"
            // onClick={this.handleInputChange}
          >
            Visualize
          </button>
        </div> */}
      </div>
    );
  }
}

export default FormComponent;
