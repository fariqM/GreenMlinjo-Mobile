<template>
	<div style="height: 100%">
		<v-main>
			<div style="height: 100%; background-color: #f5f5f5" v-resize="onResize">
				<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>

				<v-sheet
					class="overflow-y-auto"
					:max-height="windowsHeight - 110 + 'px'"
				>
					<div class="my-2">
						<!-- Address -->
						<v-card class="noselect py-3">
							<div class="d-flex align-end justify-space-between px-1 py-1">
								<div class="d-flex align-end">
									<v-icon size="20">mdi-map-marker-radius-outline</v-icon>
									<div class="subtitle-text ml-1">Alamat Pengiriman</div>
								</div>
								<div
									class="subtitle-text link-text"
									@click="showAddressDialog"
									v-if="choosenAddress !== null"
								>
									Pilih Alamat Lain
								</div>
							</div>
							<v-divider class="ma-1"></v-divider>
							<div
								style="min-width: 100%"
								class="px-2 pt-2"
								v-if="choosenAddress === null"
							>
								<div
									@click="showAddressDialog"
									v-ripple
									class="
										d-flex
										justify-center
										align-center
										subtitle-text
										rounded
										address-box-empty
									"
								>
									MOHON PILIH ALAMAT
								</div>
							</div>
							<div style="min-width: 100%" class="px-2 pt-2 product-title-text" v-else>
								<div>{{choosenAddress.contact}} | {{choosenAddress.phone}}</div>
								<div>{{choosenAddress.road}} ({{choosenAddress.details}})</div>
								<div>{{choosenAddress.full_address}}</div>
							</div>
						</v-card>

						<!-- Item Order -->
						<v-card class="noselect pa-3 mt-2">
							<div class="d-flex align-end">
								<v-btn
									depressed
									icon
									color="primary"
									small
									outlined
									tile
									:ripple="false"
								>
									<v-icon>mdi-store-outline</v-icon>
								</v-btn>

								<div class="ml-1" style="font-size: 1rem; font-weight: 500">
									Pasar Blauran
								</div>
							</div>

							<v-subheader
								class="pa-0"
								style="font-weight: 500; text-decoration: underline"
								>Macam barang : {{ order_items.length }}</v-subheader
							>

							<div class="order-box rounded">
								<div v-for="(item, i) in order_items" :key="i" class="mb-3">
									<div class="d-flex">
										<v-avatar size="75" tile>
											<img
												:src="url + 'storage/images/products/wortel.jpg'"
												alt="alt"
											/>
										</v-avatar>
										<div
											class="d-flex flex-column ml-1"
											:style="{ width: windowWidth - 115 + 'px' }"
											style="max-width: calc(30.5rem - 115px)"
										>
											<div class="product-title-text ellipsis-text">
												{{ item.title }}
											</div>
											<div class="product-subtitle-text ellipsis-text">
												{{ item.description }}
											</div>
											<div class="mt-auto">
												<div class="product-price-text ellipsis-text">
													Rp {{ numberWithCommas(item.min_price) }} - Rp
													{{ numberWithCommas(item.max_price) }}
												</div>
												<div
													v-if="item.max_qty_per_unit !== null"
													class="qty-text ellipsis-text"
												>
													x{{ item.qty }} {{ item.unit }} ({{
														item.min_qty_per_unit * item.qty
													}}-{{ item.max_qty_per_unit * item.qty }}
													{{ item.sub_unit }})
												</div>
												<div v-else class="qty-text ellipsis-text">
													x{{ item.qty }} {{ item.unit }} ({{
														item.min_qty_per_unit * item.qty
													}}
													{{ item.sub_unit }})
												</div>
											</div>
											<!-- <v-divider></v-divider> -->
										</div>
									</div>
									<v-divider class="my-1"></v-divider>
									<div
										class=""
										style="
											display: grid;
											grid-template-columns: auto 1fr;
											align-items: center;
										"
									>
										<div style="font-size: 0.8rem; margin-right: 5px">
											Catatan :
										</div>
										<!-- <v-spacer></v-spacer> -->
										<!-- <input type="text" style="outline: none;font-size: 0.8rem"> -->

										<v-text-field
											class="pb-1"
											dense
											hide-details
											v-model="item.notes"
											style="font-size: 0.8rem"
											single-line
										></v-text-field>
									</div>
									<!-- <v-divider class="my-1"></v-divider> -->
									<div
										class="
											d-flex
											align-center
											justify-space-between
											px-1
											py-2
											mt-1
											rounded
										"
										style="font-size: 0.8rem; background-color: #e3e3e3ad"
									>
										<div style="font-weight: 500">Subtotal :</div>
										<div style="font-weight: 500">
											Rp {{ numberWithCommas(item.min_price * item.qty) }} - Rp
											{{ numberWithCommas(item.max_price * item.qty) }}
										</div>
									</div>
									<v-divider
										v-if="i !== order_items.length - 1"
										class="my-2"
									></v-divider>
								</div>
							</div>
						</v-card>

						<!-- voucer -->
						<v-card class="mt-3">
							<v-list class="pa-0">
								<v-list-item link class="px-2">
									<v-list-item-avatar class="pa-0 text-center mr-1">
										<v-btn icon outlined color="error" :ripple="false" plain>
											<v-icon color="error">mdi-ticket-percent-outline</v-icon>
										</v-btn>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title class="product-title-text">
											Gunakan voucher kupon
										</v-list-item-title>

										<v-list-item-subtitle class="product-subtitle-text">
											Pilih voucher untuk mendapatkan potongan!
										</v-list-item-subtitle>
									</v-list-item-content>

									<v-list-item-action>
										<v-btn icon :ripple="false" plain>
											<v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>

								<v-divider></v-divider>

								<v-list-item link class="px-2">
									<v-list-item-avatar class="pa-0 text-center mr-1">
										<v-btn icon outlined color="primary" :ripple="false" plain>
											<v-icon color="primary">mdi-cash</v-icon>
										</v-btn>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title class="product-title-text">
											Metode Pembayaran
										</v-list-item-title>
									</v-list-item-content>

									<div class="d-flex align-center">
										<!-- <div class="product-title-text accent">COD</div> -->
										<v-list-item-title class="product-title-text">
											COD
										</v-list-item-title>
										<v-btn
											icon
											:ripple="false"
											plain
											text
											style="font-size: 0.7rem"
										>
											<v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
										</v-btn>
									</div>
								</v-list-item>
							</v-list>
						</v-card>

						<!-- Total Price -->
						<v-card class="mt-3">
							<v-subheader
								class="px-1 my-1"
								style="font-size: 1rem; font-weight: 600; max-height: 24px"
								>*Ringkasan Belanja</v-subheader
							>
							<div class="px-3">
								<div style="">
									<div
										class="total-text"
										style="font-size: 0.9rem; font-weight: 600"
									>
										<div>
											Perkiraan Subtotal
											<v-icon small> mdi-help-circle-outline </v-icon>
										</div>
									</div>
									<div class="total-text px-1">
										<div>Harga Minimal</div>
										<div class="text-end">
											Rp {{ numberWithCommas(TotalPrice.min) }}
										</div>
										<div>Harga Maksimal</div>
										<div class="text-end">
											Rp {{ numberWithCommas(TotalPrice.max) }}
										</div>
									</div>
								</div>
								<v-divider></v-divider>
								<div class="total-text px-1">
									<div>Biaya Pengiriman</div>
									<div class="text-end">Rp {{ numberWithCommas(10000) }}</div>
									<div>
										Biaya Penanganan
										<v-icon x-small> mdi-help-circle-outline </v-icon>
									</div>
									<div class="text-end">Rp {{ numberWithCommas(2000) }}</div>
								</div>
								<v-divider></v-divider>
								<div class="py-3">
									<div
										style="
											outline: rgb(255 0 0) dashed 2px;
											outline-offset: 3px;
										"
									>
										<div
											class="total-text"
											style="font-size: 0.9rem; font-weight: 600"
										>
											<div>
												Perkiraan Total Pembayaran
												<v-icon small> mdi-help-circle-outline </v-icon>
											</div>
										</div>
										<div class="total-text px-1">
											<div>Total Minimal</div>
											<div class="text-end">
												Rp {{ numberWithCommas(TotalPrice.min + 10000 + 2000) }}
											</div>
											<div>Total Maksimal</div>
											<div class="text-end">
												Rp {{ numberWithCommas(TotalPrice.max + 10000 + 2000) }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</v-card>
					</div>
				</v-sheet>
			</div>
		</v-main>

		<div class="bottom-container">
			<div
				class="white py-2"
				style="
					box-shadow: rgb(191 191 191 / 36%) 0px -1px 0px;
					display: grid;
					grid-template-columns: 50% 1fr;
					align-items: center;
					justify-items: center;
				"
			>
				<div style="min-width: 100%">
					<div
						class="d-flex align-center justify-center noselect"
						style="font-size: font-size: clamp(0.6rem, 0.1rem + 4vw, 1rem); font-weight: 500; font-size:0.9rem"
					>
						Total Pembayaran
					</div>
					<div
						class="product-price-text ellipsis-text text-center noselect"
						style="max-width: 7rem; min-width: 100%"
					>
						Rp {{ numberWithCommas(TotalPrice.min + 10000 + 2000) }} - Rp
						{{ numberWithCommas(TotalPrice.max + 10000 + 2000) }}
					</div>
				</div>

				<v-btn elevation="0" color="primary" small @click="makeOrder"
					>Buat Pesanan</v-btn
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loading: false,
			url: __BASE_URL__,
			order_items: [],
			notes: [],
		};
	},
	mounted() {
		if (this.$router.history.current.params.order_items) {
			this.order_items = this.$router.history.current.params.order_items;
			this.$store.commit("setcheckOut", this.order_items);
		} else {
			this.afterMapping = true;
			this.order_items = this.$store.getters.getcheckOut;
		}
		// console.log(this.order_items);

		this.getChoosenAddress();
	},
	computed: {
		TotalPrice: function () {
			let min_total_price = 0;
			let max_total_price = 0;

			this.order_items.forEach((element) => {
				min_total_price += element.min_price * element.qty;
				max_total_price += element.max_price * element.qty;
			});

			return {
				min: min_total_price,
				max: max_total_price,
			};
		},
		...mapGetters({
			choosenAddress: "auth/getChoosenAddress",
		}),
	},
	methods: {
		getChoosenAddress() {
			this.$store
				.dispatch("auth/getChoosenAddress")
				.then((response) => {})
				.catch((e) => {
					if (e.response) {
						if (e.response.status !== 404) {
							console.log(e.response);
						}
					}
				});
		},
		closeAddressDialog() {
			this.addressDialog = false;
		},
		showAddressDialog() {
			this.$router.push({ name: "address" });
		},
		makeOrder() {
			console.log(this.order_items);
		},
		onResize() {
			this.windowWidth = window.innerWidth;
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
	},
};
</script>

<style>
.address-box-empty {
	width: 100%;
	color: #ff000075;
	font-weight: 600;
	min-height: 5rem;
	outline: 2px solid #ff000048;
	/* outline-offset: 1px; */
	/* border-width: 1px;
	border-style: solid;
	border-color: #ff0000; */
}
.order-box {
	width: 100%;
	padding: 0.4rem;
	min-height: 5rem;
	border-width: 2px;
	border-style: dashed;
	border-color: #d8d8d8;
}
.qty-text {
	font-size: 0.9rem;
	font-weight: 600;
	color: #ff000095;
}
.total-text {
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 0.1rem;
	color: rgba(0, 0, 0, 0.87);
	font-weight: 500;
}
</style>