<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar
				:loading="loading"
				:page="'Pembayaran'"
				:isUseBack="true"
				:routeTarget="'home'"
			></mlj-toolbar>
			<my-scroll
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 100 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 100 + 'px'"
					:max-height="windowsHeight - 100 + 'px'"
					max-width="99.8vw"
				>
					<v-list>
						<v-list-item>
							<v-list-item-avatar tile class="pa-0">
								<v-img src="/assets/images/alfamaret.png" contain></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>Alfamart / Alfamidi</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-divider inset />
						<v-list-item>
							<v-list-item-avatar tile class="pa-0" />
							<v-list-item-content>
								<v-list-item-title>No. Handphone</v-list-item-title>
								<v-list-item-subtitle>082745556772</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>

					<v-list class="mt-2">
						<v-list-item>
							<v-list-item-title>Instruksi Pembayaran</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<ul class="numbered-list">
								<li>AngularJS</li>
								<li>Yii</li>
								<li>Symfony</li>
								<li>Ruby on Rails</li>
								<li>Laravel</li>
							</ul>
							<!-- <ul style="list-style-type: number">
								<li v-for="n in 4" :key="n">tes</li>
							</ul> -->
						</v-list-item>
					</v-list>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn @click="routeBack" block color="primary">OK</v-btn>
		</div>
	</div>
</template>

<script>
import MyScroll from "vuescroll";

export default {
	components: {
		MyScroll,
	},
	data() {
		return {
			loading: false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			ops: {
				vuescroll: {
					mode: "native",
					sizeStrategy: "percent",
					detectResize: true,
					/** Enable locking to the main axis if user moves only slightly on one of them at start */
					locking: true,
				},
				scrollPanel: {
					initialScrollY: false,
					initialScrollX: false,
					scrollingX: true,
					scrollingY: true,
					speed: 300,
					easing: "easeInCubic",
					verticalNativeBarPos: "right",
					maxHeight: "100%",
					// maxHeight: "300",
				},
				rail: {
					background: "#87BD43",
					opacity: 0,
					size: "3px",
					specifyBorderRadius: false,
					gutterOfEnds: null,
					gutterOfSide: "2px",
					keepShow: false,
				},
				bar: {
					showDelay: 500,
					onlyShowBarOnScroll: false,
					keepShow: false,
					background: "#87BD43",
					opacity: 1,
					hoverStyle: true,
					specifyBorderRadius: false,
					minSize: 0,
					size: "5px",
					disable: false,
				},
				scrollButton: {
					enable: false,
					background: "#87BD43",
					opacity: 1,
					step: 180,
					mousedownStep: 30,
				},
			},
		};
	},
	methods: {
		routeBack() {
			this.$router.back();
		},
	},
};
</script>

<style lang="scss">
ul.numbered-list {
	counter-reset: li;
	list-style-type: none;
	font-size: 14px;
	line-height: 18px;
	padding-left: 10px;

	li {
		position: relative;
		padding: 5px 0 5px 30px;

		&:before {
			content: counter(li);
			counter-increment: li;
			height: 20px;
			width: 20px;
			border: 1px solid blue;
			border-radius: 50%;
			color: red;
			text-align: center;
			position: absolute;
			left: 0;
			top: 4px;
		}
	}
}
</style>