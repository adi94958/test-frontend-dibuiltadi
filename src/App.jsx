import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const Pages = React.lazy(() => import("./pages"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Pages />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
