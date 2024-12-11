import React, { useState } from 'react';
import { Package, Github } from 'lucide-react';

const QuickStartSection = () => {
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState('npm');

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tab navigation for NPM, GitHub, WordPress, and Google Fonts */}
          <div className="flex border-b">
            {/* NPM tab */}
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'npm' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('npm')}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              NPM
            </button>
            {/* GitHub tab */}
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'github' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('github')}
            >
              <Github className="w-4 h-4 inline-block mr-2" />
              GitHub
            </button>
            {/* WordPress tab */}
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'wordpress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('wordpress')}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              WordPress
            </button>
            {/* Google Fonts tab */}
            <button
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'google-fonts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('google-fonts')}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              Google Fonts
            </button>
          </div>
          {/* Content area based on the active tab */}
          <div className="p-6 bg-gray-50">
            {activeTab === 'npm' && (
              <div>
                {/* Instructions for loading NPM packages */}
                <p className="text-sm text-gray-600 mb-4">Load any npm package:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/npm/package@version/file
                </pre>
                {/* Example usage for React */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with React:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js
                </pre>
              </div>
            )}
            {activeTab === 'github' && (
              <div>
                {/* Instructions for loading GitHub repository files */}
                <p className="text-sm text-gray-600 mb-4">Load any GitHub repository file:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gh/user/repo/branch/file
                </pre>
                {/* Example usage for jQuery */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with jQuery:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gh/jquery/jquery/3.6.4/dist/jquery.min.js
                </pre>
              </div>
            )}
            {activeTab === 'wordpress' && (
              <div>
                {/* Instructions for loading WordPress themes */}
                <p className="text-sm text-gray-600 mb-4">Load any WordPress theme:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/wp/themes/theme-name/version/file
                </pre>
                {/* Example usage for a WordPress theme */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with a theme:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/wp/themes/twentytwentythree/1.0/style.css
                </pre>
                {/* Instructions for loading WordPress plugins */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Load any WordPress plugin:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/wp/plugins/plugin-name/tags/tag-name/file
                </pre>
                {/* Example usage for a WordPress plugin */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with a plugin:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js
                </pre>
              </div>
            )}
            {activeTab === 'google-fonts' && (
              <div>
                {/* Instructions for loading Google Fonts */}
                <p className="text-sm text-gray-600 mb-4">Load any Google Font:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gfonts/css2?family=Font+Name
                </pre>
                {/* Example usage for Open Sans */}
                <p className="text-sm text-gray-600 mt-4 mb-2">Example with Open Sans:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans
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
