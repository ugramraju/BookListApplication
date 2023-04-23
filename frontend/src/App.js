import './App.css';
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Registration from './components/Registration/Registration';
import Login from "./components/Login/Login";
import DisplayData from "./components/BooksData/BooksData";
import BooksForm from "./components/BooksForm/BooksForm"
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='displaydata' element={<DisplayData/>}/>
      <Route path='booksform' element={<BooksForm/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
