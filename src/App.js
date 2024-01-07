import './Style.css';
import './Style.scss';
import './assets/font/stylesheet.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import Home from './Component/Home'

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
      <Route  
        path="/*"
        element={
        <div>
          <Routes>
              <Route path="/" element={<Home/>}/>        
                 
         
          </Routes>
   
        </div>
        }
        />
       
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
