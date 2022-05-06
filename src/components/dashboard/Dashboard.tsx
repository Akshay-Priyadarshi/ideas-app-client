import React from "react";
import useAuth from "../../hooks/useAuth";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const { logoutUser } = useAuth();

    return (
        <div>
            <h3>Dashboard</h3>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Dashboard;
