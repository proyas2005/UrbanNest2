import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Profile</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <p className="text-gray-600 mb-8">Here is your account information.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-3xl bg-gray-50">
              <h2 className="text-xl font-semibold mb-3">Basic Info</h2>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 mt-4 mb-1">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
              <p className="text-sm text-gray-500 mt-4 mb-1">Role</p>
              <p className="text-lg font-medium capitalize">{user.role || "customer"}</p>
            </div>

            {user.role === "housemaid" ? (
              <div className="p-6 border border-gray-200 rounded-3xl bg-gray-50">
                <h2 className="text-xl font-semibold mb-3">Housemaid Profile</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">{user.address || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">{user.experienceYears ?? 0} years</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Service Area</p>
                    <p className="font-medium">{user.serviceArea || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">About</p>
                    <p className="font-medium whitespace-pre-line">{user.bio || "No bio added yet."}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-gray-200 rounded-3xl bg-gray-50 md:col-span-2">
                <h2 className="text-xl font-semibold mb-3">Customer Profile</h2>
                <p className="text-gray-600">This is your customer profile page. Sign up as a housemaid to add profile details and share your availability with customers.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
