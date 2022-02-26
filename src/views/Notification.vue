<template>
	<div>
		<!-- <mlj-toolbar :loading="loading" :page="'Notifikasi'"></mlj-toolbar> -->

		<v-tabs right align-with-title >
			<v-tab style="font-size: 0.8rem"> Promo </v-tab>
			<v-tab style="font-size: 0.8rem"> Belum dibaca </v-tab>
			<v-tab style="font-size: 0.8rem"> {{ windowsHeight }} </v-tab>
			<v-tab style="font-size: 0.8rem"> Admin </v-tab>
		</v-tabs>

		<v-sheet class="overflow-y-auto" :max-height="windowsHeight - 108 + 'px'">

			<v-list two-line class="py-0" style="background-color: #F5F5F5;">
				<v-list-item-group class="">
					<!-- <div v-for="(item, i) in items" :key="i">
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
					</div> -->
					<div v-for="(item, i) in 14" :key="i">
						<v-list-item
							:style="
								item.read ? { 'background-color': '#87bd4342 !important' } : {}
							"
						>
							<v-list-item-content class="pa-0">
								<v-list-item-title class="title-text"
									>Promosi</v-list-item-title
								>

								<v-list-item-subtitle
									class="text--primary"
									style="font-size: 0.8rem"
									>Promosi</v-list-item-subtitle
								>

								<v-list-item-subtitle style="font-size: 0.7rem">
									<b>Stok terbatas!!! </b>
									Minyak goreng 2 liter cuma Rp 25.000. Beli sekarang keburu
									habis !
								</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-action class="">
								<v-list-item-action-text>1 jam lalu</v-list-item-action-text>
							</v-list-item-action>
						</v-list-item>
						<v-divider v-if="i < 10 - 1"></v-divider>
					</div>
				</v-list-item-group>
			</v-list>
		</v-sheet>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			selected: [2],
			windowsHeight: window.innerHeight,
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
.v-tab--active {
	font-weight: 700 !important;
}
</style>