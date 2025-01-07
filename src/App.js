import React from 'react';
import Header from './components/Header';
import LoginBox from './components/LoginBox';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header/>
      <main>
        <LoginBox/>
      </main>
      <Footer/>
    </div>
  );
};

export default App;