const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What UrbanNest Offers</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Verified Rentals</h3>
            <p className="text-gray-600">
              Safe and verified accommodations with filters by rent, location and availability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Hire Housemaids</h3>
            <p className="text-gray-600">
              Browse experienced domestic helpers based on reviews and skills.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Shop Directory</h3>
            <p className="text-gray-600">
              Discover grocery stores, restaurants and essential shops near you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;