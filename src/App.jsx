import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserModule from './modules/user';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/user-list');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      <UserModule />
    </div>
  );
}

export default App;
