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
				v-if="orders.length === 0"
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
					v-for="(order, i) in orders"
					:key="i"
					class="px-1 py-1 mb-2 noselect"
					v-ripple
				>
					<div>
						<div class="d-flex justify-space-between">
							<div class="normal-text">
								Pembayaran: {{ order.payment_type }}
							</div>
							<div class="normal-text">{{ convertDate(order.created_at) }}</div>
						</div>
					</div>

					<div class="d-flex">
						<v-avatar tile size="75">
							<v-img
								:src="url + order.order_products[0].product.images[0].url"
							></v-img>
						</v-avatar>

						<div
							class="px-1 d-flex flex-column"
							:style="{ width: windowWidth - 99 + 'px' }"
							style="max-width: calc(30.5rem - 100px)"
						>
							<div class="product-title-text ellipsis-text">
								<span v-for="(product, p) in order.order_products" :key="p">
									{{ product.product.title }}
									{{ order.order_products.length === 1 ? "" : ", " }}
								</span>
							</div>

							<div class="subtitle-text">
								{{ order.order_products.length }} macam pesanan
							</div>
							<div class="product-price-text mt-auto">
								Rp {{ numberWithCommas(order.total_price) }}
							</div>
							<v-divider class=""></v-divider>
						</div>
					</div>
					<div class="d-flex justify-space-between align-center mt-1 pr-1">
						<div class="status-text">
							{{
								order.status_code == 5 ? "Selesai" : `Perkiraan sampai: ${ Math.floor(Math.random() * 30)} Menit`
							}}
						</div>
						<div class="status-text">
							{{ order.status }}
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
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			loading: false,
			windowsHeight: window.innerHeight,
			isEmpty: false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			// orders: [],
			filtered_orders: [],
		};
	},
	computed: {
		...mapGetters({
			orders: "orders/getAllOrders"
		})
	},
	mounted() {
		this.$store.commit(
			"auth/setRouteActivity",
			this.$router.history.current.name
		);
		this.getOrders();

		setTimeout(() => {
			console.log(this.orders);
		}, 1000);
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
		getOrders() {
			this.$store
				.dispatch("orders/fetchOrders")
				.then((response) => {
					console.log(response);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		convertDate(date) {
			let newDate = new Date(date);
			let tanggal = newDate.getDate();
			let bulan = newDate.getMonth();
			let tahun = newDate.getFullYear();
			let jam = newDate.getUTCHours();
			let menit = newDate.getUTCMinutes();
			switch (bulan) {
				case 0:
					bulan = "Januari";
					break;
				case 1:
					bulan = "Februari";
					break;
				case 2:
					bulan = "Maret";
					break;
				case 3:
					bulan = "April";
					break;
				case 4:
					bulan = "Mei";
					break;
				case 5:
					bulan = "Juni";
					break;
				case 6:
					bulan = "Juli";
					break;
				case 7:
					bulan = "Agustus";
					break;
				case 8:
					bulan = "September";
					break;
				case 9:
					bulan = "Oktober";
					break;
				case 10:
					bulan = "November";
					break;
				case 11:
					bulan = "Desember";
					break;
			}

			return tanggal + "-" + bulan + "-" + tahun + " " + jam + ":" + menit;
			// document.write(new Intl.DateTimeFormat("en-US").format(date_new));
		},
	},
};
</script>

<style>
.status-text {
	font-size: 0.8rem;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.87);
}
</style>