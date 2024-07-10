// src/App.js
import React, { useState, useEffect } from "react";
//import { Router, navigate } from "@reach/router";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Neurosity } from "@neurosity/sdk";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Calm } from "./pages/Calm";

const supabase = createClient(
  "https://xyakcnqxoxwxnitreuno.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5YWtjbnF4b3h3eG5pdHJldW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NTczMTYsImV4cCI6MjAzNjEzMzMxNn0.w1Mr-GYuS0xJiPSm7gQXuTOpjCde3N8ru8n-q0NnzO0"
);

export default function App() {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  const [loading, setLoading] = useState(true);

  // SUPABASE AUTH
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    );
  } else {
    return <div>Logged in!</div>;
  }

  // NEUROSITY AUTH
  /** 
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
  );*/
}
