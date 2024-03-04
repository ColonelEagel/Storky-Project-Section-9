import React,{ useState } from 'react';
import Button from './Button';

function ProjectsSidebar({ onStartAddProject,projects,onSelectProject,selectedProjectId }) {
    const [sidebarVisible,setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    return (
        <aside className={ `${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} w-1/3 px-8 py-16 bg-sky-900 text-sky-50 md:w-72 rounded-r-xl relative h-full duration-300` }>
            <button className={ `absolute right-[-50px] top-[-1rem] rounded-full w-11 h-11 ${sidebarVisible ? 'bg-red-600' : 'bg-sky-600'}   text-sky-50  text-center bold transition-all duration-300` } onClick={ toggleSidebar }>
                { sidebarVisible ? 'X' : '+' }
            </button>
            <div>
                <h2 className='mb-8 font-bold uppercase md:text-xl text-sky-200'>Your Projects</h2>
                {/* add project */ }
                <div className="">
                    <Button onClick={ onStartAddProject }>+ Add Project</Button>
                </div>
                {/* projects list */ }
                <ul className='mt-2'>
                    { projects?.map((project) => {
                        let cssClasses = "w-full text-left px-2 py-1 my-1 rounded-sm  hover:bg-stone-700/50  hover:text-stone-200"
                        if (project.id === selectedProjectId) {
                            cssClasses += " bg-sky-800 text-sky-200"
                        } else {
                            cssClasses += " text-stone-400"
                        }
                        return (
                            <li key={ project?.id }>
                                <button className={ cssClasses } onClick={ () => onSelectProject(project.id) }>
                                    { project?.title }
                                </button>
                            </li>
                        )
                    }) }
                </ul>
            </div>
        </aside>
    )
}

export default ProjectsSidebar;
