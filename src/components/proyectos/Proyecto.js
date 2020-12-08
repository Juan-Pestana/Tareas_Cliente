import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext)
    const tareasContext = useContext(tareaContext)

    const {proyectoActual} = proyectosContext
    const {obtenerTareas} = tareasContext


    const onClickProyecto = id =>{
        proyectoActual(id)
        obtenerTareas(id)
    }

    return (
        <li>
            <button type='button' 
                    className="btn btn-blank"
                    onClick={()=> onClickProyecto(proyecto._id)}>{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto
