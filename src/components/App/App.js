
// ? стили
import './App.css';

import Matrix from './../Matrix/Matrix.jsx';

function App() {

  return (
    <section className="App">
      {/* // ? матричный дождь */}
      <Matrix />

      {/* // ? остальной сайт */}
      <div>
        <div></div>
        <div></div>
      </div>

    </section>
  );
}

export default App;
