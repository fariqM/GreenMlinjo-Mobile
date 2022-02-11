<template>
	<v-list-item link style="padding: 0px" class="mb-2 mr-2" v-if="!skeleton">
		<v-card
			class="d-flex align-center justify-center pa-2"
			outlined
			elevation="2"
		>
			<div class="d-flex justify-center">
				<v-avatar tile>
					<img :src="src" :alt="alt" />
				</v-avatar>
			</div>
			<div
				class="text-center ml-2 noselect normal-text"
				style="white-space: normal; max-width: 70px"
			>
				{{ title }}
			</div>
		</v-card>
	</v-list-item>

	<v-list-item link style="padding: 0px" class="mb-2 mr-2" v-else>
		<skeleton width="7.5rem" height="4.1rem" :radius="3" />
	</v-list-item>
</template>

<script>
export default {
	props: {
		src: String,
		alt: String,
		title: String,
		skeleton: Boolean,
	},
	data() {
		return {};
	},
};
</script>

<style>
.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>