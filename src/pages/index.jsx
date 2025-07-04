import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';

// Service Icons
const ServiceIcons = {
  railing: (
    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  grill: (
    <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  gate: (
    <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  shed: (
    <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l8-8-8-8" />
    </svg>
  ),
  stair: (
    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  custom: (
    <svg className="w-8 h-8 text-steel-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// ===== PRICING CONFIGURATION SECTION =====
// 🔧 EASILY UPDATE THESE RATES TO MANAGE PRICING
const PRICING_CONFIG = {
  // Metal base rates per kg (₹)
  metalRates: {
    steel: 102,         // Mild Steel - Most common, affordable
    stainless: 450,     // Stainless Steel - Premium, corrosion resistant
    aluminum: 280,      // Aluminum - Lightweight, rust-free
    iron: 95            // Cast Iron - Traditional, heavy-duty
  },

  // Grill complexity multipliers (affects final price)
  grillComplexity: {
    window: 1.0,        // Window Grills - Standard fabrication
    security: 1.3,      // Security Grills - Reinforced, thicker bars
    decorative: 1.5,    // Decorative Grills - Intricate designs, artistic work
    balcony: 1.2,       // Balcony Railings - Height requirements, safety standards
    gate: 1.4,          // Gate Grills - Heavy-duty hinges, locking mechanisms
    staircase: 1.6      // Staircase Railings - Complex angles, precise measurements
  }
};

export default function HomePage() {
  const [length, setLength] = useState(0);
  const [breadth, setBreadth] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  // Calculator options
  const [grillType, setGrillType] = useState('window');
  const [metalType, setMetalType] = useState('steel');

  // Unit conversion options
  const [lengthUnit, setLengthUnit] = useState('cm');
  const [breadthUnit, setBreadthUnit] = useState('cm');
  const [thicknessUnit, setThicknessUnit] = useState('cm');

  // Function to navigate to calculator with pre-selected grill type
  const goToCalculator = (serviceType = null) => {
    if (serviceType) {
      // Map service types to grill types
      const serviceToGrillMap = {
        'Balcony Railings': 'balcony',
        'Window Grills': 'window',
        'Steel Gates': 'gate',
        'Staircase Railings': 'staircase',
        'Custom Fabrication': 'decorative',
        'Sheds': 'window' // Default to window for sheds
      };

      const mappedGrillType = serviceToGrillMap[serviceType];
      if (mappedGrillType) {
        setGrillType(mappedGrillType);
        // Show notification
        setQuoteNotification(`${serviceType} selected in calculator!`);
        setTimeout(() => setQuoteNotification(null), 3000);
      }
    }
    setActiveTab('calculator');
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Quote notification state
  const [quoteNotification, setQuoteNotification] = useState(null); // 'success', 'error', or null

  // Calculate weight based on metal type (density in g/cm³)
  const metalDensity = {
    steel: 7.85,        // Mild Steel
    stainless: 8.0,     // Stainless Steel
    aluminum: 2.7,      // Aluminum
    iron: 7.87          // Cast Iron
  };

  // ===== UNIT CONVERSION FUNCTIONS =====
  const convertToCm = (value, unit) => {
    const conversions = {
      'cm': 1,           // Centimeters (base unit)
      'mm': 0.1,         // Millimeters to cm
      'inch': 2.54,      // Inches to cm
      'ft': 30.48,       // Feet to cm
      'm': 100           // Meters to cm
    };
    return value * conversions[unit];
  };

  // Convert all dimensions to cm for calculation
  const lengthInCm = convertToCm(length, lengthUnit);
  const breadthInCm = convertToCm(breadth, breadthUnit);
  const thicknessInCm = convertToCm(thickness, thicknessUnit);

  // Calculate final rate per kg using centralized pricing config
  const getMetalRate = () => {
    return PRICING_CONFIG.metalRates[metalType] * PRICING_CONFIG.grillComplexity[grillType];
  };

  const weight = (lengthInCm * breadthInCm * thicknessInCm * metalDensity[metalType]) / 1000; // in kg
  const cost = weight * getMetalRate();

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, we'll just log the form data and show success
      console.log('Contact Form Submitted:', contactForm);

      setSubmitStatus('success');

      // Reset form after successful submission
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', shortLabel: 'Home', icon: '🏠' },
    { id: 'services', label: 'Services', shortLabel: 'Services', icon: '🔧' },
    { id: 'calculator', label: 'Get a Quote', shortLabel: 'Quote', icon: '📊' },
    { id: 'portfolio', label: 'Portfolio', shortLabel: 'Portfolio', icon: '🏗️' },
    { id: 'contact', label: 'Contact Us', shortLabel: 'Contact', icon: '📞' },
  ];

  return (
    <main className="min-h-screen bg-white text-steel-800">
      {/* Tabbed Content Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="flex gap-1 xs:gap-2 sm:gap-4 lg:gap-6 xl:gap-8 p-1 xs:p-2 sm:p-3 bg-steel-100 rounded-2xl overflow-x-auto scrollbar-hide max-w-full lg:max-w-6xl xl:max-w-7xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-1 xs:gap-2 sm:gap-3 lg:gap-4 px-2 xs:px-3 sm:px-6 lg:px-8 xl:px-10 py-2 xs:py-2.5 sm:py-3 lg:py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 lg:flex-1 lg:justify-center
                    ${activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-medium'
                      : 'text-steel-600 hover:text-steel-900 hover:bg-steel-50'
                    }
                  `}
                >
                  <span className="text-base xs:text-lg sm:text-xl lg:text-2xl">{tab.icon}</span>
                  <span className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl font-semibold">
                    <span className="hidden xs:inline">{tab.label}</span>
                    <span className="xs:hidden">{tab.shortLabel}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {/* Home Tab */}
            {activeTab === 'home' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-3xl"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
                  <div className="max-w-6xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-8 sm:mb-12"
                    >
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-steel-900 mb-4 sm:mb-6 leading-tight px-2">
                        <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                          Bhavya
                        </span>
                        <br />
                        <span className="text-steel-800">Fabrication Works</span>
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-steel-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                        Premium custom steel grills, railings, sheds, and gates in Hyderabad.
                        Expert craftsmanship with quality guaranteed.
                      </p>

                      {/* Trust Indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 text-steel-600 px-4">
                        {[
                          "15+ Years Experience",
                          "500+ Projects Completed",
                          "Premium Quality Materials",
                          "Timely Delivery Guaranteed"
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                            className="flex items-center justify-center sm:justify-start gap-2 p-2 sm:p-0"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs sm:text-sm lg:text-base font-medium text-center sm:text-left">{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
                      >
                        <Button
                          size="lg"
                          className="shadow-glow hover:shadow-glow-lg w-full sm:w-auto"
                          onClick={() => setActiveTab('calculator')}
                          icon={
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          }
                          iconPosition="right"
                        >
                          Get Free Estimate
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto"
                          href="tel:+919985393064"
                          icon={
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          }
                        >
                          Call Now
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-steel-900 mb-4 sm:mb-6">
                    Our <span className="text-primary-600">Services</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-steel-600 max-w-3xl mx-auto leading-relaxed">
                    From custom railings to complete fabrication solutions, we deliver excellence in every project.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    {
                      title: "Balcony Railings",
                      desc: "Modern and secure designs that enhance your home's aesthetic while ensuring safety and durability.",
                      icon: ServiceIcons.railing,
                      color: "primary"
                    },
                    {
                      title: "Window Grills",
                      desc: "Custom window safety grills designed for maximum security without compromising on style.",
                      icon: ServiceIcons.grill,
                      color: "accent"
                    },
                    {
                      title: "Steel Gates",
                      desc: "Durable and stylish main gates that provide security and make a lasting first impression.",
                      icon: ServiceIcons.gate,
                      color: "success"
                    },
                    {
                      title: "Sheds",
                      desc: "Car parking and rooftop sheds built to withstand weather while maximizing space utility.",
                      icon: ServiceIcons.shed,
                      color: "warning"
                    },
                    {
                      title: "Staircase Railings",
                      desc: "Indoor and outdoor steel railings that combine safety with elegant architectural design.",
                      icon: ServiceIcons.stair,
                      color: "primary"
                    },
                    {
                      title: "Custom Fabrication",
                      desc: "Bespoke steel solutions tailored to your unique requirements and architectural vision.",
                      icon: ServiceIcons.custom,
                      color: "steel"
                    }
                  ].map((service, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <Card variant="elevated" className="h-full hover:shadow-glow transition-all duration-300 group">
                        <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                          <div className={`w-16 h-16 rounded-2xl bg-${service.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {service.icon}
                          </div>
                          <CardTitle className="text-xl sm:text-2xl font-bold text-steel-900 mb-4">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-steel-600 leading-relaxed mb-6 flex-grow">
                            {service.desc}
                          </CardDescription>
                          <Button
                            onClick={() => goToCalculator(service.title)}
                            variant="outline"
                            className="w-full mt-auto group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                          >
                            <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Get a Quote
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Calculator Tab */}
            {activeTab === 'calculator' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-steel-900 mb-4 sm:mb-6">
                    Metal Grill <span className="text-accent-600">Calculator</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-steel-600 max-w-2xl mx-auto leading-relaxed">
                    Get an instant estimate for your grill fabrication project. Choose your grill type, metal, and enter dimensions in any unit.
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg max-w-2xl mx-auto">
                    <p className="text-sm text-blue-800 text-center">
                      <span className="font-medium">📏 Unit Converter:</span> Enter measurements in cm, mm, inches, feet, or meters - we'll convert automatically!
                    </p>
                  </div>
                </div>

                {/* Quote Notification */}
                {quoteNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl max-w-2xl mx-auto"
                  >
                    <p className="text-green-800 font-medium text-center">
                      ✅ {quoteNotification}
                    </p>
                  </motion.div>
                )}

                <Card variant="glass" className="backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 lg:p-8 xl:p-12">
                    {/* Dimensions with Unit Converter */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      {/* Length Input with Unit Selection */}
                      <div>
                        <label className="block text-sm font-medium text-steel-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Length
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Enter length"
                            onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                            className="text-center flex-1"
                          />
                          <select
                            value={lengthUnit}
                            onChange={(e) => setLengthUnit(e.target.value)}
                            className="px-3 py-2 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                          >
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                            <option value="inch">inch</option>
                            <option value="ft">ft</option>
                            <option value="m">m</option>
                          </select>
                        </div>
                        <p className="text-xs text-steel-500 mt-1">
                          = {lengthInCm.toFixed(1)} cm
                        </p>
                      </div>

                      {/* Breadth Input with Unit Selection */}
                      <div>
                        <label className="block text-sm font-medium text-steel-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Breadth
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Enter breadth"
                            onChange={(e) => setBreadth(parseFloat(e.target.value) || 0)}
                            className="text-center flex-1"
                          />
                          <select
                            value={breadthUnit}
                            onChange={(e) => setBreadthUnit(e.target.value)}
                            className="px-3 py-2 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                          >
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                            <option value="inch">inch</option>
                            <option value="ft">ft</option>
                            <option value="m">m</option>
                          </select>
                        </div>
                        <p className="text-xs text-steel-500 mt-1">
                          = {breadthInCm.toFixed(1)} cm
                        </p>
                      </div>

                      {/* Thickness Input with Unit Selection */}
                      <div>
                        <label className="block text-sm font-medium text-steel-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Thickness
                          </span>
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Enter thickness"
                            onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
                            className="text-center flex-1"
                          />
                          <select
                            value={thicknessUnit}
                            onChange={(e) => setThicknessUnit(e.target.value)}
                            className="px-3 py-2 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm"
                          >
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                            <option value="inch">inch</option>
                            <option value="ft">ft</option>
                            <option value="m">m</option>
                          </select>
                        </div>
                        <p className="text-xs text-steel-500 mt-1">
                          = {thicknessInCm.toFixed(1)} cm
                        </p>
                      </div>
                    </div>

                    {/* Grill Type and Metal Type Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div>
                        <label className="block text-sm font-medium text-steel-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Grill Type
                          </span>
                        </label>
                        <select
                          value={grillType}
                          onChange={(e) => setGrillType(e.target.value)}
                          className="w-full px-4 py-3 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white"
                        >
                          <option value="window">Window Grills</option>
                          <option value="security">Security Grills</option>
                          <option value="decorative">Decorative Grills</option>
                          <option value="balcony">Balcony Railings</option>
                          <option value="gate">Gate Grills</option>
                          <option value="staircase">Staircase Railings</option>
                        </select>
                        <p className="text-xs text-steel-500 mt-1">
                          Different types have varying complexity and pricing
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-steel-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Metal Type
                          </span>
                        </label>
                        <select
                          value={metalType}
                          onChange={(e) => setMetalType(e.target.value)}
                          className="w-full px-4 py-3 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white"
                        >
                          <option value="steel">Mild Steel (₹{PRICING_CONFIG.metalRates.steel}/kg)</option>
                          <option value="stainless">Stainless Steel (₹{PRICING_CONFIG.metalRates.stainless}/kg)</option>
                          <option value="aluminum">Aluminum (₹{PRICING_CONFIG.metalRates.aluminum}/kg)</option>
                          <option value="iron">Cast Iron (₹{PRICING_CONFIG.metalRates.iron}/kg)</option>
                        </select>
                        <p className="text-xs text-steel-500 mt-1">
                          Base rates shown, final price varies by grill type
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    {(lengthInCm > 0 && breadthInCm > 0 && thicknessInCm > 0) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8"
                      >
                        {/* Project Summary */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-soft mb-6">
                          <h4 className="text-lg font-semibold text-steel-900 mb-4 text-center">Project Summary</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-medium text-steel-900">
                                {grillType.charAt(0).toUpperCase() + grillType.slice(1).replace(/([A-Z])/g, ' $1')}
                              </div>
                              <div className="text-steel-500">Grill Type</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-steel-900">
                                {metalType === 'steel' ? 'Mild Steel' :
                                 metalType === 'stainless' ? 'Stainless Steel' :
                                 metalType === 'aluminum' ? 'Aluminum' : 'Cast Iron'}
                              </div>
                              <div className="text-steel-500">Metal Type</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-steel-900">
                                {lengthInCm.toFixed(1)} × {breadthInCm.toFixed(1)} × {thicknessInCm.toFixed(1)} cm
                              </div>
                              <div className="text-steel-500">Dimensions (converted)</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-steel-900">
                                ₹{getMetalRate().toFixed(0)}/kg
                              </div>
                              <div className="text-steel-500">Rate</div>
                            </div>
                          </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
                          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-soft">
                            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                              {weight.toFixed(2)} kg
                            </div>
                            <div className="text-steel-600 font-medium">Estimated Weight</div>
                            <div className="text-xs text-steel-500 mt-1">
                              Based on {metalType === 'steel' ? 'mild steel' :
                                       metalType === 'stainless' ? 'stainless steel' :
                                       metalType === 'aluminum' ? 'aluminum' : 'cast iron'} density
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-soft">
                            <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-2">
                              ₹{cost.toFixed(0)}
                            </div>
                            <div className="text-steel-600 font-medium">Estimated Cost</div>
                            <div className="text-xs text-steel-500 mt-1">
                              Including {grillType} complexity factor
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4 sm:mt-6">
                          <p className="text-sm text-steel-500 mb-4">
                            *This is a rough estimate. Final pricing may vary based on design complexity, finishing, and installation requirements.
                          </p>
                          <Button
                            onClick={() => setActiveTab('contact')}
                            className="w-full sm:w-auto"
                          >
                            Get Detailed Quote
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-steel-900 mb-4 sm:mb-6">
                    Our <span className="text-primary-600">Portfolio</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-steel-600 max-w-3xl mx-auto leading-relaxed">
                    Explore our completed projects showcasing quality craftsmanship and innovative designs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    {
                      title: "Modern Balcony Railings",
                      category: "Residential",
                      description: "Contemporary steel railings with geometric patterns for a luxury apartment complex.",
                      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center"
                    },
                    {
                      title: "Security Window Grills",
                      category: "Commercial",
                      description: "Custom security grills for office building with aesthetic appeal and maximum protection.",
                      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center"
                    },
                    {
                      title: "Decorative Main Gate",
                      category: "Residential",
                      description: "Ornate steel gate with traditional motifs for a heritage home entrance.",
                      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center"
                    },
                    {
                      title: "Car Parking Shed",
                      category: "Industrial",
                      description: "Large-scale steel shed construction for multi-car parking facility.",
                      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center"
                    },
                    {
                      title: "Spiral Staircase Railing",
                      category: "Commercial",
                      description: "Elegant curved railings for a corporate office spiral staircase.",
                      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop&crop=center"
                    },
                    {
                      title: "Custom Fabrication Work",
                      category: "Industrial",
                      description: "Specialized steel framework for industrial machinery housing.",
                      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center"
                    }
                  ].map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-glow transition-all duration-300 group">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              {project.category}
                            </span>
                          </div>
                          <CardTitle className="text-xl font-bold text-steel-900 mb-3">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="text-steel-600 leading-relaxed">
                            {project.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-steel-900 mb-4 sm:mb-6">
                    Contact <span className="text-primary-600">Us</span>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-steel-600 max-w-3xl mx-auto leading-relaxed">
                    Ready to start your project? Get in touch with us for a free consultation and quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                  {/* Contact Form */}
                  <Card>
                    <CardContent className="p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-steel-900 mb-6">Send us a Message</h3>

                      {/* Success Message */}
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-success-50 border border-success-200 rounded-xl"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-success-800 font-medium">
                              Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Error Message */}
                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-xl"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-danger-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-danger-800 font-medium">
                              Sorry, there was an error sending your message. Please try again or call us directly.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactInputChange}
                            placeholder="Your Name"
                            label="Full Name"
                            required
                            icon={
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            }
                          />
                          <Input
                            type="tel"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactInputChange}
                            placeholder="+91 98765 43210"
                            label="Phone Number"
                            required
                            icon={
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactInputChange}
                            placeholder="your.email@example.com"
                            label="Email Address"
                            required
                            icon={
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            }
                          />
                          <div>
                            <label className="block text-sm font-medium text-steel-700 mb-2">Project Type</label>
                            <select
                              name="projectType"
                              value={contactForm.projectType}
                              onChange={handleContactInputChange}
                              className="w-full px-4 py-3 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Select Project Type</option>
                              <option value="railing">Railings</option>
                              <option value="gate">Gates</option>
                              <option value="grill">Window Grills</option>
                              <option value="shed">Sheds</option>
                              <option value="staircase">Staircases</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <Input
                          type="text"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactInputChange}
                          placeholder="Brief description of your project"
                          label="Subject"
                          required
                          icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707z" />
                            </svg>
                          }
                        />
                        <div>
                          <label className="block text-sm font-medium text-steel-700 mb-2">Message</label>
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactInputChange}
                            rows={4}
                            placeholder="Tell us more about your project requirements, dimensions, timeline, etc."
                            className="w-full px-4 py-3 border border-steel-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                            required
                          ></textarea>
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          loading={isSubmitting}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <div className="space-y-6 sm:space-y-8">
                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-steel-900 mb-6">Get in Touch</h3>
                        <div className="space-y-4 sm:space-y-6">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-steel-900 mb-1">Phone</h4>
                              <p className="text-steel-600 text-sm sm:text-base">
                                <a href="tel:+919985393064" className="hover:text-primary-600 transition-colors">
                                  +91 99853 93064
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-steel-900 mb-1">Email</h4>
                              <div className="space-y-1">
                                <p className="text-steel-600 text-sm sm:text-base break-all">
                                  <a href="mailto:info@bhavayafabrication.com" className="hover:text-primary-600 transition-colors">
                                    info@bhavayafabrication.com
                                  </a>
                                </p>
                                <p className="text-steel-600 text-sm sm:text-base break-all">
                                  <a href="mailto:orders@bhavayafabrication.com" className="hover:text-primary-600 transition-colors">
                                    orders@bhavayafabrication.com
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-steel-900 mb-1">Address</h4>
                              <p className="text-steel-600 text-sm sm:text-base leading-relaxed">
                                Prashant Nagar, Railway Colony,<br />
                                Moula Ali, Malkajgiri,<br />
                                Telangana 500040, India
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-steel-900 mb-4">Business Hours</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-steel-600">Monday - Friday</span>
                            <span className="font-medium text-steel-900">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-steel-600">Saturday</span>
                            <span className="font-medium text-steel-900">9:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-steel-600">Sunday</span>
                            <span className="font-medium text-steel-900">Closed</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
