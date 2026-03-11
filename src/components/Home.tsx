import { useRef } from 'react';
import { Leaf, Recycle, Monitor, AlertTriangle, Trash2, MapPin, ArrowRight, ShieldCheck, Zap, Laptop, Clock, CheckCircle2, Truck, Factory } from 'lucide-react';
import { wasteCategories } from '../constants/waste';
import { WasteType } from '../types';

interface HomeProps {
  onBookNow: (wasteType: WasteType) => void;
  isLoggedIn: boolean;
}

const iconMap = {
  leaf: Leaf,
  recycle: Recycle,
  monitor: Monitor,
  'alert-triangle': AlertTriangle,
  'trash-2': Trash2
};

export default function Home({ onBookNow, isLoggedIn }: HomeProps) {
  const howItWorksRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] scroll-smooth">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-black text-gray-900 tracking-tight sm:text-8xl mb-8 leading-none">
              Just a <br />
              <span className="gradient-text">Click Away.</span>
            </h1>

            <p className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-semibold">
              The smartest way to handle waste. CleanLoop offers effortless, eco-conscious collection
              that puts you in total control of your environment.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onBookNow('general')}
                className="btn-primary w-full sm:w-auto"
              >
                <span>🚀 Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection(howItWorksRef)}
                className="px-8 py-4 rounded-2xl font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all w-full sm:w-auto"
              >
                See How it Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our Professional Services</h2>
            <p className="mt-4 text-gray-500 font-bold leading-relaxed text-lg">Pick the right category for your needs. We handle it all with care.</p>
          </div>
          <button
            onClick={() => scrollToSection(pricingRef)}
            className="text-sm font-black text-emerald-600 uppercase tracking-widest border-b-2 border-emerald-100 pb-2 hover:text-emerald-700 transition-colors"
          >
            View Pricing Matrix &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {wasteCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <div
                key={category.type}
                className="group glass-card p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/40 border border-white hover:border-emerald-200 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative z-10">
                  <div className={`${category.color} w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-xl shadow-emerald-100 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-black text-gray-900 mb-4">{category.name}</h3>
                  <p className="text-gray-500 mb-10 leading-relaxed font-bold text-base">{category.description}</p>

                  <button
                    onClick={() => onBookNow(category.type)}
                    className={`w-full flex items-center justify-center space-x-3 py-5 rounded-2xl font-black transition-all duration-300 ${isLoggedIn
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                  >
                    <span>{isLoggedIn ? 'Book Collection' : 'Member Access'}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works Section */}
      <section ref={howItWorksRef} className="bg-emerald-50/50 py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">How it Works</h2>
            <p className="text-gray-400 mt-4 font-bold text-lg max-w-2xl mx-auto">
              CleanLoop makes garbage collection as simple as ordering a pizza. Three easy steps to a cleaner living space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-200 -translate-y-1/2 -z-0"></div>

            {[
              { step: '01', title: 'Schedule Pickup', desc: 'Select your waste category and book a convenient time via our smart portal.', icon: Laptop },
              { step: '02', title: 'Real-time Tracking', desc: 'Get notification alerts as our eco-optimized vehicles approach your location.', icon: Truck },
              { step: '03', title: 'Zero-Waste Disposal', desc: 'Your waste is processed at our certified recycling loops for eco-friendly handling.', icon: Factory },
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white p-10 rounded-[3rem] shadow-xl shadow-emerald-100/50 border border-white transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 font-black text-2xl shadow-lg shadow-emerald-200">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-4">Step {item.step}</p>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Matrix Section */}
      <section ref={pricingRef} className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Pricing Matrix</h2>
            <p className="text-gray-400 mt-4 font-bold text-lg">Transparent pricing tailored for every disposal need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                plan: 'Economy Loop',
                price: '299',
                period: '/month',
                features: ['Standard Waste Pickup', 'Bi-weekly Collection', 'Weight up to 20kg', 'App Notifications'],
                icon: Clock,
                popular: false
              },
              {
                plan: 'Executive Loop',
                price: '599',
                period: '/month',
                features: ['All Waste Categories', 'Weekly Collection', 'Weight up to 50kg', 'Priority Scheduling', 'Eco-Insights Portal'],
                icon: Zap,
                popular: true
              },
              {
                plan: 'Enterprise Loop',
                price: 'Custom',
                period: '',
                features: ['Industrial Volume', 'On-demand Collection', 'Unlimited Weight', 'Dedicated Loop Manager', 'Zero-Waste Certification'],
                icon: ShieldCheck,
                popular: false
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-10 rounded-[3rem] border-2 transition-all duration-300 flex flex-col ${plan.popular
                  ? 'border-emerald-500 bg-emerald-50 shadow-2xl shadow-emerald-200 scale-105 z-20'
                  : 'border-gray-100 bg-white hover:border-emerald-200'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`p-4 rounded-2xl ${plan.popular ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <plan.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{plan.plan}</h3>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-gray-900">{plan.price === 'Custom' ? '' : '₹'}</span>
                    <span className="text-6xl font-black text-gray-900 leading-none">{plan.price}</span>
                    <span className="text-gray-400 font-bold ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-3 text-gray-600 font-bold">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-black transition-all ${plan.popular
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-300'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                  Select Loop
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Icons Grid */}
      <section className="bg-[#fcfdfd] py-32 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The CleanLoop Edge</h2>
            <p className="text-gray-400 mt-4 font-bold text-lg">Why thousands trust us for their sanitation needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'AI-Route Optimization', desc: 'Predictive analytics for the fastest possible collection times.', icon: Zap, color: 'bg-amber-100 text-amber-600' },
              { title: 'Verified Drivers', desc: 'Background-checked professionals for your safety and peace of mind.', icon: ShieldCheck, color: 'bg-emerald-100 text-emerald-600' },
              { title: 'Eco-First Mandate', desc: 'We guarantee 100% responsible disposal of all collected waste.', icon: Leaf, color: 'bg-teal-100 text-teal-600' },
              { title: 'Smart App Tracking', desc: 'Track your collection truck in real-time with push alerts.', icon: MapPin, color: 'bg-blue-100 text-blue-600' },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className={`${feature.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-relaxed px-4">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="bg-emerald-950 py-32 px-4 relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[80%] bg-emerald-600/20 rounded-full blur-[120px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-10">
            Ready to live in <br />
            <span className="text-emerald-400">cleaner loops?</span>
          </h2>
          <p className="text-emerald-100/70 text-xl font-bold mb-16 max-w-xl mx-auto">
            Join the community today. One small click for you, one giant leap for our planet.
          </p>
          <button
            onClick={() => onBookNow('general')}
            className="group relative inline-flex items-center justify-center space-x-3 bg-white text-emerald-900 px-12 py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-emerald-50 transition-all active:scale-95"
          >
            <span>JOIN THE LOOP</span>
            <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </section>
    </div>
  );
}
