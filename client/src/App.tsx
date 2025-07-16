import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { store } from "./redux/store";
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter/>
      </Router>
    </Provider>
  );
}

export default App;
