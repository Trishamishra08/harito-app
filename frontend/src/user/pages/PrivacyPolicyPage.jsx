import React, { useEffect } from 'react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F9FBF9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2A3324] font-inter mb-8">Privacy Policy</h1>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed space-y-6 text-sm">
          <p>
            At Hirato Agriculture, we take your privacy seriously. This Privacy Policy details the information we collect and how we use it to provide you with the best experience on our website.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Information Collection</h2>
          <p>
            When you visit our website, we may collect personal information such as your name, email address, physical address, and phone number when you fill out forms or contact us directly. We also collect non-personal data regarding your browsing behavior.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Use of Information</h2>
          <p>
            The information we collect is used to understand your needs, improve our agricultural products and services, process transactions, and communicate updates and promotions relevant to your interests.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Data Protection</h2>
          <p>
            We implement appropriate security measures to safeguard your personal data from unauthorized access, accidental loss, alteration, and disclosure.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our Privacy Policy, please contact us at <strong>info@hirato-agri.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
