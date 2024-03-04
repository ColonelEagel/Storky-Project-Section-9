import React from 'react'
import noProjectImage from '../assets/no-projects.png'
import Button from './Button'
export default function NoProjectSelected({ onStartAddProject }) {
    return (
        <div className='mt-24 text-center w-2/3'>
            <img src={ noProjectImage } alt="An empty task list"
                className='w-16 mx-auto mb-4 object-contain'
            />
            <h2 className='text-2xl font-bold text-stone-700 my-4'>No Project Selected</h2>
            <p className="text-stone-600 mb-4">Select a project to get started with a new one</p>
            <p className="mt-8">
                <Button onClick={ onStartAddProject } >create new project</Button>
            </p>
        </div>
    )
}
