import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	Row,
	Input,
	Col,
	Container,
} from 'reactstrap';

const Navegador = ({
	signOut,
	count,
	totalToBuy,
	auth,
	cart,
	addToCart,
	changeDelivery,
	changeNroToBuy,
	minusNroToBuy,
	deleteAItem,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [cartTogle, setCartTogle] = useState(null);
	const [suggested, setSuggested] = useState({data: []});
	const toggleNavbar = () => setCollapsed(!collapsed);
	const toggle = () => setIsOpen((prevState) => !prevState);

	return (
		<>
			<div>
				<Navbar
					Style="    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 6%;
	font-size: 14px;
	right:  30%;
	margin: 1%;
	justifySelf:center; 
    z-index: 200;
    width: auto;
    align-content: space-between;"
					expand="md"
				>
					<NavbarBrand id="NavbarBrand" to="/">
						{' '}
						Comercio Virtual Chile{' '}
					</NavbarBrand>

					<NavbarToggler
						onClick={toggleNavbar}
						className="navbar-toggler"
						navbar
					/>
					<Collapse isOpen={collapsed} navbar>
						<Nav
							Style=" margin-left: auto; align-items: center;
                        width: 20%;"
							navbar
						>
							<NavItem>
								<Link className="nav-link" to="/home">
									INICIO
								</Link>
								<svg
									className="rect"
									height="2.5"
									width="50"
									dx="0px"
									fill="white"
								>
									<rect width="100" height="2.5" />
								</svg>
							</NavItem>

							<NavItem>
								<Link className="nav-link" to="/productos">
									PRODUCTOS
								</Link>
								<svg
									className="rect"
									height="2.5"
									width="50"
									dx="0px"
									fill="white"
								>
									<rect width="30" height="2.5" />
								</svg>
							</NavItem>

							<NavItem>
								<Link className="nav-link" to="/mapa">
									MAPA
								</Link>
								<svg
									className="rect"
									height="2.5"
									width="50"
									dx="0px"
									fill="white"
								>
									<rect width="30" height="2.5" />
								</svg>
							</NavItem>
							<NavItem>
								<Link className="nav-link" to="/contactanos">
									CONTACTANOS
								</Link>
								<svg
									className="rect"
									height="2.5"
									width="50"
									dx="0px"
									fill="white"
								>
									<rect width="30" height="2.5" />
								</svg>
							</NavItem>
							{svgCarrito(cartTogle, setCartTogle, count)}
							{auth.token && auth.token.length > 1
								? [menuUser(isOpen, toggle, signOut, auth)]
								: loginButton()}
							<br />
							<Input
								name="Search"
								caret
								Style="width: 220px; margin-left:8px"
								id="an"
								type="text"
								placeholder="Buscar..."
							/>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
			{cartTogle != null &&
				Carrito(
					setCartTogle,
					cartTogle,
					cart,
					deleteAItem,
					totalToBuy,
					count,
					addToCart,
					auth,
					changeDelivery,
					changeNroToBuy,
					minusNroToBuy,
					cartSvg
				)}
		</>
	);
};
export default Navegador;

const svgCarrito = (cartTogle, setCartTogle, count) => (
	<Dropdown>
		<div
			onClick={(e) => setCartTogle(!cartTogle)}
			style={{
				cursor: 'pointer',
				minWidth: '21px',
				minHeight: '21px',
				display: 'contents',
				margin: '18px',
				marginRight: '0',
				position: 'fixed',
				position: 'absolute',
				color: 'blue',
			}}
		>
			{count > 0 ? (
				<svg
					style={{position: 'absolute', pointerEvents: 'none'}}
					height="100"
					width="100"
				>
					<circle cx="12" cy="13" r="9" fill="#52ff97" />
					<text x="12" y="14" text-anchor="middle" stroke="black" dy=".3em">
						{count}
					</text>
				</svg>
			) : null}
			<div
				onClick={(e) => setCartTogle(!cartTogle)}
				style={{
					display: 'block',
					color: 'white',
					width: '40px',
					height: '35px',
					padding: '5px',
					fill: '#fff8f8',
					cursor: 'pointer',
					paddingTop: '3px',
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					id="Capa_1"
					x="0px"
					y="0px"
					style={{color: '#000000', fill: '#283d08'}}
					viewBox="0 0 446.843 446.843"
				>
					<g>
						<path d="M444.09,93.103c-2.698-3.699-7.006-5.888-11.584-5.888H109.92c-0.625,0-1.249,0.038-1.85,0.119l-13.276-38.27   c-1.376-3.958-4.406-7.113-8.3-8.646L19.586,14.134c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591   l60.768,23.872l74.381,214.399c-3.283,1.144-6.065,3.663-7.332,7.187l-21.506,59.739c-1.318,3.663-0.775,7.733,1.468,10.916   c2.24,3.183,5.883,5.078,9.773,5.078h11.044c-6.844,7.616-11.044,17.646-11.044,28.675c0,23.718,19.298,43.012,43.012,43.012   s43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.044-28.675h93.776c-6.847,7.616-11.048,17.646-11.048,28.675   c0,23.718,19.294,43.012,43.013,43.012c23.718,0,43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.043-28.675h13.433   c6.599,0,11.947-5.349,11.947-11.948c0-6.599-5.349-11.947-11.947-11.947H143.647l13.319-36.996   c1.72,0.724,3.578,1.152,5.523,1.152h210.278c6.234,0,11.751-4.027,13.65-9.959l59.739-186.387   C447.557,101.567,446.788,96.802,444.09,93.103z M169.659,409.807c-10.543,0-19.116-8.573-19.116-19.116   s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117S180.202,409.807,169.659,409.807z M327.367,409.807   c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117c10.542,0,19.116,8.574,19.116,19.117   S337.909,409.807,327.367,409.807z M402.52,148.149h-73.161V115.89h83.499L402.52,148.149z M381.453,213.861h-52.094v-37.038   h63.967L381.453,213.861z M234.571,213.861v-37.038h66.113v37.038H234.571z M300.684,242.538v31.064h-66.113v-31.064H300.684z    M139.115,176.823h66.784v37.038h-53.933L139.115,176.823z M234.571,148.149V115.89h66.113v32.259H234.571z M205.898,115.89v32.259   h-76.734l-11.191-32.259H205.898z M161.916,242.538h43.982v31.064h-33.206L161.916,242.538z M329.359,273.603v-31.064h42.909   l-9.955,31.064H329.359z" />
					</g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
					<g></g>
				</svg>
			</div>
		</div>
	</Dropdown>
);

const loginButton = (_) => (
	<NavItem>
		<Link className="nav-link" to="/sign">
			<button className="button-login">Login </button>{' '}
		</Link>
	</NavItem>
);

const menuUser = (isOpen, toggle, signOut, auth) => (
	<Dropdown isOpen={isOpen} toggle={toggle}>
		<DropdownToggle nav style={{height: 'fit-content'}}>
			<div style={{height: '32px', display: 'flex'}}>
				<p
					style={{
						padding: 'auto',
						alignSelf: 'center',
						marginBottom: '0',
					}}
				>
					{auth.profile.NOMBRE.substring(0, 7)}
				</p>
			</div>
		</DropdownToggle>
		<DropdownMenu>
			<DropdownItem header>Mi Cuenta</DropdownItem>
			{auth.profile.ROL_ID === 2 ? (
				<Link to="/user/tienda">
					<DropdownItem>🚚 Tienda</DropdownItem>
				</Link>
			) : null}

			<Link to="/user/pedidos">
				<DropdownItem>👜 Pedido</DropdownItem>
			</Link>
			<DropdownItem divider />
			<DropdownItem disabled>🔧Ajustes</DropdownItem>
			<DropdownItem onClick={signOut}>Cerrar Sesión</DropdownItem>
		</DropdownMenu>
	</Dropdown>
);

const cartSvg = (
	cart,
	deleteAItem,
	total,
	count,
	addToCart,
	auth,
	changeDelivery,
	changeNroToBuy,
	minusNroToBuy,
	setCartTogle,
	cartTogle
) => (
	<div style={{padding: '30px'}}>
		<span style={{fontSize: '10px', color: 'grey'}}>Mi Carrito </span>
		<DropdownItem divider />

		<div style={{maxHeight: '430px', overflowY: 'auto'}}>
			{cart && cart.length > 0 ? (
				cart.map((i) =>
					Items(
						i,
						deleteAItem,
						minusNroToBuy,
						cart,
						addToCart,
						changeDelivery,
						changeNroToBuy
					)
				)
			) : (
				<p
					style={{
						fontSize: '9px',
						color: 'grey',
						textAlign: 'center',
						margin: 'auto',
					}}
				>
					lista vacia
				</p>
			)}
		</div>
		<DropdownItem divider />

		{total > 0 ? (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '30px',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<strike>
						{' '}
						<span style={{color: 'gray'}}> </span>{' '}
					</strike>
					<h5 Style=" font-size: 30px">
						$
						{total
							.toFixed(0)
							.replace(/\D/g, '')
							.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
					</h5>
				</div>
				<Link
					onClick={() => setCartTogle(!cartTogle)}
					className="pay-button"
					to="/pago"
				>
					<h5>PAGAR</h5>
				</Link>
			</div>
		) : null}
	</div>
);

const Carrito = (
	setCartTogle,
	cartTogle,
	cart,
	deleteAItem,
	totalToBuy,
	count,
	addToCart,
	auth,
	changeDelivery,
	changeNroToBuy,
	minusNroToBuy,
	cartSvg
) => {
	return (
		<div id={cartTogle ? 'background-cart' : null}>
			<div id={cartTogle ? 'cart' : 'cart-off'}>
				<div
					onClick={() => setCartTogle(false)}
					Style="width: 46px;	margin: 46px;
                            margin-left: auto;			
                            cursor: pointer;"
				>
					<img src="/x-mark.svg" style={{width: '46px'}} alt="" />
				</div>

				{cartSvg(
					cart,
					deleteAItem,
					totalToBuy,
					count,
					addToCart,
					auth,
					changeDelivery,
					changeNroToBuy,
					minusNroToBuy,
					setCartTogle,
					cartTogle
				)}
			</div>
		</div>
	);
};

const Items = (
	cart,
	deleteAItem,
	minusNroToBuy,
	cartOriginal,
	addToCart,
	changeDelivery,
	changeNroToBuy
) => {
	return (
		<>
			<Link
				to={`/tienda/${cart.id}`}
				style={{fontSize: '10px', color: 'rgb(56 115 80)'}}
			>
				{cart.tienda}
			</Link>

			{cart.product.map((product) => (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '400px',
							fontSize: '11px',
						}}
					>
						<div style={{width: '60px', height: '60px', background: 'orange'}}>
							<img
								style={{width: '60px', height: '60px'}}
								src={product.URL_IMAGEN}
								alt=""
							/>
							<button
								className="circle-botton-x"
								onClick={(_) => deleteAItem(cartOriginal, product.ID)}
							>
								<span style={{fontVariant: 'unicase'}}>x </span>
							</button>
						</div>
						<div>
							<div>
								<span style={{fontSize: '15px'}}>
									{product.NOMBRE.substr(0, 16) + '..'}
								</span>
							</div>

							<div>
								<button
									className="circle-botton"
									onClick={(_) =>
										minusNroToBuy(cartOriginal, cart.id, product.subId)
									}
								>
									<i>-</i>
								</button>
								<input
									onChange={async (e) => {
										await changeNroToBuy(
											cartOriginal,
											cart.id,
											e.target.value,
											product.subId
										);
									}}
									style={{width: '15px'}}
									value={product.count}
								/>
								<button
									className="circle-botton"
									onClick={(_) => addToCart(cartOriginal, product, 1)}
								>
									<i>+</i>
								</button>
							</div>
						</div>
					</div>

					<div style={{fontSize: '24px', display: 'block'}}>
						<span style={{overflow: 'hidden'}}>
							$
							{
							new Intl.NumberFormat('CLP', {
								style: 'currency',
								currency: 'CLP',
							}).format(product.PRECIO_BASE * (1 - product.OFERTA ?? 0) * product.count)}
						</span>{' '}
						<br />
						{product.OFERTA > 0 ? (
							<strike>
								<span style={{fontSize: '15px', overflow: 'hidden'}}>
									$
									{
									new Intl.NumberFormat('USD', {
										style: 'currency',
										currency: 'CLP',
									}).format(product.PRECIO_BASE * product.count)}
								</span>
							</strike>
						) : null}
					</div>
				</div>
			))}

			<div
				style={{
					justifyContent: 'space-between',
					display: 'flex',
					fontSize: '12px',
					color: 'grey',
				}}
			>
				<div>
					Tipo de envio
					<Input
						style={{width: 'fit-content'}}
						type="select"
						bsSize="sm"
						name="select"
						id="exampleSelect"
						onChange={(e) =>
							changeDelivery(cartOriginal, cart.id, e.target.value)
						}
					>
						<option value={'Gratis'} selected={cart.retiro === 'Gratis'}>
							Retiro
						</option>
						<option value={2000} selected={cart.retiro === 2000}>
							{' '}
							Despacho{' '}
						</option>
					</Input>
				</div>
				<span style={{marginTop: 'auto'}}> {cart.retiro} </span>
			</div>

			<DropdownItem divider />
		</>
	);
};
