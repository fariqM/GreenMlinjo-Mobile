<template>
	<!-- <home-skeleton v-if="skeleton_show"></home-skeleton> -->
	<div >
		<appbar :loading="loadingBar"></appbar>

		<div >
			<v-sheet
				id="scrolling-techniques-3"
				class="overflow-y-auto"
				max-height="92vh"
				style="background-color: #F5F5F5;"
			>
				<!-- Corousels Section-->
				<home-corousels :skeleton="skeleton_show"></home-corousels>
				<!-- End Corousels Section -->

				<!-- Area Section -->
				<div @click="$router.push({name:'example'})">
					<location-area :skeleton="skeleton_show"></location-area>
				</div>
				<!-- End Area Section -->

				<!-- Wallet Section -->
				<wallet :skeleton="skeleton_show"></wallet>
				<!-- End Wallet Section -->

				<!-- Recomendation Section -->

				<costumscroll :ops="ops" class="pa-2" >
					<v-sheet width="1000" max-height="100px" class="d-flex align-center" style="background-color: #F5F5F5;">
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
								:to="{ name: 'login' }"
								style="text-decoration: none"
							>
								Lihat lainnya
								<v-icon color="primary">mdi-chevron-right</v-icon>
							</router-link>
						</v-subheader>
					</div>

					<v-row no-gutters justify="space-around">
						<products-card
							v-for="(product, i) in ProductTerlaris"
							:skeleton="skeleton.product_terlaris"
							:key="i"
							:product_id="product.id"
							:title="product.title"
							:unit="product.unit"
							:sub_unit="product.sub_unit"
							:min_qty_per_unit="product.min_qty_per_unit"
							:max_qty_per_unit="product.max_qty_per_unit"
							:min_price="product.min_price"
							:max_price="product.max_price"
							:favourite="product.favourites"
							:images="product.images"
							:testing_log="'ini list produk 2'"
						></products-card>
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

export default {
	components: {
		costumscroll,
		appbar,
		RecomItem,
		LocationArea,
		HomeCorousels,
		Wallet,
		ProductsCard,
	},
	watch: {
		// ProductTerlaris: function (newValue, oldValue) {
		// 	console.log(newValue);
		// },
		// CurrentUser: function (newValue, oldValue) {
		// 	console.log(newValue);
		// },
	},
	computed: {
		...mapGetters({
			ProductTerlaris: "products/getSectionProductTerlaris",
			AllFavouriteProducts: "favourites/getAllFavourites",
			CurrentUser: "auth/getUser",
		}),
	},
	data() {
		return {
			loadingBar: true,
			skeleton: {
				product_terlaris: true,
			},
			lazy_ramadan: false,
			skeleton_show: true,
			show: false,
			products: [
				{
					id: 1,
					title: "Wortel Lokal14",
					unit: "Kg",
					sub_unit: "pcs",
					min_qty_per_unit: 15,
					max_qty_per_unit: 18,
					min_price: 12000,
					max_price: 16000,
				},
				{
					id: 2,
					title: "Wortel Lokal",
					unit: "Kg",
					sub_unit: "pcs",
					min_qty_per_unit: 15,
					max_qty_per_unit: 18,
					min_price: 12000,
					max_price: 16000,
				},
				{
					id: 3,
					title: "Wortel Lokal",
					unit: "Kg",
					sub_unit: "pcs",
					min_qty_per_unit: 15,
					max_qty_per_unit: 18,
					min_price: 12000,
					max_price: 16000,
				},
				{
					id: 4,
					title: "Wortel Lokal",
					unit: "Kg",
					sub_unit: "pcs",
					min_qty_per_unit: 15,
					max_qty_per_unit: 18,
					min_price: 12000,
					max_price: 16000,
				},
			],
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
			corrousel: 2,
			total_cart: 5,
			total_fav: 10,
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
		// console.log(this.CurrentUser);
		this.$store
			.dispatch("products/setProductTerlaris")
			.then((result) => {
				// console.log(result);
				this.loadingBar = false;
				this.skeleton_show = false;
				this.skeleton.product_terlaris = false;
			})
			.catch((e) => {
				// console.log(e);
			});
		// this.$store.dispatch("getFirstTime").then((hasil) => {
		// 	console.log("first time => " + hasil);
		// });
		// console.log(this.$store);
	},
	methods: {
		redirectLogin() {
			setTimeout(() => {
				this.$router.push({ name: "login" });
			}, 1000);
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