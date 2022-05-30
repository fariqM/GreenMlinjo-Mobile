<template>
	<v-col cols="6" sm="5" md="5" class="py-2" style="padding: 10px 5px 5px 5px">
		<skeleton width="100%" height="12rem" :radius="3" v-if="skeleton" />
		<v-lazy
			v-else
			:v-model="false"
			:options="{
				threshold: 0.5,
			}"
			width="100%"
		>
			<v-card class="mx-auto" max-width="344" elevation="2" outlined>
				<v-list link class="pa-0" style="display: block">
					<div class="d-flex justify-end">
						<v-img :src="url + images[0].url" height="100px" width="100px">
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular
										indeterminate
										color="primary"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
						<div style="position: absolute">
							<div style="user-select: none">
								<v-btn
									class="pa-0 mt-1 mr-1"
									style="min-width: 35px; background-color: #ffffffa1"
									id="MyBTN12212"
								>
									<div
										v-if="isLogedIn"
										style="height: 30px; width: 30px"
										@click="clickFav(product_id)"
									>
										<heart-icon
											v-if="favourite.length === 0"
											:isFavourite="false"
											:product_id="product_id"
										/>
										<heart-icon
											v-else
											:isFavourite="true"
											:product_id="product_id"
										/>
									</div>
									<div
										v-else
										style="height: 30px; width: 30px"
										@click="clickFav(product_id)"
									>
										<heart-disabled-icon />
									</div>
								</v-btn>
							</div>
						</div>
					</div>
				</v-list>

				<v-list-item link class="pa-0 pb-1">
					<div style="width: 100%">
						<v-card-title
							style="
								font-size: 0.8rem;
								padding: 2px 5px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								display: flow-root;
							"
						>
							{{ title }}
						</v-card-title>
						<v-card-subtitle
							v-if="max_qty_per_unit !== null"
							style="padding: 5px 5px; color: #8b8b8b; font-size: 0.7rem"
						>
							{{ min_qty_per_unit }}-{{ max_qty_per_unit }} {{ sub_unit }}/{{
								unit
							}}
						</v-card-subtitle>
						<v-card-subtitle
							v-else
							style="padding: 5px 5px; color: #8b8b8b; font-size: 0.7rem"
						>
							{{ min_qty_per_unit }} {{ sub_unit }}/{{ unit }}
						</v-card-subtitle>
						<div
							class="pl-1"
							style="
								font-weight: 500;
								font-size: 0.9rem;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								color: #09893c;
							"
						>
							Rp {{ numberWithCommas(price)
							}}<span
								class="pl-1 normal-text"
								style="font-weight: 500; font-size: 0.775rem"
								>/{{ unit }}</span
							>
						</div>
					</div>
				</v-list-item>

				<v-divider class="mb-1"></v-divider>

				<v-card-actions
					style="padding: 0px 0px"
					class="d-flex justify-center py-1"
				>
					<v-btn
						text
						x-small
						outlined
						color="primary"
						class="pa-4"
						@click="addToCart(product_id, unit)"
					>
						<v-icon x-small color="primary" class="mr-2">mdi-plus</v-icon>
						Keranjang
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-lazy>
	</v-col>
</template>

<script>
import HeartIcon from "../../components/icon/Heart.vue";
import CartIcon from "../../components/icon/Cart.vue";
import HeartDisabledIcon from "../../components/icon/HeartDisabled.vue";
import { mapGetters } from "vuex";

export default {
	components: {
		HeartIcon,
		CartIcon,
		HeartDisabledIcon,
	},
	data() {
		return {
			url: __BASE_URL__,
		};
	},
	props: {
		testing_log: String,
		title: String,
		unit: String,
		sub_unit: String,
		min_qty_per_unit: {
			type: [Number, String],
		},
		max_qty_per_unit: {
			type: [Number, String],
		},
		price: {
			type: [Number, String],
		},
		product_id: Number,
		skeleton: Boolean,
		favourite: Array,
		images: Array,
	},
	computed: {
		...mapGetters({ isLogedIn: "auth/getUserStatus" }),
	},
	methods: {
		numberWithCommas(x) {
			var number = parseInt(x);
			var parts = number.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		addFavourite(product_id) {
			this.$store.dispatch("favourites/addFavourites", product_id);
		},
		addToCart(id, unit) {
			if (!this.isLogedIn) {
				this.$router.push({ name: "login" });
				return;
			}
			let inputForm = null;
			iziToast.question({
				color: "#acbd90",
				progressBarColor: "#87BD43",
				title: "Masukan ke keranjang",
				animateInside: true,
				class: "addInputForm",
				timeout: false,
				close: true,
				overlay: true,
				displayMode: "once",
				id: "question",
				zindex: 999,
				position: "center",
				inputs: [
					[
						'<input type="number" id="inputToast">',
						"keyup",
						function (instance, toast, input, e) {
							inputForm = input.value;
						},
						false,
					],
					[`<div>@${unit}</div>`],
				],
				buttons: [
					[
						"<button><b>Tambahkan</b></button>",
						(instance, toast) => {
							console.log(inputForm);
							if (inputForm === null) {
								let input = document.getElementById("inputToast");
								input.classList.add("input-error-toast");
								input.placeholder = "Wah kosong...";
							} else {
								let input = document.getElementById("inputToast");
								input.classList.remove("input-error-toast");
								input.classList.add("input-success-toast");
								axios
									.post("carts/add-carts", {
										product_id: id,
										qty: parseFloat(inputForm),
									})
									.then((response) => {
										console.log(response);
										this.$store.commit("carts/addCarts", {
											cartId: this.product_id,
										});
										console.log(this.product_id);
										instance.hide({ transitionOut: "fadeOut" }, toast);
										// iziToast.success({
										// 	title: "Oke.",
										// 	message: "Berhasil ditambahkan ke keranjang.",
										// 	position: "topCenter",
										// 	timeout: 4500,
										// 	// ballon:true,
										// 	transitionInMobile: "fadeInLeft",
										// 	transitionOutMobile: "fadeOutLeft",
										// 	displayMode: 2,
										// });
									})
									.catch((e) => {
										iziToast.error({
											title: "Error :( ",
											message:
												"Ga bisa nambahin barang ini ke keranjang, coba lagi nanti.",
											position: "topCenter",
											timeout: 4500,
											// ballon:true,
											transitionInMobile: "fadeInLeft",
											transitionOutMobile: "fadeOutLeft",
											displayMode: 2,
										});
									});
							}
						},
						true,
					],
				],
				onClosing: function (instance, toast, closedBy) {
					console.log(instance);
				},
			});
		},
		clickFav(product_id) {
			this.$store
				.dispatch("favourites/addFavourites", product_id)
				.then((response) => {
					// console.log(response);
				})
				.catch((e) => {
					if (e.response) {
						if (e.response.status === 401 || e.response.status === 406) {
							this.redirectLogin();
						}
					}
					console.log(e);
				});
			// console.log("ok");
		},
		redirectLogin() {
			setTimeout(() => {
				this.$router.push({ name: "login" });
			}, 500);
		},
	},
};
</script>

<style>
</style>