import Header from "../components/Header";
import "./AddFigure.css";
import NewPostForm from "../components/NewPostForm";

function App() {

  return (
    <div className="App">
      <Header />
      <div className="pageContent">
        <div className="payloadList">
          <NewPostForm />
        </div>
      </div>
    </div>
  );
}

export default App;
