<template>
	<div style="height: 100%; display: flex">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Keranjang'"></mlj-toolbar>
			<!-- <v-row  class="info" justify="center" align="center" no-gutters style="min-height:100%">
			<div class="primary" style="height: 50vh">
				asd
			</div>
		</v-row> -->

			<v-row v-if="loading" style="height: 100vh" v-resize="onResize">
				<v-col v-if="loading" cols="12" md="12" sm="12">
					<div class="d-flex align-center justify-center" style="height: 84vh">
						<v-progress-circular
							:size="30"
							color="success"
							indeterminate
						></v-progress-circular>
					</div>
				</v-col>
			</v-row>

			<div v-else>
				<!-- empty image -->
				<v-row
					v-if="carts.length === 0"
					style="min-height: 100vh"
					class="pt-4"
					no-gutters
					justify="center"
				>
					<div class="text-center d-flex justify-center noselect mt-4">
						<div>
							<img
								src="/assets/images/CartEmpty.png"
								alt=""
								style="max-height: 12rem; max-width: 15rem"
							/>
							<div style="font-size: 1.6rem; font-weight: 500; color: #67c93e">
								Yahh keranjang kamu masih kosong
							</div>
						</div>
					</div>
				</v-row>

				<!-- panel control for checkbox and delete -->
				<v-card
					v-else
					class="d-flex justify-space-between px-2 py-1 my-2 mx-1"
					elevation="2"
					outlined
				>
					<div class="d-flex product-title-text">
						<v-checkbox class="pt-0" hide-details dense v-model="checkAll">
							<template v-slot:label>
								<span class="checkbox-controller-text">Hapus semua barang</span>
							</template>
						</v-checkbox>
					</div>
					<div
						class="d-flex align-center noselect"
						style="cursor: pointer;"
						@click="CheckBoxSelected.length !== 0 ? deleteCart(true) : ''"
					>
						<!-- Hapus -->
						<v-icon
							small
							class="pt-1 mr-1"
							:color="CheckBoxSelected.length === 0 ? '#6c6c6c' : '#ff0000',"
							>mdi-delete-outline</v-icon
						>
						<div
							class="checkbox-controller-text"
							:style="{
								color: CheckBoxSelected.length === 0 ? '#6c6c6c' : '#ff0000',
							}"
							style="padding-top: 0.38rem"
						>
							{{ deleteBtnText }}
						</div>
					</div>
				</v-card>

				<!-- cart main content -->
				<v-sheet
					class="overflow-y-auto"
					:max-height="heightWindows - 224 + 'px'"
					id="scrolling-techniques-8"
				>
					<v-row no-gutters justify="center" class="py-1 px-1">
						<v-col
							class="mb-2 pa-0"
							cols="12"
							md="12"
							sm="12"
							v-for="(cart, i) in carts"
							:key="i"
						>
							<v-card>
								<div class="d-flex pa-0 pt-2">
									<v-checkbox
										dense
										:value="cart.cart_id"
										v-model="CheckBoxSelected"
										class="pa-0 ma-0"
										style="max-width: 25px"
									></v-checkbox>
									<div>
										<v-avatar tile size="75">
											<v-img :src="url + cart.url"></v-img>
										</v-avatar>
									</div>
									<v-row no-gutters class="pa-0">
										<v-col>
											<div
												style="max-height: 18px"
												class="ml-2 product-title-text noselect"
											>
												<span>{{ cart.title }} ({{ cart.unit }})</span>
											</div>

											<div class="product-subtitle-text ml-2 noselect">
												{{ cart.min_qty_per_unit }}-{{ cart.max_qty_per_unit }}
												{{ cart.sub_unit }}/{{ cart.unit }}
											</div>

											<div
												class="d-flex justify-space-between align-end ml-2 mr-1"
											>
												<div>
													<div
														class="product-price-text ellipsis-text noselect"
														style="max-width: 95px"
													>
														Rp {{ numberWithCommas(cart.min_price) }} - Rp
														{{ numberWithCommas(cart.max_price) }}
													</div>
												</div>
												<div
													:ref="'costum-input' + cart.id"
													class="
														v-input
														v-input--solo
														v-input--hide-details
														v-input--is-label-active
														v-input--is-dirty
														v-input--dense
														theme--light
														v-text-field
														v-text-field--outlined
														v-text-field--is-booted
														v-text-field--enclosed
													"
													style="
														max-width: 100px;
														width: 70px;
														padding: 0px !important;
														height: 32px;
													"
												>
													<div class="v-input__control">
														<div
															class="v-input__slot"
															style="padding: 0px 0px 0px 0px !important"
														>
															<!-- icon minus -->
															<div
																@click="minusQty(i)"
																class="v-input__prepend-inner"
																style="cursor: pointer"
															>
																<div
																	class="
																		v-input__icon v-input__icon--prepend-inner
																	"
																>
																	<i
																		aria-hidden="true"
																		class="
																			v-icon
																			notranslate
																			mdi mdi-minus
																			theme--light
																		"
																	></i>
																</div>
															</div>
															<!-- text input quantity-->
															<div class="v-text-field__slot">
																<input
																	type="number"
																	step="0.01"
																	style="text-align: center"
																	@change="onChangeQty(1)"
																	:value="cart.qty"
																/>
															</div>

															<!-- icon plus -->
															<div
																@click="plusQty(i)"
																class="v-input__append-inner"
																style="cursor: pointer"
															>
																<div
																	class="v-input__icon v-input__icon--append"
																>
																	<i
																		aria-hidden="true"
																		class="
																			v-icon
																			notranslate
																			mdi mdi-plus
																			theme--light
																		"
																	></i>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<v-divider class="ml-2 mt-2 mr-1" />
										</v-col>
									</v-row>
								</div>

								<div
									class="d-flex align-center py-2 noselect"
									style="margin-left: 25px"
								>
									<v-chip x-small v-for="(promo, i) in 4" :key="i" class="mr-1"
										>Promo</v-chip
									>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-sheet>
			</div>
		</v-main>

		<!-- bottom sheet -->
		<div class="bottom-container" v-if="!loading && carts.length !== 0">
			<div class="" style="box-shadow: rgb(191, 191, 191) 0px -2px 2px">
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
				</v-list>
			</div>

			<!-- Total price -->
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
						Kisaran total harga
						<v-icon small class="ml-1">mdi-help-circle-outline</v-icon>
					</div>
					<div
						class="product-price-text ellipsis-text text-center noselect"
						style="max-width: 7rem; min-width: 100%"
					>
						Rp {{ numberWithCommas(totalMinPrice) }} - Rp
						{{ numberWithCommas(totalMaxPrice) }}
					</div>
				</div>

				<v-btn
					v-if="CheckBoxSelected.length === 0"
					elevation="0"
					color="primary"
					small
					>Beli</v-btn
				>
				<v-btn v-else elevation="0" color="primary" small
					>Beli ({{ CheckBoxSelected.length }})</v-btn
				>
			</div>
		</div>

		<!-- modal -->
		<v-dialog v-model="dialog" max-width="290">
			<v-card>
				<v-card-title class="text-h6"> Hapus barang ini ? </v-card-title>

				<v-card-text>
					Barang belanjaan ini akan terhapus dari keranjang Anda.
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="green darken-1" text @click="dialog = false">
						Tidak
					</v-btn>

					<v-btn color="green darken-1" text @click="deleteCartAction(deletedCart)">
						ya
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			url: __BASE_URL__,
			loading: true,
			checkAll: false,
			deleteBtnText: "Hapus",
			deleteBtnDisabled: true,
			CheckBoxSelected: [],
			carts: [],
			deletedCart: [],
			adjusMinustState: null,
			heightWindows: window.innerHeight,
			tesHeight: null,
			totalMinPrice: 0,
			totalMaxPrice: 0,
			dialog: false,
		};
	},
	watch: {
		checkAll: function (newVal, oldVal) {
			// console.log(newVal);
			this.CheckBoxSelected = [];

			if (newVal) {
				this.deleteBtnText = "Hapus semua";
				for (let index = 0; index < this.carts.length; index++) {
					// const element = array[index];
					this.CheckBoxSelected.push(this.carts[index].cart_id);
				}
			} else {
				this.deleteBtnText = "Hapus";
				this.CheckBoxSelected = [];
			}
		},
		CheckBoxSelected: function (newVal, oldVal) {
			// console.log(newVal);
			let countDataCarts = this.carts.length;
			let countSelected = this.CheckBoxSelected.length;
			if (!countSelected > 0) {
				this.deleteBtnDisabled = true;
			} else {
				this.deleteBtnDisabled = false;
			}

			if (countSelected === countDataCarts) {
				this.deleteBtnText = "Hapus semua";
			} else {
				this.deleteBtnText = "Hapus";
			}

			// count total
			this.totalMinPrice = 0;
			this.totalMaxPrice = 0;
			for (let index = 0; index < this.CheckBoxSelected.length; index++) {
				let cart_index = _.findIndex(this.carts, {
					cart_id: this.CheckBoxSelected[index],
				});
				// console.log(cart_index);
				// console.log();
				// console.log(this.carts[index].min_price+ '*' + this.carts[index].qty);
				this.totalMinPrice +=
					this.carts[cart_index].min_price * this.carts[cart_index].qty;
				this.totalMaxPrice +=
					this.carts[cart_index].max_price * this.carts[cart_index].qty;
			}
		},
	},
	mounted() {
		this.onResize();
		this.getCarts();
	},
	methods: {
		minusQty(index) {
			if (this.carts[index].qty > 1) {
				let payload = {
					type: false,
					cart_id: this.carts[index].cart_id,
				};
				this.carts[index].qty -= 1;

				this.$store.dispatch("carts/adjustQty", payload);
			} else {
				this.deleteCart(false, index);
			}
		},
		plusQty(index) {
			let payload = {
				type: true,
				cart_id: this.carts[index].cart_id,
			};
			this.carts[index].qty += 1;
			this.$store.dispatch("carts/adjustQty", payload);
		},
		deleteCart(condition, index = null) {
			this.dialog = true;
			let array = [];
			if (this.CheckBoxSelected.length !== 0 && condition) {
				for (let index = 0; index < this.CheckBoxSelected.length; index++) {
					array.push(this.CheckBoxSelected[index]);
				}
				this.deletedCart = array;
			} else {
				if (index !== null) {
					array.push(this.carts[index].cart_id);
					this.deletedCart = array;
				}
			}
		},
		deleteCartAction(selectedItem) {
			this.$store
				.dispatch("carts/removeCarts", selectedItem)
				.then((response) => {
					this.dialog = false
					this.removeCartsArray(selectedItem);
				})
				.catch((e) => {
					this.dialog = false
					iziToast.error({
						title: "Ooops error :( ",
						message: "Coba lagi nanti.",
						position: "topCenter",
						timeout: 4500,
						// ballon:true,
						transitionInMobile: "fadeInLeft",
						transitionOutMobile: "fadeOutLeft",
						displayMode: 2,
					});
					// console.log();
				});
		},
		removeCartsArray(array) {
			// console.log(array);
			for (let index = 0; index < array.length; index++) {
				this.carts = _.remove(this.carts, function (obj) {
					return obj.cart_id !== array[index];
				});
			}
			this.CheckBoxSelected = [];
			this.checkAll = false;
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		onChangeQty(id) {
			console.log(id);
		},
		getCarts() {
			this.$store
				.dispatch("carts/getCartsProduct")
				.then((response) => {
					this.carts = response.data.data;
					this.loading = false;
				})
				.catch((e) => {
					this.loading = false;
					console.log(e);
				});
		},
		onResize() {
			this.tesHeight = window.innerHeight;
		},
	},
};
</script>

<style>
.costum-wafe {
	background-color: aqua;
}
.checkbox-controller-text {
	color: #6c6c6c;
	font-size: 0.8rem !important;
	font-weight: 500;
}
</style>