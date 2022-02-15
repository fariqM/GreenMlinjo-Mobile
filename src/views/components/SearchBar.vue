<template>

	<v-toolbar width="100%" elevation="0" class="pr-2">
		<template v-slot:img="{ props }">
			<v-img
				v-bind="props"
				gradient="to top right, rgb(142 229 132 / 62%), rgb(169 255 168 / 98%)"
			></v-img>
		</template>
		<v-btn icon >
			<v-icon>mdi-arrow-left</v-icon>
		</v-btn>
		<v-text-field
			label="Cari sesuatu ..."
			hide-details
			dark
			prepend-icon="mdi-magnify"
			single-line
		></v-text-field>
	</v-toolbar>
</template>

<script>
export default {
	props: {
		data: Array,
	},
};
</script>

<style>
</style>