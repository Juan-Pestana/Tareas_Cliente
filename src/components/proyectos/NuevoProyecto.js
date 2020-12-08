import React, {useContext, useState}from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'


const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)
    const {formulario, errorFormulario, mostrarFormulario, crearProyecto, mostrarError} = proyectosContext

    const [proyecto, setProyecto]= useState({
        nombre: '',
        id: ''
    })

    const{nombre} = proyecto


    const onChangeProyecto = e =>{
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e =>{
        e.preventDefault()

        if(nombre === '') {
            mostrarError()
            return;}

        crearProyecto(proyecto)

        setProyecto({
            nombre: '',
            id: ''
        })



        
    }


    return (
        <>
        <button
        type='button'
        className='btn btn-block btn-primario'
        onClick={() => mostrarFormulario()}>
           NuevoProyecto 
        </button>
        {formulario ?
        (
            <form className='formulario-nuevo-proyecto'>
            <input type="text" 
                className="input-text"
                name='nombre'
                placeholder='Nombre del proyecto'
                value={nombre}
                onChange={onChangeProyecto}
                />
            <input type="submit" value='Añadir Proyecto' onClick={onSubmitProyecto} className="btn btn-block btn-primario"/>
        </form>
        ) :
            null
        }
        {errorFormulario ?  <p className='mensaje error'>El nombre del proyecto es obligatorio</p> :  null}
        </>
    )
}

export default NuevoProyecto
