import React, { useState } from 'react';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      priceLabel: 'Free',
      description: 'Access limited listings',
      features: ['5 listings per month', 'Basic support', 'Standard visibility']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 499,
      priceLabel: '৳499/mo',
      description: 'Priority listings and full access',
      features: ['Unlimited listings', 'Priority support', 'Featured visibility', 'Analytics dashboard']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 999,
      priceLabel: '৳999/mo',
      description: 'Featured listings + premium support',
      features: ['Everything in Premium', 'Top featured listings', '24/7 priority support', 'Custom branding', 'Advanced analytics']
    }
  ];

  const handlePlanSelect = (plan) => {
    if (plan.price === 0) {
      // Free plan - just show success message
      setStatus(`Successfully subscribed to ${plan.name} plan!`);
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    setSelectedPlan(plan);
    setError('');
    setStatus('');
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (paymentMethod === 'card') {
      if (!cardName || !cardNumber || !expiry || !cvc) {
        setError('Please fill in all card details.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          paymentMethod,
          cardName,
          cardNumber,
          expiry,
          cvc,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setError(data.message || 'Payment failed.');
        return;
      }

      setStatus(`Payment successful! Subscription to ${selectedPlan.name} activated. Transaction ID: ${data.transactionId}`);
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setTimeout(() => {
        setSelectedPlan(null);
        setStatus('');
      }, 5000);
    } catch (err) {
      setIsLoading(false);
      setError('Unable to process payment right now. Please try again later.');
    }
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setError('');
    setStatus('');
    setCardName('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Subscription Plans</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border p-8 rounded-xl ${plan.id === 'premium' ? 'border-2 border-blue-600 shadow-lg' : ''}`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.priceLabel}</p>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">• {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`px-6 py-2 rounded-lg ${
                  plan.id === 'premium'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {status && !selectedPlan && (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {status}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Subscribe to {selectedPlan.name}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">{selectedPlan.name} Plan</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedPlan.priceLabel}</p>
                <p className="text-sm text-gray-600 mt-2">{selectedPlan.description}</p>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-indigo-600"
                    />
                    Credit / Debit Card
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-indigo-600"
                    />
                    PayPal
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-indigo-600"
                    />
                    bKash
                  </label>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cardholder name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-600">
                    {paymentMethod === 'paypal' && <p>PayPal will be used for checkout. This is a demo placeholder.</p>}
                    {paymentMethod === 'bkash' && <p>bKash will be used for checkout. This is a demo placeholder.</p>}
                  </div>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}
                {status && <p className="text-sm text-green-600">{status}</p>}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : `Subscribe for ৳${selectedPlan.price}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;