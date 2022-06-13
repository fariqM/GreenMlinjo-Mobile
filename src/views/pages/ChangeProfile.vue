<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Ubah Profil'"></mlj-toolbar>
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
					<v-card class="mx-auto" max-width="434" tile>
						<v-img
							height="100%"
							src="https://picsum.photos/350/165?random"
							class="d-flex align-end"
						>
							<div
								@click="changePhoto"
								style="width: fit-content"
								class="mb-2 ml-2"
							>
								<v-badge avatar overlap icon="mdi-pencil">
									<v-avatar color="grey" size="50">
										<v-img
											:src="require('../../assets/user.jpg')"
										></v-img>
									</v-avatar>
								</v-badge>
							</div>
							<div
								class="noselect"
								style="
									position: absolute;
									height: fit-content;
									width: 100%;
									bottom: 0px;
									display: grid;
									grid-template-columns: auto;
									justify-content: center;
								"
							>
								<span
									v-ripple
									style="
										background: #f2f2f2b0;
										padding: 2px 14px;
										border-radius: 20px 20px 0px 0px;
										border-top: 2px solid #3f5721;
										line-height: 1.2rem;
										font-size: 0.8rem;
										font-weight: 400;
										color: #000;
									"
								>
									Tekan untuk ubah
								</span>
							</div>
						</v-img>
					</v-card>

					<v-row no-gutters class="pa-2 mt-2">
						<v-col cols="12" md="12" sm="12" class="mb-4">
							<v-text-field
								hide-details="auto"
								outlined
								label="Nama"
								v-model="user.name"
								placeholder="Masukkan nama (panggilan/lengkap)"
							></v-text-field>
						</v-col>
                        <v-col cols="12" md="12" sm="12" class="mb-4">
							<v-text-field
								hide-details="auto"
								outlined
								label="Email"
								v-model="user.email"
								placeholder="Masukkan nama (panggilan/lengkap)"
							></v-text-field>
						</v-col>
                        <v-col cols="12" md="12" sm="12" class="mb-4">
							<v-text-field
								hide-details="auto"
								outlined
								label="Handphone"
								v-model="user.phone"
								placeholder="Masukkan nama (panggilan/lengkap)"
							></v-text-field>
						</v-col>
                        <!-- <v-col cols="12" md="12" sm="12">
							<v-text-field
								hide-details="auto"
								outlined
								label="Handphone"
								v-model="user.phone"
								placeholder="Masukkan nama (panggilan/lengkap)"
							></v-text-field>
						</v-col> -->
					</v-row>
				</v-sheet>
			</my-scroll>
		</v-main>
        <div class="pa-2 bottom-container-profile">
			<v-btn  block color="primary" @click="$router.back()"
				>Simpan</v-btn
			>
		</div>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import { mapGetters } from "vuex";

export default {
	components: {
		MyScroll,
	},
	computed: {
		...mapGetters({
			user: "auth/getUser",
		}),
	},
	data() {
		return {
			loading: false,
			btnLoading: false,
			url: __BASE_URL__,
			menus: [
				{
					text: "Profil Saya",
					route: "",
				},
				{
					text: "Alamat Saya",
					route: "",
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
	methods: {
		changePhoto() {
			console.log("change profile photo");
		},
	},
};
</script>

<style>
</style>