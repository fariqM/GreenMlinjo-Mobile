<template>
	<div
		v-if="!skeleton"
		class="d-flex align-center px-4 py-1 my-2 elevation-2"
		style="border-style: outset; border-width: 2px"
	>
		<v-icon small class="mr-2 pa-0">mdi-map-marker-outline</v-icon>
		<div class="normal-text" style="font-weight: 500">
			{{market_name}}
		</div>
		<v-spacer></v-spacer>
		<v-btn icon x-small><v-icon>mdi-chevron-down</v-icon></v-btn>
	</div>
	<v-subheader
		style="border-style: outset; border-width: 4px"
		class="mb-2"
		v-else
	>
		<skeleton width="100%" height="24px" :radius="3"></skeleton>
	</v-subheader>
</template>

<script>
export default {
	props: {
		skeleton: Boolean,
		market_name: String,
	},
};
</script>

<style>
</style>