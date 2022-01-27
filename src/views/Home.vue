<template>
	<div class="overflow-hidden">
		<appbar></appbar>
		<div>
			<v-sheet
				id="scrolling-techniques-3"
				class="overflow-y-auto"
				max-height="600"
			>
				<v-carousel
					cycle
					v-model="corrousel"
					hide-delimiters
					:show-arrows="false"
					height="100%"
				>
					<v-carousel-item v-for="(item, i) in images" :key="i" class="info">
						<v-img
							height="250"
							src="../assets/sayur.jpg"
							gradient="to top right, #ffffff38, #496c1d"
						>
						</v-img>
					</v-carousel-item>
				</v-carousel>
				<div class="d-flex justify-space-between pl-2 pr-2">
					<div>
						<span
							v-for="(item, i) in 3"
							:key="i"
							class="costum_corrousel_controls"
							:class="[i === corrousel ? 'ccc_active' : '']"
						/>
					</div>
					<router-link :to="{ name: 'login' }" style="text-decoration: none"
						>lihat semua promo</router-link
					>
				</div>
				<v-subheader style="border-style: outset; border-width:4px" class="mb-2">
					<v-icon>mdi-map-marker-outline</v-icon>
					Lihat area jangkauan pengiriman
					<v-spacer></v-spacer>
					<v-btn icon><v-icon>mdi-chevron-down</v-icon></v-btn>

				</v-subheader>
                <costumscroll :ops="ops">
                    <v-sheet width="1000" height="50px" class="d-flex align-center">
                       <div class="">
                           Category Category Category Category Category Category
                       </div>
                    </v-sheet>
                    <!-- <v-text-field label="asdasda"></v-text-field> -->
                </costumscroll>
			</v-sheet>
		</div>
	</div>
</template>

<script>
import costumscroll from "vuescroll";
import appbar from "./components/Appbar1.vue";

export default {
	components: {
		costumscroll,
		appbar,
	},
	data() {
		return {
			corrousel: 2,
			total_cart: 5,
			total_fav: 10,
			images: [
				"assets/images/box.png",
				"assets/images/small_box.png",
				"assets/images/cart.png",
			],
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
					scrollingY: false,
					speed: 300,
					easing: undefined,
					verticalNativeBarPos: "right",
					maxHeight: "100%",
					// maxHeight: "300",
				},
				rail: {
					background: "#87BD43",
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
					keepShow: true,
					background: "#87BD43",
					opacity: 1,
					hoverStyle: true,
					specifyBorderRadius: false,
					minSize: 0,
					size: "5px",
					disable: false,
				},
				scrollButton: {
					enable: true,
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

<style scoped>
.costum_corrousel_controls {
	margin: 0px 3px;
	height: 9px;
	width: 9px;
	background-color: #c5ff7cd9;
	border-radius: 50%;
	display: inline-block;
}
.ccc_active {
	background-color: #87bd43;
}
</style>

<style lang="scss">
.v-toolbar__content {
	padding: 4px 4px 4px 4px;
}
</style>