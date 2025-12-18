import React from 'react';
import { Section } from '../components/Section';
import { CONTACT_INFO } from '../constants';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up-delay text-gray-300 leading-relaxed">
          
          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to JP Design Studio. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Identity Data:</strong> Includes first name, last name, or business name.</li>
              <li><strong className="text-white">Contact Data:</strong> Includes email address, telephone number, and billing address.</li>
              <li><strong className="text-white">Project Data:</strong> Includes design briefs, brand assets, and other materials you provide for the purpose of the project.</li>
              <li><strong className="text-white">Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting, and operating system.</li>
            </ul>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To register you as a new client.</li>
              <li>To process and deliver your design projects.</li>
              <li>To manage payments, fees, and charges.</li>
              <li>To manage our relationship with you (e.g., notifying you about changes to our terms or privacy policy).</li>
            </ul>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 text-white font-medium">
              <p>Email: <span className="text-jp-yellow">{CONTACT_INFO.email}</span></p>
              <p>Phone: <span className="text-jp-yellow">{CONTACT_INFO.phone}</span></p>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};