import React, { useState } from 'react';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/Alert';

const PurgeCachePage = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Purge Cache
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Need to update your assets? Use our cache purge tool to ensure your users
              get the latest version of your files.
            </p>
          </div>
        </section>

        {/* Purge Form Section */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    Asset URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://cdn.staticdelivr.com/your/asset/path"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Purge Cache
                    </>
                  )}
                </button>
              </form>
            </div>

            {status === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <Check className="w-5 h-5 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  The cache has been successfully purged. Please allow a few minutes for the changes to propagate.
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-12 bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-semibold mb-4">Important Notes:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Cache purging may take up to 5 minutes to propagate across all edge locations.</p>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Make sure to include the complete URL path to the asset you want to purge.</p>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">For bulk purge requests or wildcard purging, please use our API.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PurgeCachePage;