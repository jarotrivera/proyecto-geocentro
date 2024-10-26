import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; 
import Login from './views/Login';
import Registro from './views/Registro';
import AreasComunes from './views/AreasComunes';
import TusVentas from './views/TusVentas';
import Estacionamiento from './views/Estacionamiento';
import VistaHacerUnPost from './views/VistaHacerUnPost';
import VistaHacerUnaVenta from './views/VistaHacerUnaVenta';
import PaginaInicial from './views/PaginaInicial';
import TusPreguntas from './views/TusPreguntas';
import PaginaVentas from './views/PaginaVentas';
import GastosComunes from './views/GastosComunes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" />} /> {/* Redirección a registro */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />   
          <Route path="registro" element={<Registro />} />
          <Route path="areas-comunes" element={<AreasComunes />} />
          <Route path="tusventas" element={<TusVentas />} />
          <Route path="estacionamiento" element={<Estacionamiento />} />
          <Route path="vistahacerunpost" element={<VistaHacerUnPost />} />
          <Route path="vistahacerunaventa" element={<VistaHacerUnaVenta />} />
          <Route path="paginainicial" element={<PaginaInicial />} />
          <Route path="tuspreguntas" element={<TusPreguntas />} />
          <Route path="paginaventas" element={<PaginaVentas />} />
          <Route path="gastoscomunes" element={<GastosComunes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
