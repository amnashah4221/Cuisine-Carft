import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/landing.jsx'
import Mainpage from './components/mainpage.jsx'; 
import Favorites from './components/favorites.jsx';
import DetailsPage from './components/detailspage.jsx';
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/main' element = {<Mainpage/>} />
        <Route path='/favorites' element = {<Favorites/>} />
        <Route path="/meal/:id" element={<DetailsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
