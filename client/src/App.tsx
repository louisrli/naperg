import { useLocation } from 'react-router-dom';
import { Home } from './page/Home/Home';
import { SourcesList } from './components/SourcesList/SourcesList';
import { Routes, Route, Link } from 'react-router-dom';
import { Source } from './page/Source/Source';
import { Post } from './page/Post/Post';
import { User } from './page/User';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      <header>
        <Link to='/'>Main page</Link>
        <Link to='/user'>User</Link>
      </header>
      <div className='layout'>
        {/* TODO: delete hardcode  location.pathname !== '/user' */}
        {location.pathname !== '/user' && (
          <aside>
            <SourcesList />
          </aside>
        )}
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/sources/:id' element={<Source />} />
            <Route path='/posts/:id/' element={<Post />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
