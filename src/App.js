import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginBox from './components/LoginBox';
import SignupBox from './components/SignupBox';
import Footer from './components/Footer';
import FindIdBox from './components/FindIdBox';
import FindPwBox from './components/FindPwBox';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Routes>
          <Route path="/find-password" element={<FindPwBox />} />
          <Route path='/find-id' element={<FindIdBox />} />
          <Route path="/signup" element={<SignupBox />} />
          <Route path="/login" element={<LoginBox />} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
};

export default App;