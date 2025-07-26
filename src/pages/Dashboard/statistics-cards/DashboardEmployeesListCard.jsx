import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardEmployeesList } from "../../../services/api";

const DashboardEmployeesListCard = () => {
    const [recentlyJoinedEmployeesList, setRecentlyJoinedEmployeesList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecentlyJoinedEmployees();
    }, []);

    const fetchRecentlyJoinedEmployees = async () => {
        try {
            const response = await getDashboardEmployeesList();
            const data = response.data.recentlyJoinedEmployeesList || [];
            setRecentlyJoinedEmployeesList(data);
        } catch (error) {
            console.error("Error while fetching recently joined employees.", error);
            setRecentlyJoinedEmployeesList([]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3">Recently Joined Employees</h2>
            <ul className="mb-4">
                {recentlyJoinedEmployeesList.length === 0 ? (
                    <li className="text-gray-500 text-sm">No recently joined employees.</li>
                ) : (
                    recentlyJoinedEmployeesList.map((emp, idx) => (
                        <li key={emp.emp_id || idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                                <div className="font-semibold">
                                    {emp.first_name} {emp.last_name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    ID: {emp.emp_id} | Dept: {emp.department}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <button
                onClick={() => navigate("/employees")}
                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
            >
                View All Employees
            </button>
        </div>
    );
};

export default DashboardEmployeesListCard;