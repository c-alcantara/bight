"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          className="shadow-inner shadow-blue-600/20 text-blu placeholder-blue-600 placeholder:text-blu/50 border border-blu focus:outline-none active:outline-none bg-white/70 font-bold rounded-xl"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {errorMessage && <p className="text-500">{errorMessage}</p>}

      <div className="flex space-x-3 max-w-xs">
        <Button
          type="submit"
          className="text-sm md:text-lg font-semibold flex-1 bg-blu text-white font-semibold py-2 px-2 rounded-xl transition duration-300 ease-in-out transform hover:bg-white border border-blue-600 hover:text-blu shadow-lg shadow-blu/30"
        >
          Register
        </Button>

        <Button
          type="button"
          className="text-sm md:text-lg font-semibold flex-1 bg-white/0 text-blu py-2 px-2 rounded-xl transition duration-300 ease-in-out transform hover:bg-blu hover:text-white hover:border-white hover:border-2 shadow-lg shadow-blu/20 border-2 border-blu"
          onClick={() => router.push("/Product")}
        >
          Try it out
        </Button>
      </div>
      <p className="text-sm md:text-lg font-medium  text-blu">
        ✦ Register before December 1, 2024 for unlimited support requests.
      </p>
    </form>
  );
}
