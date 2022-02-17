<template>
	<v-main>
		<mlj-toolbar :loading="loading" :page="'Keranjang'"></mlj-toolbar>
		<v-card
			class="d-flex justify-space-between px-2 py-1 my-2 mx-1"
			elevation="2"
			outlined
		>
			<v-checkbox
				class="pt-0"
				hide-details
				dense
				v-model="checkAll"
				label="Pilih semua barang"
			></v-checkbox>

			<div class="d-flex align-center">
				<!-- Hapus -->
				<v-btn
					small
					text
					class="ma-0"
					color="primary"
					style="
						padding-top: 0px;
						margin-top: 2px !important;
						color: rgba(0, 0, 0, 0.6);
						font-size: 16px;
						letter-spacing: 0;
						text-transform: none;
						font-weight: normal;
					"
					>Hapus</v-btn
				>
			</div>
		</v-card>

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
					class="mb-2 pa-0"
					v-else
					cols="12"
					md="12"
					sm="12"
					v-for="(cart, i) in carts"
					:key="i"
				>
					<v-card>
						<div class="d-flex pa-0 pt-2">
							<v-checkbox
								dense
								class="pa-0 ma-0 "
								style="max-width: 25px;"
							></v-checkbox>
							<div>
								<v-avatar tile size="80">
									<v-img :src="url + cart.url"></v-img>
								</v-avatar>
							</div>
							<v-row no-gutters class="pa-0">
								<v-col>
									<div
										style="font-weight: 500; font-size: 16px; max-height: 18px"
										class="ml-2"
									>
										<span>{{ cart.title }}</span>
									</div>

									<div class="normal-text ml-2">
										{{ cart.min_qty_per_unit }}-{{ cart.max_qty_per_unit }}
										{{ cart.sub_unit }}/{{ cart.unit }}
									</div>

									<div class="d-flex justify-space-between align-end ml-2 mr-1">
										<div>
											<div
												style="
													max-width: 95px;
													white-space: nowrap;
													overflow: hidden;
													text-overflow: ellipsis;
												"
											>
												Rp {{ numberWithCommas(cart.min_price) }} - Rp
												{{ numberWithCommas(cart.max_price) }}
											</div>
										</div>
										<div
											:ref="'costum-input' + cart.id"
											class="
												v-input
												v-input--solo
												v-input--hide-details
												v-input--is-label-active
												v-input--is-dirty
												v-input--dense
												theme--light
												v-text-field
												v-text-field--outlined
												v-text-field--is-booted
												v-text-field--enclosed
											"
											style="
												max-width: 100px;
												width: 70px;
												padding: 0px !important;
												height: 32px;
											"
										>
											<div class="v-input__control">
												<div
													class="v-input__slot"
													style="padding: 0px 0px 0px 0px !important"
												>
													<div class="v-input__prepend-inner">
														<div
															class="v-input__icon v-input__icon--prepend-inner"
														>
															<i
																aria-hidden="true"
																class="
																	v-icon
																	notranslate
																	mdi mdi-minus
																	theme--light
																"
															></i>
														</div>
													</div>

													<!-- text input quantity-->
													<div class="v-text-field__slot">
														<input
															@focus="onFocusCustom(cart.id)"
															@blur="onBlurCostum(cart.id)"
															type="text"
															style="text-align: center"
															v-model="cart.qty"
														/>
													</div>

													<!-- icon plus -->
													<div class="v-input__append-inner">
														<div class="v-input__icon v-input__icon--append">
															<i
																aria-hidden="true"
																class="
																	v-icon
																	notranslate
																	mdi mdi-plus
																	theme--light
																"
															></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<v-divider class="ml-2 mt-2 mr-1" />
								</v-col>
							</v-row>
						</div>

            <div class="d-flex align-center py-2" style="margin-left:25px">
              <v-chip x-small v-for="(promo, i) in 4" :key="i" class="mr-1">Promo</v-chip>
            </div>
					</v-card>
				</v-col>
			</v-row>
		</v-sheet>
	</v-main>
</template>

<script>
export default {
	data() {
		return {
			url: __BASE_URL__,
			loading: false,
			checkAll: false,

			carts: [],
		};
	},

	mounted() {
		this.$store
			.dispatch("carts/getCartsProduct")
			.then((response) => {
				this.carts = response.data.data;
			})
			.catch((e) => {
				console.log(e);
			});
	},
	methods: {
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		qtyClicked(id) {
			this.$refs["costum-input" + id][0].classList.add("v-input--is-focused");
			this.$refs["costum-input" + id][0].classList.add("primary--text");
			console.log(this.$refs["costum-input" + id]);
		},
		onFocusCustom(id) {
			this.$refs["costum-input" + id][0].classList.add("v-input--is-focused");
			this.$refs["costum-input" + id][0].classList.add("primary--text");
		},
		onBlurCostum(id) {
			this.$refs["costum-input" + id][0].classList.remove(
				"v-input--is-focused"
			);
			this.$refs["costum-input" + id][0].classList.remove("primary--text");
		},
	},
};
</script>

<style>
.costum-wafe {
	background-color: aqua;
}
</style>