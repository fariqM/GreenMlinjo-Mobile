<template>
	<v-main>
		<mlj-toolbar :loading="loading" :page="'Keranjang'"></mlj-toolbar>
		<!-- <v-row  class="info" justify="center" align="center" no-gutters style="min-height:100%">
			<div class="primary" style="height: 50vh">
				asd
			</div>
		</v-row> -->

		<v-row v-if="loading" style="height: 100vh">
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

			<v-card
				v-else
				class="d-flex justify-space-between px-2 py-1 my-2 mx-1"
				elevation="2"
				outlined
			>
				<v-checkbox
					class="pt-0"
					hide-details
					dense
					v-model="checkAll"
					label="Pilih semua barang"
				></v-checkbox>

				<div class="d-flex align-center">
					<!-- Hapus -->
					<v-btn
						small
						text
						class="ma-0"
						color="primary"
						@click="deleteCart(CheckBoxSelected)"
						:disabled="deleteBtnDisabled"
						style="
							padding-top: 0px;
							margin-top: 2px !important;
							color: rgba(0, 0, 0, 0.6);
							font-size: 16px;
							letter-spacing: 0;
							text-transform: none;
							font-weight: normal;
						"
						>{{ deleteBtnText }}</v-btn
					>
				</div>
			</v-card>

			<v-sheet
				class="overflow-y-auto"
				max-height="92vh"
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
									<v-avatar tile size="80">
										<v-img :src="url + cart.url"></v-img>
									</v-avatar>
								</div>
								<v-row no-gutters class="pa-0">
									<v-col>
										<div
											style="
												font-weight: 500;
												font-size: 16px;
												max-height: 18px;
											"
											class="ml-2"
										>
											<span>{{ cart.title }}</span>
										</div>

										<div class="normal-text ml-2">
											{{ cart.min_qty_per_unit }}-{{ cart.max_qty_per_unit }}
											{{ cart.sub_unit }}/{{ cart.unit }}
										</div>

										<div
											class="d-flex justify-space-between align-end ml-2 mr-1"
										>
											<div>
												<div
													style="
														max-width: 95px;
														white-space: nowrap;
														overflow: hidden;
														text-overflow: ellipsis;
													"
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
														<div
															@click="minusQty(i)"
															class="v-input__prepend-inner"
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
																@focus="onFocusCustom(cart.id)"
																@blur="onBlurCostum(cart.id)"
																type="number"
																step="0.01"
																style="text-align: center"
																v-model="cart.qty"
															/>
														</div>

														<!-- icon plus -->
														<div
															@click="plusQty(i)"
															class="v-input__append-inner"
														>
															<div class="v-input__icon v-input__icon--append">
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

							<div class="d-flex align-center py-2" style="margin-left: 25px">
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
			adjusMinustState:null,
			
		};
	},
	watch: {
		checkAll: function (newVal, oldVal) {
			console.log(newVal);

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
			console.log(newVal);
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
		},
	},
	mounted() {
		this.getCarts();
	},
	methods: {
		minusQty(index) {
			window.clearTimeout(this.adjustState);
			if (this.carts[index].qty > 0) {
				this.carts[index].qty -= 1;
			}

			// instead of sending data for every quantity change,
			// let it send for every 4 second, if its not change, 
			// then send the last change to server 
			this.adjustState = window.setTimeout(() => {
				console.log("last Adjust is => " + this.carts[index].qty);
			}, 4000)
		},
		plusQty(index) {
			this.carts[index].qty += 1;

			setTimeout(() => {
				if (this.adjustState) {
					console.log("send Adjust");
				}
			}, 4000);
		},
		deleteCart(CheckBoxSelected) {
			iziToast.question({
				color: "#acbd90",
				timeout: false,
				close: true,
				overlay: true,
				icon: "material-icons",
				iconText: "question_mark",
				displayMode: "once",
				id: "question",
				zindex: 999,
				progressBarColor: "#87BD43",
				message: "Apakah anda yakin ingin menghapus?",
				position: "center",
				buttons: [
					[
						"<button><b>YA</b></button>",
						(instance, toast) => {
							instance.hide(
								{ transitionOutMobile: "fadeOutLeft" },
								toast,
								"button"
							);
							this.$store
								.dispatch("carts/removeCarts", CheckBoxSelected)
								.then((response) => {
									this.removeCartsArray(CheckBoxSelected);
								})
								.catch((e) => {
									iziToast.error({
										title: "Ooops error :( ",
										message: "Ccoba lagi nanti.",
										position: "topCenter",
										timeout: 4500,
										// ballon:true,
										transitionInMobile: "fadeInLeft",
										transitionOutMobile: "fadeOutLeft",
										displayMode: 2,
									});
									console.log();
								});
						},
					],
					[
						"<button>TIDAK</button>",
						function (instance, toast) {
							instance.hide({ transitionOut: "fadeOut" }, toast, "button");
						},
						true,
					],
				],
			});
		},
		removeCartsArray(array) {
			console.log(array);
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
		qtyClicked(id) {
			this.$refs["costum-input" + id][0].classList.add("v-input--is-focused");
			this.$refs["costum-input" + id][0].classList.add("primary--text");
			console.log(this.$refs["costum-input" + id]);
		},
		onFocusCustom(id) {
			this.$refs["costum-input" + id][0].classList.add("v-input--is-focused");
			this.$refs["costum-input" + id][0].classList.add("primary--text");
		},
		onBlurCostum(id) {
			this.$refs["costum-input" + id][0].classList.remove(
				"v-input--is-focused"
			);
			this.$refs["costum-input" + id][0].classList.remove("primary--text");
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
	},
};
</script>

<style>
.costum-wafe {
	background-color: aqua;
}
</style>