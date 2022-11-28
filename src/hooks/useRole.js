import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useRole = (email) => {
  const [role, setRole] = useState("");
  const {
    isLoading,
    data: accRole,
  } = useQuery({
    queryKey: ["accRole", email],
    queryFn: () =>
      fetch(`https://server-side-livid.vercel.app/user/specification?email=${email}`)
      .then((res) => res.json())
  });
  setRole(accRole)
  return [isLoading, role]
};

export default useRole;
