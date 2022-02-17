<template>
	<v-main>
		<!-- <div> -->
		<mlj-toolbar :loading="loading" :page="'Favorit'"></mlj-toolbar>
		<v-text-field
			v-if="!loading"
			hide-details
			placeholder="Cari apa ?"
			prepend-inner-icon="mdi-magnify"
			clearable
			v-model="searchInputForm"
			class="px-2 my-2"
			single-line
			filled
			dense
		></v-text-field>

		<!-- </div> -->

		<v-sheet
			class="overflow-y-auto"
			max-height="92vh"
			id="scrolling-techniques-8"
		>
			<v-row no-gutters justify="center" class="py-1 px-1">
				<v-col v-if="loading" cols="12" md="12" sm="12">
					<div class="d-flex align-center justify-center" style="height: 84vh">
						<v-progress-circular
							:size="30"
							color="success"
							indeterminate
						></v-progress-circular>
					</div>
				</v-col>
				<v-col
					class="mb-2"
					v-else
					cols="12"
					md="12"
					sm="12"
					v-for="(favourite, i) in filteredFavouritItems"
					:key="i"
				>
					<v-card
						class="mx-auto"
						max-width="100%"
						outlined
						v-ripple
						elevation="3"
					>
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
										@click="deleteFav(favourite.id)"
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

export default {
	components: {
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
			offsetTop: 0,
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
			let inputForm = null;
			iziToast.question({
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
					["<div>*Kg</div>"],
				],
				buttons: [
					[
						"<button><b>Tambahkan</b></button>",
						function (instance, toast) {
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
										product_id: product_id,
										qty: parseFloat(inputForm),
									})
									.then((response) => {
										instance.hide({ transitionOut: "fadeOut" }, toast);
										iziToast.success({
											title: "Oke.",
											message: "Berhasil ditambahkan ke keranjang.",
											position: "topCenter",
											timeout: 4500,
											// ballon:true,
											transitionInMobile: "fadeInLeft",
											transitionOutMobile: "fadeOutLeft",
											displayMode: 2,
										});
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
					// console.log(parseFloat(closedBy));
				},
			});
		},
		deleteCart() {
			let inputForm = null;
		},
		deleteFav(id) {
			this.$store
				.dispatch("favourites/removeFavourite", id)
				.then((response) => {
					if (response.status === 200) {
						this.favourites = _.remove(this.favourites, function (obj) {
							return obj.id !== id;
						});
					} else {
						this.favourites = _.remove(this.favourites, function (obj) {
							return obj.id !== id;
						});
					}
				})
				.catch((e) => {
					iziToast.error({
						title: "Oops ada yang error :( ",
						message: "Ga bisa hapus ini dari favorit, coba lagi nanti.",
						position: "topCenter",
						timeout: 4500,
						// ballon:true,
						transitionInMobile: "fadeInLeft",
						transitionOutMobile: "fadeOutLeft",
						displayMode: 2,
					});
				});
		},
		clickItem() {},
	},
};
</script>

<style>
.input-error-toast {
	background: rgb(199 12 12 / 14%) !important;
	box-shadow: 0 0 0 1px rgb(235 17 17) !important;
}
.input-success-toast {
	background: rgb(90 233 54 / 17%) !important;
	box-shadow: 0 0 0 1px rgb(51 191 42 / 80%) !important;
}
</style>