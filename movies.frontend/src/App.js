import './App.css';
import Appbar from './components/Appbar';
import Customer from './components/Customer';
import Movie from './components/Movie';
import Reservation from './components/Reservation';
import Showtime from './components/Showtime';
import Theater from './components/Theater';

function App() {
  return (
    <div className="App">
      <Appbar />
      <Customer />
      <Movie />
      <Reservation />
      <Showtime />
      <Theater />
    </div>
  );
  
}

export default App;
