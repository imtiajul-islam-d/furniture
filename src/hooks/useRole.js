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
      fetch(`http://localhost:5000/user/specification?email=${email}`)
      .then((res) => res.json())
  });
  setRole(accRole)
  return [isLoading, role]
};

export default useRole;
