import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";

export default function App() {
  return (
    <Router>
      <Pages />
    </Router>
  );
}
