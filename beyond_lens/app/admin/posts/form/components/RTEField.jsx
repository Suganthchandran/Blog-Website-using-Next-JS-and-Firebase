import dynamic from 'next/dynamic';
import { usePostForm } from '../contexts/PostFormContext';

// Use dynamic import to prevent SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export function RTEField() {
  const { data, handleData } = usePostForm();

  const handleEditorChange = (content) => {
    handleData('content', content);
  };


  return (
    <div>
        
      <Editor
        apiKey="h5cqdkecqw1ty66807cc3a5gp38bn0v7o1wlbavxpaoiv89j"
        value={data?.content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'link', 
            'image', 
            'lists', 
            'table', 
            'emoticons', 
            'code',
            'advlist',
          ],
          toolbar: 
            'undo redo | formatselect | fontsizeselect | ' +
            'bold italic underline | forecolor backcolor | ' +
            'alignleft aligncenter alignright | bullist numlist outdent indent | ' +
            'link image media | table emoticons code',
        block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          placeholder: 'Enter your content here...',
        }}
      />
    </div>
  );
}
