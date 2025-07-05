"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrate } from "../../store/login";

export default function HydrationHandler() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        dispatch(hydrate(userData));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}
