import './App.css';
import { useState, useEffect } from 'react';
import Clock from './components/Clock.jsx';
import Goal from './components/Goal.jsx';
import WebBlocker from './components/WebBlocker.jsx';

function App() {
  const [isPopup, setIsPopup] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setIsPopup(false);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 text-white p-4 ${isPopup ? 'min-w-[360px] max-w-[480px] flex justify-center items-center' : ''}`}>
      <div className={`flex flex-col gap-4 w-full rounded-xl p-4 border border-white/50 ${isPopup ? '' : 'max-w-4xl mx-auto'}`}>
        <div className="border border-white rounded-xl p-4 text-center">
          <Goal />
        </div>
        <div className="border border-white rounded-xl p-4 text-center">
          <Clock />
        </div>
        <div className="border border-white rounded-xl p-4 text-center">
          {/* <WebBlocker /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
