<template>
	<v-col cols="6" sm="5" md="5" class="py-2" style="padding: 10px 5px 5px 5px">
		<skeleton  width="100%" height="12rem" :radius="3" v-if="skeleton"/>
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
						<v-img src="/assets/images/wortel.jpg" height="100px" width="100px">
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
							<v-btn
								@click="addFavourite(product_id)"
								class="pa-0 mt-1 mr-1"
								style="min-width: 35px; background-color: #ffffffa1"
							>
								<v-icon color="white"> mdi-cards-heart-outline </v-icon>
							</v-btn>
						</div>
					</div>
				</v-list>

				<v-list-item link class="pa-0 pb-1">
					<div style="width: 100%">
						<v-card-title style="font-size: 1rem; padding: 2px 5px">
							{{ title }}
						</v-card-title>
						<v-card-subtitle
							style="padding: 5px 5px; color: #8b8b8b; font-size: 0.7rem"
						>
							{{ min_qty_per_unit }}-{{ max_qty_per_unit }} {{ sub_unit }}/{{
								unit
							}}
						</v-card-subtitle>
						<div
							class="pl-1"
							style="
								font-weight: 500;
								font-size: 1.07rem;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							"
						>
							Rp {{ numberWithCommas(min_price) }} - Rp
							{{ numberWithCommas(max_price) }}
						</div>
						<div class="pl-1" style="font-weight: 500; font-size: 0.775rem">
							/{{ unit }}
						</div>
					</div>
				</v-list-item>

				<v-divider class="mb-1"></v-divider>

				<v-card-actions
					style="padding: 0px 0px"
					class="d-flex justify-center py-1"
				>
					<v-btn text x-small outlined color="primary" class="pa-4">
						<v-icon x-small color="primary" class="mr-2">mdi-plus</v-icon>
						Keranjang
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-lazy>
	</v-col>
</template>

<script>
export default {
	props: {
		testing_log: String,
		title: String,
		unit: String,
		sub_unit: String,
		min_qty_per_unit: Number,
		max_qty_per_unit: Number,
		min_price: Number,
		max_price: Number,
		product_id: Number,
		skeleton: Boolean,
	},
	mounted() {
		console.log(this.testing_log);
	},
	methods: {
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		addFavourite(product_id) {
			this.$store.dispatch("favourites/addFavourites", product_id);
		},
	},
};
</script>

<style>
</style>