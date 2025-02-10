import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import axios from "axios";
import UserTable from "../components/UserTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const response = await axios.get("http://localhost:5000/", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        setUsers(response.data);
      } else {
        setError("User is not authenticated");
      }
    } catch (error) {
      setError("Failed to fetch users");
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Management Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;
