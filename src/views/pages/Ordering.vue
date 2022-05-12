<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>
			<my-scroll
				ref="vs"
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 128 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 128 + 'px'"
					:max-height="windowsHeight - 128 + 'px'"
					max-width="99.8vw"
				>
					<home-corousels
						:skeleton="skeleton_show"
						:showBar="false"
					></home-corousels>

					<div style="max-width: 90%; display: contents">
						<div style="padding: 0 1rem">
							<step-progress
								v-if="!skeleton_show"
								:steps="mySteps"
								:current-step="currentStep"
								icon-class="fa fa-check"
								:active-thickness="2"
								:passive-thickness="2"
								:line-thickness="7"
								:active-color="'#87BD43'"
							></step-progress>
							<div
								class="d-flex align-center"
								v-else
								style="margin-top: 1rem; padding: 0 10px"
							>
								<skeleton
									width="40px"
									height="40px"
									animation="wave"
									type="circle"
									:radius="3"
								/>
								<skeleton
									width="55px"
									height="10px"
									animation="wave"
									:radius="3"
								/>
								<skeleton
									width="40px"
									height="40px"
									animation="wave"
									type="circle"
									:radius="3"
								/>
								<skeleton
									width="55px"
									height="10px"
									animation="wave"
									:radius="3"
								/>
								<skeleton
									width="40px"
									height="40px"
									animation="wave"
									type="circle"
									:radius="3"
								/>
								<skeleton
									width="55px"
									height="10px"
									animation="wave"
									:radius="3"
								/>
								<skeleton
									width="40px"
									height="40px"
									animation="wave"
									type="circle"
									:radius="3"
								/>
							</div>
						</div>
					</div>

					<v-card style="margin-top: 2rem" v-if="!skeleton_show">
						<v-expansion-panels class="pa-0">
							<v-expansion-panel class="pa-0">
								<v-expansion-panel-header style="min-height:0px"> Detail Alamat </v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-textarea :value="lastOrder.address">
										
									</v-textarea>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
						<div class="d-flex justify-space-between title-text">
							<span>Detail Pesanan</span>
							<span>{{ lastOrder.uuid_key }}</span>
						</div>
						<v-divider />
						<div
							class="pa-2 d-flex justify-space-between"
							v-for="(product, n) in lastOrder.order_products"
							:key="n"
						>
							<div class="d-flex">
								<v-avatar tile size="50">
									<v-img :src="url + product.product.images[0].url"></v-img>
								</v-avatar>
								<div class="d-flex flex-column ml-1">
									<span class="product-title-text">{{
										product.product.title
									}}</span>
									<span class="product-subtitle-text"
										>x{{ product.qty }} {{ product.product.unit }} ({{
											product.product.min_qty_per_unit * product.qty
										}}-{{ product.product.max_qty_per_unit * product.qty }}
										{{ product.product.sub_unit }})</span
									>
									<span class="product-subtitle-text"
										>Catatan : {{ product.notes }}</span
									>
								</div>
							</div>
							<div class="product-title-text" style="color: rgb(9, 137, 60)">
								<span
									>Rp
									{{
										numberWithCommas(product.product.price * product.qty)
									}}</span
								>
							</div>
						</div>
						<v-divider />
						<div class="pa-2 d-flex flex-column total-text total-subheader">
							<div class="d-flex justify-space-between">
								<span> Jumlah Subtotal </span>
								<span v-if="lastOrder.product_voucher_id === null">
									Rp
									{{
										numberWithCommas(getSubtotal(lastOrder.order_products))
									}}</span
								>
								<div v-else>
									<span>
										<s
											>Rp
											{{
												numberWithCommas(getSubtotal(lastOrder.order_products))
											}}</s
										></span
									>
									<span style="color: #09893c" class="ml-2">
										Rp
										{{
											numberWithCommas(
												getSubtotal(lastOrder.order_products) -
													lastOrder.product_discount
											)
										}}
									</span>
								</div>
							</div>
							<div class="d-flex justify-space-between">
								<span> Biaya Pengiriman </span>
								<span v-if="lastOrder.shipping_voucher_id === null">
									Rp {{ numberWithCommas(10000) }}</span
								>
								<div v-else>
									<span
										>Rp<s> {{ numberWithCommas(10000) }}</s></span
									>
									<span style="color: #09893c" class="ml-2">
										Rp
										{{ numberWithCommas(10000 - lastOrder.shipping_discount) }}
									</span>
								</div>
							</div>
							<div class="d-flex justify-space-between">
								<span> Biaya Penanganan </span>
								<span> Rp {{ numberWithCommas(2000) }}</span>
							</div>
						</div>
					</v-card>

					<div v-if="skeleton_show" style="padding: 0 1rem; margin-top: 4.8rem">
						<skeleton width="90vw" height="20px" animation="wave" :radius="3" />
						<skeleton
							style="margin-top: 0.8rem"
							width="90vw"
							height="50px"
							animation="wave"
							:radius="3"
						/>
						<skeleton
							style="margin-top: 0.8rem"
							width="90vw"
							height="50px"
							animation="wave"
							:radius="3"
						/>
						<skeleton
							style="margin-top: 0.8rem"
							width="90vw"
							height="50px"
							animation="wave"
							:radius="3"
						/>
					</div>
				</v-sheet>
			</my-scroll>
		</v-main>
		<v-card v-if="!skeleton_show" tile class="bottom-container white pa-2">
			<div
				class="d-flex justify-space-between mb-1"
				style="font-size: 1rem; font-weight: 700"
			>
				<span>Total Harga</span>
				<span style="color: #09893c">
					Rp {{ numberWithCommas(lastOrder.total_price) }}</span
				>
			</div>
			<v-btn
				:disabled="currentStep === 3 ? false : true"
				@click="getOrder"
				block
				color="primary"
			>
				Pesanan telah diterima
			</v-btn>
		</v-card>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import HomeCorousels from "../components/home/HomeCorousel.vue";
import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";
export default {
	components: {
		MyScroll,
		HomeCorousels,
		"step-progress": StepProgress,
	},
	data() {
		return {
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			skeleton_show: true,
			loading: false,
			lastOrder: null,
			mySteps: ["Mencari driver", "", "", ""],
			currentStep: 0,
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

	mounted() {
		this.getOrder();
	},
	methods: {
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		deliveryProgress() {
			const progress = [
				"Mencari driver",
				"Driver sedang antre",
				"Driver menuju alamat anda",
				"Pesanan telah sampai",
			];

			setTimeout(() => {
				this.currentStep = 1;
				this.mySteps[1] = progress[1];
			}, 2000);

			setTimeout(() => {
				this.currentStep = 2;
				this.mySteps[2] = progress[2];
			}, 4000);

			setTimeout(() => {
				this.currentStep = 3;
				this.mySteps[3] = progress[3];
			}, 6000);
		},
		getOrder() {
			this.$store
				.dispatch(
					"orders/getLastOrder",
					this.$store.getters["orders/getOrders"]
				)
				.then((response) => {
					this.lastOrder = response.data.data;
					console.log("getLastOrder", response.data.data);
					this.skeleton_show = false;
					this.deliveryProgress();
				})
				.catch((e) => {
					console.log(e);
				});
		},
		getSubtotal(product) {
			let subtotal = 0;
			product.forEach((element) => {
				subtotal += element.product.price * element.qty;
			});
			return subtotal;
		},
	},
};
</script>

<style>
.step-progress__step-label {
	word-wrap: break-word;
	white-space: pre-wrap;
	text-align: center;
	font-size: 0.7rem;
	top: calc(100% + 5px);
}
.step-progress__wrapper {
	top: -15px;
}
.total-subheader {
	font-size: 0.9rem;
	font-weight: 600;
}
.total-text {
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 0.1rem;
	color: rgba(0, 0, 0, 0.87);
	font-weight: 500;
}
</style>