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

const loginSchema = yup.object().shape({
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
    email: "",
    password: "",
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      setIsLoading(true);
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({ email: "", password: "" });
      const response = await Axios.post("/auth/login", formData);

      console.log(response);
      if (response.status === 200) {
        Router.push("/");
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
        if (e.response?.status === 500) {
          setAuthError("Something went wrong !");
        } else {
          setAuthError("You password or username is incorrect !");
          setErrors({
            email: "incorrect email",
            password: "incorrect password",
          });
        }
      }
    }
  }
  return (
    <AuthLayout>
      <div className="w-full flex items-center justify-center mt-24 mb-4">
        <Image src={logo} alt="cook logo" className="w-40" />
      </div>
      <form className="px-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-fontGray mb-6">Login</h2>
        <Input error={errors.email} label="Email Address" name="name" />
        <PasswordInput error={errors.password} />
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
    </AuthLayout>
  );
};

export default login;
