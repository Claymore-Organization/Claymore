import "./AddFigure.css";
import NewFigureForm from '../components/NewFigureForm';

function App() {

  return (
    <div className="App">
      <div className="pageContent">
        <div className="payloadList">
          <NewFigureForm />
        </div>
      </div>
    </div>
  );
}

export default App;
