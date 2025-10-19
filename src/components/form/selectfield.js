'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown, FaAngleUp, FaX } from 'react-icons/fa6';

const SelectField = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        // Only add event listener on client side
        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        if (Array.isArray(props.field.options)) {
            const selectedOption = props.field.options.find(
                opt => opt.value === props.formData[props.field.field]?.value
            );
            setSelectedLabel(selectedOption ? selectedOption.label : props.field.placeholder);
        }
    }, [props.formData, props.field]);
    
    
    const filteredOptions = props.field.searchable
        ? props.field.options.filter(option => option?.label?.toLowerCase().includes(searchTerm?.toLowerCase()))
        : props.field.options;

    const hasError = props.errors && props.errors[props.field.field];

    const handleClear = () => {
        props.handleChange({ target: { value: '' } }, props.field); // Clear the selected value
        setSelectedLabel(props.field.Placeholder); // Reset the label
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    return (
        <>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${hasError ? 'text-red-500' : ''}`}>
                {props.field.text}
                {props.field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative" ref={dropdownRef}>
                <div
                    className={`border p-2 rounded-md w-full text-sm cursor-pointer flex justify-between items-center 
                    ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span>{selectedLabel}</span>
                    <div className="flex gap-2">
                        {props.field.clearable && selectedLabel !== (props.field.Placeholder) && (
                            <FaX
                                className="text-gray-500 cursor-pointer hover:text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                            />
                        )}
                        {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute left-0 w-full bg-white shadow-md border rounded-md mt-1 z-10">
                        {props.field.searchable && (
                            <input
                                type="text"
                                className="border-b p-2 w-full text-sm outline-none"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        )}

                        <ul className="max-h-40 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            props.handleChange({ target: { value: option } }, props.field);
                                            setSelectedLabel(option.label);
                                            setSearchTerm('');
                                            setIsDropdownOpen(false);
                                            
                                            props.handleFieldChange({ target: { value: option } }, props.field)
                                        }}
                                    >
                                        {option.label}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">No options found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectField;
