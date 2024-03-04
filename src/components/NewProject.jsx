import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

export default function NewProject({ onAdd,onCancel }) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const modal = useRef(null)
    const cancelModal = useRef(null)
    const handleSave = () => {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        //validation
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredDueDate.trim().length === 0) {
            modal.current.open();
            return;
        }
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }
    // handle cancel
    function handleCancel() {
        onCancel()
    }
    return (
        <>
            <Modal ref={ cancelModal }>
                <p>Are you sure you want to cancel?</p>
                <menu className="flex justify-end items-center gap-4 my-4">
                    <li><Button onClick={ () => cancelModal.current.close() }>No</Button></li>
                    <li><Button onClick={ handleCancel } className='px-6 py-2 rounded-md  text-stone-200 bg-red-600 hover:bg-red-700'>Yes</Button></li>
                </menu>
            </Modal>
            <Modal ref={ modal } buttonCaption="Ok">
                <h2 className='text-2xl font-bold text-stone-500 my-4'>Invalid Input</h2>
                <p className="text-stone-400 mb-4">Please check your input values</p>
                { <Button onClick={ () => modal.current.close() }>Ok</Button> }
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex justify-end items-center gap-4 my-4">
                    <li><button onClick={ () => cancelModal.current.open() } className="text-stone-800 hover:text-stone-950 hover:underline">Cancel</button></li>
                    <li><button onClick={ handleSave } className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>Save</button></li>
                </menu>
                <div className="">
                    <Input ref={ title } label="title" id="title" />
                    <Input ref={ description } label="description" id="description" textarea />
                    <Input type="date" ref={ dueDate } label="Due Date" id="Due Date" />
                </div>
            </div>
        </>
    );
}
