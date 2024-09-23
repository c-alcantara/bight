"use client";

import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Initialize useRouter

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value // Update the specific field in formData
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Success!");
        setFormData({
          email: "",
        });
        setErrorMessage("");
      } else {
        setErrorMessage(responseData.error);
        if (responseData.error === "This event was already recorded.") {
          setErrorMessage(responseData.error);
        }
      }
    } catch (error) {
      setErrorMessage("ERROR: " + error + " :(");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {/* <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-medium text-black/50">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div> */}

      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className=" text-blue-800 placeholder-blue-600 placeholder:text-blue-600/60 border border-blue-600 focus:outline-none active:outline-none bg-white/70 font-bold rounded-xl"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {errorMessage && <p className="text-500">{errorMessage}</p>}

      <div className="flex space-x-4 max-w-sm">
        <Button
          type="submit"
          className="text-md font-semibold flex-1  bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:bg-white border border-blue-600 hover:text-blue-600   shadow-lg shadow-blue-600/30"
        >
          Register
        </Button>

        <Button
          type="button"
          className="text-md font-semibold flex-1 bg-white/70 text-blue-600  py-2 px-4 rounded-xl transition duration-300 ease-in-out transform  hover:bg-blue-600 hover:text-white  shadow-lg shadow-blue-600/20 border border-blue-600"
          onClick={() => router.push("/Product")} // Use router.push to navigate
        >
          Try it out
        </Button>
      </div>
      <p className="font-medium text-lg text-blue-600">
        Register before December 1, 2024 for unlimited support requests
      </p>
    </form>
  );
}
