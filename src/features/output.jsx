import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import StatusBar from "./statusbar/statusbar";
const Visualizer = lazy(() => import("./visualizer/visualizer"));

function OutputComponent() {
  const { settings, inputJson } = useSelector((state) => state.input);
  if (inputJson === undefined) {
    return <React.Fragment />;
  }

  const customThemes = {
    light: { backgroundColor: "#ffffff" },
    dark: { backgroundColor: "#212529", color: "white" },
  };

  return (
    <React.Fragment>
      <StatusBar
        style={settings.darkMode ? customThemes.dark : customThemes.light}
      />
      <div
        className={
          "row mt-2 text-start " +
          (settings.darkMode ? "text-white bg-dark" : "text-dark")
        }
      >
        <h5>Output:</h5>
      </div>
      <div className="row">
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <Visualizer root={true} data={inputJson} />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default OutputComponent;
