import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const MarkdownApp = () => {
  const [markdown, setMarkdown] = useState(localStorage.getItem('markdown') || '');
  const [compiled, setCompiled] = useState('');

  useEffect(() => {
    const result = md.render(markdown);
    setCompiled(result);
    localStorage.setItem('markdown', markdown);
  }, [markdown]);

  const handleScroll = (e) => {
    const { target } = e;
    const ratio = target.scrollTop / (target.scrollHeight - target.clientHeight);
    const other = target.nextElementSibling || target.previousElementSibling;
    other.scrollTop = ratio * (other.scrollHeight - other.clientHeight);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Markdown Editor</h1>
      </header>
      <main className="flex-grow flex">
        <div className="flex-1 p-4">
          <div className="mb-2 flex justify-between">
            <span className="font-semibold">Editor</span>
            <button
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([markdown], {type: 'text/markdown'});
                element.href = URL.createObjectURL(file);
                element.download = 'document.md';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save as .md
            </button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onScroll={handleScroll}
            className="w-full h-[calc(100vh-12rem)] p-2 border rounded resize-none"
            placeholder="Write your Markdown here..."
          />
        </div>
        <div className="flex-1 p-4">
          <div className="mb-2">
            <span className="font-semibold">Preview</span>
          </div>
          <div 
            dangerouslySetInnerHTML={{ __html: compiled }}
            onScroll={handleScroll}
            className="w-full h-[calc(100vh-12rem)] p-2 border rounded overflow-auto prose prose-sm"
          />
        </div>
      </main>
    </div>
  );
};

export default MarkdownApp;