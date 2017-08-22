import React from "react";
import { Link } from "react-router-dom";
import SearchElder from "./search-elder";
import AddElder from "./add-elder";

export default () => {
  return (
    <div>
      <img src="assets/search-icon.png" className="img-fluid signin-img" />
      <div className="row">
        <SearchElder />
        <AddElder />
      </div>
    </div>
  );
};
