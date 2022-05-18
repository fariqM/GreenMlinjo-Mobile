<template>
	<div>
		<expandable-text-line class="text" :use-click="useClick">
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eos a atque
				tempora inventore magnam, laboriosam reiciendis adipisci quisquam ut
				ipsum, quidem minus facilis quae? Perferendis odit nihil quaerat
				molestiae.
			</div>
		</expandable-text-line>
	</div>
</template>

<script>
import ExpandableTextLine from "vue-expandable-text-line";
export default {
	name: "demo",
	components: { ExpandableTextLine },
	data: () => ({
		useClick: false,
	}),
	computed: {
		buttonTitle() {
			return `Expand on ${this.useClick ? "Hover" : "Click"}`;
		},
		message() {
			return `${this.useClick ? "Click" : "Mouse hover"} to expand!`;
		},
	},
};
</script>

<style lang='scss' scoped>
</style>