<template>
	<div>
		<v-app-bar
			elevate-on-scroll
			absolute
			class="pr-0 pt-0 pb-6"
			dark
			scroll-target="#scrolling-techniques-3"
		>
			<template v-slot:img="{ props }">
				<v-img
					v-bind="props"
					gradient="to top right, rgb(142 229 132 / 62%), rgb(169 255 168 / 98%)"
				></v-img>
			</template>

			<v-text-field
				class="pr-2"
				label="Loading..."
				hide-details
				readonly
				dark
				prepend-icon="mdi-magnify"
				single-line
			></v-text-field>
			<div class="d-flex" style="right: 0px">
				<skeleton
					class="mr-2"
					type="circle"
					width="45px"
					height="45px"
					animation="wave"
					:color="color"
					:wave-color="wave_color"
				>
				</skeleton>
				<skeleton
					class="mr-2"
					type="circle"
					width="45px"
					height="45px"
					animation="wave"
					:color="color"
					:wave-color="wave_color"
				>
				</skeleton>
			</div>
		</v-app-bar>
		<skeleton
			width="100%"
			height="250px"
			animation="wave"
			:color="color"
			:wave-color="wave_color"
		>
		</skeleton>

		<div class="d-flex justify-space-between align-center pl-2 pr-2 pt-1 pb-1">
			<skeleton
				width="40px"
				height="15px"
				animation="wave"
                :radius="8"
				:color="color"
				:wave-color="wave_color"
			>
			</skeleton>
            <skeleton
				width="140px"
				height="15px"
				animation="wave"
                :radius="8"
				:color="color"
				:wave-color="wave_color"
			>
			</skeleton>
		</div>
		
	</div>
</template>

<script>
export default {
	data() {
		return {
			color: "#414141",
			wave_color: "#585858",
		};
	},
};
</script>

<style>
</style>