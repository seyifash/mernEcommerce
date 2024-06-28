import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './LandingPage/Layout';
import Home from './LandingPage/Home';
import Home2 from './component/Home';
import Layout2 from './component/Layout';
import Blog from './component/Blog';
import Layout3 from './Layout/Layout';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/shop" element={<Layout2 />}>
          <Route path="Home" element={<Home2 />} />
          <Route path="blog" element={<Blog />} />
        </Route>
        <Route path="/admin" element={<Layout3 />}>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
