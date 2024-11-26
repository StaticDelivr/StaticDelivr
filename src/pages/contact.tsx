import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradientCard from '../components/GradientCard';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div>
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
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What can we help you with?"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
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
