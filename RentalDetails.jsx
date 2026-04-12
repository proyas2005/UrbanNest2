import React, { useState } from 'react';

const RentalDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const rental = {
    id: '1',
    title: 'Cozy Studio in Downtown',
    price: 800,
    priceLabel: '$800/month',
    description: 'This cozy studio is located in the heart of downtown, close to public transport and shops.',
    images: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
    ],
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
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rentalId: rental.id,
          amount: rental.price,
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

      setStatus(`Payment successful! Transaction ID: ${data.transactionId}`);
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    } catch (err) {
      setIsLoading(false);
      setError('Unable to process payment right now. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold p-6 border-b">{rental.title}</h1>
        <div className="p-6 space-y-6">
          <div>
            <p className="text-xl font-semibold mb-4">{rental.priceLabel}</p>
            <p className="text-gray-700 mb-6">{rental.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rental.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Rental ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Payment method</h2>
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
                    value="googlepay"
                    checked={paymentMethod === 'googlepay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-indigo-600"
                  />
                  Google Pay
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
                  {paymentMethod === 'googlepay' && <p>Google Pay will be used for checkout. This is a demo placeholder.</p>}
                </div>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}
              {status && <p className="text-sm text-green-600">{status}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Pay $${rental.price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
