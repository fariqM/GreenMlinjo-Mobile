<template>
	<div style="height: 100%">
		<v-main>
			<appbar
				:loading="appbarSkeleton"
				:isUseBack="true"
				v-on:onSearchInput="filteringProduct"
			></appbar>
			<my-scroll
				ref="vs"
				:ops="ops"
				:style="{ height: windowsHeight - 48 + 'px' }"
				style="background: #f5f5f5; margin-top: 55px"
			>
				<div class="paket-section">
					<v-row
						no-gutters
						justify="space-around"
						v-if="filteredProduct.length > 0"
					>
						<products-card
							v-for="(product, i) in filteredProduct"
							:skeleton="productSkeleton"
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
					<div
						v-else
						class="text-center mt-4"
						style="font-size: 1.2rem; font-weight: 500"
					>
						Oops... produk yang anda cari gak ada.
					</div>
				</div>
			</my-scroll>
		</v-main>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import { mapGetters } from "vuex";
import ProductsCard from "../components/home/ProductCard.vue";
import appbar from "../components/home/Appbar1.vue";

export default {
	components: {
		MyScroll,
		ProductsCard,
		appbar,
	},

	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loading: false,
			productSkeleton: false,
			appbarSkeleton: false,
			input: "",
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
		};
	},
    beforeMount(){
       this.productSkeleton = true
       setTimeout(() => {
           this.productSkeleton = false
       }, 1500);
    },
    watch:{
       products:function(newVal){
           console.log(newVal);
       } 
    },
	computed: {
		...mapGetters({
			products: "products/getSectionProductTerlaris",
			CurrentUser: "auth/getUser",
			choosenMarket: "getChoosenMarket",
		}),
		filteredProduct: function () {
			return this.products.filter((product) => {
				return JSON.stringify(product)
					.toLowerCase()
					.match(this.input.toLowerCase());
			});
			// return this.JournalCollections.filter(journal => journal.journal_name == this.searchJournalCards)
		},
	},
	methods: {
		filteringProduct(value) {
			this.input = value;
			// console.log(value);
		},
	},
};
</script>

<style>
</style>