import Header from "../components/Header";
import "./AddFigure.css";
import NewDonutForm from '../components/NewFigureForm';

function App() {

  return (
    <div className="App">
      <Header />
      <div className="pageContent">
        <div className="payloadList">
          <NewDonutForm />
        </div>
      </div>
    </div>
  );
}

export default App;
