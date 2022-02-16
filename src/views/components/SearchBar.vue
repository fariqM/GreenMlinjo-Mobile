<template>
	<div>
		<v-toolbar width="100%" elevation="0" class="pr-2" color="primary">
			<v-btn icon @click="navigation_back">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-text-field
				label="Cari sesuatu ..."
				hide-details
				dark
				prepend-icon="mdi-magnify"
				single-line
				v-model="searchInput"
			></v-text-field>
		</v-toolbar>
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
		data: Array,
		loading: Boolean,
	},
	data() {
		return {
			searchInput: "",
		};
	},
	methods: {
		navigation_back() {
			this.$router.back();
		},
	},
	watch: {
		searchInput: function (newVal, oldVal) {
			this.$emit("searchTyping", newVal)
		},
	},
};
</script>

<style>
</style>