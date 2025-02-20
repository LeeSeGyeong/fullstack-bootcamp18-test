import { Routes, Route } from "react-router-dom";

import DocumentItem from "../pages/Document/components/DocumentItem";
import DocumentForm from "../pages/Document/components/DocumentForm";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

function App() {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/newDoc" element={<DocumentForm />} />
    <Route path="/docs/:docId" element={<DocumentItem />} />
    <Route path="/err" element={<ErrorPage />} />
   </Routes>
  );
}

export default App;
