<template>
	<div>
		<v-app-bar elevation="0" class="pr-2" color="primary" dense>
			<v-btn icon @click="navigation_back">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-app-bar-title>
				<div class="noselect">{{ page }}</div>
			</v-app-bar-title>
		</v-app-bar>
		<v-progress-linear
			:active="loading"
			:indeterminate="loading"
			bottom
			color="success"
		></v-progress-linear>
	</div>
</template>

<script>
export default {
	props: {
		loading: Boolean,
		page: String,
		isUseBack: {
			type: Boolean,
			default: false,
		},
		routeTarget: {
			type: String,
			default: "home",
		},
	},
	methods: {
		navigation_back() {
			if (this.isUseBack) {
				this.$router.push({ name: this.routeTarget });
			} else {
				this.$router.back();
			}
		},
	},
};
</script>

<style>
</style>