<template>
	<div>
		<v-app-bar
			elevate-on-scroll
			absolute
			class="pr-5 pt-0 pb-6"
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
				:label="skeleton?'Tunggu Sebentar...':'Cari sayur kol'"
				hide-details
				dark
				prepend-icon="mdi-magnify"
				single-line
			></v-text-field>

			<skeleton
				type="circle"
				width="40px"
				height="40px"
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

			<skeleton
				type="circle"
				width="40px"
				height="40px"
				animation="wave"
				v-if="skeleton"
				style="margin-right:-9px; margin-left:5px"
			/>
			<v-btn icon large class="" v-else>
				<v-badge :content="total_fav" :value="total_fav" color="error" overlap>
					<v-icon>mdi-cart-outline</v-icon>
				</v-badge>
			</v-btn>
		</v-app-bar>
		<slot></slot>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		skeleton: Boolean,
	},
	computed: {
		...mapGetters({ CountFavourites: "favourites/getCountFavourites" }),
	},
	mounted() {},
	data() {
		return {
			total_fav: 10,
			corrousel: 2,
		};
	},
};
</script>

<style>
</style>