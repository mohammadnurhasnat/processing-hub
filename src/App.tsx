/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AdminLeads from './components/AdminLeads';

export default function App() {
  const [activeWidget, setActiveWidget] = useState<'chat' | 'admin' | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      <Navbar onOpenAdmin={() => setActiveWidget(activeWidget === 'admin' ? null : 'admin')} />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Contact />
      </main>
      <Footer />
      
      {/* Coordinated Floating Console Panel */}
      <ChatWidget 
        isOpen={activeWidget === 'chat'} 
        onOpen={() => setActiveWidget('chat')} 
        onClose={() => setActiveWidget(null)} 
      />
      <AdminLeads 
        isOpen={activeWidget === 'admin'} 
        onOpen={() => setActiveWidget('admin')} 
        onClose={() => setActiveWidget(null)} 
      />
    </div>
  );
}


