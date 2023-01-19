import React from "react";
import { useNavigate } from "react-router-dom";

const Input = ({ setSearchValue }) => {
  const navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      navigate("/results");
    }
  };
  return (
    <div>
      <div className="input-group mb-3 w-50 mt-3 m-auto">
        <input
          type="search"
          className="form-control rounded-5"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  );
};

export default Input;
