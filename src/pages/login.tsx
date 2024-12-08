"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import Axios from "@/utils/axios";
import * as yup from "yup";
import Router from "next/router";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import Loader from "@/components/loader/Loader";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({ email: "", password: "" });
      const response = await Axios.post("/auth/login", formData);

      console.log(response);
      if (response.status === 200) {
        setIsLoading(true)
        setAuthError("");
        setFormData({ email: "", password: "" }); // Clear values on success
        Router.push("/");
      }
      // setIsLoading(false);
    } catch (e: any) {
      console.log(await e);
      setIsLoading(false);
      if (e instanceof yup.ValidationError) {
        const errorObject = e.inner.reduce((acc: any, error: any) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorObject);
      } else {
        if (e.response?.status === 500) {
          setAuthError("Something went wrong!");
        } else {
          setAuthError("Your password or username is incorrect!");
          setErrors({
            email: "Incorrect email",
            password: "Incorrect password",
          });
        }
      }
    }
  }

  return (
    <AuthLayout>
      {isLoading ? (
        <div className="h-[538px] flex items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="w-full flex items-center justify-center mt-24 mb-4">
            <Image src={logo} alt="cook logo" className="w-40" />
          </div>
          <form className="px-8" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-fontGray mb-6">Login</h2>
            <Input
              error={errors.email}
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <PasswordInput
              error={errors.password}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              disabled={isLoading}
              className={`duration-200 mt-10 hover:bg-secondary border border-primary hover:text-primary text-white p-2 w-full rounded font-bold bg-primary ${
                isLoading ? " cursor-not-allowed text-primary bg-secondary" : ""
              }`}
            >
              SIGN IN{isLoading && "..."}
            </button>
            <p className="mt-1 text-red-500 text-sm text-center h-[12px] ">
              {authError}
            </p>
            <p className="mt-8 text-fontGray text-center">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary opacity-90 hover:opacity-100 duration-200 cursor-pointer"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
