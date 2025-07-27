import { useEffect, useState } from "react";
import SideNavBar from "../../components/SideNavBar";
import { getEmployeesAttendance } from "../../services/api";

const AttendancePage = () => {
    const [employeesAttendanceData, setEmployeesAttendanceData] = useState([]);

    useEffect(() => {
        fetchEmployeesAttendanceList();
    }, []);

    const fetchEmployeesAttendanceList = async () => {
        try {
            const response = await getEmployeesAttendance();
            setEmployeesAttendanceData(response.data || []);
        } catch (error) {
            console.error("Error while fetching employees attendance list", error);
            setEmployeesAttendanceData([]);
        }
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    // Helper to format time to 12-hour format (hh:mm:ss AM/PM)
    const formatTime = (timeString) => {
        if (!timeString) return "";
        const [time] = timeString.split(".");
        let [hour, minute, second] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}:${second.toString().padStart(2, "0")} ${ampm}`;
    };

    // Helper to format work time
    const formatWorkTime = (workTime) => {
        if (!workTime || workTime.seconds == null) return "-";
        const totalSeconds = workTime.seconds;
        if (totalSeconds < 60) {
            return `${totalSeconds} sec`;
        }
        const hours = Math.floor(totalSeconds / 3600);
        const seconds = totalSeconds % 3600;
        if (hours > 0) {
            return `${hours} hr ${seconds} sec`;
        }
        return `${seconds} sec`;
    };

    return (
        <div className="flex">
            {/* Fixed SideNavBar */}
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
                <SideNavBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Employees Attendance</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-base font-semibold leading-normal">
                                <th className="py-4 px-6">Employee ID</th>
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6">Check In</th>
                                <th className="py-4 px-6">Check Out</th>
                                <th className="py-4 px-6">Time Worked</th>
                                <th className="py-4 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-base font-medium">
                            {employeesAttendanceData.length > 0 ? (
                                employeesAttendanceData.map((att) => (
                                    <tr key={att.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-4 px-6">{att.emp_id}</td>
                                        <td className="py-4 px-6">{att.first_name} {att.last_name}</td>
                                        <td className="py-4 px-6">{formatDate(att.date)}</td>
                                        <td className="py-4 px-6">{formatTime(att.check_in_time)}</td>
                                        <td className="py-4 px-6">{formatTime(att.check_out_time)}</td>
                                        <td className="py-4 px-6">{formatWorkTime(att.total_work_hours)}</td>
                                        <td className={`py-4 px-6 font-semibold ${att.status === "Present" ? "text-green-500" : "text-red-500"}`}>{att.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-4 px-6 text-center text-gray-500 text-base font-medium">
                                        No attendance data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;