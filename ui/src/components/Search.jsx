import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import logo from "../assets/img.png";

const Search = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/results", {state:{  "query" : searchValue }});
  }

  return (
    <form  style={{height : "75vh" , marginTop : "7rem"}} onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center mt-5">
        <img src={logo} alt="" width="500px" />
      </div>
      <div>
        <Input  setSearchValue={setSearchValue}/>
        <div className="d-flex gap-3 justify-content-center mt-5">
          <Button onClick={handleSubmit}  variant="contained">Search</Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
