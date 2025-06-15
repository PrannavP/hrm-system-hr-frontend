import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { employeeDetail } from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string(),
	phoneNumber: Yup.string().required("Phone Number is required"),
	address: Yup.string().required("Address is required"),
	employeeId: Yup.string().required("Employee ID is required"),
	department: Yup.string().required("Department is required"),
	role: Yup.string().required("Role is required"),
	joinDate: Yup.string().required("Join Date is required"),
	image: Yup.mixed(),
});

const EditEmployeePage = () => {
	// navigation
	const navigate = useNavigate();

	const { id } = useParams();
	const [previewImage, setPreviewImage] = useState(null);
	const [loading, setLoading] = useState(true);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phoneNumber: "",
			address: "",
			employeeId: "",
			department: "",
			role: "",
			joinDate: "",
			image: null,
		},
	});

	useEffect(() => {
		const fetchEmployeeData = async () => {
			try {
				const response = await employeeDetail(id);
				const employeeData = response.data.employee;

				reset({
					firstName: employeeData.first_name || "",
					lastName: employeeData.last_name || "",
					email: employeeData.email || "",
					password: "",
					phoneNumber: employeeData.phone_number || "",
					address: employeeData.address || "",
					employeeId: employeeData.emp_id || "",
					department: employeeData.department || "",
					role: employeeData.role || "",
					joinDate: employeeData.join_date
						? employeeData.join_date.split("T")[0]
						: "",
					image: null,
				});

				setPreviewImage(
					employeeData.image
						? `http://localhost:5000/${employeeData.image}`
						: null
				);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching employee data:", error);
				toast.error("Failed to load employee data.");
				setLoading(false);
			}
		};

		fetchEmployeeData();
	}, [id, reset]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setValue("image", file);
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append("emp_id", data.employeeId);
			formData.append("first_name", data.firstName);
			formData.append("last_name", data.lastName);
			formData.append("email", data.email);
			if (data.password) formData.append("password", data.password);
			formData.append("department", data.department);
			formData.append("role", data.role);
			if (data.image) formData.append("image", data.image);
			formData.append("phone_number", data.phoneNumber);
			formData.append("address", data.address);
			formData.append("join_date", data.joinDate);

			// TODO: Call your update API here

			toast.success("Employee updated successfully!");
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while updating the employee.");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex">
			<div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
				<SideNavBar />
			</div>
			<div className="flex-1 ml-64 p-4 bg-gray-100 overflow-y-auto">
				<ToastContainer
					position="top-right"
					autoClose={2000}
					closeOnClick={true}
				/>
				<h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Personal Information Section */}
						<div className="bg-white shadow-md rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-2">
								Personal Information
							</h3>
							<div className="flex flex-col items-center mb-6">
								<div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4">
									{previewImage ? (
										<img
											src={previewImage}
											alt="Preview"
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="text-gray-400 text-2xl">
											?
										</span>
									)}
								</div>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
									id="upload-photo"
								/>
								<label
									htmlFor="upload-photo"
									className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
								>
									Upload Photo
								</label>
								{errors.image && (
									<p className="text-red-500 text-xs mt-1">
										{errors.image.message}
									</p>
								)}
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										First Name
									</label>
									<input
										type="text"
										{...register("firstName")}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{errors.firstName && (
										<p className="text-red-500 text-xs mt-1">
											{errors.firstName.message}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Last Name
									</label>
									<input
										type="text"
										{...register("lastName")}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{errors.lastName && (
										<p className="text-red-500 text-xs mt-1">
											{errors.lastName.message}
										</p>
									)}
								</div>
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
									type="email"
									{...register("email")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone Number
								</label>
								<input
									type="text"
									{...register("phoneNumber")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.phoneNumber && (
									<p className="text-red-500 text-xs mt-1">
										{errors.phoneNumber.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Address
								</label>
								<textarea
									{...register("address")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									rows="3"
								></textarea>
								{errors.address && (
									<p className="text-red-500 text-xs mt-1">
										{errors.address.message}
									</p>
								)}
							</div>
						</div>

						{/* Employment Details Section */}
						<div className="bg-white shadow-md rounded-lg p-6">
							<h3 className="text-lg font-semibold mb-2">
								Employee Details
							</h3>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Employee ID
								</label>
								<input
									type="text"
									{...register("employeeId")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									disabled
								/>
								{errors.employeeId && (
									<p className="text-red-500 text-xs mt-1">
										{errors.employeeId.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Department
								</label>
								<select
									{...register("department")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Select department</option>
									<option value="HR">HR</option>
									<option value="Engineering">
										Engineering
									</option>
									<option value="Sales">Sales</option>
									<option value="Finance">Finance</option>
								</select>
								{errors.department && (
									<p className="text-red-500 text-xs mt-1">
										{errors.department.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Role
								</label>
								<input
									type="text"
									{...register("role")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.role && (
									<p className="text-red-500 text-xs mt-1">
										{errors.role.message}
									</p>
								)}
							</div>
							<div className="mt-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Join Date
								</label>
								<input
									type="date"
									{...register("joinDate")}
									className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.joinDate && (
									<p className="text-red-500 text-xs mt-1">
										{errors.joinDate.message}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
						>
							Save Changes
						</button>
						<button
							className="bg-gray-200 text-gray-700 px-6 ml-2 py-2 rounded-lg hover:bg-gray-300 transition-colors"
							onClick={() => navigate("/employees")}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditEmployeePage;
