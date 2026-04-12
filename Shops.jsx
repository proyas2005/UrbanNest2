import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const sampleShops = [
  {
    _id: '1',
    name: 'Downtown Electronics',
    address: 'Kawran Bazar, Dhaka, Bangladesh',
    lat: 23.8103,
    lng: 90.4125,
    phone: '+880-2-1234-5678',
    category: 'Electronics',
    description: 'Best electronics store in town',
  },
  {
    _id: '2',
    name: 'Premier Store',
    address: 'Gulshan, Dhaka, Bangladesh',
    lat: 23.8061,
    lng: 90.4169,
    phone: '+880-2-8764-5321',
    category: 'General Store',
    description: 'One-stop shopping destination',
  },
  {
    _id: '3',
    name: 'Fashion Hub',
    address: 'Banani, Dhaka, Bangladesh',
    lat: 23.8044,
    lng: 90.4269,
    phone: '+880-2-5432-1098',
    category: 'Fashion',
    description: 'Latest fashion trends',
  },
  {
    _id: '4',
    name: 'Tech World',
    address: 'Motijheel, Dhaka, Bangladesh',
    lat: 23.7585,
    lng: 90.3815,
    phone: '+880-2-9876-5432',
    category: 'Electronics',
    description: 'Technology and gadgets',
  },
  {
    _id: '5',
    name: 'Home Décor Store',
    address: 'Mirpur, Dhaka, Bangladesh',
    lat: 23.8145,
    lng: 90.3733,
    phone: '+880-2-1234-9876',
    category: 'Home & Garden',
    description: 'Home decoration and furniture',
  },
];

const Shops = () => {
  const [shops, setShops] = useState(sampleShops);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newShop, setNewShop] = useState({
    name: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    lat: '',
    lng: '',
    description: '',
    rating: 0,
  });
  const [products, setProducts] = useState([
    { name: '', price: '', description: '' },
  ]);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const isGoogleMapsReady = Boolean(GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (err) => {
          console.error('Geolocation error:', err);
          setUserLocation({ lat: 23.8103, lng: 90.4125 });
        }
      );
    } else {
      setUserLocation({ lat: 23.8103, lng: 90.4125 });
    }

    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/shops`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setShops(res.data);
        setMessage('');
      } else {
        setMessage('No shops found in backend. Showing sample shops.');
      }
    } catch (err) {
      console.error('Fetch shops error:', err);
      setMessage('Backend shop fetch failed. Showing sample shops.');
      setShops(sampleShops);
    } finally {
      setLoading(false);
    }
  };

  const handleNewShopChange = (field, value) => {
    setNewShop((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (index, field, value) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addProductRow = () => {
    setProducts((prev) => [...prev, { name: '', price: '', description: '' }]);
  };

  const removeProductRow = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewShop({
      name: '',
      category: '',
      address: '',
      phone: '',
      email: '',
      lat: '',
      lng: '',
      description: '',
      rating: 0,
    });
    setProducts([{ name: '', price: '', description: '' }]);
    setSubmitError('');
    setSubmitSuccess('');
  };

  const handleAddShopSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const payload = {
        ...newShop,
        lat: Number(newShop.lat),
        lng: Number(newShop.lng),
        rating: Number(newShop.rating) || 0,
        products: products
          .filter((product) => product.name.trim() && product.price !== '')
          .map((product) => ({
            name: product.name.trim(),
            price: Number(product.price) || 0,
            description: product.description.trim(),
          })),
      };

      const res = await axios.post(`${BACKEND_URL}/api/shops`, payload);
      setSubmitSuccess('Shop submitted successfully.');
      setShops((prev) => [res.data, ...prev]);
      resetForm();
    } catch (err) {
      console.error('Add shop error:', err);
      setSubmitError(err.response?.data?.message || 'Failed to add shop.');
    }
  };

  const handleMapError = () => {
    setMessage('Google Maps failed to load. Please add a valid VITE_GOOGLE_MAPS_API_KEY in .env.local and restart the frontend.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Shop Directory</h1>
        <p className="text-center text-gray-600 mb-8">Find shops near you on Google Maps</p>

        {message && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            {isGoogleMapsReady ? (
              userLocation ? (
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} onError={handleMapError}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={userLocation}
                    zoom={13}
                    options={{ streetViewControl: false, fullscreenControl: true }}
                  >
                    <Marker
                      position={userLocation}
                      title="Your Location"
                      icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
                    />

                    {shops.map((shop) => (
                      <Marker
                        key={shop._id}
                        position={{ lat: shop.lat, lng: shop.lng }}
                        title={shop.name}
                        onClick={() => setSelectedShop(shop)}
                      />
                    ))}

                    {selectedShop && (
                      <InfoWindow
                        position={{ lat: selectedShop.lat, lng: selectedShop.lng }}
                        onCloseClick={() => setSelectedShop(null)}
                      >
                        <div className="w-64">
                          <h3 className="font-bold text-lg mb-2">{selectedShop.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{selectedShop.category}</p>
                          <p className="text-sm mb-2">{selectedShop.address}</p>
                          <p className="text-sm font-semibold">📞 {selectedShop.phone}</p>
                          {selectedShop.description && (
                            <p className="text-sm text-gray-500 mt-2">{selectedShop.description}</p>
                          )}
                          {selectedShop.products && selectedShop.products.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-semibold mb-1">Products:</p>
                              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                {selectedShop.products.map((product, index) => (
                                  <li key={index}>
                                    {product.name} — ৳{product.price}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <p className="text-gray-500">Loading map...</p>
                </div>
              )
            ) : (
              <div className="h-96 flex flex-col items-center justify-center px-6 text-center">
                <p className="text-gray-700 font-semibold mb-2">Google Maps is not configured.</p>
                <p className="text-sm text-gray-600">
                  Add a valid <code className="bg-gray-100 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to <code className="bg-gray-100 px-1 rounded">.env.local</code> and restart the frontend.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Nearby Shops ({shops.length})</h2>
              <button
                onClick={() => setShowAddForm((prev) => !prev)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {showAddForm ? 'Hide Form' : 'Add Shop'}
              </button>
            </div>

            {showAddForm && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">New Shop Information</h3>
                {submitError && <p className="text-red-600 mb-3">{submitError}</p>}
                {submitSuccess && <p className="text-green-600 mb-3">{submitSuccess}</p>}
                <form onSubmit={handleAddShopSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Shop Name"
                      className="w-full p-3 border rounded-lg"
                      value={newShop.name}
                      onChange={(e) => handleNewShopChange('name', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      className="w-full p-3 border rounded-lg"
                      value={newShop.category}
                      onChange={(e) => handleNewShopChange('category', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full p-3 border rounded-lg"
                      value={newShop.address}
                      onChange={(e) => handleNewShopChange('address', e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full p-3 border rounded-lg"
                      value={newShop.phone}
                      onChange={(e) => handleNewShopChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 border rounded-lg"
                      value={newShop.email}
                      onChange={(e) => handleNewShopChange('email', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        step="0.000001"
                        placeholder="Latitude"
                        className="w-full p-3 border rounded-lg"
                        value={newShop.lat}
                        onChange={(e) => handleNewShopChange('lat', e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        step="0.000001"
                        placeholder="Longitude"
                        className="w-full p-3 border rounded-lg"
                        value={newShop.lng}
                        onChange={(e) => handleNewShopChange('lng', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                    value={newShop.description}
                    onChange={(e) => handleNewShopChange('description', e.target.value)}
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    placeholder="Rating"
                    className="w-full p-3 border rounded-lg"
                    value={newShop.rating}
                    onChange={(e) => handleNewShopChange('rating', e.target.value)}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Products Sold</h4>
                      <button
                        type="button"
                        onClick={addProductRow}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Add Product
                      </button>
                    </div>

                    {products.map((product, index) => (
                      <div key={index} className="border p-4 rounded-xl bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <input
                            type="text"
                            placeholder="Product Name"
                            className="w-full p-3 border rounded-lg"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            required
                          />
                          <input
                            type="number"
                            min="0"
                            placeholder="Price"
                            className="w-full p-3 border rounded-lg"
                            value={product.price}
                            onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeProductRow(index)}
                            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        <textarea
                          placeholder="Product description"
                          className="w-full p-3 border rounded-lg"
                          rows="2"
                          value={product.description}
                          onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
                  >
                    Submit Shop
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {shops.map((shop) => (
                <div
                  key={shop._id}
                  onClick={() => setSelectedShop(shop)}
                  className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer hover:bg-blue-50"
                >
                  <h3 className="font-bold text-lg">{shop.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{shop.category}</p>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-semibold">📍</span> {shop.address}
                    </p>
                    <p>
                      <span className="font-semibold">📞</span> {shop.phone}
                    </p>
                    {shop.description && (
                      <p className="text-gray-600 mt-2">{shop.description}</p>
                    )}
                    {shop.products && shop.products.length > 0 && (
                      <div className="mt-3 text-gray-700">
                        <p className="text-sm font-semibold">Products:</p>
                        <ul className="list-disc list-inside text-sm">
                          {shop.products.map((product, index) => (
                            <li key={index}>{product.name} — ৳{product.price}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
