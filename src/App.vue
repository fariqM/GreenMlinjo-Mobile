<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: "App",
	data: () => ({}),
	beforeCreate() {
		this.$store
			.dispatch("auth/getCreds")
			.then((response) => {
				if (response.status === 200) {
					console.log("set user success");
				} else {
					console.log("set user wrong response");
				}
				// console.log(response);
			})
			.catch((e) => {
				console.log("set user failed");
			});
	},
};
</script>

<style>
.normal-text {
	color: #6c6c6c;
	font-size: 0.9rem;
}
</style>
