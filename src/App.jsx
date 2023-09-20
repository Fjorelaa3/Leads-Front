import "./Style.css";
import React, { useState } from "react";
import Side from "./components/Sidebar";

function App() {
  const [RenderedComponent, setRenderedComponent] = useState(<></>);

  return (
    <div className="App">
      <Side setRenderedComponent={setRenderedComponent} />
      <div className="other">{RenderedComponent}</div>
    </div>
  );
}

export default App;
