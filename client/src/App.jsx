import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import IndexPage from "./pages/index/IndexPage";
import AccountPage from "./pages/account/AccountPage";
import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";
import { UserContextProvider } from "./contexts/UserContext";
import NewLearner from "./pages/account/NewLearner";
import NewTutor from "./pages/account/NewTutor";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <UserContextProvider>
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
              path="/account/tutor/new"
              element={<NewTutor />}
            />
            <Route
              path="/account/learner/new"
              element={<NewLearner />}
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
      </UserContextProvider>
    </Router>
  );
}

export default App;
