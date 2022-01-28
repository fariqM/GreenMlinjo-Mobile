<template>
	<v-carousel
		cycle
		v-model="corrousel"
		hide-delimiters
		:show-arrows="false"
		height="100%"
	>
		<v-carousel-item v-for="(item, i) in images" :key="i" class="info">
			<v-img
				height="250"
				:src="image"
				gradient="to top right, #ffffff38, #496c1d"
			>
			</v-img>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
export default {
	data() {
		return {
            corrousel:0,
            image:'/assets/images/sayur.jpg',
			images: [
				"assets/images/box.png",
				"assets/images/small_box.png",
				"assets/images/cart.png",
			],
		};
	},
};
</script>

<style>
</style>