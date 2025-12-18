import React from 'react';
import { Section } from '../components/Section';
import { CONTACT_INFO } from '../constants';

export const TermsOfService: React.FC = () => {
  return (
    <div>
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Please read these terms carefully before starting a project.
        </p>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up-delay text-gray-300 leading-relaxed">
          
          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing this website and hiring JP Design Studio for design services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">2. Services & Deliverables</h2>
            <p className="mb-4">
              JP Design Studio agrees to provide the services described in the specific project proposal or invoice. 
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Timelines:</strong> Estimated completion times are provided for each project. While we strive to meet all deadlines, specific dates are subject to client communication and feedback speed.</li>
              <li><strong className="text-white">Source Files:</strong> Final deliverables will include high-resolution formats (JPG, PNG) and editable source files (AI, PSD) upon full payment, unless stated otherwise.</li>
            </ul>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">3. Payments & Refunds</h2>
            <p className="mb-4">
              To ensure commitment and resource allocation, the following payment terms apply:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Deposit:</strong> A 50% non-refundable deposit is required before work begins on any custom design project.</li>
              <li><strong className="text-white">Final Payment:</strong> The remaining 50% is due upon approval of the final design, before the release of high-resolution or source files.</li>
              <li><strong className="text-white">Refunds:</strong> Deposits are non-refundable once work has commenced. If the project is cancelled by the client midway, the client agrees to pay for all work completed up to that point.</li>
            </ul>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">4. Revisions</h2>
            <p>
              We want you to love your design. We provide unlimited revisions during the concept stage to ensure we head in the right direction. However, once a concept is approved and we move to finalization, major structural changes may incur an additional hourly fee.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p>
              Upon full payment, the client is granted exclusive rights to the final approved design. JP Design Studio retains the right to display the work in portfolios, social media, and marketing materials for self-promotion purposes, unless a Non-Disclosure Agreement (NDA) is signed.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              JP Design Studio shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the deliverables, or for any third-party claims against the client.
            </p>
          </div>

          <div className="bg-jp-card p-8 rounded-xl border border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at:
            </p>
            <div className="mt-4 text-white font-medium">
              <p>Email: <span className="text-jp-yellow">{CONTACT_INFO.email}</span></p>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};