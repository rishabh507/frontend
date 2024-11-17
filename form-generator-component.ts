// components/DynamicForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSchema, FormValues } from '../types';

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (data: FormValues) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();

  const renderField = (field: FormSchema['fields'][0]) => {
    const commonProps = {
      ...register(field.id, {
        required: field.required ? 'This field is required' : false,
        pattern: field.validation
          ? {
              value: new RegExp(field.validation.pattern!),
              message: field.validation.message,
            }
          : undefined,
      }),
      placeholder: field.placeholder,
      className: `w-full p-2 border rounded-md ${
        errors[field.id] ? 'border-red-500' : 'border-gray-300'
      }`,
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p className="text-gray-600">{schema.formDescription}</p>

      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block font-medium">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="text-sm text-red-500">
              {errors[field.id]?.message as string}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {isSubmitSuccessful && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          Form submitted successfully!
        </div>
      )}
    </form>
  );
};
