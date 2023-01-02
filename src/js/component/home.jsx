import React, { useState } from 'react';


//create your first component
const Home = () =>{
	const [texto,setTexto]=useState("");
	const [lista,setLista]=useState([]);

	return (
		<div className="container">
			<h1>TO-DO List</h1>
			<ul>
				<li id="first">
					<input type="text"
        			onChange={(e) => setTexto(e.target.value)}
        			value={texto}
       			 	placeholder="Please, enter new task!!!"
					onKeyDown={(e) => 
						{if(e.key=='Enter'&& texto!="")
							{
								setLista(lista.concat(texto));
								setTexto("");
							}
						}
					}	
					/>
				</li>
				{lista.map((i,item) => 
					<li>{i} <i class="far fa-trash-alt" 
					onClick={()=>setLista(lista.filter((x,indexA)=>item!=indexA))}> 
					</i></li>)
				}
			</ul>
			<div id="numberItems">{lista.length} items</div>
		</div> 
	);
};

export default Home;
