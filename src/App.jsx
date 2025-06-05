import './App.css'

import Piecharts from './components/Piecharts.jsx'
import Goal from './components/Goal.jsx'
import WebBlocker from './components/WebBlocker.jsx'
import { useEffect } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full rounded-xl p-4  border-white/50">
        <div className="flex justify-center items-center text-center border border-white rounded-xl p-4">
          <Goal />
        </div>
        <div className="flex justify-center items-center text-center border border-white rounded-xl p-6 md:p-8">
          {/* <Piecharts /> */}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center items-center text-center border border-white rounded-xl p-4">
          <WebBlocker />
        </div>
      </div>
    </div>
  )
}

export default App
