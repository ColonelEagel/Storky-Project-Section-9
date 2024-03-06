import { useEffect,useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const storedProjectsState = JSON.parse(localStorage.getItem("projectsState")) || null;
  const [projectsState,setProjectsState] = useState(storedProjectsState || {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  //save in local storage
  useEffect(() => {
    localStorage.setItem("projectsState",JSON.stringify(projectsState));
  },[projectsState]);

  // useEffect(() => {
  //   if (storedProjectsState) {
  //     setProjectsState(JSON.parse(storedProjectsState));
  //   }
  // },[]);
  function HandleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(project) {
    setProjectsState((prevState) => {
      const ProjectId = uuidv4
      const newProject = { ...project,id: ProjectId };
      return {
        ...prevState,
        selectedProjectId: ProjectId,
        projects: [...prevState.projects,newProject],
      };
    });
  }
  function handleCancelProject() {
    setProjectsState((prevState) => {

      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleSelectProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }


  function handleDeleteProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState?.projects?.filter((project) => project.id !== projectId),
      };
    });
  }

  const selectedProject = projectsState?.projects?.find((project) => {
    return project.id === projectsState.selectedProjectId;
  });

  let content = <SelectedProject project={ selectedProject }
    onDelete={ handleDeleteProject }
    onAddTask={ handleAddTask }
    onDeleteTask={ handleDeleteTask }
    tasks={ projectsState?.tasks } />


  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={ handleAddProject } onCancel={ handleCancelProject } />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={ HandleStartAddProject } />
  }
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState?.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }


  return (
    <main className=" h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={ HandleStartAddProject }
        projects={ projectsState?.projects }
        onSelectProject={ handleSelectProject }
        selectedProjectId={ projectsState.selectedProjectId }
        onAddTask={ handleAddTask }
        onDeleteTask={ handleDeleteTask }
        tasks={ projectsState.tasks }
      />

      { content }

    </main>
  );
}

export default App;
