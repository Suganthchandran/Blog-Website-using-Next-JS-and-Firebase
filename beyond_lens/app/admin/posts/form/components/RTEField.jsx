
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['extra-small', 'small', 'medium', 'large'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

export function RTEField() {
    const { content, setContent } = useState();

    const handleChange = (value) => {
        setContent(value);
    };

    return (
        <div>
            <ReactQuill
                value={content}
                onChange={handleChange}
                modules={modules}
                placeholder="Enter your content here..."
            />
        </div>
    );
}