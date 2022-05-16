<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Pembayaran'" :isUseBack="true" :routeTarget="'home'"></mlj-toolbar>
			<my-scroll
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 100 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 100 + 'px'"
					:max-height="windowsHeight - 100 + 'px'"
					max-width="99.8vw"
				>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn @click="routeBack" block color="primary" :disabled="btnDisabled"
				>OK</v-btn
			>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
		};
	},
};
</script>

<style>
</style>