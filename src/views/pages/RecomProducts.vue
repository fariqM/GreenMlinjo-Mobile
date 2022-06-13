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
                            :product_category="product.product_category"
							:testing_log="'ini list produk 2'"
						></products-card>
					</v-row>
					<div
						v-if="loading == false && filteredProduct.length === 0"
						class="text-center mt-4"
						style="font-size: 1.2rem; font-weight: 500"
					>
						Yahh... sudah habis.
					</div>
					<div class="text-center mt-4" v-if="loading">
						<v-progress-circular
							:size="50"
							color="primary"
							indeterminate
						></v-progress-circular>
					</div>
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
			</my-scroll>
		</v-main>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import { mapGetters } from "vuex";
import ProductsCard from "../components/home/ProductCard.vue";
import appbar from "../components/home/Appbar1.vue";
import notFound from "../components/ilustration/404.vue";

export default {
	components: {
		MyScroll,
		ProductsCard,
		appbar,
		notFound,
	},

	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loading: true,
			productSkeleton: false,
			appbarSkeleton: false,
			product_category_id: null,
			error_ilust: false,
			products: [],
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
	beforeMount() {
		this.product_category_id =
			this.$router.history.current.params.product_category_id;
		this.getProducts();
	},
	watch: {
		products: function (newVal) {
			console.log(newVal);
		},
	},
	computed: {
		...mapGetters({
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
		getProducts() {
			this.loading = true;
			this.appbarSkeleton = true;
			this.productSkeleton = true;
			this.$store
				.dispatch("products/getRecomProducts", {
					market_id: this.$store.getters["getChoosenMarket"],
					product_category_id: this.product_category_id,
				})
				.then((response) => {
					this.products = response.data.data;
					this.productSkeleton = false;
					this.appbarSkeleton = false;
					this.loading = false;
				})
				.catch((e) => {
					this.productSkeleton = false;
					this.appbarSkeleton = false;
					this.error_ilust = true;
					this.loading = false;
				});
		},
		filteringProduct(value) {
			this.input = value;
			// console.log(value);
		},
	},
};
</script>

<style>
</style>