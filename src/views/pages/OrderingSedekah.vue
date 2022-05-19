<template>
	<div style="height: 100%">
		<v-main>
			<div style="height: 100%; background-color: #f5f5f5" v-resize="onResize">
				<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>
				<my-scroll
					ref="vs"
					:ops="ops"
					:style="{ height: windowsHeight - 110 + 'px' }"
				>
					<v-sheet max-width="99.8vw">
						<div>
							<!-- Item Order -->
							<v-card class="noselect pa-3">
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
										<v-icon>mdi-hand-heart-outline</v-icon>
									</v-btn>

									<div class="ml-1" style="font-size: 1rem; font-weight: 500">
										Konfirmasi Sedekah
									</div>
								</div>

								<div class="order-box rounded mt-2">
									<div class="mb-3">
										<div class="d-flex noselect">
											<v-avatar size="75" tile>
												<img
													:src="url + sedekahProduct.images[0].url"
													alt="alt"
												/>
											</v-avatar>
											<div
												class="d-flex flex-column ml-1"
												:style="{ width: windowWidth - 115 + 'px' }"
												style="max-width: calc(30.5rem - 115px)"
											>
												<div class="product-title-text ellipsis-text">
													{{ sedekahProduct.title }}
												</div>
												<div
													class="product-subtitle-text"
													style="white-space: normal; text-overflow: ellipsis"
												>
													{{ sedekahProduct.description }}
												</div>
											</div>
										</div>
										<v-divider class="my-1"></v-divider>
										<div class="text-center">
											<div
												class="product-price-text ellipsis-text"
												style="font-size: 1rem"
											>
												Rp {{ numberWithCommas(sedekahProduct.price) }}
											</div>
										</div>
										<v-divider class="my-1"></v-divider>
										<div
											class="
												total-text total-subheader
												d-flex
												justify-space-between
											"
										>
											<span>Jumlah :</span>
											<span>x{{ sedekahProduct.qty }}</span>
										</div>
										<div
											class=""
											style="
												display: grid;
												grid-template-columns: auto 1fr;
												align-items: center;
											"
										>
											<div
												style="
													font-size: 0.8rem;
													margin-right: 5px;
													height: 100%;
													padding-top: 10px;
												"
												class="d-flex align-start"
											>
												Catatan :
											</div>
											<v-textarea
												rows="2"
												dense
												hide-details="auto"
												solo
												flat
												style="font-size: 0.8rem"
												auto-grow
												v-model="notes"
											>
											</v-textarea>
											<!-- <v-text-field
												class="pb-1 elevation-0"
												dense
                                                solo
                                                flat
												hide-details
												v-model="notes"
												style="font-size: 0.8rem"
												single-line
											></v-text-field> -->
										</div>
									</div>
								</div>
							</v-card>

							<!-- Metode Pembayaran -->
							<v-card class="mt-3">
								<v-list class="pa-0">
									<v-list-item
										link
										class="px-2"
										:to="{
											name: 'payment.method',
											params: {
												amount: sedekahProduct.price * sedekahProduct.qty,
											},
										}"
									>
										<v-list-item-avatar class="pa-0 text-center mr-1">
											<v-btn
												icon
												outlined
												color="primary"
												:ripple="false"
												plain
											>
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
												{{
													selectedPayment === null
														? "Belum dipilih"
														: selectedPayment === 2
														? balance >
														  sedekahProduct.price * sedekahProduct.qty
															? "MlijoPay"
															: "Saldo Tidak Cukup"
														: "COD"
												}}
											</v-list-item-title>
											<v-btn
												icon
												:ripple="false"
												plain
												text
												style="font-size: 0.7rem"
											>
												<v-icon color="grey lighten-1"
													>mdi-chevron-right</v-icon
												>
											</v-btn>
										</div>
									</v-list-item>
								</v-list>
							</v-card>

							<!-- Total Price -->
							<v-card class="mt-3">
								<div class="px-3">
									<div class="py-3">
										<div
											style="
												outline: rgb(255 0 0) dashed 2px;
												outline-offset: 3px;
											"
										>
											<div class="total-text total-subheader">
												<div>Total Harga</div>
												<div class="text-end">
													Rp
													{{
														numberWithCommas(
															sedekahProduct.price * sedekahProduct.qty
														)
													}}
												</div>
											</div>
										</div>
									</div>
								</div>
							</v-card>
						</div>
					</v-sheet>
				</my-scroll>
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
						style="
							max-width: 7rem;
							min-width: 100%;
							font-size: 1.1rem;
							font-weight: 600;
						"
					>
						Rp {{ numberWithCommas(sedekahProduct.price * sedekahProduct.qty) }}
					</div>
				</div>

				<v-btn
					elevation="0"
					color="primary"
					small
					@click="makeOrder"
					:loading="btnLoading"
					:disabled="btnDisabled"
				>
					Bayar</v-btn
				>
			</div>
		</div>
		<v-snackbar v-model="snackbar">
			Transaksi berhasil
			<template v-slot:action="{ attrs }">
				<v-btn
					small
					color="success"
					outlined
					v-bind="attrs"
					:to="{ name: 'blog' }"
				>
					Kembali
				</v-btn>
			</template></v-snackbar
		>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import DeliveryIcon from "../components/icon/Delivery.vue";
import ProductDiscount from "../components/icon/ProuctDiscount.vue";
import MyScroll from "vuescroll";

export default {
	components: {
		DeliveryIcon,
		ProductDiscount,
		MyScroll,
	},
	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loading: false,
			btnLoading: false,
			snackbar: false,
			url: __BASE_URL__,
			order_items: [],
			notes: "",
			voucherDialog: false,
			voucherDescriptionModal: false,
			selectedVoucher: [],
			ops: {
				vuescroll: {
					mode: "native",
					sizeStrategy: "percent",
					detectResize: true,
					/** Enable locking to the main axis if user moves only slightly on one of them at start */
					locking: true,
				},
				scrollPanel: {
					initialScrollY: false,
					initialScrollX: false,
					scrollingX: true,
					scrollingY: true,
					speed: 300,
					easing: "easeInCubic",
					verticalNativeBarPos: "right",
					maxHeight: "100%",
					// maxHeight: "300",
				},
				rail: {
					background: "#87BD43",
					opacity: 0,
					size: "3px",
					specifyBorderRadius: false,
					gutterOfEnds: null,
					gutterOfSide: "2px",
					keepShow: false,
				},
				bar: {
					showDelay: 500,
					onlyShowBarOnScroll: false,
					keepShow: false,
					background: "#87BD43",
					opacity: 1,
					hoverStyle: true,
					specifyBorderRadius: false,
					minSize: 0,
					size: "5px",
					disable: false,
				},
				scrollButton: {
					enable: false,
					background: "#87BD43",
					opacity: 1,
					step: 180,
					mousedownStep: 30,
				},
			},
			// btnDisabled: false,
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
	},
	watch: {
		// selectedVoucher: function (newVal) {
		// },
	},
	computed: {
		...mapGetters({
			sedekahProduct: "others/getSelectedSedekah",
			selectedPayment: "others/getSelectedPayment",
			balance: "auth/getBalance",
		}),
		btnDisabled: {
			set: function (val) {
				return val;
			},
			get: function () {
				if (this.selectedPayment === null) {
					return true;
				} else {
					if (
						this.sedekahProduct.price * this.sedekahProduct.qty >
						this.balance
					) {
						return true;
					} else {
						return false;
					}
				}
			},
		},
	},
	methods: {
		makeOrder() {
			this.btnLoading = true;
			let form = Object.assign({}, this.sedekahProduct);
			form.notes = this.notes;
			console.log("form", form);

			if (this.selectedPayment === 2) {
				this.$store.dispatch("auth/makePurchase", {
					amount: parseInt(form.price * form.qty),
				});
			}

			this.$store
				.dispatch("transactions/createTransaction", {
					uuid: null,
					title: "Pembelian paket sedekah",
					description:
						form.title +
						" " +
						"<br>" +
						"Isi paket: <br><br>" +
						form.description,
					amount: parseInt(form.price * form.qty),
					status: 2,
				})
				.then(() => {
					this.$store.dispatch("auth/getBalance");
					this.snackbar = true;
					this.btnLoading = false;
					this.btnDisabled = true;
					setTimeout(() => {
						this.$router.replace({
							name: "blog",
							params: { fromProfile: true },
						});
					}, 4000);
				});
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
.title-voucher {
	height: 30px;
	font-size: 0.9rem;
	font-weight: 600;
	color: #000 !important;
}
.box-circle-product {
	width: 90px;
	height: 59px;
	border-right: 1px dashed #d4d4d4;
	background: linear-gradient(
		90deg,
		rgba(135, 189, 67, 1) 0%,
		rgba(180, 240, 106, 1) 40%,
		rgba(255, 255, 255, 1) 100%
	);
	display: grid;
	justify-content: end;
}
.box-circle-shipping {
	width: 90px;
	height: 59px;
	border-right: 1px dashed #d4d4d4;
	background: linear-gradient(
		90deg,
		rgba(251, 138, 60, 1) 0%,
		rgba(255, 218, 192, 1) 70%,
		rgba(255, 255, 255, 1) 100%
	);
	display: grid;
	justify-content: end;
}
.half-circle {
	/* Create the circle */
	width: 59.5px;
	height: 59px;
	/* border: 1px solid #a3a3a3; */
	border-radius: 50%;
	background: #fff;
	/* Halve the circle */
	border-bottom-color: transparent;
	border-left-color: transparent;
	/* Rotate the circle */
	transform: rotate(45deg);
	position: absolute;
	left: -20px;

	/* Legacy vendor prefixes that you probably don't need... */
}
.voucher-box {
	border-top: 1px solid #a3a3a3;
	border-right: 1px solid #a3a3a3;
	border-bottom: 1px solid #a3a3a3;
	min-height: 61px;
	border-radius: 4px;
	/* border-radius: 4px; */
}
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
.voucher-text {
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: auto;
	gap: 0.1rem;
	color: rgba(0, 0, 0, 0.87);
	font-weight: 500;
}
.total-subheader {
	font-size: 0.9rem;
	font-weight: 600;
}
.bottom-container-voucher {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: #fff;
}
</style>