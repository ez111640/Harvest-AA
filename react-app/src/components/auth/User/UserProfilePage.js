import { useSelector } from "react-redux"

export const UserProfilePage = () => {
    const user = useSelector((state)=> state.session.user)


    return (

        <form>
            
        </form>
    )
}
