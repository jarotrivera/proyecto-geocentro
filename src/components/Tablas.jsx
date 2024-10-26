import React, { useState } from 'react';
import './Tablas.css';

const TableRow = ({ header, data, onEdit }) => {
  return (
    <div className={`table-row ${header ? 'header' : ''}`}>
      {data.map((cell, index) => (
        <div
          key={index}
          className="table-cell"
          contentEditable={!header && !!onEdit}
          suppressContentEditableWarning={true}
          onBlur={(e) => onEdit && onEdit(index, e.target.textContent)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

const Tablas = () => {
  const [gastos, setGastos] = useState([
    { mes: 'Enero', monto: '$5,000,000 CLP' },
    { mes: 'Febrero', monto: '$4,000,000 CLP' },
  ]);

  const [ingresos, setIngresos] = useState([
    { mes: 'Enero', monto: '$10,000,000 CLP' },
    { mes: 'Febrero', monto: '$12,000,000 CLP' },
  ]);

  const handleGastoEdit = (index, value) => {
    const updatedGastos = [...gastos];
    updatedGastos[index].monto = value;
    setGastos(updatedGastos);
  };

  const handleIngresoEdit = (index, value) => {
    const updatedIngresos = [...ingresos];
    updatedIngresos[index].monto = value;
    setIngresos(updatedIngresos);
  };

  return (
    <div className="tables-container">
      <div className="table-section">
        <h3 className="table-title">Resumen General</h3>
        <div className="table">
          <TableRow header data={['Concepto', 'Monto']} />
          <TableRow data={['Saldo Actual', '$50,000,000 CLP']} />
          <TableRow data={['Ingresos Recientes', '$90,000,000 CLP']} />
          <TableRow data={['Gastos Recientes', '$15,000,000 CLP']} />
          <TableRow data={['Proyección de Saldo', '$55,000,000 CLP']} />
        </div>
      </div>

      <div className="table-section">
        <h3 className="table-title">Gastos Detallados</h3>
        <div className="table">
          <TableRow header data={['Mes', 'Monto']} />
          {gastos.map((gasto, index) => (
            <TableRow
              key={index}
              data={[gasto.mes, gasto.monto]}
              onEdit={(cellIndex, value) => handleGastoEdit(index, value)}
            />
          ))}
        </div>
      </div>

      <div className="table-section">
        <h3 className="table-title">Ingresos Detallados</h3>
        <div className="table">
          <TableRow header data={['Mes', 'Monto']} />
          {ingresos.map((ingreso, index) => (
            <TableRow
              key={index}
              data={[ingreso.mes, ingreso.monto]}
              onEdit={(cellIndex, value) => handleIngresoEdit(index, value)}
            />
          ))}
        </div>
      </div>

      <div className="table-section">
        <h3 className="table-title">Fondos de Reserva</h3>
        <div className="table">
          <TableRow header data={['Fondo', 'Monto']} />
          <TableRow data={['Fondo de Emergencia', '$12,000,000 CLP']} />
          <TableRow data={['Ahorro para Renovación de Áreas Comunes', '$7,000,000 CLP']} />
        </div>
      </div>
    </div>
  );
};

export default Tablas;
