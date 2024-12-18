import { useState } from "react"
import AddRoomForm from "../Form/AddRoomForm"
import useAuth from "../../../hooks/useAuth"
import axios from "axios";
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast"
// import { useNavigate } from "react-router-dom";

const AddRoom = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const handleDate = item => {
        setDate([item.selection])
    }

    const {mutateAsync} = useMutation({
        mutationFn : async roomData => {
            const {data} = await axiosSecure.post(`/room`, roomData)
            return data;
        },

        onSuccess : () => {
            toast.success('Room Added Successfully!')
            // navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })

    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault();
        const form = e.target;
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = date[0].endDate
        const from = date[0].startDate
        const price = form.price.value
        const guests = form.total_guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const formData = new FormData();
        formData.append('image' ,image)
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }

        try {
            
            const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            const image_url = data.data.display_url;

            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guests,
                bathrooms,
                bedrooms,
                host,
                description,
                image: image_url,
            }
            await mutateAsync(roomData)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (
        <div>
            <Helmet>
                <title>Add Room | Dashboard</title>
            </Helmet>

            <AddRoomForm 
            date={date} 
            handleDate={handleDate} 
            handleSubmit={handleSubmit}
            loading={loading}
            handleImage={handleImage}
            imagePreview={imagePreview}
            imageText={imageText}
            >

            </AddRoomForm>
        </div>
    )
}

export default AddRoom
