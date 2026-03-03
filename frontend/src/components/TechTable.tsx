import React from 'react';
import { Tech } from '../types';

const data: Tech[] = [
  { id: 1, name: 'React', version: '18.0.0' },
  { id: 2, name: 'TypeScript', version: '4.3' },
];

const TechTable: React.FC = () => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Version</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tech) => (
          <tr key={tech.id}>
            <td className="border px-4 py-2">{tech.id}</td>
            <td className="border px-4 py-2">{tech.name}</td>
            <td className="border px-4 py-2">{tech.version}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TechTable;
