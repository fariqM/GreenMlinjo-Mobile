<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Pengaturan Akun'"></mlj-toolbar>
			<my-scroll
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 48 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 48 + 'px'"
					:max-height="windowsHeight - 48 + 'px'"
					max-width="99.8vw"
				>
					<!-- <v-subheader></v-subheader> -->
					<v-list class="px-1">
						<template v-for="(menu, i) in menus">
								<v-list-item class="pa-0 px-2" :key="i" :to="{name:menu.route}">
									<v-list-item-content>
										<v-list-item-title>{{ menu.text }}</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action style="margin: 0px 0">
										<v-btn icon>
											<v-icon>mdi-chevron-right</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
								<v-divider :key="i + 'divd'"></v-divider>
							</template>
					</v-list>
				</v-sheet>
			</my-scroll>
		</v-main>
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
			btnLoading: false,
			url: __BASE_URL__,
			menus: [
				{
					text: "Profil Saya",
					route: "profile.setting",
				},
				{
					text: "Alamat Saya",
					route: "address",
				},
			],
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
};
</script>

<style>
.bottom-container-profile {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: #fff;
}
</style>