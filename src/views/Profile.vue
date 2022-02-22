<template>
	<div>
		<v-list two-line class="pt-0">
			<v-list-item class="primary">
				<v-list-item-avatar size="70">
					<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>Ahmad Muhammad</v-list-item-title>
					<v-list-item-subtitle>Pengguna Aktif</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon>
						<v-icon>mdi-pencil-outline</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
			<v-divider></v-divider>
		</v-list>

		<v-list two-line>
			<div v-for="(menu, i) in menus" :key="i">
				<v-list-item link>
					<v-list-item-content>
						<v-list-item-title>{{ menu.title }}</v-list-item-title>
						<v-list-item-subtitle>{{ menu.subtitle }}</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>

						<v-btn icon :ripple="false" >
							<v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-divider class="mx-4"></v-divider>
			</div>
		</v-list>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menus: [
				{
					title: "Menunggu pembayaran",
					subtitle: "Semua transaksi yang belum dibayar",
				},
				{
					title: "Ulasan",
					subtitle: "Berikan ulasan dan penilaian produk",
				},
				{
					title: "Komplain sebagai pembeli",
					subtitle: "Lihat status komplain",
				},
				{
					title: "Sedekah uang",
					subtitle: "Bantu ringankan beban saudara kita",
				},
				{
					title: "Sedekah sayur",
					subtitle: "Bantu ringankan beban saudara kita",
				},
			],
		};
	},
};
</script>

<style>
</style>