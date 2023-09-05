import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ErrorText from "../../components/ErrorText";

import * as AuthService from "../../service/authService";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik<User>({
    validateOnMount: true,
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      AuthService.login(values.username, values.password);
      navigate("/edrs/dashboard");
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3  bg-green-400 "
         
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Electronic Death Registration System (EDRS)</h2>

              <p className="max-w-xl mt-3 text-gray-300">
              EDRS is a web application for filing death records. The system is used by those with the legal authority to complete a death certificate, including funeral directors, physicians, medical examiners, coroners, and deputy registrars.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                EDRS System
              </h2>
            </div>
            <div className="mt-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  <>
                    <label
                      className="block  tracking-wide text-gray-700 text-md font-medium  "
                      htmlFor="username"
                    >
                      <span className="text-gray-700 ">Username</span>
                      <input
                        className="form-input mt-1 h-10 block rounded  bg-gray-50 w-full "
                        type="text"
                        id="username"
                        {...formik.getFieldProps("username")}
                      />
                    </label>

                    {formik.touched.username && formik.errors ? (
                      <ErrorText msg={formik.errors.username} />
                    ) : null}
                  </>
                  <>
                    <label
                      className="block  tracking-wide text-gray-700 text-md font-medium  "
                      htmlFor="password"
                    >
                      <span className="text-gray-700 ">Password</span>
                      <input
                        className="form-input mt-1 h-10 block rounded  bg-gray-50 w-full "
                        type="password"
                        {...formik.getFieldProps("password")}
                        id="password"
                      />
                    </label>

                    {formik.touched.password && formik.errors ? (
                      <ErrorText msg={formik.errors.password} />
                    ) : null}
                  </>
                </div>
                <div
                  className={`text-center mt-6 ${
                    formik.isValid && "transition-transform hover:scale-105"
                  } `}
                >
                  <button
                    disabled={!formik.isValid}
                    className={` w-64 text-xl h-12 bg-gray-100   ${
                      formik.isValid &&
                      "hover:bg-primary-800 shadow-lg text-white  bg-primary-300 cursor-pointer "
                    }  rounded-2xl `}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface User {
  username: string;
  password: string;
}

const validate = (values: User) => {
  const errors: any = {};
  if (!values.username) {
    errors.username = "username is required";
  }
  if (!values.password) {
    errors.password = "password is required";
  }

  return errors;
};
