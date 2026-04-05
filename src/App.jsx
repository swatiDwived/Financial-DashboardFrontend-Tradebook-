import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Tools from "./pages/Tools";
import Layout from "./components/Layout";
import LearningHub from "./pages/LearningHub";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Temporary Home Route for now */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
              <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tools"
          element={
            <ProtectedRoute>
              <Layout>
              <Tools />
              </Layout>
            </ProtectedRoute>
          }
        />
             {/* Learning Hub (new) */}
          <Route
            path="/learning-hub"
            element={
              <ProtectedRoute>
                <Layout>
                  <LearningHub />
                </Layout>
              </ProtectedRoute>
            }
          />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
    </div>
  );
}

export default App;
