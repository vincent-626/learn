import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/index/IndexPage";
import AccountPage from "./pages/account/AccountPage";
import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";

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
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
