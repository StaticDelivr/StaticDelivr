import React, { useState } from 'react';
import { Package, Github } from 'lucide-react';

const QuickStartSection = () => {
  const [activeTab, setActiveTab] = useState('npm');

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'npm' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('npm')}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              NPM
            </button>
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'github' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('github')}
            >
              <Github className="w-4 h-4 inline-block mr-2" />
              GitHub
            </button>
          </div>
          <div className="p-6 bg-gray-50">
            {activeTab === 'npm' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">Load any npm package:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/npm/package@version/file
                </pre>
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with React:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js
                </pre>
              </div>
            )}
            {activeTab === 'github' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">Load any GitHub repository file:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gh/user/repo/branch/file
                </pre>
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with jQuery:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gh/jquery/jquery/3.6.4/dist/jquery.min.js
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
