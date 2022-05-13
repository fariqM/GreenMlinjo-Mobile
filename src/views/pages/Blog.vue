<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar
				:loading="loading"
				:page="'Sedekah Yuk'"
				:isUseBack="true"
				:routeTarget="'pesanan'"
			></mlj-toolbar>
			<my-container
				class=""
				ref="verticalScroll"
				:ops="ops"
				:style="{
					'max-height': windowsHeight - 48 + 'px',
					'background-color': '#f7f7f7',
				}"
			>
				<v-sheet
					color="#f7f7f7"
					:max-height="windowsHeight - 48 + 'px'"
					max-width="99.8vw"
				>
					<div class="pa-2">
						<v-text-field
							color="primary"
							background-color="rgb(135 189 67 / 38%)"
							hide-details="auto"
							placeholder="Ingin bersedekah kemana hari ini ?"
							:rounded="true"
							append-icon="mdi-magnify"
							outlined
						></v-text-field>
					</div>
					<v-card elevation="0">
						<v-card-title style="font-size: 1.1rem" class="pt-2 pb-2 px-2">
							<div
								class="d-flex align-center"
								style="border-bottom: 5px solid #87bd43; padding-bottom: 5px"
							>
								<v-icon class="mr-1" color="black"
									>mdi-map-marker-outline</v-icon
								>
								Kegiatan di sekitar saya
							</div>
						</v-card-title>
						<div class="px-2">
							<v-alert
								border="left"
								color="info"
								elevation="2"
								outlined
								type="info"
								dense
								prominent
								dismissible
								v-model="alert1"
								class="pb-1 pt-1 px-3 mb-0 normal-text"
								transition="scale-transition"
								style="
									line-height: 20px;
									color: #6c6c6c;
									font-size: 0.9rem;
									word-break: break-word;
								"
							>
								Anda dapat bersedekah untuk kegiatan disekitar anda.
							</v-alert>
						</div>
						<div class="pa-2">
							<my-container :ops="ops">
								<v-sheet class="b-sheet">
									<v-card
										width="fit-content"
										style="margin: 5px"
										v-for="(image, n) in images"
										:key="n"
										:style="{
											margin: '0px 10px',
											'margin-left': n === 1 ? '0px' : '',
										}"
									>
										<v-img
											height="100"
											width="150"
											contain
											:src="image"
										></v-img>
										<!-- max 35 char -->
										<v-card-title class="py-0 px-1 mt-2 title-text b-card-title"
											>Bagi-bagi takjil Warga Kampung Dukuh</v-card-title
										>
										<v-card-subtitle
											class="py-0 px-1 subtitle-text"
											style="margin-top: 1px"
										>
											Masjid An-Nur
										</v-card-subtitle>
										<v-card-actions class="py-1 px-1">
											<v-btn small color="primary" block outlined
												>Selengkapnya</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-sheet>
							</my-container>
						</div>
					</v-card>

					<div class="mt-2">
						<img
							:src="require('../../assets/sedekah.png')"
							style="width: 100%; height: 200px"
							alt=""
						/>
					</div>

					<v-card elevation="0" tile>
						<v-card-title style="font-size: 1.1rem" class="pt-2 pb-2 px-2">
							<div
								class="d-flex align-center"
								style="border-bottom: 5px solid #87bd43; padding-bottom: 5px"
							>
								<v-icon class="mr-1" color="black"
									>mdi-hand-heart-outline</v-icon
								>
								Berbagi Bersama Green Mlijo
							</div>
						</v-card-title>
						<div class="pa-2">
							<my-container :ops="ops">
								<v-sheet class="b-sheet">
									<v-card
										width="fit-content"
										style="margin: 5px"
										v-for="(image, n) in images"
										:key="n"
										:style="{
											margin: '0px 10px',
											'margin-left': n === 1 ? '0px' : '',
										}"
									>
										<v-img height="100" width="150" :src="image"></v-img>
										<!-- max 35 char -->
										<v-card-title class="py-0 px-1 mt-2 title-text b-card-title"
											>Bagi-bagi Takjil Warga Kampung Dukuh</v-card-title
										>
										<v-card-subtitle
											class="py-0 px-1 subtitle-text"
											style="margin-top: 1px"
										>
											Masjid An-Nur
										</v-card-subtitle>
										<v-card-actions class="py-1 px-1">
											<v-btn small color="primary" block outlined
												>Selengkapnya</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-sheet>
							</my-container>
						</div>
					</v-card>

					<div class="mt-2">
						<img
							:src="require('../../assets/infaq.jpeg')"
							style="width: 100%; height: 200px"
							alt=""
						/>
					</div>

					<v-card elevation="0" tile>
						<v-card-title style="font-size: 1.1rem" class="pt-2 pb-2 px-2">
							<div
								class="d-flex align-center"
								style="border-bottom: 5px solid #87bd43; padding-bottom: 5px"
							>
								<v-icon class="mr-1" color="black"
									>mdi-hand-heart-outline</v-icon
								>
								Infaq Untuk Masjid
							</div>
						</v-card-title>
						<div class="pa-2">
							<my-container :ops="ops">
								<div class="pb-2">
									<v-card class="pa-2 mb-2" v-for="n in 3" :key="n">
										<div class="d-flex">
											<div>
												<v-img
													height="100"
													width="150"
													contain
													:src="masjid[0]"
													style="background-color: #f3f3f3"
												/>
											</div>
											<div class="pl-2 d-flex flex-column">
												<div
													class="mb-auto title-text b-card-title"
													style="max-width: 100%"
												>
													Pembangunan Masjid Wonocolo
													<v-icon x-small color="success"
														>mdi-checkbox-marked-circle-outline</v-icon
													>
												</div>
												<div>
													<v-divider />
													<div class="subtitle-text">
														<b style="color: #000">Rp 15.000.000</b> Dibutuhkan
													</div>
													<v-divider />
													<!-- <v-divider/> -->
													<div class="subtitle-text">
														<b style="color: #000">Rp 6.560.000</b> Terkumpul
													</div>
													<v-divider />
												</div>
											</div>
										</div>
										<v-card-actions class="pa-0 pt-2">
											<v-btn block color="primary" outlined small
												>Yuk Infaq</v-btn
											>
										</v-card-actions>
									</v-card>
								</div>
							</my-container>
						</div>
					</v-card>
				</v-sheet>
			</my-container>
			<!-- F7F7F7 -->
		</v-main>
	</div>
</template>

<script>
import MyContainer from "vuescroll";
import { mapGetters } from "vuex";

export default {
	components: {
		MyContainer,
	},
	computed: {
		...mapGetters({
			isLogedIn: "auth/getUserStatus",
		}),
	},
	beforeMount(){
		if (!this.isLogedIn) {
			this.$router.replace({name:'login'})
		}
	},
	data() {
		return {
			loading: false,
			alert1: true,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			images: [
				"/assets/images/berbagi_takjil2.jpg",
				"/assets/images/berbagi_takjil.jpg",
				"/assets/images/berbagi_takjil2.jpg",
				"/assets/images/berbagi_takjil.jpg",
			],
			masjid: ["/assets/images/masjid.jpeg", "/assets/images/masjid.jpeg"],
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
.b-card-title {
	max-width: 150px;
	line-height: 20px;
	word-break: break-word;
}
.b-sheet {
	padding-bottom: 8.5px;
	display: flex;
	flex-direction: row;
}
</style>