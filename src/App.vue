<template>

	<v-app>
		<div style="max-width: 30.5rem; width: 100vw; height:100vh">
			<router-view />
		</div>
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
.v-application--wrap {
	align-items: center;
}
.normal-text {
	color: #6c6c6c;
	font-size: 0.9rem;
}
</style>
