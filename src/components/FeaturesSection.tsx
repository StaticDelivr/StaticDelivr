import { Globe2, Server, Zap } from 'lucide-react';


const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white relative">

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose StaticDelivr?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Globe2 className="w-6 h-6 text-white" />}
              title="Global Network"
              description="350+ Points of Presence ensuring fast content delivery worldwide"
              gradient="from-blue-50 to-blue-100"
              iconBg="bg-blue-600"
            />
            
            <Feature
              icon={<Server className="w-6 h-6 text-white" />}
              title="Multi-CDN"
              description="2 CDN providers with smart load balancing for optimal performance"
              gradient="from-purple-50 to-purple-100"
              iconBg="bg-purple-600"
            />
            
            <Feature
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Easy Integration"
              description="Simple URLs and versioning for quick implementation"
              gradient="from-green-50 to-green-100"
              iconBg="bg-green-600"
            />
          </div>
        </div>

    </section>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
}

const Feature = ({ icon, title, description, gradient, iconBg }: FeatureProps) => (
  <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient}`}>
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeaturesSection;