import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Testimonials from "./Components/Testimonials/Testimonials";
import Contact from "./Components/Contact/Contact";
import PublicLayout from "./Components/PublicLayout/PublicLayout";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
import Minigallery from "./Components/Minigallery/Minigallery";
import Recservice from "./Components/Recservice/Recservice";
import Company from "./Components/Company/Company";
import Whyus from "./Components/Whyus/Whyus";

import Welcome from "./Components/Welcome/Welcome";
import Scroll from "./Components/Scroll/Scroll";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Contactus from "./pages/Contactus";

import Login from "./pages/login";
import AdminPanel from "./pages/AdminPanel";
import InsertTestimonial from "./pages/InsertTestimonials";
import InsertAboutText from "./pages/InsertAboutText";
import InsertGallery from "./pages/InsertGallery";
import TaskManager from "./pages/TaskManager"; 
import Summary from "./pages/Summary";
import ProtectedRoute from "./Components/Routeprotect/Routeprotect";
import Editservices from "./pages/Editservices";
import Editcompany from "./pages/Editcompany";

import "./pages/Login.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);

  return (
    <Router>
      <Scroll />
      <Routes>
        {/* Admin */}
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

        <Route
          path="/Admin-panel"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <AdminPanel username={currentUser?.name}/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/Edit-company"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <Editcompany />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/Edit-testimonials"
          element={
           <ProtectedRoute user={currentUser} requiredPerm="1">
             <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
               <InsertTestimonial/>
             </AdminLayout>
             </ProtectedRoute>
           }
        />

        <Route
          path="/Admin-panel/Edit-Services"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <Editservices/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/Edit-about-txt"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <InsertAboutText/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/Edit-Gallery"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <InsertGallery/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/Summary"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <Summary/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Admin-panel/tasks"
          element={
            <ProtectedRoute user={currentUser} requiredPerm="1">
              <AdminLayout user={currentUser} onLogout={() => setCurrentUser(null)}>
                <TaskManager/>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* User */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Welcome />
              <Hero />
              <div>
                  <About />
                  <Whyus />
                  <Recservice />
                  <Minigallery />
                  <Company/>
                  <Testimonials />
                  <Contact />
              </div>
            </PublicLayout>
          }
        />
        <Route path="/Aboutus" element={<PublicLayout><Aboutus /></PublicLayout>} />
        <Route path="/Services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/Works" element={<PublicLayout><Works /></PublicLayout>} />
        <Route path="/Contactus" element={<PublicLayout><Contactus /></PublicLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
