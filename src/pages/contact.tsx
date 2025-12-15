import React from 'react';
import Head from 'next/head';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { MagicCard } from '../components/ui/magic-card';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

interface CustomBentoCardProps {
  name: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  action?: { href: string; text: string; };
}

const MailBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Mail className="w-48 h-48 text-blue-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const MapBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <MapPin className="w-48 h-48 text-purple-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const PhoneBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Phone className="w-48 h-48 text-green-500" />
  </div>
);

const CustomBentoCard = ({
  name,
  className,
  background,
  Icon,
  children,
  action,
  ...props
}: CustomBentoCardProps & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white dark:bg-zinc-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6 relative z-10 h-full flex flex-col">
      <div className="mb-4 p-2 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {name}
      </h3>
      <div className="text-zinc-500 dark:text-zinc-400 flex-grow mb-4">
        {children}
      </div>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:underline"
        >
          {action.text}
          <Send className="w-4 h-4 ml-1" />
        </a>
      )}
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const formKey = process.env.NEXT_PUBLIC_FORM;
  const [state, handleSubmit] = useForm(formKey || '');

  if (!formKey) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Form Configuration Error</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Please check your Formspree configuration. The form ID is missing or invalid.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <main className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Thank You!</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Your message has been successfully sent. We will get back to you shortly.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Contact Us | Get Support - StaticDelivr</title>
        <meta name="description" content="Get in touch with the StaticDelivr team. Reach out for support, questions, suggestions, or partnership inquiries. We're here to help!" />
        <meta name="keywords" content="contact StaticDelivr, CDN support, get help, feedback, questions, partnership, customer support, reach out" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | Get Support - StaticDelivr" />
        <meta property="og:description" content="Get in touch with the StaticDelivr team. We're here to help with your questions and feedback." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/contact" />
        <meta name="twitter:title" content="Contact Us | Get Support - StaticDelivr" />
        <meta name="twitter:description" content="Get in touch with the StaticDelivr team. We're here to help with your questions and feedback." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Contact StaticDelivr
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              We&apos;d love to hear from you. Whether you have a question, suggestion, 
              or just want to say hello, feel free to reach out.
            </p>
          </div>
        </AuroraBackground>

        {/* Contact Methods Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">Get in Touch</h2>
            </BlurFade>
            <BentoGrid className="max-w-7xl mx-auto">
              <BlurFade delay={0.2} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Email"
                  Icon={Mail}
                  background={<MailBackground />}
                  className="h-full"
                  action={{
                    text: "Send Email",
                    href: "mailto:coozy@staticdelivr.com",
                  }}
                >
                  Reach out to our support team directly at coozy@staticdelivr.com
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.3} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Location"
                  Icon={MapPin}
                  background={<MapBackground />}
                  className="h-full"
                >
                  We are a fully remote team working globally to support open-source projects
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.4} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Community"
                  Icon={Phone}
                  background={<PhoneBackground />}
                  className="h-full"
                  action={{
                    text: "GitHub Discussions",
                    href: "https://github.com/Coozywana/StaticDelivr/discussions",
                  }}
                >
                  Join our discussions on GitHub to connect with our team
                </CustomBentoCard>
              </BlurFade>
            </BentoGrid>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto">
            <BlurFade delay={0.2} inView>
              <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-white">Send Us a Message</h2>
              <MagicCard
                className="p-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        placeholder="Your Name"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        placeholder="you@example.com"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      placeholder="What can we help you with?"
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-zinc-700 dark:text-zinc-300 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      placeholder="Your message here..."
                    ></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </MagicCard>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;