<template>
	<div v-if="skeleton">
		<skeleton width="100%" height="240px" animation="wave"> </skeleton>

		<div class="d-flex justify-space-between align-center pl-2 pr-2 pt-1 pb-1" v-if="showBar">
			<skeleton width="40px" height="16px" animation="wave" :radius="8">
			</skeleton>
			<skeleton width="140px" height="16px" animation="wave" :radius="3">
			</skeleton>
		</div>
	</div>
	<div v-else>
		<v-carousel
			v-if="showBar"
			cycle
			v-model="corrousel"
			hide-delimiters
			:show-arrows="false"
			height="100%"
		>
			<v-carousel-item v-for="(item, i) in images" :key="i" class="info">
				<v-img
					contain
					:src="item"
					gradient="to top right, rgb(72 255 82 / 7%), rgb(160 255 40 / 8%)"
				>
				</v-img>
			</v-carousel-item>
		</v-carousel>

		<v-img v-if="!showBar" :src="image" contain></v-img>

		<div v-if="showBar" class="d-flex justify-space-between align-center px-2">
			<div>
				<span
					v-for="(item, i) in 3"
					:key="i"
					class="costum_corrousel_controls"
					:class="[i === corrousel ? 'ccc_active' : '']"
				/>
			</div>
			<router-link
				:to="{ name: 'login' }"
				style="text-decoration: none; font-size: 0.9rem; font-weight: 500"
				>lihat semua promo</router-link
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		skeleton: Boolean,
		showBar: Boolean,
	},
	data() {
		return {
			corrousel: 0,
			image: "/assets/images/carousel3.jpeg",
			images: [
				"/assets/images/carousel.jpeg",
				"/assets/images/carousel3.jpeg",
				"/assets/images/carousel4.jpeg",
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