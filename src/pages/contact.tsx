import React from 'react';
import Head from 'next/head';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradientCard from '../components/GradientCard';

const ContactPage: React.FC = () => {
  const formKey = process.env.NEXT_PUBLIC_FORM;

  // Use the form hook regardless of formKey presence
  const [state, handleSubmit] = useForm(formKey || ''); // default to empty string if formKey is missing

  // Check if the form key exists and handle accordingly
  if (!formKey) {
    return (
      <div>
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Form Configuration Error</h1>
          <p className="text-lg text-gray-600">Please check your Formspree configuration. The form ID is missing or invalid.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (state.succeeded) {
    return (
      <div>
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600">Your message has been successfully sent. We will get back to you shortly.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Contact - StaticDelivr</title>
        <meta name="description" content="Get in touch with the StaticDelivr team. Reach out with your questions, suggestions, or feedback." />
        <meta name="keywords" content="contact StaticDelivr, reach out, contact support, questions, feedback, suggestions, open-source support, StaticDelivr team, get in touch, customer support, StaticDelivr contact" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact - StaticDelivr" />
        <meta property="og:description" content="Get in touch with the StaticDelivr team. Reach out with your questions, suggestions, or feedback." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/contact" />
        <meta name="twitter:title" content="Contact - StaticDelivr" />
        <meta name="twitter:description" content="Get in touch with the StaticDelivr team. Reach out with your questions, suggestions, or feedback." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Contact StaticDelivr
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              We&apos;d love to hear from you. Whether you have a question, suggestion, 
              or just want to say hello, feel free to reach out.
            </p>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GradientCard
                icon={<Mail className="w-6 h-6 text-white" />}
                title="Email"
                description="Reach out to our support team directly at coozy@staticdelivr.com"
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
                action={{
                  text: "Send Email",
                  href: "mailto:coozy@staticdelivr.com",
                }}
              />
              <GradientCard
                icon={<MapPin className="w-6 h-6 text-white" />}
                title="Location"
                description="We are a fully remote team working globally to support open-source projects"
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
              <GradientCard
                icon={<Phone className="w-6 h-6 text-white" />}
                title="Community"
                description="Join our discussions on GitHub to connect with our team"
                gradient="from-green-50 to-green-100"
                iconBg="bg-green-600"
                action={{
                  text: "GitHub Discussions",
                  href: "https://github.com/Coozywana/StaticDelivr/discussions",
                }}
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl p-10">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What can we help you with?"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;