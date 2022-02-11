<template>
	<div v-if="skeleton">
		<skeleton
			width="100%"
			height="250px"
			animation="wave"
		>
		</skeleton>

		<div class="d-flex justify-space-between align-center pl-2 pr-2 pt-1 pb-1">
			<skeleton width="40px" height="16px" animation="wave" :radius="8">
			</skeleton>
			<skeleton width="140px" height="16px" animation="wave" :radius="3">
			</skeleton>
		</div>
	</div>
	<div v-else>
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
		<div class="d-flex justify-space-between pl-2 pr-2 ">
			<div>
				<span
					v-for="(item, i) in 3"
					:key="i"
					class="costum_corrousel_controls"
					:class="[i === corrousel ? 'ccc_active' : '']"
				/>
			</div>
			<router-link :to="{ name: 'login' }" style="text-decoration: none"
				>lihat semua promo</router-link
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		skeleton: Boolean,
	},
	data() {
		return {
			corrousel: 0,
			image: "/assets/images/sayur.jpg",
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
.costum_corrousel_controls {
	margin: 0px 3px;
	height: 9px;
	width: 9px;
	background-color: #c5ff7cd9;
	border-radius: 50%;
	display: inline-block;
}
.ccc_active {
	background-color: #87bd43;
}
</style>