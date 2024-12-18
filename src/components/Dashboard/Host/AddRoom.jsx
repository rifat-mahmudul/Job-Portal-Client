import { useState } from "react"
import AddRoomForm from "../Form/AddRoomForm"

const AddRoom = () => {

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ])

    const handleDate = item => {
        setDate([item.selection])
    }

    return (
        <div>
            <AddRoomForm date={date} handleDate={handleDate}></AddRoomForm>
        </div>
    )
}

export default AddRoom
