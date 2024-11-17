// App.tsx
import React, { useState } from 'react';
import { JsonEditor } from './components/JsonEditor';
import { DynamicForm } from './components/DynamicForm';
import { FormSchema, FormValues } from './types';

const DEFAULT_SCHEMA = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    }
    // ... rest of the sample schema
  ]
};

export default function App() {
  const [schema, setSchema] = useState<FormSchema>(DEFAULT_SCHEMA);
  const [isValidJson, setIsValidJson] = useState(true);

  const handleJsonChange = (json: string, isValid: boolean) => {
    setIsValidJson(isValid);
    if (isValid) {
      try {
        setSchema(JSON.parse(json));
      } catch (e) {
        console.error('Failed to parse JSON:', e);
      }
    }
  };

  const handleFormSubmit = (data: FormValues) => {
    console.log('Form submitted with values:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dynamic Form Generator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">JSON Schema Editor</h2>
            <JsonEditor
              initialValue={JSON.stringify(DEFAULT_SCHEMA, null, 2)}
              onChange={handleJsonChange}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
            {isValidJson ? (
              <DynamicForm schema={schema} onSubmit={handleFormSubmit} />
            ) : (
              <div className="text-red-500">
                Please fix the JSON errors to see the form preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
