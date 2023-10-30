import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<IndexPage />}
            />
            <Route
              path="/account"
              element={<AccountPage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
