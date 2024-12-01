import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist. Please check the URL or return to the homepage." />
      </Head>

      <Header />

      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            404
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Go Back Home
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Custom404;
