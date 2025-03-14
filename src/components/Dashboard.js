import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.keys(storedUser).length > 0) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>
      {user?.name ? (
        <p>
          Hello, <strong>{user.name}</strong>! <br />
          Your Phone Number: <strong>{user.phone}</strong>
        </p>
      ) : (
        <p>No user data found.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
