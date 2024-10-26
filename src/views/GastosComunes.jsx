import React from 'react';
import Sidebar from "../components/Menu";
import Tables from "../components/Tablas"; 
import RightPanel2 from "../components/RightPanel2";
import './GastosComunes.css';

const GastosComunes = () => {
  return (
    <div className="gastos-comunes">
      <main className="sidebar-and-table">
        <Sidebar />  {/* Sidebar importado */}
        <section className="sidebar-and-table-content">
          <div className="table-container">
            <Tables />  {/* Componente de tablas con funcionalidad de edición */}
          </div>
        </section>
        <RightPanel2 />  {/* Panel derecho */}
      </main>
    </div>
  );
};

export default GastosComunes;
