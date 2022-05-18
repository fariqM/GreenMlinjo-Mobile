<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar
				:loading="loading"
				:page="'Sedekah Yuk'"
				:isUseBack="true"
				:routeTarget="routeTarget"
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

					<!-- kegiatan sekitar -->
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
										:to="{
											name: 'blog.details',
											params: { post_id: 1, type: 0 },
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

					<!-- sedekah -->
					<v-card elevation="0" tile v-if="!loadingSedekah">
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
								v-model="alert2"
								class="pb-1 pt-1 px-3 mb-0 normal-text"
								transition="scale-transition"
								style="
									line-height: 20px;
									color: #6c6c6c;
									font-size: 0.9rem;
									word-break: break-word;
								"
							>
								Pembelian anda akan langsung disalurkan ke orang kurang mampu
								disekitar anda.
							</v-alert>
						</div>
						<div class="pa-2">
							<my-container :ops="ops">
								<v-sheet class="b-sheet">
									<v-card
										width="fit-content"
										style="margin: 5px"
										v-for="(product, n) in sedekahProducts"
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
											:src="url + product.images[0].url"
										></v-img>
										<!-- max 35 char -->
										<v-card-title
											class="py-0 px-1 mt-2 title-text b-card-title"
											>{{ product.title }}</v-card-title
										>
										<v-card-subtitle
											class="py-0 px-1 subtitle-text"
											style="margin-top: 1px"
										>
											<v-chip
												class="px-1"
												color="primary"
												label
												outlined
												x-small
												style="max-width: fit-content"
											>
												Paket Sedekah</v-chip
											>
										</v-card-subtitle>
										<v-card-subtitle
											class="py-0 px-1 subtitle-text"
											style="margin-top: 1px"
										>
											{{ product.description.substring(0, 38) + "..." }}
										</v-card-subtitle>
										<v-card-actions class="py-1 px-1">
											<v-btn
												small
												color="primary"
												block
												outlined
												@click="productClick(product)"
												>Lihat</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-sheet>
							</my-container>
						</div>
					</v-card>

					<div class="text-center my-10" v-if="loadingSedekah">
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</div>

					<div class="mt-2">
						<img
							:src="require('../../assets/infaq.jpeg')"
							style="width: 100%; height: 200px"
							alt=""
						/>
					</div>

					<!-- Infaq -->
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
									<v-card
										class="pa-2 mb-2"
										v-for="(item, i) in infaq"
										:key="i"
										:to="{
											name: 'blog.details',
											params: { post_id: 1, type: 1, post: item },
										}"
									>
										<div class="d-flex">
											<div>
												<v-img
													height="100"
													width="130"
													contain
													:src="item.img"
													style="background-color: #f3f3f3"
												/>
											</div>
											<div class="pl-2 d-flex flex-column">
												<div
													class="mb-auto title-text b-card-title"
													style="max-width: 100%"
												>
													{{ item.title }}
													<v-icon x-small color="success"
														>mdi-checkbox-marked-circle-outline</v-icon
													>
												</div>
												<div
													v-if="item.type === 2 && collectedSedekah !== null"
												>
													<v-divider />
													<div class="subtitle-text">
														<b style="color: #000"
															>Rp {{ numberWithCommas(15000000) }}</b
														>
														Dibutuhkan
													</div>
													<v-divider />
													<!-- <v-divider/> -->
													<div class="subtitle-text">
														<b style="color: #000"
															>Rp {{ numberWithCommas(collectedSedekah) }}</b
														>
														Terkumpul
													</div>
													<v-divider />
												</div>
												<div v-else>
													<v-divider />
													<div class="subtitle-text">
														{{ item.subtitle }}
													</div>
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

			<v-dialog fullscreen v-model="productSedekahDialog" persistent>
				<v-toolbar
					color="primary"
					elevation="0"
					tile
					dense
					absolute
					width="100%"
				>
					<v-btn icon @click="productSedekahDialog = false">
						<v-icon>mdi-arrow-left</v-icon>
					</v-btn>
					<v-toolbar-title>Paket Sedekah</v-toolbar-title>
				</v-toolbar>

				<v-sheet
					v-if="productClicked !== null"
					class="overflow-y-auto"
					height="calc(100vh - 48px)"
				>
					<v-img
						contain
						style="margin-top: 48px"
						:src="url + productClicked.images[0].url"
					></v-img>
					<v-card-title class="px-2 py-0 mt-2" style="line-height: 25px">
						{{ productClicked.title }}
					</v-card-title>
					<div
						class="px-2"
						style="font-size: 1rem; color: rgb(9, 137, 60); font-weight: 500"
					>
						Harga : Rp {{ numberWithCommas(productClicked.price) }}
					</div>
					<v-card-subtitle class="px-2 py-0">
						<b>Deskripsi</b> :</v-card-subtitle
					>
					<v-card-text class="">
						<div
							class="pa-1"
							style="border: 4px outset #87bd43; border-radius: 4px"
						>
							{{ productClicked.description }}
						</div>
					</v-card-text>

					<v-card-actions
						class="mt-auto white"
						style="position: absolute; width: 100%; bottom: 0px"
					>
						<v-btn block color="primary" @click="addQtySedekah = true">
							Beli
						</v-btn>
					</v-card-actions>
				</v-sheet>
			</v-dialog>

			<v-dialog v-model="addQtySedekah" persistent>
				<v-card>
					<div
						style="
							display: grid;
							justify-content: end;
							margin-top: 3px;
							position: absolute;
							width: 99%;
						"
					>
						<v-icon small @click="addQtySedekah = false">mdi-close</v-icon>
					</div>
					<v-card-title class="text-h6">
						Ingin sedekah berapa paket?
					</v-card-title>
					<v-card-text class="py-0 mb-4 d-flex justify-center">
						<div
							class="
								v-input
								v-input--solo
								v-input--hide-details
								v-input--is-label-active
								v-input--is-dirty
								v-input--dense
								theme--light
								v-text-field
								v-text-field--outlined
								v-text-field--is-booted
								v-text-field--enclosed
							"
							style="
								max-width: 100px;
								width: 70px;
								padding: 0px !important;
								height: 32px;
							"
						>
							<div class="v-input__control">
								<div
									class="v-input__slot"
									style="padding: 0px 0px 0px 0px !important"
								>
									<!-- icon minus -->
									<div
										@click="minusQty"
										class="v-input__prepend-inner"
										style="cursor: pointer"
										v-ripple
									>
										<div class="v-input__icon v-input__icon--prepend-inner">
											<i
												aria-hidden="true"
												class="v-icon notranslate mdi mdi-minus theme--light"
											></i>
										</div>
									</div>
									<!-- text input quantity-->
									<div class="v-text-field__slot">
										<input
											type="number"
											step="0.01"
											style="text-align: center"
											v-model="jumlahPaket"
										/>
									</div>

									<!-- icon plus -->
									<div
										@click="plusQty"
										class="v-input__append-inner"
										style="cursor: pointer"
										v-ripple
									>
										<div class="v-input__icon v-input__icon--append">
											<i
												aria-hidden="true"
												class="v-icon notranslate mdi mdi-plus theme--light"
											></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions class="py-0 pb-3">
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							outlined
							block
							@click="buySedekahPaket"
							:disabled="buySedekahDisabled"
							:loading="buySedekahLoading"
						>
							Beli
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
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
			sedekahProducts: "products/getSedekahProducts",
			collectedSedekah: "others/getCollectedInfaq",
		}),
		buySedekahDisabled: function () {
			if (this.jumlahPaket > 0) {
				return false;
			} else {
				return true;
			}
		},
	},
	data() {
		return {
			url: __BASE_URL__,
			loading: false,
			buySedekahLoading: false,
			alert1: true,
			alert2: true,
			addQtySedekah: false,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loadingKegiatan: false,
			loadingSedekah: true,
			loadingInfaq: false,
			productSedekahDialog: false,
			routeTarget: "pesanan",
			productClicked: null,
			jumlahPaket: 0,
			images: [
				"/assets/images/berbagi_takjil2.jpg",
				"/assets/images/berbagi_takjil.jpg",
				"/assets/images/berbagi_takjil2.jpg",
				"/assets/images/berbagi_takjil.jpg",
			],
			masjid: ["/assets/images/masjid.jpeg", "/assets/images/masjid.jpeg"],
			infaq: [
				{
					title: "Renovasi total Masjid Sholeh Kaliasin Surabaya",
					date: "18 Mei 2022",
					img: "/assets/images/masjid2.jpg",
					type: 2,
					subtitle:
						"Kaliasin Gg. VIII No.9, Kedungdoro, Kec. Tegalsari, Kota SBY, Jawa Timur 60261",
					description:
						"<b>Assalammualaikum warohmatulahi wabarokatuh</b><br><br>Masjid Sholeh adalah Masjid tua yg dibangun pada permulaan Ramadhan 1339H [1921M] dan selesai awal Ramadhan 1340H [1922M]. Masjid Sholeh yg terletak di jantung kota ini merupakan salah satu Masjid Jami tertua di kota Surabaya. Bersebelahan dengan jalan masuk Tunjungan Plaza, Surabaya dengan alamat Jl. Kaliasin gg VIII/9.<br><br>Untuk memenuhi kebutuhan jamaah dan karena faktor usia bangunan yg hampir satu abad...kini Masjid Sholeh dibangun baru.<br><br>Kondisi bangunan Masjid yg sudah tua, dimana renovasi terakhir dilakukan pada tahun 1960 (58 tahun lalu), mengakibatkan kondisi bangunan yg sudah tidak nyaman untuk tempat peribadatan. Kalau hujan bocor, walau sudah bolak balik diperbaiki. Kebutuhan akan Masjid Jami dan keinginan kuat masyarakat sekitar untuk membangun masjid menjadi lebih baik lagi, maka panitia pembangunan Masjid Sholeh, mengetuk hati kepada Saudara Saudaraku Muslim dan Masyarakat untuk menyisihkan sebagian dari harta untuk terwujudnya pembangunan Rumah Allah SWT ini.<br><br>Agar kegiatan-kegiatan yg menyangkut Ibadah terus berjalan / tidak terganggu maka, pembangunan Masjid 2 lantai ini akan dilaksanakan dalam 2 tahap, yaitu: pembangunan bagian belakang dan pembangunan bagian depan Masjid. <br><br>- Pembangunan tahap 1 yaitu pembangunan bagian belakang Masjid, dimana akan dilakukan renovasi total dengan mendirikan bangunan baru. Setelah selesai,<br><br>- baru dilanjutkan untuk pembangunan tahap ke-2 Masjid, bagian depan.",
				},
				{
					title: "Infaq di Masjid Sabilil Hikmah",
					img: "/assets/images/masjid3.jpg",
					date: "9 Mei 2022",
					type: 1,
					subtitle:
						"Jl. Griya Kebraon Utara II AH No.23, Kebraon, Kec. Karangpilang.",
					description:
						"Masjid AL-BAROKAH yang dibangun pada tahun 2017. Masjid AL-BAROKAH merupakan kategori Masjid Umum. Masjid AL-BAROKAH beralamat di Kebraon 2 Gang Manggis RT. 01 RW.03 Kel. Kebraon.<br><br>Masjid AL-BAROKAH memiliki luas tanah 250 m2 , luas bangunan 268 m2 dengan status tanah Wakaf. Masjid AL-BAROKAH memiliki jumlah jamaah 50 - 100 orang , jumlah muazin 6 orang , jumlah remaja 10 orang dan Jumlah Khotib 6 orang .",
				},
			],
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
	beforeRouteEnter(to, from, next) {
		axios
			.get("inspect")
			.then((r) => {
				if (r.status === 200) {
					next();
				} else {
					next({ name: "login" });
				}
			})
			.catch((e) => {
				next({ name: "login" });
			});
	},
	mounted() {
		if (this.$router.history.current.params.fromProfile) {
			this.routeTarget = "profile";
		}
		// console.log(this.$router.history.current);
		this.getCollectedInfaq();
		this.getSedekahProduct();
	},
	methods: {
		getCollectedInfaq() {
			this.$store.dispatch("others/fetchCollectedInfaq");
		},
		buySedekahPaket() {
			this.buySedekahLoading = true;
			this.$store.commit("others/addQty", this.jumlahPaket);
			setTimeout(() => {
				this.buySedekahLoading = false;
				this.$router.push({ name: "sedekah" });
			}, 500);
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		productClick(product) {
			this.jumlahPaket = 0;
			this.productClicked = product;
			this.$store.commit("others/setSelectedSedekah", product);
			this.productSedekahDialog = true;
		},
		getSedekahProduct() {
			this.loadingSedekah = true;
			this.$store
				.dispatch("products/setProductSedekah")
				.then((response) => {
					this.loadingSedekah = false;
					console.log(response);
				})
				.catch((e) => {
					this.loadingSedekah = false;
					console.log(e);
				});
		},
		minusQty() {
			if (this.jumlahPaket > 0) {
				this.jumlahPaket -= 1;
			}
		},
		plusQty() {
			this.jumlahPaket += 1;
		},
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