import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar"
import Menubar from "./components/Menubar"
import SignIn from "./components/SignIn";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  return (
    <div className="container text-sm mx-auto font-sans">
    <AuthContext.Provider value={ { user, setUser } }>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element=
          {user ? 
            <Menubar /> : <Navigate to='/signin' />
          } />
      </Routes>
      </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
