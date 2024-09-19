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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
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
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex space-x-4 max-w-sm">
        <Button
          type="submit"
          className="flex-1 bg-black text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-xl shadow-lg"
        >
          Register
        </Button>

        <Button
          type="button"
          className="flex-1 bg-white/50 text-black font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl shadow-lg border border-white"
          onClick={() => router.push("/Product")} // Use router.push to navigate
        >
          Demo
        </Button>
      </div>
      <p>Register for unlimted messages post launch.</p>
    </form>
  );
}
