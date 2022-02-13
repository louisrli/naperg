import './App.css';
import { Home } from './page/Home/Home';
import { SourcesList } from './components/SourcesList/SourcesList';

function App() {
  return (
    <div className='App'>
      {/*<header className='App-header'>*/}
      {/*</header>*/}
      <Home />
      <SourcesList />
    </div>
  );
}

export default App;
