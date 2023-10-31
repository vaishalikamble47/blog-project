import logo from './logo.svg';
import './App.css';
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Home from './Pages/Home';
import AddEdit from './Pages/AddEdit';
import Blog from './Pages/Blog';
import NotFound from './Pages/NotFound';
import About from "./Pages/About";
import Header from './Component/Header';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/addEdit' element={<AddEdit/>} />
          <Route path='/addEdit/:id' element={<AddEdit/>} />
          <Route path='/blog/:id' element={<Blog/>} />
          <Route path='/about' element={<About/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
