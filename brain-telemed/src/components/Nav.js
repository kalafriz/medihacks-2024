// src/components/Nav.js
import React, { useState, useEffect } from "react";
//import { navigate } from "@reach/router";
import { Link } from "react-router-dom";

import { Status } from "./Status";

export function Nav({ neurosity }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    neurosity.getInfo().then((info) => {
      setInfo(info);
    });
  }, [neurosity]);

  return (
    <nav className="card">
      <Status neurosity={neurosity} info={info} />
      <Link to="/logout">Logout</Link>
    </nav>
  );
}
