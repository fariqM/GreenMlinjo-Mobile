<template>
	<v-sheet
		class="overflow-y-auto pb-3"
		max-height="92vh"
		style="background-color: #f5f5f5"
	>
		<div class="" style="max-height: 10.5rem">
			<v-list two-line class="pt-0 primary" style="max-height: 9rem">
				<v-list-item v-if="isLogedIn">
					<v-list-item-avatar size="70">
						<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>Ahmad Muhammad</v-list-item-title>
						<v-list-item-subtitle>Pengguna Aktif</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon>
							<v-icon>mdi-menu</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-list-item v-else>
					<v-list-item-avatar size="70">
						<v-img :src="require('../assets/unknown_user.jpg')"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>
							<b>Anda Belum Login</b>
						</v-list-item-title>
						<!-- <v-list-item-subtitle>Tolong untuk melakukan melanjutkan pembelia</v-list-item-subtitle> -->
					</v-list-item-content>
					<div class="d-flex flex-column">
						<v-btn small class="mb-2" :to="{ name: 'login' }"> login </v-btn>
						<v-btn small :to="{ name: 'register' }"> Daftar </v-btn>
					</div>
					<!-- <v-list-item-action class="pa-0">
						<v-btn small>
							login
						</v-btn>
						<v-btn small>
							Daftar
						</v-btn>
					</v-list-item-action> -->
				</v-list-item>

				<!-- svg wave -->
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
						<path
							fill="#F5F5F5"
							fill-opacity="1"
							d="M0,96L80,85.3C160,75,320,53,480,74.7C640,96,800,160,960,165.3C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
						></path>
					</svg>
				</div>
			</v-list>
			<!-- wallet card -->
			<div style="position: relative; bottom: 3.1rem" class="" v-if="isLogedIn">
				<v-card class="d-flex justify-center align-center wallet-card-profile">
				</v-card>
			</div>
		</div>

		<!-- transaksi -->
		<v-card class="mt-2">
			<div
				class="d-flex justify-space-between align-center"
				style="padding: 10px 10px 0px 10px"
			>
				<div class="header-list">Transaksi</div>
			</div>
			<div v-for="(menu, i) in menus" :key="i" v-ripple style="padding: 0 1rem">
				<div
					class="d-flex justify-space-between align-center py-2"
					@click="
						isLogedIn
							? $router.push({ name: menu.route })
							: $router.push({ name: 'login' })
					"
				>
					<div>
						<div class="title-text">
							{{ menu.title }}
						</div>
						<div class="subtitle-text">
							{{ menu.subtitle }}
						</div>
					</div>
					<div>
						<v-icon>mdi-chevron-right</v-icon>
					</div>
				</div>
				<v-divider v-if="i !== menus.length - 1"></v-divider>
			</div>
		</v-card>

		<v-card style="padding-top: 0px" class="mt-3" v-if="isLogedIn">
			<div
				class="d-flex justify-space-between align-center"
				style="padding: 10px 10px 0px 10px"
			>
				<div class="title-text">Beli lagi yuk</div>
				<div class="subtitle-text link-text">Lihat lainnya</div>
			</div>

			<!-- Rekomendasi -->
			<v-row no-gutters justify="center">
				<v-col
					class="d-flex justify-center"
					style="padding: 0px"
					cols="6"
					sm="7"
					v-for="(item, i) in 4"
					:key="i"
				>
					<div class="d-flex noselect ma-1 pa-1" max-width="10rem" v-ripple>
						<div>
							<v-avatar tile size="60">
								<v-img
									:src="url + 'storage/images/products/wortel.jpg'"
								></v-img>
							</v-avatar>
						</div>
						<div class="ml-1 mr-1 d-flex align-center">
							<div>
								<div class="title-text ellipsis-text" style="max-width: 5.7rem">
									Paket Empon 1232
								</div>

								<div
									class="product-price-text ellipsis-text"
									style="max-width: 5.7rem"
								>
									Rp 12.000 - Rp 13.000
								</div>
								<div class="subtitle-text" style="font-size: 0.7rem">
									Dibeli 1 kali
								</div>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-card>

		<!-- Menu list bantuan -->
		<v-card class="mt-3">
			<div class="d-flex justify-space-between header-list">
				<div
					style="
						padding: 10px 10px 0px 10px;
						font-size: 0.9rem !important;
						font-weight: 800;
					"
				>
					Bantuan Pengguna
				</div>
			</div>
			<div>
				<div
					v-for="(menu, i) in menus2"
					:key="i"
					v-ripple
					style="padding: 0 1rem"
				>
					<div class="d-flex justify-space-between align-center py-2">
						<div>
							<div class="title-text">
								{{ menu.title }}
							</div>
							<div class="subtitle-text">
								{{ menu.subtitle }}
							</div>
						</div>
						<div>
							<v-icon>mdi-chevron-right</v-icon>
						</div>
					</div>

					<v-divider v-if="i !== 1"></v-divider>
				</div>
			</div>
		</v-card>

		<v-card class="mt-3 mb-2 px-2 py-2" v-if="isLogedIn">
			<v-btn
				outlined
				large
				tile
				block
				color="warning"
				:loading="logoutLoading"
				@click="LogoutAction"
			>
				Logout akun
				<v-icon class="ml-1">mdi-logout</v-icon>
			</v-btn>
		</v-card>
	</v-sheet>
</template>

<script>
// import { Geolocation } from '@capacitor/geolocation';
// import {Example} from "experiment"
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			menus: [
				{
					title: "Menunggu Pembayaran",
					subtitle: "Semua transaksi yang belum dibayar",
					route: "",
				},
				{
					title: "Ulasan",
					subtitle: "Berikan ulasan dan penilaian produk",
					route: "",
				},
				{
					title: "Komplain Sebagai Pembeli",
					subtitle: "Lihat status komplain",
					route: "",
				},
				{
					title: "Sedekah Yuk...",
					subtitle: "Bantu ringankan beban saudara kita",
					route: "blog",
				},
				// {
				// 	title: "Sedekah Sayur",
				// 	subtitle: "Bantu ringankan beban saudara kita",
				// },
			],
			menus2: [
				{
					title: "Pusat Bantuan",
					subtitle: "Panduan untuk pengguna",
				},
				{
					title: "Chat Admin",
					subtitle: "Online service untuk pengguna",
				},
			],
			menus3: [{ title: "Edit Profil" }, { title: "Logout" }],
			url: __BASE_URL__,
			logoutLoading: false,
		};
	},
	computed: {
		...mapGetters({
			isLogedIn: "auth/getUserStatus",
		}),
	},
	methods: {
		LogoutAction() {
			this.logoutLoading = true;

			this.$store
				.dispatch("auth/logoutAction")
				.then((response) => {
					this.logoutLoading = false;
					this.$router.replace({ name: "landing" });
				})
				.catch((e) => {
					console.log(e);
				});

			// setTimeout(() => {
			// 	this.logoutLoading = false;
			// 	iziToast.show({
			// 		theme: "dark",
			// 		position: "center",
			// 		title: false,
			// 		message: "cjek",
			// 	});
			// }, 200);
		},
	},
};
</script>

<style>
.wallet-card-profile {
	margin: 0 2.5rem;
	min-height: 4.5rem;
}
.curves {
	/* width: 500px; 
  height: 100px;  
  border: solid 5px #000;
  border-color: #000 transparent transparent transparent;
  border-radius: 50%/100px 100px 0 0; */

	width: 100%;
	height: 100px;
	border: solid 5px #000;
	border-color: transparent transparent #000 transparent;
	border-radius: 0 0 240px 50%/60px;
}
</style>