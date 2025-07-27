import axios from "axios";

const API_URL = "http://localhost:5000/api";
// const API_URL = import.meta.env.VITE_API_URL;

// login HR api call function
export const hrLogin = async (email, password) => {
	return axios.post(`${API_URL}/login-hr`, { email, password });
};

// fetch all employees basic details
export const employeesBasicDetails = async () => {
	return axios.get(`${API_URL}/get-employee-basic_details`);
};

// fetch all employees list api function
export const employeesList = async () => {
	return axios.get(`${API_URL}/hr/employees-list`);
};

// fetch employee's detail by the emp_id api function
export const employeeDetail = async (emp_id) => {
	return axios.get(`${API_URL}/hr/employee/${emp_id}`);
};

// add new employee api call function
export const addEmployee = async (
	emp_id,
	first_name,
	last_name,
	email,
	password,
	department,
	role,
	image,
	phone_number,
	address
) => {
	const formData = new FormData();
	formData.append("emp_id", emp_id);
	formData.append("first_name", first_name);
	formData.append("last_name", last_name);
	formData.append("email", email);
	formData.append("password", password);
	formData.append("department", department);
	formData.append("role", role);
	formData.append("phone_number", phone_number);
	formData.append("address", address);

	// Append the image file with the correct field name
	if (image) {
		formData.append("image", image);
	}

	return axios.post(`${API_URL}/create-employee`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

// employee delete by emp_id api call function
export const deleteEmployee = async (emp_id) => {
	return axios.delete(`${API_URL}/delete-employee/${emp_id}`);
};

// get all employee's leaves request
export const fetchAllLeavesRequest = async () => {
	return axios.get(`${API_URL}/hr/get-all-employees-leaves`);
};

// change status of employee's leaves
export const updateLeaveStatus = async (status, leave_id) => {
	return axios.post(`${API_URL}/hr/change-leave-status`, {
		status,
		leave_id,
	});
};

// change approved_by detail of employee's leave
export const updateApprovedByLeave = async (leave_id, hr_email) => {
	return axios.post(`${API_URL}/hr/change-leave-detail`, {
		leave_id,
		hr_email,
	});
};

// Call create task API
export const createTask = async (taskData) => {
	return axios.post(`${API_URL}/hr/create-task`, taskData);
};

// Get all tasks for HR
export const getAllTasksForHr = async () => {
	return axios.get(`${API_URL}/hr/get-all-tasks`);
};

// Get tasks assigned to a specific employee
export const getTasksByAssignedTo = async (assigned_to) => {
	return axios.get(`${API_URL}/get-tasks/${assigned_to}`);
};

// Update a specific field of a task (e.g., status, remarks, etc.)
export const updateTaskField = async (taskId, field, value) => {
	return axios.post(`${API_URL}/hr/update-task-field`, {
		taskId,
		field,
		value,
	});
};

// Get task by id
export const getTaskById = async (taskId) => {
	return axios.get(`${API_URL}/tasks/get-task/${taskId}`);
};

// Get dashboard card (employees list)
export const getDashboardEmployeesList = async() => {
	return axios.get(`${API_URL}/hr/dashboard/RecentlyJoinedEmployees`);
};

// Get dashboard card (active tasks list)
export const getDashboardActiveTasksList = async() => {
	return axios.get(`${API_URL}/hr/dashboard/ActiveTasks`);
};

// Get dashboard card (employees on leave list)
export const getDashboardEmployeesOnLeaveList = async() => {
	return axios.get(`${API_URL}/hr/dashboard/EmployeesOnLeave`);
};

// Get employeees attendance for HR Attendance page
export const getEmployeesAttendance = async () => {
	return axios.get(`${API_URL}/hr/EmployeesAttendance`);
};