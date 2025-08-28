import { useParams, useLoaderData, useNavigate, NavLink } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";


const JobPage = ({deleteJob}) => {
  const { id } = useParams();
  const job = useLoaderData();

  const navigate = useNavigate();

  const onDeleteCLick = (jobID) => {
    const confirm = window.confirm('Are you sure? Do you want to delete this job?');
    
    if (!confirm ) return;

    deleteJob(jobID);

    toast.success('Job Deleted Successfully');

    navigate('/jobs')
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <NavLink
            to="/"
            className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </NavLink>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">
                  {job.title}
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-600 mr-1"/>
                  <i className="fa-solid fa-location-dot text-lg ">
                  </i>
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">
                  {job.description}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company_name}</h2>

                <p className="my-2">
                  {job.company_desc}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company_email}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company_phone}</p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <NavLink
                  to={`/job-edit/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Edit Job
                </NavLink>
                <button onClick={() => onDeleteCLick(job.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </>
  ) ;
 } ;
const API = import.meta.env.VITE_API_URL;

const JobLoader = async ({ params }) => {
  const res = await fetch(`${API}/jobs`);
  const data = await res.json();
  const job = data.jobs.find((job) => job.id === parseInt(params.id));
  return job;
};
export { JobPage as default, JobLoader };
