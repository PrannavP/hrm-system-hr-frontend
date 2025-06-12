import { useEffect, useRef, useState } from "react";

import SideNavBar from "../../components/SideNavBar";

import { getAllTasksForHr } from "../../services/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const TasksPage = () => {
	const [tasks, setTasks] = useState([]);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
	const [selectedTasks, setSelectedTasks] = useState(null);

	const popupRef = useRef(null);

	useEffect(() => {
		fetchAllTasks();
	}, []);

	const fetchAllTasks = async () => {
		try {
			const response = await getAllTasksForHr();
			const data = response.data.tasks || [];
			setTasks(data);
		} catch (error) {
			console.error("Error fetching tasks list", error);
			setTasks([]);
		}
	};

	const handleThreeDotsClick = (event, task) => {
		event.stopPropagation();

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
		setSelectedTasks(task);
		setPopupVisible(true);
		console.log(task);
	};

	const closePopup = () => {
		setPopupVisible(false);
		setSelectedTasks(null);
	};

	return (
		<div className="flex" onClick={closePopup}>
			<SideNavBar />
			<div className="flex-1 p-8 relative">
				<ToastContainer
					position="top-right"
					autoClose={2000}
					closeOnClick={true}
				/>
				{/* Header with Add Employee Button */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Tasks List</h1>
					<button
						className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 font-semibold"
						onClick={() => (window.location.href = "/add-employee")}
					>
						+ Create Tasks
					</button>
				</div>

				{/* Table */}
				<div className="overflow-x-auto bg-white shadow-md rounded-lg">
					<table className="table-auto w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
								<th className="py-3 px-6">S.n</th>
								<th className="py-3 px-6">Title</th>
								<th className="py-3 px-6">Description</th>
								<th className="py-3 px-6">Assigned By</th>
								<th className="py-3 px-6">Assigned To</th>
								<th className="py-3 px-6">Due Date</th>
								<th className="py-3 px-6">Status</th>
								<th className="py-3 px-6">Actions</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 text-sm">
							{tasks.length > 0 ? (
								tasks.map((task) => (
									<tr
										key={task.id}
										className="border-b border-gray-200 hover:bg-gray-50"
									>
										<td className="py-3 px-6">{task.id}</td>
										<td className="py-3 px-6">
											{task.title}
										</td>
										<td className="py-3 px-6">
											{task.description}
										</td>
										<td className="py-3 px-6">
											{task.assigned_by_name}
										</td>
										<td className="py-3 px-6">
											{task.assigned_to_name}
										</td>
										<td className="py-3 px-6">
											{task.due_date
												? new Date(
														task.due_date
												  ).toLocaleDateString(
														"en-US",
														{
															year: "numeric",
															month: "short",
															day: "numeric",
														}
												  )
												: "-"}
										</td>
										<td className="py-3 px-6">
											{task.status}
										</td>
										<td className="py-3 px-6 text-right">
											<button
												className="text-gray-500 hover:text-gray-700"
												onClick={(e) =>
													handleThreeDotsClick(
														e,
														task
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
										colSpan="7"
										className="py-3 px-6 text-center text-gray-500"
									>
										No tasks found.
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
									// to={`/employee/${selectedTaskselectedTasks?.emp_id}`}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									View Tasks
								</Link>
							</li>
							<li>
								<Link
									// to={`/edit-employee/${selectedEmployee?.emp_id}`}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Edit
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									onClick={() =>
										alert("delete task function")
									}
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

export default TasksPage;
