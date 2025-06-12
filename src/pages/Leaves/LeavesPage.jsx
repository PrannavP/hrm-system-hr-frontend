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
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
	const [selectedLeave, setSelectedLeave] = useState(null);

	const popupRef = useRef(null);

	useEffect(() => {
		fetchEmployeesLeavesRequest();
	}, []);

	const fetchEmployeesLeavesRequest = async () => {
		try {
			const response = await fetchAllLeavesRequest();
			console.log(response.data);
			setEmployeesLeavesRequest(
				response.data.allEmployeesLeaveRequests || []
			);
		} catch (error) {
			console.error("Error fetching leave requests:", error);
		}
	};

	const handleThreeDotsClick = (event, leave) => {
		event.stopPropagation();

		console.log(leave);

		const popupWidth = 160;
		const popupHeight = 120;
		const padding = 8;

		// Get cursor position in viewport coordinates
		let x = event.clientX;
		let y = event.clientY;

		// Adjust for right edge
		if (x + popupWidth > window.innerWidth) {
			x = window.innerWidth - popupWidth - padding;
		}

		// Adjust for left edge
		if (x < padding) {
			x = padding;
		}

		// Adjust for bottom edge
		if (y + popupHeight > window.innerHeight) {
			y = window.innerHeight - popupHeight - padding;
		}

		// Adjust for top edge
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
		console.log(action, leave_id);
		if (action === "Approved") {
			await updateLeaveStatus(action, leave_id);
			updateApprovedByLeave(leave_id, user.email);

			window.location.reload();
		} else if (action === "Rejected") {
			await updateLeaveStatus(action, leave_id);
			updateApprovedByLeave(leave_id, user.email);

			window.location.reload();
		}
	};

	return (
		<div className="flex" onClick={closePopup}>
			{/* Fixed SideNavBar */}
			<div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
				<SideNavBar />
			</div>

			{/* Main Content */}
			<div className="flex-1 ml-64 p-8 min-h-screen">
				<h1 className="text-2xl font-bold mb-6">
					Employee Leave Requests
				</h1>

				{/* Table Container */}
				<div className="overflow-x-auto bg-white shadow-md rounded-lg">
					<table className="table-auto w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-100 text-gray-600 text-base font-semibold leading-normal">
								{/* <th className="py-4 px-6">Employee ID</th> */}
								<th className="py-4 px-6">Employee Name</th>
								<th className="py-4 px-6">Leave Type</th>
								<th className="py-4 px-6">Starting Date</th>
								<th className="py-4 px-6">Ending Date</th>
								<th className="py-4 px-6">Total Days</th>
								<th className="py-4 px-6">Reason</th>
								<th className="py-4 px-6">Status</th>
								<th className="py-4 px-6">Approved By</th>
								<th className="py-4 px-6">Created At</th>
								<th className="py-4 px-6">Action</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 text-base font-medium">
							{employeesLeavesRequest.length > 0 ? (
								employeesLeavesRequest.map((leave) => (
									<tr
										key={leave.id}
										className="border-b border-gray-200 hover:bg-gray-50"
									>
										{/* <td className="py-4 px-6">
											{leave.emp_id}
										</td> */}
										<td className="py-4 px-6">
											{leave.full_name}
										</td>
										<td className="py-4 px-6">
											{leave.leave_type}
										</td>
										<td className="py-4 px-6">
											{new Date(
												leave.starting_date
											).toLocaleDateString()}
										</td>
										<td className="py-4 px-6">
											{new Date(
												leave.ending_date
											).toLocaleDateString()}
										</td>
										<td className="py-4 px-6">
											{leave.total_days}
										</td>
										<td className="py-4 px-6">
											{leave.reason}
										</td>
										<td
											className={`py-4 px-6 font-semibold ${
												leave.status === "Pending"
													? "text-yellow-500"
													: leave.status ===
													  "Approved"
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											{leave.status}
										</td>
										<td className="py-4 px-6">
											{leave.approved_by}
										</td>
										<td className="py-4 px-6">
											{new Date(
												leave.created_at
											).toLocaleDateString()}
										</td>
										<td className="py-3 px-6 text-right">
											<button
												className="text-gray-500 hover:text-gray-700"
												onClick={(e) =>
													handleThreeDotsClick(
														e,
														leave
													)
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
										colSpan="9"
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
