import React, { useState, useEffect} from 'react';

//create your first component
const Home = () =>{
	const [tarea,setTarea]=useState("");
	const [lista,setLista]=useState([{ label: "", done: false }]);

	const url='https://assets.breatheco.de/apis/fake/todos/user/Manuquim101';

/*==================METODO POST: DAR DE ALTA USUARIO================*/
const inicioPost = () => {
	fetch(url,{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ mail: '@.com', password: '123' })
	})
	.then(res => res.json())
	.then(res=> {console.log(res);})
}

/*======================METODO GET============================================*/
	const getData = () => {
		fetch(url)
		.then(response => response.json()) //converts response to json format
		.then(data => setLista(data))
		.catch(error=> console.error("Error en getData",error))
	}
	/*===============LLAMAMOS A LA FUNCION  POST Y GET================*/
	const inicioMetodos=() => {
		inicioPost();
		getData();
	}
	/*==========SE RENDERIZA UNA SOLA VEZ======================*/
	useEffect (()=>{inicioMetodos()},[])//se renderiza una sola vez

/* =========================METODO PUT======================================= */
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	let listaTareas= JSON.stringify(lista);//converts a JavaScript value to a JSON string
	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: listaTareas,
		redirect: "follow"
	};
	fetch(url,requestOptions)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log("error en el put", error));

/*=================METODO DELETE==============================*/
	const borrarTodo = () =>{
		fetch(url, {
			method: 'DELETE'
		})
		.then(res => res.json())
		.then(res=> console.log("borrado",res))
		setLista([]);
	};

/*==============ANYADIR TAREA A LA LISTA====================================================*/
	const anyadirTarea = (evento) => {
		evento.preventDefault();//si no se pone no funciona¿¿¿¿¿??????
		
		if(tarea!==""){
console.log("dentro de tarea !==cero");
			setLista([...lista,{label:tarea,done:false}]);//Spread operator
			console.log("tarea: ",tarea);
			console.log("dentro de anyadir tarea",lista);
			setTarea("");
		}
	};
/*===============QUITAR TAREA================================================= */
	const quitarTarea = i =>{
		let nuevaLista=[];
		nuevaLista=lista.filter((item)=>item!==lista[i]);	
		setLista(nuevaLista);
	};

/*============================================================================*/
	return(
		<div className=" mt-5">
			<div className="row justify-content-center">
				<div className="col-12 text-center">
					<h1 className="text-primary">TODO LIST API FETCH</h1>
					Tienes {lista.length} tareas pendientes
				</div>
				<form onSubmit={anyadirTarea} className="col-6 my-2">
					<input
						type="text"
						className="form-control mx-0"					
						placeholder="Introduzca su tarea"
						onChange={e =>setTarea(e.target.value)}
						value={tarea}
					/>
				</form>
			</div>
			<div className="row justify-content-center my-2">
				<div className="col-7">
					<ul className="list-group">
						{lista.map((element, i) => 
							<li className="list-group-item" key={i}>
								<div className='grupo'>
									<h6>Tarea: {i+1}</h6>
									<p>{element.label}</p>
									<h6>{element.done ? "Hecho" : "No Hecho"}</h6>
								 	<button className="btn btn-primary"
										onClick={() => {quitarTarea(i);}}>
									<span>X</span> 
									</button>
								</div>							
							</li> 
							)
						}
					</ul>		
				</div>	
			</div>
		</div>
	);
}
export default Home;
