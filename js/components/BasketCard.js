export function renderOrders(parent) {
	if (localStorage.getItem('basketOrders')) {
		JSON.parse(localStorage.getItem('basketOrders')).forEach((order, index) => {
			let div = `
							<div class="basket-orders__card card-orders" data-index="${index}">
								<div class="card-orders__title basket-orders__title-order">${order.type} coffee</div>
								<div class="card-orders__image-container basket-orders__image-container-order">
									<img src="./images/constructor/${order.type}-${order.cup}.png" alt="Coffee cup" class="card-orders__img basket-orders__img-order">
								</div>
								<div class="card-orders__characters basket-orders__characters-order">coffee characters</div>
								<ul class="card-orders__characters-list">
									<li class="card-orders__characters-list-item">cup - ${order.cup.slice(0, -5).replace(/-[\w]+/g, '')} size</li>
									<li class="card-orders__characters-list-item">milk - ${order.milk === 'milk-add' ? 'yes' : 'no'}</li>
									<li class="card-orders__characters-list-item">syrup - ${order.syrup.replace(/-[\w]+/g, '')}</li>
									<li class="card-orders__characters-list-item">caffeine - ${order.caffeine}mg</li>
									<li class="card-orders__characters-list-item">sugar - ${order.sugar !== 0 ? order.sugar + 'g' : 'no'}</li>
									<li class="card-orders__characters-list-item">price - ${order.price} UAH</li>
								</ul>
								<button class="basket-orders__btn-order card-orders__btn btn">MAKE ORDER</button>
								<button class="basket-orders__btn-delete card-orders__btn btn">DELETE</button>
							</div>
		`;
			parent.insertAdjacentHTML('beforeend', div);
		});
	}
}