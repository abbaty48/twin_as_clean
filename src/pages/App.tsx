import { App } from 'antd'
import Home from '@pages/home';
import { RecoilRoot } from 'recoil'
import Schedule from '@pages/schedule';
import Subscribe from '@pages/subscribe';
import Completion from '@pages/completion';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

function Main() {

  return (
    <RecoilRoot>
      <App>
        <div className='relative h-screen font-body text-primary-color'>
          <div className={'relative flex flex-col md:max-w-screen-lg w-[85%] m-auto py-4 h-full space-y-2'}>
            <div className={'flex flex-row flex-wrap justify-between items-center'}>
              {/* LOGO */}
              <a href={'/'} className={'text-2xl hover:text-secondary-color'}>
                <div className={'font-extrabold flex items-center space-x-2'}>
                  <p>Twice</p>
                  <p className={'inline-block  rounded-full text-[10px] leading-6 h-5 w-5 text-center text-white bg-secondary-color shadow-sm shadow-[rgb(110,110,110)]'}>AS</p>
                  <p>Clean</p>
                </div>
              </a>
              {/* CONTACT */}
              <button className={'rounded-full text-base p-3 bg-secondary-color text-white text-center font-bold hover:bg-opacity-80'}>Contact Us</button>
            </div>
            <div className={'flex-1'}>
              <Router>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/schedule' element={<Schedule />} />
                  <Route path="/subscribe" element={<Subscribe />} />
                  <Route path="/completion" element={<Completion />} />
                  <Route element={<Home />} />
                </Routes>
              </Router>
            </div>
          </div>
        </div>
      </App>
    </RecoilRoot>);
}

export default Main;
