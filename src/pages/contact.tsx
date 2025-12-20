import React from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Send, MessageSquare,
  Terminal, ArrowRight, Github, Heart
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ContactPage = () => {
  // Formspree Setup
  const formKey = process.env.NEXT_PUBLIC_FORM;
  const [state, handleSubmit] = useForm(formKey || '');

  // --- Success State ---
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-purple-500/30 font-sans">
        <NextSeo
          title="Message Sent | StaticDelivr"
          noindex={true}
        />
        <Header />
        <main className="relative pt-32 pb-20 min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Message Received</h1>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
                Thanks for reaching out. We've received your message and will get back to you shortly.
              </p>
              <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:underline">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
              </Link>
            </div>
          </FadeIn>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-purple-500/30 font-sans">
      <NextSeo
        title="Contact Us | StaticDelivr"
        description="Get in touch with the StaticDelivr team for support, partnerships, or general inquiries. We are here to help."
        canonical="https://staticdelivr.com/contact"
        openGraph={{
          url: 'https://staticdelivr.com/contact',
          title: 'Contact Us | StaticDelivr',
          description: 'Get in touch with the StaticDelivr team for support, partnerships, or general inquiries. We are here to help.',
        }}
      />

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --contact</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Let's start a<br />
                <span className="text-zinc-600 dark:text-zinc-400">conversation.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Whether you have a technical question, a partnership proposal, or just want to report a bug, we're here to help.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 mb-32 relative z-10" aria-labelledby="contact-channels-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="contact-channels-heading" className="sr-only">Contact Channels</h2>
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Left Column: Channels */}
              <div className="lg:col-span-1 space-y-4">

                {/* Email Card */}
                <FadeIn delay={0.1}>
                  <a href="mailto:contact@staticdelivr.com" className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Email Support</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      For general inquiries and private matters.
                    </p>
                    <div className="flex items-center text-sm font-medium text-zinc-900 dark:text-white">
                      contact@staticdelivr.com <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </FadeIn>

                {/* GitHub Card */}
                <FadeIn delay={0.2}>
                  <a href="https://github.com/StaticDelivr/StaticDelivr/discussions" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">GitHub Discussions</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      For bugs, features, and public community chat.
                    </p>
                    <div className="flex items-center text-sm font-medium text-zinc-900 dark:text-white">
                      Join the discussion <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </FadeIn>

                {/* Location Card */}
                <FadeIn delay={0.3}>
                  <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-4 h-4 text-zinc-400" />
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Remote First</h3>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      We are a distributed team contributing from around the world.
                    </p>
                  </div>
                </FadeIn>

              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-2">
                <FadeIn delay={0.2} className="h-full">
                  <div className="h-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">

                    {!formKey ? (
                      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-4">
                          <Terminal className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Configuration Missing</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          The Formspree ID is missing from environment variables.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-white">
                              Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              name="name"
                              required
                              placeholder="Your name"
                              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0 outline-none transition-colors text-zinc-900 dark:text-white placeholder:text-zinc-400"
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-900 dark:text-white">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              required
                              placeholder="you@example.com"
                              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0 outline-none transition-colors text-zinc-900 dark:text-white placeholder:text-zinc-400"
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium text-zinc-900 dark:text-white">
                            Subject
                          </label>
                          <input
                            id="subject"
                            type="text"
                            name="subject"
                            required
                            placeholder="What is this regarding?"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0 outline-none transition-colors text-zinc-900 dark:text-white placeholder:text-zinc-400"
                          />
                          <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-zinc-900 dark:text-white">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            placeholder="Tell us how we can help..."
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0 outline-none transition-colors text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none"
                          />
                          <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full md:w-auto px-8 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {state.submitting ? 'Sending...' : 'Send Message'}
                            {!state.submitting && <Send className="w-4 h-4" />}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ / Bottom CTA --- */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center py-12 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Looking for technical documentation?
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/docs" className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-purple-600 transition-colors">
                  Read the Docs <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <Link href="/sponsors" className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-rose-500 transition-colors">
                  Become a Sponsor <Heart className="w-3 h-3 ml-1.5" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;