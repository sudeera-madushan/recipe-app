"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import axios from "axios";
import Axios from "@/utils/axios";
import * as yup from "yup";
import Router from "next/router";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import Loader from "@/components/loader/Loader";

const loginSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    try {
      setIsLoading(true);
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({ name: "", email: "", password: "" });
      const response = await Axios.post("/auth/register", formData);

      console.log(response);
      if (response.status === 201) {
        Router.push("/login");
      }
      setAuthError("");
      setIsLoading(false);
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
        if (e.response?.status === 400) {
          setAuthError(e.response.data.error);
        } else {
          setAuthError("Something went wrong !");
        }
      }
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <AuthLayout>
      {isLoading ? (
        <div className="h-[630px]  flex items-center">
        <Loader />
      </div>
      ) : (
        <div>
          <div className="w-full flex items-center justify-center mt-24 mb-4">
            <Image src={logo} alt="cook logo" className="w-40" />
          </div>
          <form className="px-8" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-fontGray mb-6">
              Register
            </h2>
            <Input
              error={errors.name}
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="h-[1px]"></div>
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
              SIGN UP{isLoading && "..."}
            </button>
            <p className="mt-1 text-red-500 text-sm text-center h-[12px] ">
              {authError}
            </p>
            <p className="mt-8 text-fontGray text-center">
              Already have an account?{" "}
              <span className="text-primary opacity-90 hover:opacity-100 duration-200 cursor-pointer">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      )}
    </AuthLayout>
  );
};

export default login;
