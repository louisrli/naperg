import './App.css';
import { Home } from './page/Home/Home';
import { SourcesList } from './components/SourcesList/SourcesList';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { Source } from './page/Source/Source';

function App() {
  return (
    <div className='App'>
      {/*<header className='App-header'>*/}
      {/*</header>*/}
      <div className='layout'>
        <aside>
          <SourcesList />
        </aside>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sources/:id' element={<Source />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
