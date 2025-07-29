import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavBar from "../../components/SideNavBar";
import { getEmployeeAttrition } from "../../services/api";

const schema = yup.object().shape({
  emplyee_id: yup.string().required("Employee ID is required"),
  employee_name: yup.string().required("Employee name is required"),
  Age: yup.number().required("Age is required").min(18).max(65),
  DistanceFromHome: yup.number().required("Distance is required").min(0),
  Education: yup.number().required("Education is required").min(1).max(5),
  JobSatisfaction: yup.number().required("Job Satisfaction is required").min(1).max(5),
  MonthlyIncome: yup.number().required("Monthly Income is required").min(0),
  OverTime: yup.number().required("OverTime is required").oneOf([0, 1]),
  PercentSalaryHike: yup.number().required("Percent Salary Hike is required").min(0),
  TotalWorkingYears: yup.number().required("Total Working Years is required").min(0),
  YearsAtCompany: yup.number().required("Years At Company is required").min(0),
  WorkLifeBalance: yup.number().required("Work Life Balance is required").min(1).max(4),
});

const AttritionPredictionPage = () => {
  const [result, setResult] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await getEmployeeAttrition(data);
      console.log(response.data.Attrition_Risk);
      setResult(response.data);
      setPopupVisible(true);
      toast.success("Prediction submitted!");
      // reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to predict attrition.");
    }
  };

  const closePopup = () => setPopupVisible(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed SideNavBar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-10">
        <SideNavBar />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col items-center py-8">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="bg-white rounded-xl shadow p-8 w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Attrition Prediction</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Employee ID</label>
                <input
                  type="text"
                  {...register("emplyee_id")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.emplyee_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.emplyee_id.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Employee Name</label>
                <input
                  type="text"
                  {...register("employee_name")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.employee_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.employee_name.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Age</label>
                <input
                  type="number"
                  {...register("Age")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.Age && (
                  <p className="text-red-500 text-xs mt-1">{errors.Age.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Distance From Home (km)</label>
                <input
                  type="number"
                  {...register("DistanceFromHome")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.DistanceFromHome && (
                  <p className="text-red-500 text-xs mt-1">{errors.DistanceFromHome.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Education (1-5)</label>
                <input
                  type="number"
                  {...register("Education")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.Education && (
                  <p className="text-red-500 text-xs mt-1">{errors.Education.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Job Satisfaction (1-5)</label>
                <input
                  type="number"
                  {...register("JobSatisfaction")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.JobSatisfaction && (
                  <p className="text-red-500 text-xs mt-1">{errors.JobSatisfaction.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Monthly Income</label>
                <input
                  type="number"
                  {...register("MonthlyIncome")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.MonthlyIncome && (
                  <p className="text-red-500 text-xs mt-1">{errors.MonthlyIncome.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">OverTime</label>
                <select {...register("OverTime")} className="w-full border px-3 py-2 rounded">
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                {errors.OverTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.OverTime.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Percent Salary Hike</label>
                <input
                  type="number"
                  {...register("PercentSalaryHike")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.PercentSalaryHike && (
                  <p className="text-red-500 text-xs mt-1">{errors.PercentSalaryHike.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Working Years</label>
                <input
                  type="number"
                  {...register("TotalWorkingYears")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.TotalWorkingYears && (
                  <p className="text-red-500 text-xs mt-1">{errors.TotalWorkingYears.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Years At Company</label>
                <input
                  type="number"
                  {...register("YearsAtCompany")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.YearsAtCompany && (
                  <p className="text-red-500 text-xs mt-1">{errors.YearsAtCompany.message}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Work Life Balance (1-4)</label>
                <input
                  type="number"
                  {...register("WorkLifeBalance")}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.WorkLifeBalance && (
                  <p className="text-red-500 text-xs mt-1">{errors.WorkLifeBalance.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 font-semibold mt-6 w-full"
            >
              {isSubmitting ? "Predicting..." : "Predict Attrition"}
            </button>
          </form>
        </div>
        {/* Popup for result */}
{popupVisible && result && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    onClick={closePopup}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-10 min-w-[400px] max-w-xl flex flex-col items-center"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="font-bold mb-4 text-2xl text-center">Prediction Result</h2>
      <p className="text-lg mb-2 text-center">
        <span className="font-semibold">Attrition Risk:</span> {result.Attrition_Risk}
      </p>
      {result.Attrition_Risk === "No" ? (
        <div className="mt-6 text-center">
          <h3 className="font-semibold mb-2 text-green-700 text-lg">Retention Tips</h3>
          <ul className="list-disc pl-5 text-base text-gray-700 inline-block text-left">
            <li>Continue recognizing and rewarding good performance.</li>
            <li>Maintain open communication and regular feedback.</li>
            <li>Support career growth and learning opportunities.</li>
            <li>Encourage work-life balance and flexibility.</li>
          </ul>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <h3 className="font-semibold mb-2 text-red-700 text-lg">Attrition Risk Tips</h3>
          <ul className="list-disc pl-5 text-base text-gray-700 inline-block text-left">
            <li>Schedule a one-on-one meeting to understand concerns.</li>
            <li>Review workload and job satisfaction factors.</li>
            <li>Offer mentorship or additional support.</li>
            <li>Consider incentives or recognition programs.</li>
          </ul>
        </div>
      )}
      <button
        className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 text-lg"
        onClick={closePopup}
      >
        Close
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default AttritionPredictionPage;