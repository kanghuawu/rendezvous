import React from "react";
import { Link } from "react-router-dom";
import SearchElder from "./search-elder";
import AddElder from "./add-elder";
import searchIcon from "../../../assets/search-icon.png";
export default () => {
  return (
    <div>
      <img src={searchIcon} className="img-fluid signin-img" />
      <div className="row">
        <SearchElder />
        <AddElder />
      </div>
    </div>
  );
};
