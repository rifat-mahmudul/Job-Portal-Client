import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";

const UseRole = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: role = '', isLoading} = useQuery({
        queryKey : ['user',user?.email ],
        enabled : !loading && !!user?.email,
        queryFn : async () => {
            const {data} = await axiosSecure(`/users/${user?.email}`)
            return data.role;
        }
    })

    return [role, isLoading]
}

export default UseRole
