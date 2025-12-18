import React, { useState } from 'react';
import { Section } from '../components/Section';
import { FAQS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        </Reveal>
      </div>

      <Section className="min-h-[50vh]">
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {FAQS.map((faq, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="border border-white/10 rounded-lg overflow-hidden bg-jp-card shadow-sm hover:border-white/20 transition-colors duration-300">
                <button
                  className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none hover:bg-[#3A395C] transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-bold text-base md:text-lg text-white">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-jp-yellow shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="text-gray-400 shrink-0 ml-4" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 md:p-6 pt-0 text-gray-300 border-t border-white/5 mt-2 text-sm md:text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};