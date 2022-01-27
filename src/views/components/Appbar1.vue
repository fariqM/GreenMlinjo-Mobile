<template>
	<div>
		<v-app-bar
			absolute
			color="transparent pr-5 pt-3"
			dark
			elevation="0"
			scroll-target="#scrolling-techniques-3"
		>
			<v-text-field
				label="Cari sayur kol"
				hide-details
				dark
				prepend-icon="mdi-magnify"
				single-line
			></v-text-field>
			<v-btn icon large>
				<v-badge
					:content="total_cart"
					:value="total_cart"
					color="error"
					overlap
				>
					<v-icon>mdi-cards-heart-outline</v-icon>
				</v-badge>
			</v-btn>
			<v-btn icon large>
				<v-badge :content="total_fav" :value="total_fav" color="error" overlap>
					<v-icon>mdi-cart-outline</v-icon>
				</v-badge>
			</v-btn>
		</v-app-bar>
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		return {
			total_cart: 5,
			total_fav: 10,
			corrousel: 2,
		};
	},
};
</script>

<style>
</style>