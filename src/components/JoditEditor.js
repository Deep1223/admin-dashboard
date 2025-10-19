'use client'

import { useMemo, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading editor...</div>
});

const JoditEditorComponent = ({ 
    value = '', 
    onChange, 
    placeholder = 'Enter content...',
    disabled = false,
    height = 300,
    config = {},
    id,
    name
}) => {
    const editor = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Clean and organized toolbar configuration
    const defaultConfig = useMemo(() => {
        // Get toolbar preset from config or use default
        const toolbarPreset = config.toolbarPreset || 'standard';
        
        let buttons = [];
        
        switch (toolbarPreset) {
            case 'minimal':
                buttons = [
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'link', '|',
                    'undo', 'redo'
                ];
                break;
                
            case 'standard':
                buttons = [
                    'source', '|',
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'font', 'fontsize', '|',
                    'left', 'center', 'right', '|',
                    'link', 'image', '|',
                    'table', '|',
                    'undo', 'redo', '|',
                    'fullsize'
                ];
                break;
                
            case 'advanced':
                buttons = [
                    'source', '|',
                    'bold', 'italic', 'underline', 'strikethrough', '|',
                    'ul', 'ol', '|',
                    'font', 'fontsize', 'lineHeight', '|',
                    'left', 'center', 'right', 'justify', '|',
                    'indent', 'outdent', '|',
                    'link', 'image', 'table', '|',
                    'hr', '|',
                    'undo', 'redo', '|',
                    'fullsize', 'preview'
                ];
                break;
                
            case 'full':
                buttons = [
                    'source', '|',
                    'bold', 'italic', 'underline', 'strikethrough', '|',
                    'ul', 'ol', '|',
                    'font', 'fontsize', 'lineHeight', 'paragraph', '|',
                    'left', 'center', 'right', 'justify', '|',
                    'indent', 'outdent', '|',
                    'superscript', 'subscript', '|',
                    'link', 'image', 'video', 'table', '|',
                    'hr', 'symbol', '|',
                    'undo', 'redo', '|',
                    'fullsize', 'preview', 'about'
                ];
                break;
                
            default:
                buttons = [
                    'source', '|',
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'font', 'fontsize', '|',
                    'left', 'center', 'right', '|',
                    'link', 'image', '|',
                    'table', '|',
                    'undo', 'redo', '|',
                    'fullsize'
                ];
        }
        
        return {
            readonly: disabled,
            placeholder: placeholder,
            height: height,
            toolbar: true,
            spellcheck: true,
            language: 'en',
            toolbarButtonSize: 'medium',
            toolbarAdaptive: true, // Enable adaptive toolbar
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            askBeforePasteHTML: true,
            askBeforePasteFromWord: true,
            defaultActionOnPaste: 'insert_clear_html',
            buttons: buttons,
            uploader: {
                insertImageAsBase64URI: true
            },
            // Additional configuration for better functionality
            removeEmptyBlocks: true,
            enter: 'P',
            enterBlock: 'DIV',
            defaultMode: '1',
            useSplitMode: true,
            colorPickerDefaultTab: 'background',
            imageDefaultWidth: 300,
            // Clean UI settings
            showPlaceholder: true,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            showPoweredBy: false,
            ...config
        };
    }, [disabled, placeholder, height, config]);

    // Don't render on server side to avoid SSR issues
    if (!isClient) {
        return (
            <div style={{ 
                height: `${height}px`, 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#f9fafb'
            }}>
                Loading editor...
            </div>
        );
    }

    return (
        <div className="jodit-editor-wrapper" id={id} name={name}>
            <input 
                type="hidden" 
                id={id} 
                name={name} 
                value={value} 
            />
            <JoditEditor
                ref={editor}
                value={value}
                config={defaultConfig}
                onBlur={(newContent) => {
                    if (onChange) {
                        onChange({
                            target: {
                                name: name || 'content',
                                value: newContent
                            }
                        });
                    }
                }}
                onChange={(newContent) => {
                    // Optional: You can also handle onChange if needed
                    // This will trigger on every keystroke
                }}
            />
        </div>
    );
};

export default JoditEditorComponent;
