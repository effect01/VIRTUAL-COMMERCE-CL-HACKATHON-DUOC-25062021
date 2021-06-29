import React from 'react';
import {Input} from 'reactstrap';
import {productos} from './Productos.Array';
import {Tiendas} from '../TiendasArray';
const colors = [
	'rgb(69, 230, 189)',
	'rgb(182, 236, 96)',
	'rgb(231, 207, 129)',
	'rgb(255, 189, 66)',
];
const fourEmptyDiv = [];
for (let index = 0; index < 4; index++) {
	fourEmptyDiv.push(
		<div
			style={{
				backgroundColor: colors[index],
				animation: ` sliceFullMenu .5s ${(index - 1) * 50}ms`,
			}}
			key={index}
		></div>
	);
}

const Tienda = (props) => {
	const [menuOn, setMenuOn] = React.useState(false);
	const [open, setOpen] = React.useState();
	const state = {data: productos.filter((e) => e.TIENDA.ID_TIENDA == props.id)};
	console.log(state);
	const Tienda = Tiendas.filter((e) => e.id == props.id).shift();
	console.log(Tienda);

	return (
		<>
			{menuOn && (
				<MenuProductos
					addToCart={props.addToCart}
					cart={props.cart}
					setOpen={setOpen}
					state={state}
					setMenuOff={setMenuOn}
					isOn={'on'}
				/>
			)}

			<div id="tienda-page">
				<div id="tienda-page-panel-izquierdo">
					<div
						onClick={() => setMenuOn(true)}
						class="icon-menu-productos-tradicional"
					>
						<img
							style={{height: '60px', margin: 'auto', display: 'block'}}
							src="/online-shopping.svg"
							alt=""
						/>{' '}
						<span Style="font-size:  11.5674375px; ">
							Visitar tienda de forma tradicional
						</span>
					</div>
				</div>

				<div style={{height: '140px'}}></div>
				<div
					id="background-led-compra"
					style={{backgroundImage: `url("${Tienda.escenarios[0].url}")`}}
				>
					<div id="menu-tienda-secciones">
						<div>
							<img className="icon-previous-next" src="/previous.svg" alt="" />{' '}
							<span
								Style=" font-size: 26.25px;
									font-family: fangsong;
									font-style: normal;
									font-weight: 800;"
							>
								SALA PRINCIPAL
							</span>{' '}
							<img className="icon-previous-next" src="/next.svg" alt="" />
						</div>
					</div>
					<div id="tienda-led-compra">
						{/* productos */}
						{state.data &&
							state.data.map((state) => (
								<BotonProducto
									state={state}
									addToCart={props.addToCart}
									cart={props.cart}
									area={`${state.Y}/${state.X}`}
									open={open}
									setOpen={setOpen}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

const BotonProducto = ({area, open, setOpen, addToCart, cart, state}) => {
	console.log(area);
	return (
		<div style={{gridArea: `${area}`}} className="tienda-led-producto">
			<img
				onClick={() => setOpen(area)}
				src="/add.svg"
				style={{width: 'inherit', cursor: 'pointer'}}
				alt=""
			/>

			{open === area && CardProduct(state, addToCart, cart, setOpen)}
		</div>
	);
};

const CardProduct = (state, addToCart, cart, setOpen) => {
	const [nroBuy, setNroBuy] = React.useState(1);

	return (
		<div className="tienda-led-card-producto">
			<div>
				<div
					onClick={() => setOpen(false)}
					Style="text-align: right;cursor: pointer;  padding: 5px;"
				>
					x
				</div>

				<div
					Style="    display: flex;
}"
				>
					<div
						Style="    width:   150px;
    height:  193.95516413130505px;
   "
					>
						<img
							Style=" width:   150px;
    height: 193.95516413130505px;
"
							src={state.URL_IMAGEN}
							alt=""
						/>
					</div>
					<div
						Style="    width:   150px;
											height:  193.95516413130505px;
											padding: 10px;
											margin: auto;
											text-align: left;
												"
					>
						<span style={{fontSize: ' 21px', fontWeight: '600'}}>
							{state.NOMBRE}
						</span>
						<br />
						<span Style="font-size:  11.5674375px; "> {state.DESCRIPCION}</span>
					</div>
				</div>
				<div>
					<div id="product-interaction">
						<div>
							<span Style="font-size:  27.132px; font-weight: 800" alt="h2">
								{new Intl.NumberFormat('CLP', {
									style: 'currency',
									currency: 'CLP',
								}).format(state.PRECIO_BASE * (1 - state.OFERTA))}
							</span>
							<br />
							<span
								style={{
									color: 'grey',
									marginBotton: '15px',
									fontSize: '1.5vh',
									fontStyle: 'italic',
								}}
								alt="h5"
							>
								{' '}
								{state.OFERTA > 0 ? (
									<>
										<strike>
											{new Intl.NumberFormat('CLP', {
												style: 'currency',
												currency: 'CLP',
											}).format(state.PRECIO_BASE)}
										</strike>
									</>
								) : null}
							</span>
						</div>
						<div></div>
						<div>
							<div>
								<div>
									<button
										onClick={(_) =>
											nroBuy != 1 ? setNroBuy(nroBuy - 1) : setNroBuy(1)
										}
									>
										<i>-</i>
									</button>
									<span>{nroBuy}</span>
									<button
										onClick={(_) =>
											state.STOCK >= nroBuy + 1
												? setNroBuy(nroBuy + 1)
												: setNroBuy(nroBuy)
										}
									>
										<i>+</i>
									</button>
								</div>
								<span
									style={{fontSize: '0.6rem', marginBottom: '0.2rem'}}
									alt="p"
								>
									{state.STOCK} Disponibles
								</span>
							</div>
							<div>
								<div
									onClick={(_) => addToCart(cart, state, nroBuy)}
									className="add-item-to-card"
								>
									<span alt="p">COMPRAR</span>
								</div>
							</div>
						</div>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

const MenuProductos = ({setMenuOff, addToCart, cart, setOpen, state}) => {
	console.log('menu product rendered');
	return (
		<div>
			<div className={`product-menu on`}>
				{fourEmptyDiv}
				<div id="products-menu-container">
					<div
						Style="   
										display: flex;"
					>
						<div
							Style="width: 40px;
									margin-left: auto;
									margin-right: 120px;
									cursor: pointer;"
							onClick={() => setMenuOff(false)}
						>
							<img src="/x-mark.svg" style={{width: '40px'}} alt="" />
						</div>
					</div>
					<div>
						<div id="navbar-searcher">
							<Input
								name="Search"
								caret
								Style="width: 220px"
								id="an"
								type="text"
								placeholder="Buscar..."
							/>
						</div>

						<div id="container-producto-tradicional">
							{state.data &&
								state.data.map((state, index) => (
									<div
										style={{
											animation: `cardInit 1s ${500 + index * 50}ms forwards`,
										}}
										className="card-producto"
									>
										{CardProductTradicional(state, addToCart, cart, setOpen)}
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CardProductTradicional = (state, addToCart, cart, setOpen) => {
	const [nroBuy, setNroBuy] = React.useState(1);

	return (
		<div>

			<div>

			
			<div
					Style="    display: flex;
}"
				>
					<div
						Style="    width:   150px;
    height:  193.95516413130505px;
   "
					>
						<img
							Style=" width:   150px;
    height: 193.95516413130505px;
"
							src={state.URL_IMAGEN}
							alt=""
						/>
					</div>
					<div
						Style="    width:   150px;
											height:  193.95516413130505px;
											padding: 10px;
											margin: auto;
											text-align: left;
												"
					>
						<span style={{fontSize: ' 21px', fontWeight: '600'}}>
							{state.NOMBRE}
						</span>
						<br />
						<span Style="font-size:  11.5674375px; "> {state.DESCRIPCION}</span>
					</div>
				</div>
				<div>
					<div id="product-interaction">
						<div>
							<span Style="font-size:  27.132px; font-weight: 800" alt="h2">
								{new Intl.NumberFormat('CLP', {
									style: 'currency',
									currency: 'CLP',
								}).format(state.PRECIO_BASE * (1 - state.OFERTA))}
							</span>
							<br />
							<span
								style={{
									color: 'grey',
									marginBotton: '15px',
									fontSize: '1.5vh',
									fontStyle: 'italic',
								}}
								alt="h5"
							>
								{' '}
								{state.OFERTA > 0 ? (
									<>
										<strike>
											{new Intl.NumberFormat('CLP', {
												style: 'currency',
												currency: 'CLP',
											}).format(state.PRECIO_BASE)}
										</strike>
									</>
								) : null}
							</span>
						</div>
						<div></div>
						<div>
							<div>
								<div>
									<button
										onClick={(_) =>
											nroBuy != 1 ? setNroBuy(nroBuy - 1) : setNroBuy(1)
										}
									>
										<i>-</i>
									</button>
									<span>{nroBuy}</span>
									<button
										onClick={(_) =>
											state.STOCK >= nroBuy + 1
												? setNroBuy(nroBuy + 1)
												: setNroBuy(nroBuy)
										}
									>
										<i>+</i>
									</button>
								</div>
								<span
									style={{fontSize: '0.6rem', marginBottom: '0.2rem'}}
									alt="p"
								>
									{state.STOCK} Disponibles
								</span>
							</div>
							<div>
								<div
									onClick={(_) => addToCart(cart, state, nroBuy)}
									className="add-item-to-card"
								>
									<span alt="p">COMPRAR</span>
								</div>
							</div>
						</div>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tienda;
