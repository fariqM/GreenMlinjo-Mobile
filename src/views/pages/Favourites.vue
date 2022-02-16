<template>
	<v-main>
		<search-bar
			:loading="loading"
			:data="favourites"
			v-on:searchTyping="searchInput"
		></search-bar>
		<v-sheet class="overflow-y-auto" max-height="92vh">
			<v-row no-gutters justify="center" class="py-1 px-1">
				<v-col v-if="loading" cols="12" md="12" sm="12">
					<div class="d-flex align-center justify-center" style="height: 92vh">
						<v-progress-circular
							:size="30"
							color="success"
							indeterminate
						></v-progress-circular>
					</div>
					<!-- <skeleton width="100%" height="7rem" :radius="3" v-for="(favourite, i) in 8" :key="i" class="mb-2"></skeleton> -->
				</v-col>
				<v-col
					v-else
					cols="12"
					md="12"
					sm="12"
					v-for="(favourite, i) in filteredFavouritItems"
					:key="i"
				>
					<v-card class="mx-auto" max-width="100%" outlined v-ripple>
						<v-list-item three-line>
							<v-list-item-avatar class="py-0 px-0" tile size="90" color="grey">
								<v-img :src="url + favourite.product.images[0].url"></v-img>
							</v-list-item-avatar>

							<v-list-item-content class="">
								<!-- <div class="text-overline">OVERLINE</div> -->
								<v-list-item-title class="text-h6">
									{{ favourite.product.title }}
								</v-list-item-title>
								<div class="d-flex">
									<v-chip
										x-small
										v-for="(promotion, i) in 4"
										:key="i"
										class="mr-1"
										color="primary"
										>tes</v-chip
									>
									<v-spacer></v-spacer>
									<!-- <v-chip small>tes</v-chip> -->
								</div>
								<div class="d-flex justify-space-between">
									<v-btn
										large
										icon
										text
										color="warning"
										height="1.9rem"
										width="1.07rem"
										@click="clickItem"
										@click.stop=""
										@mousedown.stop=""
										@touchstart.stop=""
									>
										<v-icon>mdi-delete-outline</v-icon>
									</v-btn>
									<v-btn
										text
										x-small
										outlined
										color="primary"
										class="pa-4"
										width="85%"
										@click="addToCart(favourite.product_id)"
										@click.stop=""
										@mousedown.stop=""
										@touchstart.stop=""
									>
										<v-icon x-small color="primary" class="mr-2"
											>mdi-plus</v-icon
										>
										Keranjang
									</v-btn>
									<!-- <v-btn outlined rounded small width="85%"> Tambahkan ke keranjang </v-btn> -->
								</div>
							</v-list-item-content>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>
		</v-sheet>
	</v-main>
</template>

<script>
// import { mapGetters } from "vuex";
import SearchBar from "../components/SearchBar.vue";

export default {
	components: {
		SearchBar,
	},
	mounted() {
		this.$store
			.dispatch("favourites/getFavouritesProduct")
			.then((response) => {
				this.loading = false;
				if (response.status === 200) {
					this.favourites = response.data.data;
					// console.log(this.favourites);
				} else {
				}
			})
			.catch((e) => {
				console.log(e);
			});
	},
	data() {
		return {
			url: __BASE_URL__,
			skeleton: true,
			loading: true,
			favourites: [],
			searchInputForm: "",
			input_helper: "",
		};
	},
	computed: {
		filteredFavouritItems: function () {
			return this.favourites.filter((favourite) => {
				return favourite.product.title
					.toLowerCase()
					.match(this.searchInputForm.toLowerCase());
			});
		},
	},
	watch: {
		input_helper(newVal, oldVal) {
			console.log(newVal);
		},
	},
	methods: {
		searchInput(input) {
			this.searchInputForm = input;
		},
		addToCart(product_id) {
			this.$store
				.dispatch("carts/addCarts", product_id)
				.then((response) => {
					console.log(response);
					this.$toast.success("Berhasil ditambahkan ke keranjang.", "Oke. ", {
						position: "topCenter",
						timeout: 4500,
						// ballon:true,
						transitionInMobile: "fadeInLeft",
						transitionOutMobile: "fadeOutLeft",
						displayMode: 2,
					});
				})
				.catch((e) => {
					console.log(e);
				});
		},
		deleteCart() {
			let inputForm = null;
			this.$toast.question("(/Kg)", "Masukan ke keranjang", {
				animateInside: true,
				class: "addInputForm",
				timeout: false,
				close: true,
				overlay: true,
				displayMode: "once",
				id: "question",
				zindex: 999,
				title: "Hey",
				position: "center",
				inputs: [
					[
						'<input type="number">',
						"keyup",
						function (instance, toast, input, e) {
							inputForm = input.value;
						},
						false,
					],
				],
				buttons: [
					[
						"<button><b>Tambahkan</b></button>",
						function (instance, toast) {
							instance.hide({ transitionOut: "fadeOut" }, toast, inputForm);
						},
						true,
					],
				],
				onClosing: function (instance, toast, closedBy) {
					// console.log(instance);
					toast.error(
						"Coba lagi, kali aja bisa.",
						"Oops ! Kayaknya ada masalah :( ",
						{
							position: "topCenter",
							timeout: 4500,
							// ballon:true,
							transitionInMobile: "fadeInLeft",
							transitionOutMobile: "fadeOutLeft",
							displayMode: 2,
						}
					);
				},
				onClosed: function (instance, toast, closedBy) {
					// console.log(this.$store);
				},
			});
		},
		deleteCartAction(value) {
			console.log(value);
		},
		clickItem() {
			iziToast.question({
				timeout: 20000,
				close: false,
				overlay: true,
				displayMode: "once",
				id: "question",
				zindex: 999,
				title: "Hey",
				message: "Are you sure about that?",
				position: "center",
				buttons: [
					[
						"<button><b>YES</b></button>",
						function (instance, toast) {
							instance.hide({ transitionOut: "fadeOut" }, toast, "button");
						},
						true,
					],
					[
						"<button>NO</button>",
						function (instance, toast) {
							instance.hide({ transitionOut: "fadeOut" }, toast, "button");
						},
					],
				],
				onClosing: function (instance, toast, closedBy) {
					console.info("Closing | closedBy: " + closedBy);
				},
				onClosed: function (instance, toast, closedBy) {
					console.info("Closed | closedBy: " + closedBy);
				},
			});
		},
	},
};
</script>

<style>
</style>