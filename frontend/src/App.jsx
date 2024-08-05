import './index.css';
import AllBody from './component/AllBody';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div className="App">
      <AllBody/>
      <Toaster/>
    </div>
  );
}
export default App;

