<template>
	<v-subheader
		style="border-style: outset; border-width: 4px"
		class="mb-2"
		v-if="!skeleton"
	>
		<v-icon>mdi-map-marker-outline</v-icon>
		Lihat area jangkauan pengiriman
		<v-spacer></v-spacer>
		<v-btn icon><v-icon>mdi-chevron-down</v-icon></v-btn>
	</v-subheader>
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
	},
};
</script>

<style>
</style>