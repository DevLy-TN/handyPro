import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logoLight from "../../assets/images/logoBlanc.jpg";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "admin@handypro.com",
      password: "h@ndyPro123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);
      fetch("http://localhost:3000/users/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
      })
        .then(async(response) => {
          const data=await response.json();
          console.log(data);
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);
            setSuccess(true);
          }
        }).then(()=>{
          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        })
      setSubmitting(false);
    },
  });
  React.useEffect(() => {
    const bodyElement = document.body;

    bodyElement.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen",
      "py-16",
      "lg:py-10",
      "bg-slate-50",
      "dark:bg-zink-800",
      "dark:text-zink-100",
      "font-public"
    );

    return () => {
      bodyElement.classList.remove(
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "py-16",
        "lg:py-10",
        "bg-slate-50",
        "dark:bg-zink-800",
        "dark:text-zink-100",
        "font-public"
      );
    };
  }, []);

  return (
    <div className="w-96 bg-white shadow-lg rounded-lg box-border p-8">
      {success && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Admin logged In successfully !</span>
          </div>
        </div>
      )}
      <p className="title text-center font-bold text-xl mb-6">Welcome back</p>
      <img
        src={logoLight}
        height={20}
        width={60}
        alt="Site Logo"
        className="mx-auto mb-6"
      />
      <form
        onSubmit={formik.handleSubmit}
        className="form w-full flex flex-col gap-4 mb-4"
      >
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input rounded-lg border border-gray-300 px-4 py-3"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input rounded-lg border border-gray-300 px-4 py-3"
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
        <button
          type="submit"
          className="form-btn bg-teal-500 text-white font-semibold rounded-lg px-4 py-2 shadow"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
