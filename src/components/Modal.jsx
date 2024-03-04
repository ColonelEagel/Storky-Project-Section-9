import { forwardRef,useImperativeHandle,useRef } from "react"
import { createPortal } from "react-dom"

import Button from "./Button"

const Modal = forwardRef(function Modal({ children,buttonCaption },ref) {
    const dialog = useRef(null)
    useImperativeHandle(ref,() => ({
        open() {
            dialog.current.showModal()
        },
        close() {
            dialog.current.close()
        },
    }))
    return createPortal(
        <dialog ref={ dialog } className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            { children }
            {/* <form method="dialog" className="text-right mt-4">
                <Button>{ buttonCaption }</Button>
            </form> */}
        </dialog>,
        document.getElementById("modal-root")
    )
})
export default Modal