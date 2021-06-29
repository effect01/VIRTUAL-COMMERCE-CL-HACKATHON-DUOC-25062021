/* eslint-disable no-eval */
import React, {useEffect, useMemo} from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
	DirectionsService,
	DirectionsRenderer,
} from '@react-google-maps/api';
import {Link} from 'react-router-dom';
import mapStyles from './MapStyles.js';
const SpanishTravelM = {
	DRIVING: 'en AUTO',
	TRANSIT: 'en MICRO Y METRO',
	WALKING: 'a PIE',
	BICYCLING: 'con BICICLETA',
};
const travelMethod = [
	{name: 'TRANSIT'},
	{name: 'DRIVING'},
	{name: 'WALKING'},
	{name: 'BICYCLING'},
];
const typeIconStore = {
	VERDURERIA: `🥦`,
	FRUTERERIA: `🍓`,
	COMPLETERIA: `🌭`,
	HAMBURGUESERIA: `🍔`,
	SUSHIRIA: `🍣`,
	RESTAURANT: `🍴`,
	VARIADO: `🛍`,
	LIMPIEZA: `🧼`,
	ROPA: `👕`,
	HUEVOS: `🥚`,
};
const libraries = ['places', 'drawing'];
const mapContainerStyle = {
	height: '969px',
	width: '1920px',
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

function Map(props) {
	let {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: `https://maps.googleapis.com/apis/js?v=3&key=${props.keyMap}`,
		libraries,
	});

	const [markers, setMarkers] = React.useState(null);
	const [selected, setSelected] = React.useState(null);
	const [direction, setDirection] = React.useState(() => ({
		response: null,
		travelMode: '',
		origin: '',
		destination: '',
	}));
	const res = React.useRef();
	const directionsCallback = (response) => {
		console.log(res.current, response);
		res.current = response;
		if (response !== null && response !== undefined) {
			if (response.status === 'OK') {
				setDirection((current) => ({
					...current,
					response,
				}));
			} else {
				console.log('response: ', response);
			}
		}
	};

	useEffect(async () => {
		if (markers === null) {
			isLoaded = false;
			setMarkers(() => [...props.tiendas]);
		}
		isLoaded = true;
	}, [markers]);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		console.log(map);
		mapRef.current = map;
	}, []);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading...';

	const configDirection = (des, travelM) => {
		setDirection(() => ({
			...direction,
			origin: props.clienteGeo,
			destination: {lat: des.lat, lng: des.lng},
			travelMode: travelM || 'DRIVING',
		}));
	};

	return (
		<div>
			<div
				className="clean-direction-map"
				onClick={() =>
					configDirection({
						lat: '',
						lng: '',
					})
				}
				alt="limpiar dirección"
			>
				<img style={{height: 'inherit'}} src="CLEAN.svg" alt="limpiar dirección" />{' '}
			</div>
			<div className="map-container">
				{/* mapa */}
				<GoogleMap
					id="map"
					mapContainerStyle={mapContainerStyle}
					zoom={15}
					center={props.center}
					options={options}
					onLoad={onMapLoad}
				>
					{markers.map((marker) => (
						<Marker
							key={`${marker.lat}-${marker.lng}`}
							position={{lat: marker.lat, lng: marker.lng}}
							onClick={() => {
								configDirection({
									lng: '',
									lat: '',
								});
								setSelected(marker);
								configDirection(marker);
							}}
							icon={{
								url: marker.tipo == 'Cliente' ? 'cliente.svg' : `/tienda.svg`,
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(15, 15),
								scaledSize: new window.google.maps.Size(30, 30),
							}}
						/>
					))}

					{selected &&
						infoWindo(selected, setSelected, direction, configDirection)}

					{
						<DirectService
							direction={direction}
							directionsCallback={directionsCallback}
							setDirection={setDirection}
						/>
					}
					{<DirectRender direction={direction} />}
				</GoogleMap>{' '}
			</div>
		</div>
	);
}
export default Map;

const infoWindo = (selected, setSelected, direction, configDirection) => {
	console.log('render');
	return (
		<InfoWindow
			position={{lat: selected.lat, lng: selected.lng}}
			onCloseClick={() => {
				setSelected(null);
			}}
			className="infoW"

		
			key={selected.id}
		>
			<div Style='text-align: left;'>

				<Link to={`/tienda/${selected.id}`}> 
				<div
					Style=" padding: 20px;
							width: 270px;
							background: #eaf5ff;"
							
				>
					<img
						Style="border-radius: 100%;
								width: 130px;
								height: 130px;
								margin: auto;
								display: block;"
						src={selected.imagen}
						alt=""
					/>
					<h4 Style="text-align: center">{selected.titulo}</h4>
					<span
						role="img"
						style={{fontSize: '30px', textAlign: 'center', display: 'block'}}
						aria-label="bear"
					>
						{typeIconStore[selected.tipo] || `🛒`}
					</span>
					
				</div></Link>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						borderBottom: '1px solid #0d6efd',
					}}
				>
					<img style={{height: '30px'}} src="OFERT.svg" alt="" />{' '}
					<span style={{paddingBottom: '2px'}}>OFERTAS </span>
				</div>
				{/* OFERTAS */}

				<div style={{width: '270px', display: 'flex'}}>
					<div className="ofert-dsct">
						<strong>
							<span Style="font-size: 30px; , text-weight: 700px">
								{' '}
								-30%
							</span>
						</strong>

						<span Style=" color:white;   margin: auto;">
							en todos los productos
						</span>
					</div>


					{/* PROMOCION */}
					<div className="ofert-special"></div>
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						borderBottom: '1px solid #0d6efd',
					}}
				>
					<img style={{height: '30px'}} src="OPEN.svg" alt="" />{' '}
					<span style={{paddingBottom: '2px'}}>INFO </span>
				</div>
				<div style={{width: '250px'}}>
					<span>Horarios: L a S DE 8:00 a 21:00 </span> <br />
					<span>Direccion: {selected.direccion} </span>
				</div>

				<br />
				<div style={{width: '270px'}}>
					<div>
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								borderBottom: '1px solid #0d6efd',
							}}
						>
							<img style={{height: '30px'}} src="ROUTE.svg" alt="" />{' '}
							<span style={{paddingBottom: '2px'}}>RUTAS </span>
						</div>
						<div id="container-icons-travel-mode-option">
							{travelMethod.map((e) => (
								<a
									id={`icon-${e.name}`}
									onClick={() => configDirection(selected, e.name)}
									style={{
										background:
											direction.travelMode === e.name
												? 'rgba(29, 168, 29, 0.171)'
												: null,
									}}
								>
									<img
										style={{
											width: '30px',
											height: '30px',
											display: 'block',
											margin: 'auto',
										}}
										src={`${e.name}.svg`}
										alt=""
									/>
								</a>
							))}
						</div>
					</div>

					{direction.response && direction.response ? (
						<p>
							A{' '}
							<strong>
								{direction.response.routes[0].legs[0].distance.text}
							</strong>
							<br />
							Llegaras en
							<strong>
								{' '}
								{direction.response.routes[0].legs[0].duration.text}{' '}
							</strong>{' '}
							llendo {SpanishTravelM[direction.response.request.travelMode]}
						</p>
					) : (
						<p>
							Esta forma de viaje se encuentra con un problema o no es apto para
							esta ruta :({' '}
						</p>
					)}
				</div>
			</div>
		</InfoWindow>
	);
};

const DirectService = React.memo(
	({direction, directionsCallback, setDirection}, prevProps) => {
		console.log(direction, prevProps);
		const option = {
			destination: direction.destination,
			origin: direction.origin,
			travelMode: direction.travelMode,
		};
		return (
			direction.destination !== '' &&
			direction.origin !== '' && (
				<DirectionsService
					options={option}
					// required
					callback={(e) => directionsCallback(e)}
					// optional
					onLoad={() =>
						setDirection({
							...direction,
							response: null,
							origin: '',
							destination: '',
						})
					}
				/>
			)
		);
	}
);
const DirectRender = React.memo(({direction}) => {
	console.log(direction);
	return (
		direction.response !== null && (
			<DirectionsRenderer
				// required
				options={{
					directions: direction.response,
				}}
			/>
		)
	);
});
