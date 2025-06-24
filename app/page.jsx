'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const features = [
    {
      icon: '🎨',
      title: 'AI-Powered Design',
      description: 'Transform your space with cutting-edge AI technology that understands your style preferences'
    },
    {
      icon: '📸',
      title: 'Photo Upload',
      description: 'Simply upload a photo of your room and watch the magic happen in seconds'
    },
    {
      icon: '🏠',
      title: 'Multiple Room Types',
      description: 'Design bedrooms, living rooms, kitchens, and any space you can imagine'
    },
    {
      icon: '✨',
      title: '8 Design Styles',
      description: 'Choose from Modern, Minimalist, Industrial, Bohemian, Traditional, Rustic, Eclectic, and Contemporary'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get professional-quality room designs in under 30 seconds'
    },
    {
      icon: '💾',
      title: 'Save & Download',
      description: 'Keep your designs forever and download high-quality images anytime'
    }
  ]

  const designStyles = [
    { name: 'Modern', image: '🏢', color: 'from-blue-500 to-blue-600' },
    { name: 'Minimalist', image: '⚪', color: 'from-gray-400 to-gray-500' },
    { name: 'Industrial', image: '🏭', color: 'from-orange-500 to-red-500' },
    { name: 'Bohemian', image: '🌺', color: 'from-pink-500 to-purple-500' },
    { name: 'Traditional', image: '🏛️', color: 'from-amber-500 to-orange-500' },
    { name: 'Rustic', image: '🌲', color: 'from-green-500 to-green-600' },
    { name: 'Eclectic', image: '🎭', color: 'from-purple-500 to-pink-500' },
    { name: 'Contemporary', image: '✨', color: 'from-indigo-500 to-purple-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={'/logo.svg'} width={40} height={40} alt='icon' />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Room Design
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Features
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                How It Works
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://github.com/dhruv0050/Ai-Room-Design.git" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              ⭐Repo
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sign-in" className="text-purple-600 font-medium hover:text-purple-700 transition-colors">
                Sign In
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/sign-up" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200">
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl transform -translate-y-1/2"
          style={{ y: yBg }}
        />
        
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Let AI Bring Your Space to Life
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
              variants={itemVariants}
            >
              Visualize and customize your dream room effortlessly with our AI-powered design tool. 
              Transform any space in seconds with professional-quality results.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 shadow-lg">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    ✨
                  </motion.span>
                  <span>Design Your Room</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Room Visualization */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-1 rounded-3xl shadow-2xl">
                <div className="bg-white rounded-3xl p-8">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative z-10 text-center">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <span className="text-white text-2xl">🏠</span>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Magic Happens Here</h3>
                      <p className="text-gray-600">Upload your room photo and watch the transformation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your space with AI-powered design tools
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-purple-100 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design Styles Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Choose Your Style
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From modern minimalism to rustic charm, find the perfect style for your space
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {designStyles.map((style, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`bg-gradient-to-r ${style.color} rounded-2xl p-8 text-center shadow-lg`}>
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {style.image}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg">{style.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your space in three simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { step: '01', title: 'Upload Photo', desc: 'Take a photo of your room and upload it to our platform', icon: '📸' },
              { step: '02', title: 'Choose Style', desc: 'Select your preferred design style and room type', icon: '🎨' },
              { step: '03', title: 'Get Results', desc: 'Watch AI transform your space in under 30 seconds', icon: '✨' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold text-purple-600 mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/10"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="container mx-auto px-6 text-center relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Space?
          </motion.h2>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/sign-up" className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-2 shadow-lg">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🚀
                </motion.span>
                <span>Start Designing Now</span>
              </Link>
            </motion.div>
            <motion.div
              className="text-white/80 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              No credit card required • Free trial available
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <footer id='#footer' className="mt-10 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-6 py-16 relative">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Logo and Title */}
          <motion.div
            className="flex items-center justify-center space-x-3 mb-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image src={'/logo.svg'} width={50} height={50} alt='AI Room Design' />
            </motion.div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AI Room Design
            </span>
          </motion.div>

          {/* Main CTA Text */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Love This Project?
          </motion.h3>
          
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Help us grow this open-source project! Star the repository, contribute code, 
            or share your ideas to make AI Room Design even better.
          </motion.p>

          {/* GitHub Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            {/* Star Repository Button */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="https://github.com/dhruv0050/Ai-Room-Design.git"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-3 shadow-lg group"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-xl"
                >
                  ⭐
                </motion.span>
                <span>Star on GitHub</span>
                <motion.div
                  className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden"
                  whileHover={{ x: 5 }}
                >
                  <span>→</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Contribute Button */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="https://github.com/dhruv0050/Ai-Room-Design.git"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-3 shadow-lg group border-2 border-transparent hover:border-purple-400 transition-all duration-300"
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-xl"
                >
                  🚀
                </motion.span>
                <span>Contribute</span>
                <motion.div
                  className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden"
                  whileHover={{ x: 5 }}
                >
                  <span>→</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* GitHub Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {[
              { icon: '⭐', label: 'Star the Repo', desc: 'Show your support' },
              { icon: '🤝', label: 'Contribute', desc: 'Help me improve' },
              { icon: '🐛', label: 'Report Issues', desc: 'Help me fix bugs' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  y: -3
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-white font-semibold text-lg mb-2">{item.label}</h4>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💜
              </motion.span>
              <span>Made with love for the community</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="https://github.com/dhruv0050/Ai-Room-Design.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>👨‍💻</span>
                  <span>View Source</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
    </div>

    
  )
}