import React, { useEffect } from 'react';

const TermsAndConditionsPage = () => {
  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F9FBF9] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2A3324] font-inter mb-8">Terms & Conditions</h1>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed space-y-6 text-sm">
          <p>
            Welcome to Hirato Agriculture. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Use of Website</h2>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Product Information</h2>
          <p>
            While we strive to provide accurate product information regarding our agricultural solutions, fertilizers, and pesticides, we make no representations or warranties of any kind about the completeness or accuracy of the information presented.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Limitation of Liability</h2>
          <p>
            Hirato Agriculture shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in any way connected with the use of our website or the purchase of our products.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#2A3324]">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the applicable jurisdiction in Texas, USA, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
