<template>
	<div class="d-flex justify-space-around py-1 px-1">
		<skeleton height="4.4rem" width="50%" v-if="skeleton" :radius="3" />

		<v-card class="d-flex align-center pa-3" elevation="2" v-else>
			<v-avatar tile>
				<img :src="'/assets/icon/wallet.png'" :alt="'qr-code'" />
			</v-avatar>
			<div class="ml-1">
				<h4 class="normal-text text-center">Saldo saya</h4>
				<h2 class="normal-text text-center" style="font-size: 1.2rem; color:#fb8a3c">
					Rp 40.000
				</h2>
			</div>
		</v-card>

		<skeleton height="4.4rem" width="40%" v-if="skeleton" :radius="3" />
		<v-card
			class="d-flex justify-center align-center pa-3"
			elevation="2"
			v-else
		>
			<!-- <v-btn class="pa-6" icon tile>
				<v-avatar height="55" width="55" tile>
					<img :src="'/assets/icon/qr-code.png'" :alt="'qr-code'" />
				</v-avatar>
			</v-btn>
			<v-divider class="mx-1" vertical inset></v-divider> -->

			<v-avatar tile>
				<img :src="'/assets/icon/coupons.png'" :alt="'qr-code'" />
			</v-avatar>
			<div class="ml-1">
				<div class="d-flex justify-center align-center">
					<v-chip color="warning" small class="mb-2">
						<b>PROMO</b>
					</v-chip>
					<!-- <div style="color: #6c6c6c; font-size: 0.7em; font-weight: 900">
						Voucher Saya
					</div> -->
				</div>
				<div class="text-center normal-text">4 Voucher baru</div>
			</div>
		</v-card>
	</div>
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