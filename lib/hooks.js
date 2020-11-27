import { useQuery } from "react-query";

export const useMe = () =>
  useQuery("/api/auth/me", () =>
    fetch("/api/auth/me").then((res) => res.json())
  );
