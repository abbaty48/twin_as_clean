import { App } from 'antd'
import Home from '@pages/home';
import { Route, Routes, BrowserRouter as Router, } from 'react-router-dom'

function Main() {
  return (
    <App>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Home />} />
        </Routes>
      </Router>
    </App>
  );
}

export default Main;
