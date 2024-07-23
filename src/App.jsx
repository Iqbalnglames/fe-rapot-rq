
import Navbar from "./components/navbar";
import { Sidebar } from "./components/sidebar"
import { Navigation } from './utilities/router';

function App() {
  return (
    <>
    <div className='flex'>
    <Sidebar />
    <div className="flex z-10 flex-col w-full">
    <Navbar />
    <div className="p-8">
    <Navigation />
    </div>
    </div>
    </div>
    </>
  )
}

export default App
