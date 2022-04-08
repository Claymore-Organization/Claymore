import Header from "../components/Header";
import "./AddFigure.css";
import NewFigureForm from '../components/NewFigureForm';

function App() {

  return (
    <div className="App">
      <Header />
      <div className="pageContent">
        <div className="payloadList">
          <NewFigureForm />
        </div>
      </div>
    </div>
  );
}

export default App;
