<template>
	<div class="overflow-hidden">
		<appbar></appbar>
		<div>
			<v-sheet
				id="scrolling-techniques-3"
				class="overflow-y-auto"
				max-height="91vh"
			>
				<!-- Corousels Section-->
				<home-corousels></home-corousels>
				<!-- End Corousels Section -->

				<!-- Area Section -->
				<location-area></location-area>
				<!-- End Area Section -->

				<!-- Recomendation Section -->
				<costumscroll :ops="ops" class="pt-2 pb-2 pl-2 pr-2 mb-2">
					<v-sheet width="1000" max-height="100px" class="d-flex">
						<recom-item
							v-for="(item, i) in recom_items"
							:key="i"
							:src="item.src"
							:alt="item.alt"
							:title="item.title"
						></recom-item>
					</v-sheet>
				</costumscroll>
				<!-- End Recomendation Section -->

				<!-- Wallet Section -->
				<wallet></wallet>
				<!-- End Wallet Section -->

				<div class="d-flex justify-space-between mt-3 px-0">
					<v-subheader class="px-2" style="height: 20px; font-weight:bold">Paket Promo</v-subheader>
					<v-subheader class="px-1" style="height: 20px; ">
						<router-link :to="{name: 'login'}" style="text-decoration: none">
							Lihat lainnya <v-icon color="primary">mdi-chevron-right</v-icon>
						</router-link>
					</v-subheader>
				</div>
				<v-row no-gutters class="px-1" justify="space-around" justify-sm="5">
					<v-col cols="5" sm="6" class="py-2" v-for="(count, i) in 6" :key="i">

						<v-card class="mx-auto" max-width="344" elevation="2" outlined>
							<div class="d-flex justify-center">
								<v-img
									src="/assets/images/wortel.jpg"
									height="100px"
									width="100px"
								></v-img>
							</div>

							<v-card-title style="font-size: 1rem; padding: 2px 5px">
								Wortel Lokal
							</v-card-title>

							<v-card-subtitle style="padding: 5px 5px"
								>Wortel lokal fresh</v-card-subtitle
							>
							<v-card-subtitle style="padding: 0px 5px">
								Rp12.000 - Rp15.000 / Kg
							</v-card-subtitle>
							<v-card-actions style="padding: 0px 0px">
								<v-btn color="primary" text class="pa-0">Beli</v-btn>
								<v-spacer></v-spacer>
								<v-btn icon>
									<v-icon>mdi-chevron-right</v-icon>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-sheet>
		</div>
	</div>
</template>

<script>
import costumscroll from "vuescroll";
import appbar from "./components/home/Appbar1.vue";
import RecomItem from "./components/home/RecomItem.vue";
import LocationArea from "./components/home/LocationArea.vue";
import HomeCorousels from "./components/home/HomeCorousel.vue";
import Wallet from "./components/home/Wallet.vue";

export default {
	components: {
		costumscroll,
		appbar,
		RecomItem,
		LocationArea,
		HomeCorousels,
		Wallet,
	},
	data() {
		return {
			show: false,
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
					opacity: 0.3,
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
					opacity: 1,
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
};
</script>

<style lang="scss">
.v-toolbar__content {
	padding: 4px 4px 4px 4px;
}
</style>