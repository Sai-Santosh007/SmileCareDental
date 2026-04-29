<a href="/" className="text-teal mb-6 inline-block">
  ← Back to Home
</a>

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold text-teal">Smile Care Dental</span>, your privacy is important to us. 
          This policy explains how we collect, use, and protect your information.
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-600">
              We may collect personal details such as your name, phone number, email address,
              and appointment preferences when you book a consultation or contact us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600">
              Your information is used only for appointment scheduling, communication, and improving
              our dental services. We do not use your data for spam or unrelated marketing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your data from unauthorized access,
              misuse, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Third-Party Sharing
            </h2>
            <p className="text-gray-600">
              We do not sell, trade, or share your personal information with third parties,
              except when required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Cookies & Tracking
            </h2>
            <p className="text-gray-600">
              Our website may use basic cookies to enhance user experience. These do not collect
              sensitive personal data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Your Rights
            </h2>
            <p className="text-gray-600">
              You have the right to request access, correction, or deletion of your personal data
              at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this policy, contact us at:
              <br />
              <span className="text-teal font-medium">
                info@smilecaredental.com
              </span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;