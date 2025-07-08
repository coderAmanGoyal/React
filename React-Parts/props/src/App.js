import logo from './logo.svg';
import './App.css';
import Header from './Header';

function App() {
  let headerInfo = {
    name: "Ak",
    class: "bsc",
    age: 19
  }
  return (
    <div className="App">
      <Header info={headerInfo} cname="Aman" className="App-header">
        <h3>Welcome to header section</h3>
      </Header>  
    </div>
  );
}

export default App;
