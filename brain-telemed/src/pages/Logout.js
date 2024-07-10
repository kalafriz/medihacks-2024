// src/pages/Logout.js
import { useEffect } from "react";
//import { navigate } from "@reach/router";
import { Link } from "react-router-dom";

export function Logout({ neurosity, resetState }) {
  useEffect(() => {
    if (neurosity) {
      neurosity.logout().then(() => {
        resetState();
        //navigate("/");
        <Link to="/">Log out</Link>;
      });
    }
  }, [neurosity, resetState]);

  return null;
}
