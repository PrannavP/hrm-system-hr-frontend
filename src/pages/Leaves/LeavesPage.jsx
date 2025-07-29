import { useEffect, useState, useRef } from "react";
import SideNavBar from "../../components/SideNavBar";
import { Link } from "react-router-dom";
import {
    fetchAllLeavesRequest,
    updateApprovedByLeave,
    updateLeaveStatus,
} from "../../services/api";
import { useUser } from "../../hooks/useUser";

const LeavesPage = () => {
    const { user } = useUser();

    const [employeesLeavesRequest, setEmployeesLeavesRequest] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [search, setSearch] = useState("");
    const [statusSort, setStatusSort] = useState(null); // null, 'asc', 'desc'

    const popupRef = useRef(null);

    useEffect(() => {
        fetchEmployeesLeavesRequest();
    }, []);

    const fetchEmployeesLeavesRequest = async () => {
        try {
            const response = await fetchAllLeavesRequest();
            setEmployeesLeavesRequest(
                response.data.allEmployeesLeaveRequests || []
            );
        } catch (error) {
            console.error("Error fetching leave requests:", error);
        }
    };

    // Filter and sort
    useEffect(() => {
        let filtered = employeesLeavesRequest;
        if (search.trim() !== "") {
            filtered = filtered.filter((leave) =>
                leave.full_name?.toLowerCase().includes(search.trim().toLowerCase())
            );
        }
        if (statusSort) {
            const statusOrder = { Approved: 3, Pending: 2, Rejected: 1 };
            filtered = [...filtered].sort((a, b) => {
                const aVal = statusOrder[a.status] || 0;
                const bVal = statusOrder[b.status] || 0;
                return statusSort === "asc" ? aVal - bVal : bVal - aVal;
            });
        }
        setFilteredLeaves(filtered);
    }, [search, employeesLeavesRequest, statusSort]);

    const handleThreeDotsClick = (event, leave) => {
        event.stopPropagation();

        const popupWidth = 160;
        const popupHeight = 120;
        const padding = 8;

        let x = event.clientX;
        let y = event.clientY;

        if (x + popupWidth > window.innerWidth) {
            x = window.innerWidth - popupWidth - padding;
        }
        if (x < padding) {
            x = padding;
        }
        if (y + popupHeight > window.innerHeight) {
            y = window.innerHeight - popupHeight - padding;
        }
        if (y < padding) {
            y = padding;
        }

        setPopupPosition({ x, y });
        setSelectedLeave(leave);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedLeave(null);
    };

    const performLeaveActionFnc = async (action, leave_id) => {
        if (action === "Approved" || action === "Rejected") {
            await updateLeaveStatus(action, leave_id);
            await updateApprovedByLeave(leave_id, user.email);
            window.location.reload();
        }
    };

    const handleStatusSort = () => {
        setStatusSort((prev) =>
            prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
        );
    };

    return (
        <div className="flex" onClick={closePopup}>
            {/* Fixed SideNavBar */}
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
                <SideNavBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-60 p-8 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Employee Leave Requests</h1>
                    <input
                        type="text"
                        placeholder="Search by Employee Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                        style={{ minWidth: 220 }}
                    />
                </div>
                {/* Table Container */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-base font-semibold leading-normal">
                                <th className="py-4 px-6">Employee Name</th>
                                <th className="py-4 px-6">Leave Type</th>
                                <th className="py-4 px-6">Starting Date</th>
                                <th className="py-4 px-6">Ending Date</th>
                                <th className="py-4 px-6">Total Days</th>
                                <th className="py-4 px-6">Reason</th>
                                <th
                                    className="py-4 px-6 cursor-pointer select-none"
                                    onClick={handleStatusSort}
                                    title="Sort by Status"
                                >
                                    Status
                                    {statusSort === "asc" && (
                                        <span className="ml-1">&#8593;</span>
                                    )}
                                    {statusSort === "desc" && (
                                        <span className="ml-1">&#8595;</span>
                                    )}
                                </th>
                                <th className="py-4 px-6">Approved By</th>
                                <th className="py-4 px-6">Created At</th>
                                <th className="py-4 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-base font-medium">
                            {filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave) => (
                                    <tr
                                        key={leave.id}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-6">{leave.full_name}</td>
                                        <td className="py-4 px-6">{leave.leave_type}</td>
                                        <td className="py-4 px-6">
                                            {new Date(leave.starting_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6">
                                            {new Date(leave.ending_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6">{leave.total_days}</td>
                                        <td className="py-4 px-6">{leave.reason}</td>
                                        <td
                                            className={`py-4 px-6 font-semibold ${
                                                leave.status === "Pending"
                                                    ? "text-yellow-500"
                                                    : leave.status === "Approved"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {leave.status}
                                        </td>
                                        <td className="py-4 px-6">{leave.approved_by}</td>
                                        <td className="py-4 px-6">
                                            {new Date(leave.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={(e) =>
                                                    handleThreeDotsClick(e, leave)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM17 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="py-4 px-6 text-center text-gray-500 text-base font-medium"
                                    >
                                        No leave requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Popup */}
                {popupVisible && (
                    <div
                        ref={popupRef}
                        className="fixed bg-white border border-gray-200 shadow-lg rounded-md z-50 w-40"
                        style={{
                            left: `${popupPosition.x}px`,
                            top: `${popupPosition.y}px`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="py-1">
                            <li>
                                <Link
                                    onClick={() =>
                                        performLeaveActionFnc(
                                            "Approved",
                                            selectedLeave?.id
                                        )
                                    }
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Approve
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        performLeaveActionFnc(
                                            "Rejected",
                                            selectedLeave?.id
                                        );
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Reject
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => console.log("delete leave")}
                                >
                                    Delete
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeavesPage;