import { useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Tasks from "./Tasks";

function SelectedProject({ project,
    onDelete,
    onAddTask,
    onDeleteTask,
    tasks
}) {
    const formattedDate = new Date(project?.dueDate).toLocaleDateString('en-GB',{
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
    });
    const deleteModal = useRef(null)
    function handleConfirm(id) {
        deleteModal.current.close()
        onDelete(id)
    }
    return (
        <>
            <Modal ref={ deleteModal }>
                <p>Are you sure you want to Delete this task (<b>{ project?.title }</b>)?</p>
                <p className="my-4 text-red-500"><span className=" uppercase bold">Warning: </span>This action cannot be undone.</p>
                <menu className="flex justify-end items-center gap-4 my-4">
                    <li><Button onClick={ () => deleteModal.current.close() } className='px-6 py-2 rounded-md  text-stone-200 bg-stone-600 hover:bg-slate-700'>No</Button></li>
                    <li><Button onClick={ () => handleConfirm(project?.id) } className='px-6 py-2 rounded-md  text-stone-200 bg-red-500 hover:bg-red-700'>Yes</Button></li>
                </menu>
            </Modal>
            <div className="w-[60%] mx-auto mt-16">
                <header className="pb-4 mb-4 border-b-2 border-stone-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-stone-600 mb-2 ">
                            { project?.title }
                        </h1>
                        <button className="px-6 py-2 rounded-md  text-stone-200 bg-red-600 hover:bg-red-700" onClick={ () => deleteModal.current.open() }>
                            Delete
                        </button>
                    </div>
                    <p className="mb-4 text-stone-400">{ formattedDate }</p>
                    <p className="text-stone-600 whitespace-pre-wrap">{ project?.description }  </p>
                </header>
                <Tasks onAdd={ onAddTask } onDelete={ onDeleteTask } tasks={ tasks } />
            </div></>
    )
}

export default SelectedProject