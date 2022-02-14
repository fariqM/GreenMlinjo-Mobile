<template>
	<object id="animated-svg" type="image/svg+xml" data="heart.svg"></object>
</template>

<script>
export default {
	mounted() {
		setTimeout(() => {
			let a = document.getElementById("animated-svg");
			let b = a.contentDocument;
			let c = b.getElementById("heart")
			c.dispatchEvent(new Event('click'));
		}, 3000);
	},
};
</script>

<style>
</style>