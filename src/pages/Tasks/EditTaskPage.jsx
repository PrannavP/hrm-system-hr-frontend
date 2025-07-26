import { useNavigate, useParams } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	createTask,
	employeesBasicDetails,
	getTaskById,
} from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { updateTaskField } from "../../services/api";

const schema = yup.object().shape({
	title: yup.string().required("Task title is required"),
	description: yup.string().required("Description is required"),
	start_date: yup.string().required("Start date is required"),
	priority: yup.string().required("Priority is required"),
	status: yup.string().required("Status is required"),
	due_date: yup
		.string()
		.required("Due date is required")
		.test(
			"is-after-start",
			"Due date cannot be before start date",
			function (value) {
				const { start_date } = this.parent;
				if (!start_date || !value) return true;
				return new Date(value) >= new Date(start_date);
			}
		),
	assigned_to: yup.number().min(1, "Please assign at least one employee"),
	remarks: yup.string().required("Remarks is required"),
});

const EditTaskPage = () => {
	// Useuser
	const { user } = useUser();

	const navigate = useNavigate();

	const { id } = useParams();

	const [employeesDetails, setEmployeesDetails] = useState([]);
	const [taskDetails, setTaskDetails] = useState({});

	// Fetch tasks details
	useEffect(() => {
		fetchTasksDetails(id);
	}, [id]);

	const fetchTasksDetails = async (task_id) => {
		try {
			const response = await getTaskById(task_id);
			const taskData = response.data.task[0];
			setTaskDetails(taskData);

			reset({
				title: taskData.title || "",
				description: taskData.description || "",
				start_date: formatDate(taskData.start_date) || "",
				priority: taskData.priority || "",
				status: taskData.status || "",
				due_date: formatDate(taskData.due_date) || "",
				assigned_to: taskData.assigned_to || "",
				remarks: taskData.remarks || "",
			});
		} catch (error) {
			console.error("Error while getting task data.");
			throw new Error("Error while getting task data for edit page.");
		}
	};

	// fetch employees basic details on mount
	useEffect(() => {
		fetchEmployeesBasicDetails();
	}, []);

	const fetchEmployeesBasicDetails = async () => {
		try {
			const response = await employeesBasicDetails();
			const result = response.data;
			setEmployeesDetails(result);
		} catch (error) {
			console.error("Erorr while fetching employee basic details", error);
		}
	};

	// Helper function for date
	const formatDate = (dateString) =>
		dateString ? new Date(dateString).toISOString().slice(0, 10) : "";

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const payload = {
				...data,
				assigned_by: user.hr_id,
			};

			await createTask(payload);

			toast.success("Task created successfully!");

			reset();

			setTimeout(() => navigate("/tasks"), 1500);
		} catch (err) {
			toast.error("Failed to create task.");
		}
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
            <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
                <SideNavBar />
            </div>
			<div className="flex-1 ml-60 p-8">
				<ToastContainer position="top-right" autoClose={2000} />
				<div className="flex items-center mb-6">
					<button
						onClick={() => navigate(-1)}
						className="mr-3 text-2xl font-bold text-gray-700 hover:text-black"
						aria-label="Back"
					>
						&#8592;
					</button>
					<h1 className="text-3xl font-bold">Create New Task</h1>
				</div>
				<div className="flex gap-6">
					{/* Left: Task Details */}
					<div className="flex-1 bg-white rounded-xl shadow p-8">
						<h2 className="text-xl font-bold mb-1">Task Details</h2>
						<p className="text-gray-500 mb-6">
							Enter the basic information about the task.
						</p>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Task Title
								</label>
								<input
									type="text"
									placeholder="Enter task title"
									{...register("title")}
									className="w-full border px-3 py-2 rounded"
								/>
								{errors.title && (
									<p className="text-red-500 text-xs mt-1">
										{errors.title.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Description
								</label>
								<textarea
									placeholder="Enter task description"
									{...register("description")}
									className="w-full border px-3 py-2 rounded"
								/>
								{errors.description && (
									<p className="text-red-500 text-xs mt-1">
										{errors.description.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Assign To
								</label>
								<select
									{...register("assigned_to")}
									className="w-full border px-3 py-2 rounded"
								>
									<option value="">Select employee</option>
									{employeesDetails.map((emp) => (
										<option key={emp.id} value={emp.id}>
											{emp.email} | {emp.first_name}{" "}
											{emp.last_name} | {emp.emp_id}
										</option>
									))}
								</select>
								{errors.assigned_to && (
									<p className="text-red-500 text-xs mt-1">
										{errors.assigned_to.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Start Date
								</label>
								<input
									type="date"
									{...register("start_date")}
									defaultValue={formatDate(
										taskDetails.start_date
									)}
									className="w-full border px-3 py-2 rounded"
								/>
								{errors.start_date && (
									<p className="text-red-500 text-xs mt-1">
										{errors.start_date.message}
									</p>
								)}
							</div>
							<div className="flex gap-4 mb-4">
								<div className="flex-1">
									<label className="block font-semibold mb-1">
										Priority
									</label>
									<select
										{...register("priority")}
										className="w-full border px-3 py-2 rounded"
									>
										<option value="">
											Select priority
										</option>
										<option value="Low">Low</option>
										<option value="Medium">Medium</option>
										<option value="High">High</option>
									</select>
									{errors.priority && (
										<p className="text-red-500 text-xs mt-1">
											{errors.priority.message}
										</p>
									)}
								</div>
								<div className="flex-1">
									<label className="block font-semibold mb-1">
										Status
									</label>
									<select
										{...register("status")}
										className="w-full border px-3 py-2 rounded"
									>
										<option value="">Not Started</option>
										<option value="Pending">Pending</option>
										<option value="In Progress">
											In Progress
										</option>
										<option value="Completed">
											Completed
										</option>
										<option value="On Hold">On Hold</option>
										<option value="Cancelled">
											Cancelled
										</option>
									</select>
									{errors.status && (
										<p className="text-red-500 text-xs mt-1">
											{errors.status.message}
										</p>
									)}
								</div>
							</div>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Due Date
								</label>
								<input
									type="date"
									{...register("due_date")}
									defaultValue={formatDate(
										taskDetails.due_date
									)}
									className="w-full border px-3 py-2 rounded"
								/>
								{errors.due_date && (
									<p className="text-red-500 text-xs mt-1">
										{errors.due_date.message}
									</p>
								)}
							</div>
							<div className="mb-4">
								<label className="block font-semibold mb-1">
									Remarks
								</label>
								<textarea
									placeholder="Enter remarks"
									{...register("remarks")}
									className="w-full border px-3 py-2 rounded"
								/>
								{errors.remarks && (
									<p className="text-red-500 text-xs mt-1">
										{errors.remarks.message}
									</p>
								)}
							</div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold mt-4"
							>
								{isSubmitting ? "Updating..." : "Update Task"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTaskPage;
