import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardActiveTasksList } from "../../../services/api";

const DashboardActiveTasksListCard = () => {
    const [activeTasksList, setActiveTasksList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchActiveTasks();
    }, []);

    const fetchActiveTasks = async () => {
        try {
            const response = await getDashboardActiveTasksList();
            const data = response.data.activeTasksData || [];
            setActiveTasksList(data);
        } catch (error) {
            console.error("Error while fetching active tasks.", error);
            setActiveTasksList([]);
        }
    };

    // Helper to format ISO date to yyyy-MM-dd
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().slice(0, 10);
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3">Active Tasks</h2>
            <ul className="mb-4">
                {activeTasksList.length === 0 ? (
                    <li className="text-gray-500 text-sm">No active tasks.</li>
                ) : (
                    activeTasksList.map((task, idx) => (
                        <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                                <div className="font-semibold">{task.title}</div>
                                <div className="text-xs text-gray-500">
                                    Due: {formatDate(task.due_date)} | Priority:{" "}
                                    <span className={`font-bold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <button
                onClick={() => navigate("/tasks")}
                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
            >
                View All Tasks
            </button>
        </div>
    );
};

export default DashboardActiveTasksListCard;