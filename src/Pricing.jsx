const Pricing = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Subscription Plans</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Basic</h3>
            <p className="text-3xl font-bold mb-4">Free</p>
            <p className="text-gray-600 mb-6">Access limited listings</p>
            <button className="px-6 py-2 border rounded-lg">
              Choose Plan
            </button>
          </div>

          <div className="border-2 border-blue-600 p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Premium</h3>
            <p className="text-3xl font-bold mb-4">৳499/mo</p>
            <p className="text-gray-600 mb-6">
              Priority listings and full access
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Choose Plan
            </button>
          </div>

          <div className="border p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Pro</h3>
            <p className="text-3xl font-bold mb-4">৳999/mo</p>
            <p className="text-gray-600 mb-6">
              Featured listings + premium support
            </p>
            <button className="px-6 py-2 border rounded-lg">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;