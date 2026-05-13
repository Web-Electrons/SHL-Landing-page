"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CACHE_KEY = "location";

const fetchLocation = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const res = await axios.get("https://ipapi.co/json/");
  const data = res.data;

  const result = {
    ip: data.ip,
    country: data.country_code,
    lat: data.latitude,
    lng: data.longitude,
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(result));

  return result;
};

export const useLocation = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: fetchLocation,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
