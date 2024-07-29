"use client";

import { useState } from "react";
import Form from "./Form";
import Preview from "./Preview";

const Home = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Resume Builder</h1>
      <Form onSubmit={handleFormSubmit} />
      {formData && <Preview data={formData} />}
    </div>
  );
};

export default Home;
