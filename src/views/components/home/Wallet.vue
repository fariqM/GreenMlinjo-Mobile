<template>
	<div class="d-flex justify-space-between py-1 px-6">
		<v-card class="d-flex align-center px-1 py-1 pr-2" elevation="2">
			<v-btn class="pa-6" icon tile>
				<v-avatar height="30" width="30" tile>
					<img :src="'/assets/icon/wallet.png'" :alt="'qr-code'" />
				</v-avatar>
			</v-btn>
			<v-subheader class="pa-0">
				<h4>Rp 40.000</h4>
			</v-subheader>
		</v-card>
		<v-card class="d-flex align-center px-1 py-1" elevation="2">
			<v-btn class="pa-6" icon tile>
				<v-avatar height="30" width="30" tile>
					<img :src="'/assets/icon/qr-code.png'" :alt="'qr-code'" />
				</v-avatar>
			</v-btn>
			<v-divider class="mx-1" vertical inset></v-divider>

			<v-btn class="pa-6" icon tile>
				<v-avatar height="30" width="30" tile>
					<img :src="'/assets/icon/coupons.png'" :alt="'qr-code'" />
				</v-avatar>
			</v-btn>
			<div class="align-start">
				<v-chip x-small color="error" class="mb-2">Promo</v-chip>
				<div style="color: #6c6c6c; font-size: 0.6rem">2 Kupon Baru</div>
			</div>
		</v-card>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>