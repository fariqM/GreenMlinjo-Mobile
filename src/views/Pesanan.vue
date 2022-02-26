<template>
	<div>
		<v-tabs grow>
			<v-tab style="font-size: 0.8rem">Sekarang</v-tab>
			<v-tab style="font-size: 0.8rem">Selesai</v-tab>
		</v-tabs>

		<v-sheet>
			<v-row
				v-if="isEmpty"
				style="min-height: 100vh"
				class="pt-4"
				no-gutters
				justify="center"
			>
				<div class="text-center d-flex justify-center noselect mt-4">
					<div>
						<img
							src="/assets/images/Empty.png"
							alt=""
							style="max-height: 12rem; max-width: 15rem"
						/>
						<div style="font-size: 1.4rem; font-weight: 500; color: #67c93e">
							Kamu yakin udah pesen ?
						</div>
					</div>
				</div>
			</v-row>
		</v-sheet>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			windowsHeight: window.innerHeight,
			isEmpty: true,
		};
	},
};
</script>

<style>
</style>