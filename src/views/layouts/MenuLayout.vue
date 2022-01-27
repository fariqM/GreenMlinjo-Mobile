<template>
	<div>
		<v-main>
            <router-view/>
        </v-main>

		<v-bottom-navigation v-model="value" absolute color="primary" app width="100%">

			<v-btn value="recent">
				<span>Utama</span>
				<v-icon>mdi-home-outline</v-icon>
			</v-btn>

			<v-btn value="favorites">
				<span>Pesnanan</span>
				<v-icon>mdi-script-text-outline</v-icon>
			</v-btn>
			<v-btn value="Tes">
				<span>Notifikasi</span>
				<v-icon>mdi-bell-outline</v-icon>
			</v-btn>

			<v-btn value="nearby">
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
			value: "recent",
		};
	},
};
</script>

<style>
</style>