import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (Object.keys(parsedUser).length > 0) {
          setUser(parsedUser);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  if (loading) return <p>Loading...</p>;

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
