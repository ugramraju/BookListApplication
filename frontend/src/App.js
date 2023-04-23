import './App.css';
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Registration from './components/Registration/Registration';
import Login from "./components/Login/Login"
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
