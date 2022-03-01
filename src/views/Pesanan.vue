<template>
	<div v-resize="onResize">
		<v-tabs grow>
			<v-tab style="font-size: 0.8rem" @click="changeFilter('sekarang')"
				>Sekarang</v-tab
			>
			<v-tab style="font-size: 0.8rem" @click="changeFilter('selesai')"
				>Selesai</v-tab
			>
		</v-tabs>

		<v-sheet
			class="overflow-y-auto"
			:max-height="windowsHeight - 108 + 'px'"
			style="background-color: #f5f5f5"
		>
			<v-row
				v-if="filtered_orders.length===0"
				style="min-height: 100vh; background-color: #f5f5f5"
				class="pt-4"
				no-gutters
				justify="center"
			>
				<div class="text-center d-flex justify-center noselect mt-4">
					<div>
						<img
							src="/assets/images/Empty.png"
							alt=""
							style="max-height: 12rem; max-width: 15rem"
						/>
						<div style="font-size: 1.4rem; font-weight: 500; color: #67c93e">
							Kamu yakin udah pesen ?
						</div>
					</div>
				</div>
			</v-row>

			<div class="ma-2">
				<v-card
					v-for="(order, i) in filtered_orders"
					:key="i"
					class="px-1 py-1 mb-2 noselect"
					v-ripple
				>
					<div>
						<div class="d-flex justify-space-between">
							<div class="normal-text">{{ order.id }}</div>
							<div class="normal-text">{{ order.created_at }}</div>
						</div>
					</div>

					<div class="d-flex">
						<v-avatar tile size="75">
							<v-img :src="url + 'storage/images/products/wortel.jpg'"></v-img>
						</v-avatar>

						<div
							class="px-1 d-flex flex-column"
							:style="{ width: windowWidth - 99 + 'px' }"
							style="max-width: calc(30.5rem - 100px)"
						>
							<div class="product-title-text ellipsis-text">
								{{ order.title }}
							</div>

							<div class="subtitle-text">
								{{ order.total_order }} macam pesanan - {{ order.payment }}
							</div>
							<div class="product-price-text mt-auto">
								Rp {{ numberWithCommas(order.total_min_price) }} - Rp
								{{ numberWithCommas(order.total_max_price) }}
							</div>
							<v-divider class=""></v-divider>
						</div>
					</div>
					<div class="d-flex justify-space-between align-center mt-1 pr-1">
						<div class="normal-text" style="font-weight: 600">
							{{ order.order_status }}
						</div>
						<div class="normal-text" style="font-weight: 600">
							{{ order.driver_status }}
						</div>
					</div>
					<div>
						<v-btn
							outlined
							text
							color="primary"
							block
							small
							class="mt-2"
							:ripple="true"
							>Lihat detail</v-btn
						>
					</div>
				</v-card>
			</div>
		</v-sheet>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			windowsHeight: window.innerHeight,
			isEmpty: false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			orders: [
				{
					id: "HS-273847-ASD32",
					created_at: "12:04",
					title: "Paket empon 1, Beras Bramu, Tempe Menjes, Tahu Susu",
					total_order: 4,
					payment: "Bayar COD",
					total_min_price: 12000,
					total_max_price: 14000,
					order_status: "Dikemas",
					driver_status: "Driver sedang antre...",
				},
				{
					id: "HS-273847-88DSG",
					created_at: "11:34",
					title: "Tahu Susu",
					total_order: 1,
					payment: "Bayar COD",
					total_min_price: 12000,
					total_max_price: 14000,
					order_status: "Diantar",
					driver_status: "Driver sedang menuju alamat anda.",
				},
			],
			filtered_orders: [],
		};
	},
	mounted() {
		this.changeFilter("belum");
	},
	watch: {
		filtered_orders: function (newVal, oldVal) {
			console.log(newVal);
		},
	},
	methods: {
		onResize() {
			this.windowWidth = window.innerWidth;
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		changeFilter(filter) {
			if (filter == "selesai") {
				console.log(filter);
				this.filtered_orders = _.filter(this.orders, function (order) {
					return order.order_status === "selesai";
				});
			} else {
				console.log(filter);
				this.filtered_orders = _.filter(this.orders, function (order) {
					return order.order_status !== "selesai";
				});
			}
		},
	},
};
</script>

<style>
</style>