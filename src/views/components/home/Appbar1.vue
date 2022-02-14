<template>
	<div>
		<v-app-bar
			elevate-on-scroll
			absolute
			class="pt-0 pb-6"
			dark
			scroll-target="#scrolling-techniques-3"
		>
			<template v-slot:img="{ props }">
				<v-img
					v-bind="props"
					gradient="to top right, rgb(142 229 132 / 62%), rgb(169 255 168 / 98%)"
				></v-img>
			</template>
			<v-text-field
				:label="skeleton ? 'Tunggu Sebentar...' : 'Cari sayur kol'"
				hide-details
				dark
				prepend-icon="mdi-magnify"
				single-line
			></v-text-field>
			<div>
				<skeleton
					style="margin-left: 0.32rem"
					type="circle"
					width="35px"
					height="35px"
					animation="wave"
					v-if="skeleton"
				/>

				<v-btn icon large v-else class="">
					<v-badge
						:content="CountFavourites"
						:value="CountFavourites"
						color="error"
						overlap
					>
						<v-icon>mdi-cards-heart-outline</v-icon>
					</v-badge>
				</v-btn>
			</div>
			<div>
				<skeleton
					type="circle"
					width="35px"
					height="35px"
					animation="wave"
					v-if="skeleton"
					class="mr-2"
					style="margin-left: 5px"
				/>

				<v-btn icon large class="" v-else>
					<v-badge
						class="mr-1"
						:content="total_fav"
						:value="total_fav"
						color="error"
						overlap
					>
						<v-icon>mdi-cart-outline</v-icon>
					</v-badge>
				</v-btn>
			</div>
			<v-progress-linear
				:active="loading"
				:indeterminate="loading"
				absolute
				bottom
				color="success"
			></v-progress-linear>
		</v-app-bar>
		<slot></slot>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		loading: Boolean,
	},
	computed: {
		...mapGetters({
			CountFavourites: "favourites/getCountFavourites",
			getAllFavourites: "favourites/getAllFavourites",
		}),
	},
	mounted() {
		this.$store
			.dispatch("favourites/setFavourites")
			.then((result) => {
				this.skeleton = false;
			})
			.catch((e) => {
				this.skeleton = false;
				// console.log(e);
			});
	},
	watch: {
		// getAllFavourites: function (newValue, oldValue) {
		// 	console.log(newValue);
		// },
	},
	data() {
		return {
			skeleton: true,
			total_fav: 7,
			corrousel: 2,
		};
	},
};
</script>

<style>
</style>