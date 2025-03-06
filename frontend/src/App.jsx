import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AddHotels from './pages/AddHotels'
import FeedbackPage from './pages/FeedbackPage'
import HotelDetail from './components/HotelDetail'
import About from './pages/About'
import Properties from './pages/Properties'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Myrooms from './pages/Myrooms'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16"> {/* Push content below Navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/myrooms' element={<Myrooms />} />
          <Route path="/about" element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path='/addhotel' element={<AddHotels />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
