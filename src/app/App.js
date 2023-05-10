import React, { Component } from 'react';
import {render} from 'react-dom';

class App extends Component{

    constructor(){
        super();
        this.state = {
            Nombre: '' ,
            promedio: '',
            Universidad :'' ,
            Alumnos: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addAlumno = this.addAlumno.bind(this);
    }

    addAlumno(e){
        if(this.state._id){
            fetch(`/api/alumnos/${this.state._id}`,{
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers:{
                'Accept' : 'aplication/json',
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Alumno actualizado'});
            this.setState({Nombre: '' , promedio: '' , Universidad: ''})
            this.fetchAlumnos();
    });
        }else{
            fetch('/api/alunos',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept' : 'aplication/json',
                     'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Alumno actualizado'});
                this.setState({Nombre: '' , promedio: '' , Universidad: ''})
                this.fetchAlumnos();
            })
            .catch(err => console.error(err))
        }
        e.preventDefault();
    }
componentDidMount(){
    this.fetchAlumnos();
}
fetchAlumnos(){
        fetch('/api/Alumnos')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            this.setState({Alumnos: data});
            console.log(this.state.Alumnos);
        });
    }


    deleteAlumno(id){
        if(confirm('Seguro que quieres eliminar?')){
            fetch(`/api/alumnos/${id}` , {
                method: 'DELETE',
                headers: {
                    'Accept' : 'aplication/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json ())
            .then(data => {
                console.log(data);
                M.toast({html: 'Alumno Eliminado'})
                this.fetchAlumnos();
            });
        }
    }

    editAlumno(id){
        fetch(`/api/alumnos/${id}`)
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            this.setState({
            Nombre: data.Nombre,
            promedio: data.promedio,
            Universidad: data.Universidad,
            _id: data._id
        })
    });
    }
    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        });
    }



    render() {
        return (
       <div>
        {/*NAVIGATTION*/}
         <nav className='light-blue darken-4'>
         <div className='container'>
            <a className='brand-logo' href='/'>Alumnos</a>
         </div>
         </nav>
         <div className='container'>
            <div className='row'>
                <div className='col s5'>
                <div className='card'>
                    <div className='card-content'>
                        <form onSubmit={this.addAlumno}>
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input name = "Nombre" onChange={this.handleChange} type='text' placeholder='Nombre' value = {this.state.Nombre} ></input>
                                </div>
                                <div className='input-field col s12'>
                                    <textarea name= "promedio" onChange={this.handleChange}  placeholder='promedio' className='materialize-textarea' value = {this.state.promedio} ></textarea>
                                </div>
                                <div className='input-field col s12'>
                                <textarea name ="Universidad" onChange={this.handleChange} placeholder='Universidad' className='materialize-textarea' value = {this.state.Universidad}></textarea>
                                
                        
                                    
                                </div>
                            </div>
                            <button type="submit "className='btn light-blue darken-4'>
                                send
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                <div className='col s7'>
                    <table>
                        <thead>
                            <tr>
                                <th>Alumno</th>
                                <th>Promedio</th>
                                <th>Universidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Alumnos.map(alumno =>{
                                    return (
                                        <tr key={alumno._id}>
                                            <td>{alumno.Nombre}</td>
                                            <td>{alumno.promedio}</td>
                                            <td>{alumno.Universidad}</td>
                                            <td>
                                                <button className='btn light-blue darken-4' onClick={() => this.deleteAlumno(alumno._id)}><i className='mterial-icons'>Delete</i></button>
                                                <button className='btn light-blue darken-4' onClick={() => this.editAlumno(alumno._id)}style={{margin: '4px'}}><i className='material-icons'>edit</i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
         </div>
       </div>
        )
        
    }
    }

    export default App;