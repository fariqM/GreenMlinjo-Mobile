<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar
				:loading="loading"
				:page="
					postType === null
						? 'Loading...'
						: postType === 0
						? 'Lihat Kegiatan'
						: 'Infaq Masjid'
				"
			></mlj-toolbar>
			<my-scroll
				ref="vs"
				:ops="ops"
				:style="{ height: windowsHeight - 110 + 'px' }"
				style="background: #f5f5f5"
			>
				<v-sheet max-width="99.8vw">
					<v-card v-if="postType === 0">
						<v-carousel hide-delimiters height="fit-content">
							<v-carousel-item v-for="(item, i) in kegiatans" :key="i">
								<v-img height="250" :src="item.src"></v-img>
							</v-carousel-item>
						</v-carousel>
						<v-card-title style="word-break: break-word"
							>Bagi-bagi takjil Warga Karangpilang</v-card-title
						>
						<v-card-subtitle class="py-0">
							Dibuat: 21 Juli 2022
						</v-card-subtitle>
						<v-card-subtitle>
							<v-chip outlined color="accent" small class="mr-1 mt-1">
								Kecamatan Karangpilang
							</v-chip>
							<v-chip outlined color="accent" small class="mr-1 mt-1">
								#KegiatanSekitar
							</v-chip>
							<v-chip outlined color="accent" small class="mr-1 mt-1">
								#GotongRoyong
							</v-chip>
						</v-card-subtitle>
						<v-card-text>
							<div>
								<p>
									Kegiatan bagi-bagi takjil ini sudah dilakukan mereka sejak
									awal bulan suci Ramadan. Tempat pembagian takjil bergilir di
									masing-masing masjid di kecamatan Karangpilang.
								</p>
								<p>
									Takjil dibagikan ke setiap warga di jalanan saat menjelang
									waktu berbuka puasa. Seperti yang dilakukan Masjid Jami
									Baiturrohim Kebraon tahun lalu.
								</p>
								<p>
									“Tahun 2021 lalu kami juga mengadakan bagi takjil sebanyak 500
									bungkus. Alhamdulillah tahun ini ada peningkatan menjadi 700
									bungkus,” Takmir Masjid Jami Baiturrohim, Rabu 13 April 2022.
								</p>
								<p>
									Tak butuh waktu lama, 700 bungkus takjil pun habis terbagi ke
									warga sekitar Kelurahan Bojongbata hanya dalam waktu 45 menit.
								</p>
								<p>
									“Ini sebagai salah satu upaya untuk menumbuhkan kepedulian
									pada sesama.” tutur Takmir Masjid Jami Baiturrohim, Rabu 13
									April 2022.
								</p>
								<p>
									Disamping menggelar bakti sosial seperti bagi-bagi takjil,
									kata Pudjianto.
								</p>
								<p>
									Untung Ismail selaku takmir masjid kebraon mengapresiasi
									kekompakan remaja Masjid Jami Baiturrohim Kebraon ini. Ia
									berharap, kegiatan ini terus diselenggarakan setiap tahun dan
									terus meningkat.
								</p>
							</div>
						</v-card-text>
					</v-card>

					<v-card v-if="postType !== 0 && post !== null">
						<v-img height="250" :src="post.img"></v-img>
						<v-card-title style="word-break: break-word">{{
							post.title
						}}</v-card-title>
						<v-card-subtitle class="py-0">
							Dibuat: {{ post.date }}
						</v-card-subtitle>
						<v-card-subtitle class="py-0">
							{{ post.subtitle }}
						</v-card-subtitle>

						<div v-if="post.type === 2" class="pa-4">
							<v-divider />
							<div class="py-2 d-flex justify-space-around">
								<b style="color: #000">Rp {{ numberWithCommas(15000000) }}</b>
								Dibutuhkan
							</div>
							<v-divider />
							<!-- <v-divider/> -->
							<div class="py-2 d-flex justify-space-around">
								<b style="color: #000"
									>Rp {{ numberWithCommas(collectedSedekah) }}</b
								>
								Terkumpul
							</div>
							<v-divider />
						</div>
						<div class="px-4 my-2" v-if="post.type !== 2">
							<v-divider />
						</div>
						<v-card-text v-html="post.description"> </v-card-text>
					</v-card>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-blog-details">
			<v-btn block color="primary" v-if="postType === 0" @click="dialog = true"
				>Sedekah sekarang</v-btn
			>
			<v-btn block color="primary" v-else @click="dialog = true"
				>Infaq sekarang</v-btn
			>
		</div>

		<v-dialog v-model="dialog" persistent>
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
					<v-icon small @click="dialog = false">mdi-close</v-icon>
				</div>
				<v-card-title class="mb-2">
					{{ postType === 0 ? "Nominal Sedekah" : "Nominal Infaq" }}
				</v-card-title>
				<v-card-subtitle class="title-text">
					Saldo Anda:
					<span class="link-text">Rp {{ numberWithCommas(balance) }}</span>
				</v-card-subtitle>
				<v-card-text class="py-0 mb-4 d-flex justify-center">
					<v-text-field
						outlined
						hide-details="auto"
						dense
						:error-messages="errorMassage"
						placeholder="Masukkan Nominal"
						v-model="nominal"
						type="number"
					></v-text-field>
				</v-card-text>
				<v-card-actions class="py-0 pb-3">
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						outlined
						block
						@click="confirmSedekah"
						:loading="btnLoading"
						:disabled="btnDisabled"
					>
						Konfirmasi
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="snackbar">
			Transaksi berhasil
			<template v-slot:action="{ attrs }">
				<v-btn
					small
					color="success"
					outlined
					v-bind="attrs"
					:to="{ name: 'blog' }"
				>
					Kembali
				</v-btn>
			</template></v-snackbar
		>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import ExpandableTextLine from "vue-expandable-text-line";
import { mapGetters } from "vuex";

export default {
	components: {
		MyScroll,
		ExpandableTextLine,
	},
	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			dialog: false,
			useClick: false,
			loading: false,
			btnLoading: false,
			btnDisabled: true,
			postType: null,
			post: null,
			nominal: null,
			snackbar: false,
			errorMassage: "",
			kegiatans: [
				{
					src: "/assets/images/kegiatan1.webp",
				},
				{
					src: "/assets/images/kegiatan2.jpeg",
				},
				{
					src: "/assets/images/kegiatan3.jpg",
				},
			],
			url: __BASE_URL__,
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
	computed: {
		...mapGetters({
			balance: "auth/getBalance",
			collectedSedekah: "others/getCollectedInfaq",
		}),
	},
	watch: {
		nominal: function (newVal) {
			if (/^\d+$/.test(newVal)) {
				if (this.balance < this.nominal) {
					this.btnDisabled = true;
					this.errorMassage = "Saldo tidak cukup";
				} else {
					this.btnDisabled = false;
					this.errorMassage = "";
				}
			} else {
				this.btnDisabled = true;
				this.errorMassage = "Hanya masukan angka";
			}
		},
	},
	mounted() {
		this.postType = this.$router.history.current.params.type;
		if (this.postType !== 0) {
			this.post = this.$router.history.current.params.post;
			console.log("post", this.post);
		}
	},
	methods: {
		confirmSedekah() {
			if (this.postType === 0) {
				var title = "Transaksi Sedekah";
				var description = "Sedekah untuk kegiatan sosial.";
			} else {
				var title = "Transaksi Infaq";
				var description = this.post.title;
			}
			if (this.nominal == "") {
				this.errorMassage = "Hanya masukan angka";
				return;
			}
			this.btnLoading = true;
			this.$store
				.dispatch("auth/makePurchase", { amount: this.nominal })
				.then(() => {
					if (this.postType !== 0) {
						this.$store
							.dispatch("others/addInfaq", { amount: parseInt(this.nominal) })
							.then(() => {
								this.$store.dispatch("others/fetchCollectedInfaq");
							});
					}

					this.$store
						.dispatch("transactions/createTransaction", {
							uuid: null,
							title: title,
							description: description,
							amount: parseInt(this.nominal),
							status: 2,
						})
						.then((response) => {
							this.snackbar = true;
							this.btnLoading = false;
							this.btnDisabled = true;
							setTimeout(() => {
								this.$router.replace({ name: "blog" });
							}, 4000);
						});

					this.$store.dispatch("auth/getBalance");
				});
		},
		textCLicked() {
			this.useClick = !this.useClick;
			console.log(this.useClick);
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
	},
};
</script>

<style>
.bottom-container-blog-details {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: #fff;
}
</style>