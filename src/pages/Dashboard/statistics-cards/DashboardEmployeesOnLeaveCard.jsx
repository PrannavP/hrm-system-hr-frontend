import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardEmployeesOnLeaveList } from "../../../services/api";

const DashboardEmployeesOnLeaveCard = () => {
    const [employeesOnLeaveList, setEmployeesOnLeaveList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeesOnLeave();
    }, []);

    const fetchEmployeesOnLeave = async () => {
        try {
            const response = await getDashboardEmployeesOnLeaveList();
            const data = response.data.employeesOnLeaveData || [];
            setEmployeesOnLeaveList(data);
        } catch (error) {
            console.error("Error while fetching employees on leave.", error);
            setEmployeesOnLeaveList([]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3">Employees On Leave Today</h2>
            <ul className="mb-4">
                {employeesOnLeaveList.length === 0 ? (
                    <li className="text-gray-500 text-sm">No employees on leave today.</li>
                ) : (
                    employeesOnLeaveList.map((emp, idx) => (
                        <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <div>
                                <div className="font-semibold">{emp.employee_name}</div>
                                <div className="text-xs text-gray-500">
                                    Leave Type: {emp.leave_type}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <button
                onClick={() => navigate("/leaves")}
                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
            >
                View All Leaves
            </button>
        </div>
    );
};

export default DashboardEmployeesOnLeaveCard;