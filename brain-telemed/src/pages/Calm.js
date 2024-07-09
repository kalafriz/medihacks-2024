// src/pages/Calm.js
import React, { useState, useEffect } from "react";
import { Nav } from "../components/Nav";

export function Calm({ user, neurosity }) {
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user || !neurosity) {
      return;
    }

    const subscription = neurosity.calm().subscribe((calm) => {
      setCalm(Number(calm.probability.toFixed(2)));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, neurosity]);

  return (
    <main className="main-container">
      {user ? <Nav neurosity={neurosity} /> : null}
      <div className="calm-score">
        &nbsp;{calm * 100}% <div className="calm-word">Calm</div>
      </div>
    </main>
  );
}
