import React, {useEffect} from 'react';
import Map from './Map';
import { Tiendas } from '../TiendasArray.js';
require('dotenv').config()


export default function Index() {
	const [geoCliente, setGeoCliente] = React.useState(null);
	const [error, setError] = React.useState(false);
	const [tiendas, setTiendas] = React.useState(null);
	console.log(process.env.REACT_APP_GOOGLE_API_KEY )
	useEffect(async () => {
		await navigator.geolocation.getCurrentPosition((e) => {
      console.log(e)
			setGeoCliente({
				lat: e.coords.latitude,
				lng: e.coords.longitude,
			});
		});
	}, []);
	useEffect( async () => {
		if(geoCliente){
			
			
			console.log(geoCliente, 	{
				titulo: 'YO',
				tipo: 'Cliente',
				...geoCliente,
				time: new Date(),
			})
			setTiendas([
				{
					titulo: 'YO',
					tipo: 'Cliente',
					...geoCliente,
					time: new Date(),
				},...Tiendas
			]);

		}
    console.log(tiendas)
	}, [geoCliente]);

	return (
		<div id="App">
			{geoCliente & !error || tiendas != null ? (
				
				<Map
					keyMap={process.env.REACT_APP_GOOGLE_API_KEY}
					clienteGeo={geoCliente}
					tiendas={tiendas}
					center={geoCliente}
				/>
			) : null}
		</div>
	);
}
