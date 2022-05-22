<template>
	<div style="height: 100%; background-color: #f5f5f5">
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
import { mapGetters } from "vuex";

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
				{
					id: 3,
					icon: "mdi-bell-outline",
					title: "Notifikasi",
					path: { name: "notification" },
					badge: null,
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
	mounted() {
		if (this.isLogedIn) {
			this.options[2].badge = 2;
		}
	},
	// beforeRouteLeave(to, from, next) {
	// 	if (to.name === "login" || to.name === "register") {
	// 		if (!this.isLogedIn) {
	// 			next();
	// 		}
	// 	} else {
	// 		next();
	// 	}
	// 	// // if
	// 	// if (this.isLogedIn && to.name !== "login") {
	// 	// 	next();
	// 	// } else if (!this.isLogedIn && to.name === "login"){
	// 	// 	next();
	// 	// } else {
	// 	// 	next()
	// 	// }
	// },
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
					case "notification":
						return 3;
						break;
					default:
						return 4;
						break;
				}
			},
			set: function () {},
		},
		...mapGetters({
			isLogedIn: "auth/getUserStatus",
		}),
	},
};
</script>

<style>
</style>