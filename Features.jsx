import React from "react";

const Features = () => {
  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        What UrbanNest Offers
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Verified Rentals</h3>
          <p>
            Browse safe and verified accommodations with filters by location,
            rent range and availability.
          </p>
        </div>

        <div className="p-6 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Hire Housemaids</h3>
          <p>
            Find experienced and reviewed domestic help based on skills,
            ratings and location.
          </p>
        </div>

        <div className="p-6 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Shop Directory</h3>
          <p>
            Discover nearby grocery stores, restaurants and essential shops
            easily.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
