import { useEffect } from "react";
import loginUser from "./api";

function App() {
  useEffect(() => {
    loginUser()
  }, []);
  return (
    <div className="App">
  App
    </div>
  );
}

export default App;
