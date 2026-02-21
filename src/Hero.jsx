const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Simplify Your City Living
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Find verified rentals, trusted housemaids, and nearby shops —
          all in one smart platform.
        </p>

        <div className="space-x-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200">
            Explore Rentals
          </button>

          <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-600">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;