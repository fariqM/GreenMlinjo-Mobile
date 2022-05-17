<template>
	<div style="height: 100%">
		<v-main>
			<div style="height: 100%; background-color: #f5f5f5" v-resize="onResize">
				<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>
				<my-scroll
					ref="vs"
					:ops="ops"
					:style="{ 'max-height': windowsHeight - 110 + 'px' }"
				>
					<v-sheet :max-height="windowsHeight - 110 + 'px'" max-width="99.8vw">
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
								<div
									style="min-width: 100%"
									class="px-2 pt-2 product-title-text"
									v-else
								>
									<div>
										{{ choosenAddress.contact }} | {{ choosenAddress.phone }}
									</div>

									<div>
										{{ choosenAddress.road }} ({{ choosenAddress.details }})
									</div>
									<div>{{ choosenAddress.full_address }}</div>
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
														Rp {{ numberWithCommas(item.price) }}
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
												Rp {{ numberWithCommas(item.price * item.qty) }}
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
									<v-list-item link class="px-2" @click="voucherDialog = true">
										<v-list-item-avatar class="pa-0 text-center mr-1">
											<v-btn icon outlined color="error" :ripple="false" plain>
												<v-icon color="error"
													>mdi-ticket-percent-outline</v-icon
												>
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
												<v-icon color="grey lighten-1"
													>mdi-chevron-right</v-icon
												>
											</v-btn>
										</v-list-item-action>
									</v-list-item>

									<v-divider></v-divider>

									<v-list-item
										link
										class="px-2"
										:to="{
											name: 'payment.method',
											params: { amount: TotalPrice },
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
													paymentMethod === null
														? "Belum dipilih"
														: paymentMethod === 2
														? "MlijoPay"
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
								<v-subheader
									class="px-1 my-1"
									style="font-size: 1rem; font-weight: 600; max-height: 24px"
									>*Ringkasan Belanja</v-subheader
								>
								<div class="px-3">
									<div
										class="total-text total-subheader"
										v-if="selectedVoucher.length > 0"
									>
										<div>Voucher dipakai :</div>
									</div>
									<div
										class="voucher-text mb-2"
										v-if="selectedVoucher.length > 0"
									>
										<li
											style="color: #09893c"
											v-for="(voucher, i) in selectedVoucher"
											:key="i"
										>
											{{ voucher.subtitle }}
										</li>
									</div>
									<v-divider v-if="selectedVoucher.length > 0" />

									<div class="total-text total-subheader">
										<div>Jumlah Subtotal</div>
										<div class="text-end" v-if="discountProduct === 0">
											Rp {{ numberWithCommas(SubTotalPrice) }}
										</div>
										<div
											class="text-end"
											v-if="
												discountProduct !== 0 &&
												discountProductType === 'percent'
											"
										>
											Rp <s>{{ numberWithCommas(SubTotalPrice) }}</s>
											<span style="color: #09893c" class="ml-2">
												{{
													numberWithCommas(
														SubTotalPrice - discountTotal.product
													)
												}}
											</span>
										</div>
									</div>
									<v-divider></v-divider>
									<div class="total-text px-1">
										<div>Biaya Pengiriman</div>
										<div class="text-end" v-if="discountShipping === 0">
											Rp {{ numberWithCommas(10000) }}
										</div>
										<div
											class="text-end"
											v-if="
												discountShipping !== 0 &&
												discountShippingType === 'price'
											"
										>
											Rp <s>{{ numberWithCommas(10000) }}</s>
											<span style="color: #09893c" class="ml-2">
												{{ numberWithCommas(10000 - discountShipping) }}
											</span>
										</div>

										<div>
											Biaya Penanganan
											<v-icon x-small> mdi-help-circle-outline </v-icon>
										</div>
										<div class="text-end">Rp {{ numberWithCommas(2000) }}</div>
									</div>

									<!-- <v-divider v-if="selectedVoucher.length > 0"></v-divider> -->

									<v-divider></v-divider>
									<div class="py-3">
										<div
											style="
												outline: rgb(255 0 0) dashed 2px;
												outline-offset: 3px;
											"
										>
											<div class="total-text total-subheader">
												<div>Total Keseluruhan</div>
												<div class="text-end">
													Rp {{ numberWithCommas(TotalPrice) }}
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
						Rp {{ numberWithCommas(TotalPrice) }}
					</div>
				</div>

				<v-btn
					v-if="btnDisabled"
					elevation="0"
					color="primary"
					small
					@click="scrollToTop"
				>
					Pilih Alamat</v-btn
				>
				<v-btn
					v-else
					elevation="0"
					color="primary"
					small
					@click="makeOrder"
					:loading="btnLoading"
				>
					Buat Pesanan</v-btn
				>
			</div>
		</div>

		<!-- dialog -->
		<v-dialog v-model="voucherDialog" persistent fullscreen>
			<v-toolbar color="primary" elevation="0" tile dense absolute width="100%">
				<v-btn icon @click="voucherDialog = false">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<v-toolbar-title>Pilih Voucher</v-toolbar-title>
			</v-toolbar>

			<v-sheet class="overflow-y-auto white" height="calc(100vh - 48px)">
				<v-subheader
					style="margin-top: 48px"
					class="py-0 px-2 mb-0 title-voucher"
					>Voucher Diskon Produk</v-subheader
				>
				<div class="px-2 py-0" v-for="(voucher, i) in vouchers" :key="i">
					<div
						class="voucher-box d-flex"
						v-if="voucher.voucher_type === 'product'"
					>
						<div class="box-circle-product">
							<div class="half-circle" @click="clickVoucher(voucher)"></div>
							<div
								class="d-flex align-center"
								style="width: fit-content"
								@click="clickVoucher(voucher)"
							>
								<product-discount class="mr-1" />
							</div>
							<v-checkbox
								class="pa-0"
								style="position: absolute"
								:value="voucher"
								v-model="selectedVoucher"
							></v-checkbox>
						</div>
						<div class="px-1" @click="clickVoucher(voucher)">
							<div class="title-text">
								{{ voucher.title }}
							</div>
							<div
								class="subtitle-text"
								v-if="voucher.discount_type === 'percent'"
							>
								Diskon
								<b style="color: rgb(90 161 0)">{{ voucher.discount }}% </b>
								tanpa minimal pembelian.
							</div>
							<div
								class="subtitle-text"
								v-if="voucher.discount_type === 'price'"
							>
								Diskon
								<b style="color: rgb(90 161 0)">Rp {{ voucher.discount }} </b>
								tanpa minimal pembelian.
							</div>
							<div class="normal-text">
								berlaku sampai : {{ formatDate(voucher.exp) }}
							</div>
						</div>
					</div>
				</div>

				<v-divider class="mt-4 mb-1" />

				<v-subheader class="py-0 px-2 mb-0 title-voucher"
					>Voucher Diskon Pengiriman</v-subheader
				>
				<div
					class="px-2 py-0"
					v-for="(voucher, i) in vouchers"
					:key="i + 'key'"
				>
					<div
						class="voucher-box d-flex"
						v-if="voucher.voucher_type === 'shipping'"
					>
						<div class="box-circle-shipping">
							<div class="half-circle" @click="clickVoucher(voucher)"></div>
							<div
								class="d-flex align-center"
								style="width: fit-content"
								@click="clickVoucher(voucher)"
							>
								<delivery-icon />
							</div>
							<v-checkbox
								class="pa-0"
								style="position: absolute"
								:value="voucher"
								v-model="selectedVoucher"
							></v-checkbox>
						</div>
						<div class="px-1" @click="clickVoucher(voucher)">
							<div class="title-text">
								{{ voucher.title }}
							</div>
							<div
								class="subtitle-text"
								v-if="voucher.discount_type === 'percent'"
							>
								Diskon
								<b style="color: rgb(90 161 0)">{{ voucher.discount }}% </b>
								tanpa minimal pembelian.
							</div>
							<div
								class="subtitle-text"
								v-if="voucher.discount_type === 'price'"
							>
								Diskon ongkir
								<b style="color: rgb(90 161 0)">Rp{{ voucher.discount }} </b>
							</div>
							<div class="normal-text">
								Berlaku sampai : {{ formatDate(voucher.exp) }}
							</div>
						</div>
					</div>
				</div>

				<div class="pa-2 bottom-container-voucher">
					<v-btn
						@click="voucherDialog = false"
						block
						color="primary"
						:disabled="selectedVoucher.length === 0 ? true : false"
						>Pilih voucher</v-btn
					>
				</div>
			</v-sheet>
		</v-dialog>

		<v-dialog fullscreen v-model="voucherDescriptionModal">
			<v-toolbar color="primary" elevation="0" tile dense absolute width="100%">
				<v-btn icon @click="voucherDescriptionModal = false">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<v-toolbar-title>Deskripsi Voucher</v-toolbar-title>
			</v-toolbar>
			<v-sheet
				class="overflow-y-auto white"
				height="calc(100vh - 48px)"
				v-if="clickedVoucher !== null"
			>
				<div style="margin-top: 48px; height: 7rem">
					<img
						:src="require('../../assets/banner.png')"
						style="width: 100%; height: 7rem; transform: rotate(180deg)"
						alt=""
					/>
					<div
						class="py-0 px-5"
						style="position: absolute; height: auto; width: 100%; top: 5.5rem"
					>
						<v-card height="6rem" width="100%" class="d-flex">
							<div
								style="
									width: 30%;
									height: 100%;
									background-color: #0fcf72;
									color: #fff;
									font-size: 1.2rem;
									font-weight: 600;
								"
								class="pa-3 text-center d-flex align-center"
							>
								{{
									clickedVoucher.voucher_type === "product"
										? "Diskon Harga"
										: "Diskon Ongkir"
								}}
							</div>
							<div class="d-flex flex-column justify-center pa-3">
								<div class="itle-text">
									{{
										clickedVoucher.voucher_type === "product"
											? "Voucher Potongan Harga"
											: "Voucher Potongan Ongkir"
									}}
								</div>
								<v-chip
									class="px-1"
									color="primary"
									label
									outlined
									x-small
									style="max-width: fit-content"
									>Semua Metode Pembayaran</v-chip
								>
								<div class="normal-text">
									Berlaku sampai : {{ formatDate(clickedVoucher.exp) }}
								</div>
							</div>
						</v-card>
						<div style="margin-top: 1rem">
							<v-textarea
								outlined
								label="Deskripsi Voucher"
								readonly
								rows="3"
								autofocus
								:value="clickedVoucher.description"
							>
							</v-textarea>
						</div>
					</div>
				</div>
				<div class="pa-2 bottom-container-voucher">
					<v-btn
						@click="
							() => {
								let isVoucherExist = false;
								selectedVoucher.forEach((element) => {
									if (element.id === clickedVoucher.id) {
										isVoucherExist = true;
									}
								});
								if (!isVoucherExist) {
									selectedVoucher.push(clickedVoucher);
								}
								voucherDescriptionModal = false;
							}
						"
						block
						color="primary"
						>Gunakan voucher ini</v-btn
					>
				</div>
			</v-sheet>
		</v-dialog>
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
			url: __BASE_URL__,
			order_items: [],
			notes: [],
			voucherDialog: false,
			voucherDescriptionModal: false,
			selectedVoucher: [],
			clickedVoucher: null,
			discountProduct: 0,
			discountProductType: null,
			discountShipping: 0,
			discountShippingType: null,
			discountTotal: {
				product: 0,
				shipping: 0,
			},
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

		this.getChoosenAddress();
		this.getVouchers();
	},
	beforeMount() {
		console.log("set voucher");
		this.selectedVoucher = this.$store.getters["vouchers/getSelectedVoucher"];
		this.$store.commit("auth/setRouteActivity", this.$router.history.current.name)
	},
	watch: {
		selectedVoucher: function (newVal) {
			this.$store.commit("vouchers/setSelectedVoucher", newVal);
			// console.log("selected voucher", newVal);
		},
	},
	computed: {
		SubTotalPrice: function () {
			let total_price = 0;

			this.order_items.forEach((element) => {
				total_price += element.price * element.qty;
			});

			return total_price;
		},
		TotalPrice: function () {
			let total_price = 0;

			const shippingCost = 10000;
			const handlingCost = 2000;

			let isChooseProductVoucher = false;
			let isChooseShippingVoucher = false;

			total_price = this.SubTotalPrice;

			this.selectedVoucher.forEach((element) => {
				if (Object.values(element).includes("product")) {
					isChooseProductVoucher = true;
				} else if (Object.values(element).includes("shipping")) {
					isChooseShippingVoucher = true;
				}
				if (element.voucher_type === "product") {
					if (element.discount_type === "percent") {
						this.discountProductType = element.discount_type;
						this.discountProduct = element.discount;
						this.discountTotal.product = Math.ceil(
							this.SubTotalPrice * (element.discount / 100)
						);

						if (this.discountTotal.product > element.max_value) {
							// console.log("max");
							this.discountTotal.product = element.max_value;
						}
						// console.log("disc", this.discountTotal.product);
						// console.log("max disc", element.max_value);
						// console.log("total disc prod", this.discountTotal.product);
						total_price -= this.discountTotal.product;
					} else {
						this.discountTotal.product = element.discount;
						total_price -= this.discountTotal.product;
					}
				} else if (element.voucher_type === "shipping") {
					if (element.discount_type === "percent") {
						this.discountShippingType = element.discount_type;
						this.discountShipping = element.discount;
						this.discountTotal.shipping = Math.ceil(
							shippingCost * (element.discount / 100)
						);

						if (this.discountTotal.shipping > element.max_value) {
							this.discountTotal.shipping = element.max_value;
						}
						total_price -= this.discountTotal.shipping;
						// console.log("discountTotal.shipping", this.discountTotal.shipping);
					} else {
						this.discountShippingType = element.discount_type;
						this.discountShipping = element.discount;
						this.discountTotal.shipping = element.discount;
						total_price -= this.discountTotal.shipping;
					}
				}
			});
			// console.log("total_price", total_price);
			if (!isChooseProductVoucher) {
				this.discountProduct = 0;
			}
			if (!isChooseShippingVoucher) {
				this.discountShipping = 0;
			}

			total_price += shippingCost + handlingCost;
			// console.log("total_price2", total_price);

			return total_price;
		},
		...mapGetters({
			choosenAddress: "auth/getChoosenAddress",
			vouchers: "vouchers/getVouchers",
			paymentMethod: "others/getSelectedPayment",
		}),
		btnDisabled: function () {
			let disabled = false;
			if (this.choosenAddress === null) {
				disabled = true;
			}
			return disabled;
		},
	},
	methods: {
		clickVoucher(voucher) {
			this.voucherDescriptionModal = true;
			this.clickedVoucher = voucher;
			// console.log(this.clickedVoucher);
		},
		scrollToTop() {
			this.$refs["vs"].scrollTo(
				{
					y: 0,
				},
				500,
				"easeInQuad"
			);
		},
		formatDate(date) {
			const [year, month, day] = [...date.split("-")];
			const monthIndex = month - 1;

			var date = new Date(year, monthIndex, day);
			var tahun = date.getFullYear();
			var bulan = date.getMonth();
			var tanggal = date.getDate();
			var hari = date.getDay();
			switch (hari) {
				case 0:
					hari = "Minggu";
					break;
				case 1:
					hari = "Senin";
					break;
				case 2:
					hari = "Selasa";
					break;
				case 3:
					hari = "Rabu";
					break;
				case 4:
					hari = "Kamis";
					break;
				case 5:
					hari = "Jum'at";
					break;
				case 6:
					hari = "Sabtu";
					break;
			}
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

			let newDate = tanggal + " " + bulan + " " + tahun;
			return newDate;
		},
		getVouchers() {
			this.$store.dispatch("vouchers/getVouchers").catch((e) => {
				if (e.response) {
					if (e.response.status !== 404) {
						console.log(e.response);
					}
				}
			});
		},
		getChoosenAddress() {
			this.$store.dispatch("auth/getChoosenAddress").catch((e) => {
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
			this.btnLoading = true;
			let product_voucher_id = null;
			let shipping_voucher_id = null;

			this.selectedVoucher.forEach((element) => {
				if (element.voucher_type === "product") {
					product_voucher_id = element.id;
				} else if (element.voucher_type === "shipping") {
					shipping_voucher_id = element.id;
				}
			});
			console.log("order item ", this.order_items);
			let form = {
				market_id: 1,
				address:
					this.choosenAddress.contact +
					" | " +
					this.choosenAddress.phone +
					" \n" +
					this.choosenAddress.road +
					" " +
					"(" +
					this.choosenAddress.details +
					")" +
					" \n" +
					this.choosenAddress.full_address,

				product_voucher_id: product_voucher_id,
				product_discount: this.discountTotal.product,

				shipping_voucher_id: shipping_voucher_id,
				shipping_discount: this.discountTotal.shipping,

				total_price: this.TotalPrice,
				payment_type: "COD",
				paid: "pending",
				order_products: this.order_items,
			};

			// console.log("form", form);
			this.$store
				.dispatch("orders/makeOrder", form)
				.then((response) => {
					// if payment method using MlijoPay
					// we decrese its balance
					if (this.paymentMethod === 2) {
						this.$store
							.dispatch("auth/makePurchase", { amount: this.TotalPrice })
							.then((response) => {
								console.log("purchase successfully");
								this.$store
									.dispatch("transactions", {
										uuid: response.data.uuid,
										title: "Delivery Order",
										description: "-",
										amount: response.data.total_price,
										status: "paid",
									})
									.then((resp) => {
										console.log(resp);
										console.log("create transaction success");
									})
									.catch((e) => {
										console.log("create transaction failed");
									});
							})
							.catch((e) => {
								console.log("purchase failed");
							});
					}

					this.btnLoading = false;
					this.$router.replace({ name: "delivery" });
					this.$store.commit("orders/setLastOrder", response.data.order);
					console.log(response);
				})
				.catch((e) => {
					this.btnLoading = false;
					console.log(e);
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