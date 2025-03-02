import Footer from "../components/Footer"
import HotelList from "../components/HotelList"
import Navbar from "../components/Navbar"
import NavigationBar from "../components/NavigationBar"
import SearchFilterDistrict from "../components/SearchFilterDistrict"


const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchFilterDistrict />
      <HotelList />
      <NavigationBar />

      <footer className="bg-gray-900 text-white pb-20">
        <Footer />
      </footer>

    </div>
  )
}

export default Home