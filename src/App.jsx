
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from './routes/UserRoute'
function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
      </Routes>

    </Router>
      
      
    </>
  );
}

export default App;
