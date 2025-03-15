import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed spelling and added Routes
import Home from './screens/HomeScreen/HomePage'; // Added missing Home import; // Added missing PlayGround import
import { PlaygroundProvider } from './Providers/PlaygroundProvider';
import ModalProvider from './Providers/ModalProvider';
import "primereact/resources/themes/saga-blue/theme.css"; // Or any other PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import PlayGround from './screens/PlayGroundScreen/PlayGround'; // Added missing PlayGround import


function App() {
  return (
  <PlaygroundProvider>
     <ModalProvider>
              <BrowserRouter> {/* Fixed spelling */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playground/:fileId/:folderId" element={<PlayGround />} />
              </Routes>
             </BrowserRouter>
     </ModalProvider>
  </PlaygroundProvider>
  );
}

export default App;
