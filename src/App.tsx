import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Games from './pages/Games';
import Play from './pages/Play';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<About />} />
        <Route path="games" element={<Games />} />
        <Route path="play/:slug" element={<Play />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
