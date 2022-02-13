import './App.css';
import { Home } from './page/Home/Home';
import { SourcesList } from './components/SourcesList/SourcesList';
import { Routes, Route } from 'react-router-dom';
import { Source } from './page/Source/Source';
import { Post } from './page/Post/Post';

function App() {
  return (
    <div className='App'>
      <div className='layout'>
        <aside>
          <SourcesList />
        </aside>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sources/:id' element={<Source />} />
            <Route path='/posts/:id/' element={<Post />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
