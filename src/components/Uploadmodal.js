import React from "react";
import UplodForm from "./UplodForm";

export default function Uploadmodal({ value, profileImg }) {
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              value(false);
            }}
          >
            &times;
          </span>
          <UplodForm profileImg={profileImg} value={value} />
        </div>
      </div>
    </>
  );
}
