import React, { useState } from 'react';
import { Tech } from '../types';

const TechForm: React.FC = () => {
  const [formData, setFormData] = useState<Tech>({ id: 0, name: '', version: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitted:', formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label>Version: </label>
        <input
          type="text"
          name="version"
          value={formData.version}
          onChange={handleChange}
          className="border px-2 py-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
};

export default TechForm;
