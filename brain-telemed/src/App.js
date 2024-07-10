// src/App.js
import React, { useState, useEffect } from "react";
//import { Router, navigate } from "@reach/router";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { Neurosity } from "@neurosity/sdk";

import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

import { Calm } from "./pages/Calm";

export default function App() {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deviceId) {
      const neurosity = new Neurosity({ deviceId });
      setNeurosity(neurosity);
    } else {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    if (!neurosity) {
      return;
    }

    const subscription = neurosity.onAuthStateChanged().subscribe((user) => {
      if (user) {
        setUser(user);
      } else {
        //navigate("/");
        <Link to="/" />;
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [neurosity]);

  useEffect(() => {
    if (user) {
      //navigate("/calm");
      <Link to="/calm">Calm</Link>;
    }
  }, [user]);

  return (
    <>
      Hello world!!
      <Login
        path="/"
        neurosity={neurosity}
        user={user}
        setUser={setUser}
        setDeviceId={setDeviceId}
      />
      <Logout
        path="/logout"
        neurosity={neurosity}
        resetState={() => {
          setNeurosity(null);
          setUser(null);
          setDeviceId("");
        }}
      />
      <Calm path="/calm" neurosity={neurosity} user={user} />
    </>
  );
}
