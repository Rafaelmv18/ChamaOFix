import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MVPApp from "./pages/MVPApp";
import { AppModeProvider } from "./context/AppModeContext";

function App() {
  return (
    <AppModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/*" element={<MVPApp />} />
        </Routes>
      </BrowserRouter>
    </AppModeProvider>
  );
}

export default App;
