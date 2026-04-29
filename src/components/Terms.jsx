<a href="/" className="text-teal mb-6 inline-block">
  ← Back to Home
</a>
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-6">
          By using the services of <span className="text-teal font-semibold">Smile Care Dental</span>, 
          you agree to the following terms and conditions.
        </p>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Appointments
            </h2>
            <p className="text-gray-600">
              Appointments are subject to availability. We recommend booking in advance.
              In case of delays or emergencies, schedules may change.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Cancellations
            </h2>
            <p className="text-gray-600">
              Patients are requested to inform us at least 24 hours in advance for cancellations
              or rescheduling.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Payments
            </h2>
            <p className="text-gray-600">
              All treatments are chargeable as per clinic standards. Payment must be completed
              after the service unless otherwise agreed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Medical Responsibility
            </h2>
            <p className="text-gray-600">
              Patients must provide accurate medical history. The clinic is not responsible for
              complications arising from undisclosed conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Website Usage
            </h2>
            <p className="text-gray-600">
              Content on this website is for informational purposes only and should not be treated
              as medical advice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Changes to Terms
            </h2>
            <p className="text-gray-600">
              Smile Care Dental reserves the right to update these terms at any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Contact
            </h2>
            <p className="text-gray-600">
              For any queries, contact us at:
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

export default Terms;