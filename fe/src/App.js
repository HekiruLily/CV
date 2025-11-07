import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/shop/JSX/navbar'; 
import Intro from './components/gallery/JSX/intro';
import Year2005 from './components/gallery/JSX/2005'; 
import Year2006 from './components/gallery/JSX/2006'; 
import Year2007 from './components/gallery/JSX/2007';
import Year2008 from './components/gallery/JSX/2008';
import Year2009 from './components/gallery/JSX/2009';
import Year2010 from './components/gallery/JSX/2010';
import Year2011 from './components/gallery/JSX/2011';
import Year2012 from './components/gallery/JSX/2012';
import Year2013 from './components/gallery/JSX/2013';
import Year2014 from './components/gallery/JSX/2014';
import Year2015 from './components/gallery/JSX/2015';
import Year2016 from './components/gallery/JSX/2016';
import Year2017 from './components/gallery/JSX/2017';
import Year2018 from './components/gallery/JSX/2018';
import Year2019 from './components/gallery/JSX/2019';
import Year2020 from './components/gallery/JSX/2020';
import Year2021 from './components/gallery/JSX/2021';
import Year2022 from './components/gallery/JSX/2022';
import Year2023 from './components/gallery/JSX/2023';
import Year2024 from './components/gallery/JSX/2024';

import './transitions.css';

import Login from './components/shop/JSX/login';
import Shop from './components/shop/JSX/shop';
import ShopMen from './components/shop/JSX/shop-men';
import ShopWomen from './components/shop/JSX/shop-women';
import ShopAccessories from './components/shop/JSX/shop-accessories';
import ShopFlag from './components/shop/JSX/shop-flag';
import Payment from './components/shop/JSX/payment';
import Cart from './components/shop/JSX/cart';


function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  // Danh sách các đường dẫn không hiển thị Navbar
  const noNavbarPaths = [
    '/',
    '/2005',
    '/2006',
    '/2007',
    '/2008',
    '/2009',
    '/2010',
    '/2011',
    '/2012',
    '/2013',
    '/2014',
    '/2015',
    '/2016',
    '/2017',
    '/2018',
    '/2019',
    '/2020',
    '/2021',
    '/2022',
    '/2023',
    '/2024',
    '/login',
  ];

  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />} {/* Chỉ hiển thị Navbar nếu không phải là các trang trong danh sách */}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="slide"
          timeout={300}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<Intro />} />
              <Route path="/2005" element={<Year2005 />} />
              <Route path="/2006" element={<Year2006 />} />
              <Route path="/2007" element={<Year2007 />} />
              <Route path="/2008" element={<Year2008 />} />
              <Route path="/2009" element={<Year2009 />} />
              <Route path="/2010" element={<Year2010 />} />
              <Route path="/2011" element={<Year2011 />} />
              <Route path="/2012" element={<Year2012 />} />
              <Route path="/2013" element={<Year2013 />} />
              <Route path="/2014" element={<Year2014 />} />
              <Route path="/2015" element={<Year2015 />} />
              <Route path="/2016" element={<Year2016 />} />
              <Route path="/2017" element={<Year2017 />} />
              <Route path="/2018" element={<Year2018 />} />
              <Route path="/2019" element={<Year2019 />} />
              <Route path="/2020" element={<Year2020 />} />
              <Route path="/2021" element={<Year2021 />} />
              <Route path="/2022" element={<Year2022 />} />
              <Route path="/2023" element={<Year2023 />} />
              <Route path="/2024" element={<Year2024 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop-men" element={<ShopMen />} />
              <Route path="/shop-women" element={<ShopWomen />} />
              <Route path="/shop-accessories" element={<ShopAccessories />} />
              <Route path="/shop-flag" element={<ShopFlag />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;