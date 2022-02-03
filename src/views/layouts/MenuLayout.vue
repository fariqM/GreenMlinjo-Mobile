<template>
	<div>
		
		<v-main>
            <router-view/>
        </v-main>

		<v-bottom-navigation v-model="value" absolute color="primary" app width="100%">

			<v-btn value="Home">
				<span>Utama</span>
				<v-icon>mdi-home-outline</v-icon>
			</v-btn>

			<v-btn value="Pesanan">
				<span>Pesananan</span>
				<v-icon>mdi-script-text-outline</v-icon>
			</v-btn>
			<v-btn value="Notifikasi">
				<span>Notifikasi</span>
				<v-icon>mdi-bell-outline</v-icon>
			</v-btn>

			<v-btn value="Akun">
				<span>Akun</span>
				<v-icon>mdi-account-circle-outline</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: "Home",
		};
	},
};
</script>

<style>
</style>