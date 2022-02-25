<template>
	<div>
		<mlj-toolbar :loading="loading" :page="'Notifikasi'"></mlj-toolbar>

		<v-tabs
			background-color="primary"
			height="1.6rem"
			right
			align-with-title
			:hide-slider="true"
		>
			<v-tab style="font-size: 0.7rem"> Promo </v-tab>
			<v-tab style="font-size: 0.7rem"> Belum dibaca </v-tab>
			<v-tab style="font-size: 0.7rem"> Voucher </v-tab>
			<v-tab style="font-size: 0.7rem"> Admin </v-tab>
		</v-tabs>
		<v-list two-line>
			<v-list-item-group class="">
				<div v-for="(item, i) in items" :key="i">
					<v-list-item
						:style="
							item.read ? { 'background-color': '#87bd4342 !important' } : {}
						"
					>
						<v-list-item-content class="pa-0">
							<v-list-item-title class="title-text">{{
								item.title
							}}</v-list-item-title>

							<v-list-item-subtitle
								class="text--primary"
								style="font-size: 0.8rem"
								v-text="item.headline"
							></v-list-item-subtitle>

							<v-list-item-subtitle
								v-html="item.subtitle"
								style="font-size: 0.7rem"
							></v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action class="">
							<v-list-item-action-text
								v-text="item.action"
							></v-list-item-action-text>
						</v-list-item-action>
					</v-list-item>
					<v-divider v-if="i < items.length - 1"></v-divider>
				</div>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			selected: [2],
			items: [
				{
					action: "15 menit lalu",
					headline: "Notifikasi Akun",
					subtitle: `Segera lengkapi data diri anda agar bisa berbelanja lebih leluasa`,
					title: "Admin",
					read: true,
				},
				{
					action: "1 jam lalu",
					headline: "Promosi",
					subtitle: `<b>Stok terbatas!!! </b>Minyak goreng 2 liter cuma Rp 25.000. Beli sekarang keburu habis !`,
					title: "Pasar Manyar",
					read: false,
				},
				{
					action: "2 jam lalu",
					headline: "Promosi",
					subtitle: `haii ahmad, ada promosi beli 2 gratis satu khusus hari ini lo...`,
					title: "Admin",
					read: true,
				},
				{
					action: "17 jam lalu",
					headline: "Diskon Jumat Berkah",
					subtitle: `haii ahmad, ada promosi beli 2 gratis satu khusus hari ini lo...`,
					title: "Pasar Blauran Baru",
					read: false,
				},
				{
					action: "2 hari lalu",
					headline: "Promosi",
					subtitle: `haii ahmad, ada promosi beli 2 gratis satu khusus hari ini lo...`,
					title: "Admin",
					read: false,
				},
			],
		};
	},
};
</script>

<style>
.v-slide-group__next {
	min-width: 0px !important;
	flex: 0 !important;
}
</style>