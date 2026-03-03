import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">ERP Modules</h2>
        <ul>
          <li className="mb-2"><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li className="mb-2"><Link to="/tech" className="hover:underline">Tech</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
