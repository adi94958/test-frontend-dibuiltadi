import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/atoms/Loading";

const Pages = React.lazy(() => import("./pages"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading centered={true} size="lg" />}>
          <Pages />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
