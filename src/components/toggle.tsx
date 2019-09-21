import React, { useState } from "react";

export default function Toggle(props:any) {
  const [toggleState, setToggleState] = useState("off");

  function toggle() {
    setToggleState(toggleState === "off" ? "on" : "off");
  }

  return <div className={`switch ${toggleState}`} onClick={toggle} />;
}
