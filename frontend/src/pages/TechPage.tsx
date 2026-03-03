import React from 'react';
import TechTable from '../components/TechTable';
import TechForm from '../components/TechForm';

const TechPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tech Module</h1>
      <TechForm />
      <TechTable />
    </div>
  );
};

export default TechPage;
