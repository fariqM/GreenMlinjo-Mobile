<template>
	<v-main>
		<!-- <v-btn fab>asdasdasd</v-btn> -->
		<v-carousel
			cycle
			v-model="model"
			hide-delimiter-background
			height="85vh"
			hide-delimiters
			:show-arrows="false"
			delimiter-icon="mdi-minus"
		>
			<v-carousel-item v-for="(item, i) in images" :key="i">
				<v-sheet height="100%">
					<v-row class="fill-height" align="center" justify="center">
						<v-img
							max-height="270"
							height="200"
							max-width="250"
							:src="item"
							contain
						></v-img>
						<!-- '../../assets/images/cart.png' -->
					</v-row>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>
		<div class="mb-4 d-flex justify-center">
			<v-btn color="primary" :to="{ name: 'login' }">gabung sekarang</v-btn>
		</div>
		<v-row style="margin: 0px; display: block" no-gutters justify="center">
			<div class="d-flex justify-space-around">
				<div class="" style="max-width: 140px; min-width: 140px">
					<v-btn text color="secondary" @click="lewati"><b>Lewati</b></v-btn>
				</div>

				<div class="d-flex align-center">
					<span
						v-for="(item, i) in images"
						:key="i"
						class="costum_corrousel_controls"
						:class="[i === model ? 'ccc_active' : '']"
					/>
				</div>
				<div class="" style="max-width: 140px; min-width: 140px">
					<v-btn color="primary pr-2" text @click="model++">Selanjutnya</v-btn>
				</div>
			</div>
		</v-row>
	</v-main>
</template>

<script>
export default {
	data() {
		return {
			model: 0,
			tes: "../../assets/images/box.png",
			images: [
				"assets/images/box.png",
				"assets/images/small_box.png",
				"assets/images/cart.png",
			],
		};
	},
	methods: {
		lewati() {
			this.$router.push({name:'home'})
		},
	},
};
</script>

<style lang="scss">
.v-carousel__controls__item {
	margin: 0px;
}
</style>

<style scoped>
.costum_corrousel_controls {
	margin: 0px 5px;
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