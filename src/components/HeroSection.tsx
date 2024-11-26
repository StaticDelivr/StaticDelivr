import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Rocket, Globe } from 'lucide-react';

const HeroSection = () => {
  const { ref: presenceRef, inView: presenceInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: requestsRef, inView: requestsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Hero Headline */}
          <div className="mb-6 space-y-5">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Free CDN for 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text ml-3">
                Open Source
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Accelerate your Open Source Projects with StaticDelivr&apos;s globally distributed network
            </p>
          </div>

          {/* Statistics */}
          <div className="flex justify-center gap-16 mb-16">
            <div className="text-center group" ref={presenceRef}>
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 mr-2 text-blue-600 group-hover:scale-110 transition" />
                <div className="text-4xl font-bold text-gray-900">
                  <span className="text-blue-600">
                    {presenceInView ? (
                      <>
                        <CountUp start={0} end={350} duration={2} />
                        <span className="text-gray-900">+</span>
                      </>
                    ) : (
                      '0+'
                    )}
                  </span>
                </div>
              </div>
              <div className="text-gray-600 font-medium">Points of Presence</div>
            </div>
            <div className="text-center group" ref={requestsRef}>
              <div className="flex items-center justify-center mb-2">
                <Rocket className="w-8 h-8 mr-2 text-purple-600 group-hover:scale-110 transition" />
                <div className="text-4xl font-bold text-gray-900">
                  <span className="text-purple-600">
                    {requestsInView ? (
                      <>
                        <CountUp start={0} end={100} duration={2} />
                        <span className="text-gray-900">M+</span>
                      </>
                    ) : (
                      '0M+'
                    )}
                  </span>
                </div>
              </div>
              <div className="text-gray-600 font-medium">Monthly Requests</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;