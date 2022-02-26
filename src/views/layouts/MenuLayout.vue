<template>
	<div>
		<v-main>
			<router-view />
		</v-main>

		<bottom-nav
			:options="options"
			v-model="selected"
			:foregroundColor="'#87BD43'"
		></bottom-nav>
	</div>
</template>

<script>
// import VueBottomNavigation from "bottom-navigation-vue";
import BottomNav from "../components/BottomNavigation.vue";

export default {
	components: {
		BottomNav,
	},
	data() {
		return {
			value: "Home",
			// selected: 1,
			// selectedMenu: 3,
			options: [
				{
					id: 1,
					icon: "mdi-home-outline",
					title: "Utama",
					path: { name: "home" },
				},
				{
					id: 2,
					icon: "mdi-script-text-outline",
					title: "Pesanan Saya",
					path: { name: "pesanan" },
				},
				// {
				// 	id: 3,
				// 	icon: "mdi-forum-outline",
				// 	title: "Lainnya",
				// 	badge: 15,
				// 	path: { name: "chat" },
				// },
				{
					id: 3,
					icon: "mdi-bell-outline",
					title: "Notifikasi",
					path: { name: "notification" },
					badge: 2,
				},
				{
					id: 4,
					icon: "mdi-account-circle-outline",
					title: "Akun",
					path: { name: "profile" },
				},
			],
		};
	},
	watch: {
		// selected: function (newVal, oldVal) {
		// 	// console.log(newVal);
		// },
	},
	computed: {
		selected: {
			get: function () {

				let currentRouteName = this.$router.history.current.name;
				switch (currentRouteName) {
					case "home":
						return 1;
						break;
					case "pesanan":
						return 2;
						break;
					case "chat":
						return 3;
						break;
					case "notification":
						return 4;
						break;
					default:
						return 5;
						break;
				}
			},
			set: function () {},
		},
	},
};
</script>

<style>
</style>