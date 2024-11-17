// components/JsonEditor.tsx
import React from 'react';
import { useState, useEffect } from 'react';

interface JsonEditorProps {
  initialValue: string;
  onChange: (value: string, isValid: boolean) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      JSON.parse(value);
      setError(null);
      onChange(value, true);
    } catch (e) {
      setError((e as Error).message);
      onChange(value, false);
    }
  }, [value, onChange]);

  return (
    <div className="w-full h-full">
      <textarea
        className={`w-full h-[600px] font-mono p-4 text-sm border rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
      />
      {error && (
        <div className="mt-2 text-sm text-red-500">
          Invalid JSON: {error}
        </div>
      )}
    </div>
  );
};
