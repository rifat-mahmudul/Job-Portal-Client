import toast from "react-hot-toast"
import Swal from "sweetalert2"
import useAuth from "../../../hooks/useAuth"
import useAxiosPublic from "../../../hooks/useAxiosPublic"

const GuestNav = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleHost = async () => {
    
            try {
            const currentUser = {
                email: user?.email,
                role: 'guest',
                status: 'Requested',
            }
        
            const {data} = await axiosPublic.put('/user', currentUser)
        
            Swal.fire({
                title: "Are you want to become a host?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                if (data.modifiedCount > 0) {
                    toast.success('Success! Please wait for admin confirmation')
                } else {
                    toast.success('Please!, Wait for admin approval👊')
                }
                }
            });
            } catch (error) {
            console.log(error)
            }
    
    }

    return (
        <div>
            <button
                onClick={handleHost}
                className='disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-xl font-bold rounded-full  transition'
            >
                Host your home
            </button>
        </div>
    )
}

export default GuestNav
