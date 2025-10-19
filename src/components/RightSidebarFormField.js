'use client'

import { useEffect, useState } from "react";
import SelectField from "@/components/form/selectfield";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = (props) => {
    const hasError = props.errors && props.errors[props.field.field];
    const [showPassword, setShowPassword] = useState(false);

    // Function to evaluate showIf conditions
    const shouldShow = (item) => {
        if (!item.showIf) return true;

        const { field: conditionField, values } = item.showIf;
        const fieldValue = props.formData[conditionField] ||
            (props.fields ? props.fields.find(f => f?.field === conditionField)?.defaultValue : undefined);

        return values.includes(fieldValue);
    };

    useEffect(() => {
        console.log("formData:", props.formData); // Debugging purpose

        if (!props.formData[props.field.field] && props.field.defaultValue) {
            props.handleChange(
                { target: { name: props.field.field, value: props.field.defaultValue } },
                props.field
            );
        }
    }, []);


    return shouldShow(props.field) ? (
        <div key={props.field.field} className="mb-3">
            {props.field.type === "file" ? (
                <>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${hasError ? 'text-red-500' : ''}`}>
                        {props.field.text}
                        {props.field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type="file"
                        className={`border p-2 rounded-md ${props.field.size || ''} text-sm 
                        ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                        onChange={(e) => props.handleChange(e, props.field)}
                        accept={props.field.accept}
                    />
                </>
            ) : props.field.type === "text" ? (
                <>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${hasError ? 'text-red-500' : ''}`}>
                        {props.field.text}
                        {props.field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type="text"
                        className={`border p-2 rounded-md ${props.field.size || ''} text-sm 
                        ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                        onChange={(e) => props.handleChange(e, props.field)}
                        defaultValue={props.formData[props.field.field] || props.field.defaultValue || ""}
                        disabled={props.field.disabled}
                        placeholder={props.field.placeholder}
                    />
                </>
            ) :
                props.field.type === "textarea" ? (
                    <>
                        <label className={`block text-sm font-medium text-gray-700 mb-1 ${hasError ? 'text-red-500' : ''}`}>
                            {props.field.text}
                            {props.field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <textarea
                            className={`border p-2 rounded-md ${props.field.size || ''} text-sm 
                        ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={(e) => props.handleChange(e, props.field)}
                            defaultValue={props.formData?.[props.field.field] || props.field.defaultValue || ""}
                            disabled={props.field.disabled}
                            rows={props.field.rows || 3}
                            placeholder={props.field.placeholder}
                        />
                    </>
                )
                    : props.field.type === "select" ? (
                        <SelectField
                            field={props.field}
                            formData={props.formData}
                            handleChange={props.handleChange}
                            errors={props.errors}
                            handleFieldChange={props.handleFieldChange}
                        />
                    ) : props.field.type === "radio" ? (
                        <>
                            <label className={`block text-sm font-medium mb-1 ${hasError ? 'text-red-500' : 'text-gray-700'}`}>
                                {props.field.text}
                                {props.field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {props.field.options.filter(shouldShow).map((option) => (
                                <div key={option.value} className="flex items-center space-x-2 mb-1">
                                    <input
                                        type="radio"
                                        id={`${props.field.field}-${option.value}`}
                                        name={props.field.field}
                                        value={option.value}
                                        checked={props.formData[props.field.field] === option.value}
                                        onChange={(e) => props.handleChange(e, props.field)}
                                    />
                                    <label htmlFor={`${props.field.field}-${option.value}`} className="text-gray-700 cursor-pointer">{option.label}</label>
                                </div>
                            ))}
                        </>
                    ) : props.field.type === "checkbox" ? (
                        <>
                            <label className={`block text-sm font-medium mb-1 ${hasError ? 'text-red-500' : 'text-gray-700'}`}>
                                {props.field.text}
                                {props.field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {props.field.options.filter(shouldShow).map((option) => (
    <div key={option.value} className="flex items-center space-x-2 mb-1">
        <input
            type="checkbox"
            id={`${props.field.field}-${option.value}`}
            name={props.field.field}
            value={option.value}
            checked={
                option.labelfield
                    ? props.formData[props.field.field]?.[option.labelfield] === 1
                    : props.formData[props.field.field] === 1
            }
            onChange={(e) => {
                const newValue = e.target.checked ? 1 : 0;
                let updatedValue;

                if (option.labelfield) {
                    updatedValue = {
                        ...(typeof props.formData[props.field.field] === "object"
                            ? props.formData[props.field.field]
                            : {}),
                        [option.labelfield]: newValue,
                    };
                } else {
                    updatedValue = newValue;
                }

                props.handleChange({
                    target: {
                        name: props.field.field,
                        value: updatedValue
                    }
                }, props.field);
            }}
        />
        <label htmlFor={`${props.field.field}-${option.value}`} className="text-gray-700 cursor-pointer">
            {option.label}
        </label>
    </div>
))}


                        </>
                    ) : props.field.type === "title" ? (
                        <h3 className={`text-lg font-medium mb-2 ${props.field.spacingtop} w-100 border-b border-gray-300 ${props.field.size}`}>{props.field.text}</h3>
                    ) : props.field.type === "password" ? (
                        <>
                            <label className={`block text-sm font-medium text-gray-700 mb-1 ${hasError ? "text-red-500" : ""}`}>
                                {props.field.text}
                                {props.field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`border p-2 rounded-md ${props.field.size || ""} text-sm 
                                                ${hasError ? "border-red-500" : "border-gray-300"}`}
                                    onChange={(e) => props.handleChange(e, props.field)}
                                    defaultValue={props.formData[props.field.field] || props.field.defaultValue || ""}
                                    disabled={props.field.disabled}
                                    placeholder={props.field.placeholder}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </>
                    ) : null}
        </div>
    ) : null;
};

export default FormField;