<template>
	<div>
		
		<v-main>
            <router-view/>
        </v-main>
		<v-bottom-navigation v-model="value"  color="primary"  width="100%" max-width="30.5rem">

			<v-btn value="Home" :to="{name:'home'}">
				<span>Utama</span>
				<v-icon>mdi-home-outline</v-icon>
			</v-btn>

			<v-btn value="Pesanan" :to="{name:'pesanan'}">
				<span>Pesananan</span>
				<v-icon>mdi-script-text-outline</v-icon>
			</v-btn>
			<v-btn value="Notifikasi" :to="{name:'notification'}">
				<span>Notifikasi</span>
				<v-icon>mdi-bell-outline</v-icon>
			</v-btn>

			<v-btn value="Akun" :to="{name:'profile'}">
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