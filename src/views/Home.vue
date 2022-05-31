<template>
	<!-- <home-skeleton v-if="skeleton_show"></home-skeleton> -->
	<div>
		<appbar :loading="loading_bar"></appbar>

		<div>
			<v-sheet
				id="scrolling-techniques-3"
				class="overflow-y-auto"
				max-height="92vh"
				style="background-color: #f5f5f5"
			>
				<!-- Corousels Section-->
				<home-corousels
					:skeleton="skeleton_show"
					:showBar="true"
					style="margin-top: 56px"
				></home-corousels>
				<!-- End Corousels Section -->

				<!-- Area Section -->
				<div @click="openMarketDialog">
					<location-area
						:skeleton="skeleton.area"
						:market_name="market_name"
					></location-area>
				</div>
				<!-- End Area Section -->

				<!-- Wallet Section -->
				<wallet :skeleton="skeleton.wallet"></wallet>
				<!-- End Wallet Section -->

				<!-- Recomendation Section -->

				<costumscroll :ops="ops" class="pa-2">
					<v-sheet
						width="1000"
						max-height="100px"
						class="d-flex align-center"
						style="background-color: #f5f5f5"
					>
						<!-- <v-card elevation="2"> -->
						<recom-item
							v-for="(item, i) in recom_items"
							:key="i"
							:src="item.src"
							:alt="item.alt"
							:title="item.title"
							:skeleton="skeleton_show"
						></recom-item>
						<!-- </v-card> -->
					</v-sheet>
				</costumscroll>

				<!-- End Recomendation Section -->

				<div class="paket-section">
					<div class="d-flex justify-space-between mt-3 px-0">
						<v-subheader class="px-2" style="height: 20px; font-weight: bold"
							>Produk Terlaris</v-subheader
						>
						<v-subheader class="px-1" style="height: 20px">
							<router-link
								:to="{ name: 'product.terlaris' }"
								style="text-decoration: none"
							>
								Lihat lainnya
								<v-icon color="primary">mdi-chevron-right</v-icon>
							</router-link>
						</v-subheader>
					</div>

					<v-row
						no-gutters
						justify="space-around"
						v-if="products.length > 0"
					>
						<products-card
							v-for="(product, i) in products"
							:skeleton="skeleton.product_terlaris"
							:key="i"
							:product_id="product.id"
							:title="product.title"
							:unit="product.unit"
							:sub_unit="product.sub_unit"
							:min_qty_per_unit="product.min_qty_per_unit"
							:max_qty_per_unit="product.max_qty_per_unit"
							:price="product.price"
							:favourite="product.favourites"
							:images="product.images"
							:testing_log="'ini list produk 2'"
						></products-card>
					</v-row>

					<v-row
						class="my-2"
						no-gutters
						justify="space-around"
						v-if="skeleton_show"
					>
						<v-col
							cols="6"
							sm="5"
							md="5"
							class="py-2"
							style="padding: 10px 5px 5px 5px"
							v-for="(item, i) in 6"
							:key="i"
						>
							<skeleton width="100%" height="12rem" :radius="3" />
						</v-col>
					</v-row>

					<v-row
						no-gutters
						justify="center"
						align="center"
						class="pb-3"
						v-if="error_ilust"
					>
						<div>
							<not-found />
						</div>
						<div>
							<h4 class="link-text mb-3">Opps kayaknya ada masalah koneksi</h4>
						</div>
					</v-row>
				</div>

				<!-- <v-lazy v-model="lazy_ramadan">
						<div class="paket-section">
							<div class="d-flex justify-space-between mt-3 px-0">
								<v-subheader
									class="px-2"
									style="height: 20px; font-weight: bold"
									>Paket Ramadhan</v-subheader
								>
								<v-subheader class="px-1" style="height: 20px">
									<router-link
										:to="{ name: 'login' }"
										style="text-decoration: none"
									>
										Lihat lainnya
										<v-icon color="primary">mdi-chevron-right</v-icon>
									</router-link>
								</v-subheader>
							</div>

							<v-row no-gutters justify="space-between">
								<products-card
									v-for="(product, i) in products"
									:key="i"
									:product_id="product.id"
									:title="product.title"
									:unit="product.unit"
									:sub_unit="product.sub_unit"
									:min_qty_per_unit="product.min_qty_per_unit"
									:max_qty_per_unit="product.max_qty_per_unit"
									:min_price="product.min_price"
									:max_price="product.max_price"
									:testing_log="'ini list produk 2'"
								></products-card>
							</v-row>
						</div>
					</v-lazy> -->
			</v-sheet>
			<v-overlay :value="skeleton_show" opacity="0.2"> </v-overlay>
		</div>

		<v-dialog v-model="market_dialog" max-width="250">
			<v-card>
				<v-card-title class="py-0 pt-2"> Pilih Lokasi Pasar </v-card-title>
				<v-card-title class="py-0">
					<v-radio-group v-model="market_id" class="py-0">
						<v-radio
							v-for="(market, n) in markets"
							:key="n"
							:label="market.name"
							:value="market.id"
						></v-radio>
					</v-radio-group>
				</v-card-title>
				<v-card-actions class="pt-0">
					<v-btn color="primary" block @click="changeMarketProduct"
						>terapkan</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import costumscroll from "vuescroll";
import appbar from "./components/home/Appbar1.vue";
import RecomItem from "./components/home/RecomItem.vue";
import LocationArea from "./components/home/LocationArea.vue";
import HomeCorousels from "./components/home/HomeCorousel.vue";
import Wallet from "./components/home/Wallet.vue";
import ProductsCard from "./components/home/ProductCard.vue";
import notFound from "./components/ilustration/404.vue";

export default {
	components: {
		costumscroll,
		appbar,
		RecomItem,
		LocationArea,
		HomeCorousels,
		Wallet,
		ProductsCard,
		notFound,
	},
	computed: {
		...mapGetters({
			ProductTerlaris: "products/getSectionProductTerlaris",
			CurrentUser: "auth/getUser",
			markets: "getMarkets",
			choosenMarket: "getChoosenMarket",
		}),
	},
	data() {
		return {
			market_dialog: false,
			loading_bar: true,
			skeleton: {
				product_terlaris: false,
				area: false,
				wallet: false,
			},
			lazy_ramadan: false,
			skeleton_show: false,
			show: false,
			error_ilust: false,
			recom_items: [
				{
					src: "/assets/icon/flash-sale.png",
					alt: "coupons",
					title: "Promo Kilat",
				},
				{
					src: "/assets/icon/fruit.png",
					alt: "coupons",
					title: "Paket Buah",
				},
				{
					src: "/assets/icon/wheat-flour.png",
					alt: "Kebutuhan Pokok",
					title: "Kebutuhan Pokok",
				},
				{
					src: "/assets/icon/vegetables.png",
					alt: "Sayur",
					title: "Paket Sayur",
				},
				{
					src: "/assets/icon/egg-carton.png",
					alt: "Telur",
					title: "Produk Telur",
				},
				{
					src: "/assets/icon/meat.png",
					alt: "Daging",
					title: "Produk Daging",
				},
				{
					src: "/assets/icon/sweet-potato.png",
					alt: "Umbian",
					title: "Produk Umbian",
				},
				{
					src: "/assets/icon/seafood.png",
					alt: "Ikan",
					title: "Produk Ikan",
				},
				{
					src: "/assets/icon/milk-box.png",
					alt: "Produk Susu",
					title: "Produk Susu",
				},
			],
			market_id: 1,
			market_name: "Pasar Blauran",
			corrousel: 2,
			total_cart: 5,
			total_fav: 10,
			products:[],
			itemsrecom: "/assets/icon/meat.png",
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
					easing: undefined,
					verticalNativeBarPos: "right",
					maxHeight: "100%",
					// maxHeight: "300",
				},
				rail: {
					background: "transparent",
					opacity: 0,
					size: "4px",
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
					opacity: 0,
					hoverStyle: true,
					specifyBorderRadius: false,
					minSize: 0,
					size: "5px",
					disable: false,
				},
				scrollButton: {
					enable: false,
					background: "#87BD43    ",
					opacity: 1,
					step: 180,
					mousedownStep: 30,
				},
			},
		};
	},

	mounted() {
		if (this.ProductTerlaris.length === 0) {
			this.skeleton.area = true;
			this.skeleton.wallet = true;
			this.fetchProductTerlaris();

			// this.skeleton_show = true;
		} else {
			this.skeleton.product_terlaris = true;
			this.fetchProductTerlaris();
		}
		this.$store.commit(
			"auth/setRouteActivity",
			this.$router.history.current.name
		);
		this.$store
			.dispatch("fetchMarkets")
			.then(() => {
				this.skeleton.area = false;
			})
			.catch((e) => {
				this.showErrorToast("Gagal mendapatkan data pasar.");
			});
		this.$store
			.dispatch("auth/getBalance")
			.then(() => {
				this.skeleton.wallet = false;
			})
			.catch((e) => {
				this.skeleton.wallet = false;
				if (e.response) {
					if (e.response.status !== 401) {
						this.showErrorToast("Gagal mendapatkan data saldo.");
					}
				} else {
					this.showErrorToast("Gagal mendapatkan data saldo.");
				}
			});
	},
	methods: {
		openMarketDialog() {
			this.market_id = this.choosenMarket;
			setTimeout(() => {
				this.market_dialog = true;
			}, 200);
		},
		changeMarketProduct() {
			this.$store.commit("setChoosenMarket", this.market_id)
			this.market_name = this.markets[this.market_id - 1].name;
			this.market_dialog = false;
			this.skeleton.product_terlaris = true;
			this.fetchProductTerlaris();
		},
		fetchProductTerlaris() {
			this.$store
				.dispatch("products/setProductTerlaris", this.market_id)
				.then((response) => {
					// console.log(response);
					this.products = response.data.data.slice(0,6)
					this.loading_bar = false;
					this.skeleton_show = false;
					this.error_ilust = false;
					this.skeleton.product_terlaris = false;
				})
				.catch((e) => {
					this.error_ilust = true;
					this.loading_bar = false;
					this.skeleton_show = false;
					this.skeleton.product_terlaris = false;
					// console.log(e);
				});
		},
		redirectLogin() {
			setTimeout(() => {
				this.$router.push({ name: "login" });
			}, 1000);
		},
		showErrorToast(message) {
			iziToast.error({
				title: "Oops ! Kayaknya ada masalah :( ",
				message: `Pesan: ${message}`,
				position: "topCenter",
				timeout: 10000,
				// ballon:true,
				transitionInMobile: "fadeInLeft",
				transitionOutMobile: "fadeOutLeft",
				displayMode: 2,
			});
		},
	},
};
</script>

<style lang="scss">
.v-toolbar__content {
	padding: 4px 4px 4px 4px;
}
</style>

<style scoped>
</style>

<style>
.paket-section {
	padding: 1px 5px 5px 5px;
	/* background-color: rgb(231 231 231 / 46%); */
	border-radius: 5%;
	margin: 5px 5px 5px 5px;
}
</style>