import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [serviceArea, setServiceArea] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          phone,
          address,
          experienceYears,
          serviceArea,
          bio,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user info in localStorage for Navbar
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        alert("Signup successful!");
        navigate("/"); // redirect to homepage
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.log("Signup error:", err);
      setError("Server not responding");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Register As</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="housemaid">Housemaid</option>
            </select>
          </div>

          {role === "housemaid" && (
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 border rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Years of Experience"
                className="w-full p-3 border rounded-lg"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
              />
              <input
                type="text"
                placeholder="Service Area (e.g. city or neighborhood)"
                className="w-full p-3 border rounded-lg"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
              />
              <textarea
                placeholder="Short bio / services offered"
                className="w-full p-3 border rounded-lg"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          )}

          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;