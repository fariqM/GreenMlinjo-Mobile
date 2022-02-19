<template>
	<v-app>
		<div style="max-width: 30.5rem; width: 100vw; height: 100vh">
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
	font-size: 0.7rem;
}
.product-title-text {
	color: rgba(0, 0, 0, 0.87);
	font-size: 0.8rem;
	font-weight: 500;
}
.product-subtitle-text {
	color: #6c6c6c;
	font-size: 0.7rem;
}
.product-price-text {
	color: rgb(9, 137, 60);
	font-size: 0.9rem;
	font-weight: 500;
}
.empty-outer {
	display: table;
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
}
.empty-middle {
	display: table-cell;
	vertical-align: middle;
}
.empty-inner {
	margin-left: auto;
	margin-right: auto;
	width: 400px;
	/* Whatever width you want */
}
.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.bottom-container {
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
