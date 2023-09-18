import { useModal } from "../../../context/Modal"
export const createPinStatus = (status) => {

    const { closeModal } = useModal()


    return (
        <div onClick={closeModal}>
            {status === "success" ?
                <div></div>
                : <div></div>}
        </div>
    )
}
