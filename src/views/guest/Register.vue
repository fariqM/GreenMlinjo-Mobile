<template>
	<div>
		<v-toolbar dense color="primary" rounded="2" class="pr-0" width="100%">
			<v-btn icon class="mr-0" small @click="navigation_back">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
			<!-- <v-toolbar-title>Title</v-toolbar-title> -->
			<v-toolbar-title>Daftar</v-toolbar-title>

			<!-- <v-subheader class="pl-0"><h3>Daftar</h3></v-subheader> -->
			<v-spacer></v-spacer>
			<router-link :to="{ name: 'login' }">
				<v-subheader>
					<h3>Masuk</h3>
				</v-subheader>
			</router-link>
		</v-toolbar>

		<v-main>
			<v-sheet max-height="calc(100vh - 48px)" class="overflow-y-auto">
				<v-col md="12" cols="12" style="margin-top 48px">
					<!-- <div>asd</div> -->
					<v-img contain src="../../assets/logo.jpg" max-height="125px"></v-img>
				</v-col>
				<v-col md="12" cols="12">
					<h2 class="text-center">Daftar akun baru</h2>
				</v-col>
				<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
					<v-text-field
						dense
						hide-details="auto"
						placeholder="Masukkan username anda"
						label="Username"
						outlined
						filled
						v-model="form.name"
						:rules="nameRules"
						:error-messages="errors.name"
					></v-text-field>
				</v-col>
				<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
					<v-text-field
						dense
						hide-details="auto"
						placeholder="Masukkan email anda"
						label="Email"
						outlined
						filled
						v-model="form.email"
						:rules="emailRules"
						:error-messages="errors.email"
					></v-text-field>
				</v-col>
				<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
					<v-text-field
						dense
						hide-details="auto"
						placeholder="Masukkan nomor hp anda"
						label="Handphone"
						type="number"
						outlined
						filled
						v-model="form.phone"
						:rules="phoneRules"
						:error-messages="errors.phone"
					></v-text-field>
				</v-col>
				<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
					<v-text-field
						dense
						hide-details="auto"
						placeholder="Masukkan Password anda"
						label="Password"
						outlined
						filled
						v-model="form.password"
						:rules="pwRules"
						:error-messages="errors.password"
						:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
						:type="showPassword ? 'password' : 'text'"
						@click:append="showPassword = !showPassword"
					></v-text-field>
				</v-col>
				<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
					<v-text-field
						dense
						hide-details="auto"
						placeholder="Ketik ulang password anda"
						label="Ulangi Password"
						outlined
						filled
						type="password"
						v-model="form.password_confirmation"
						:rules="passwordRules"
						:error-messages="errors.password_confirmation"
					></v-text-field>
				</v-col>

				<v-col md="12" cols="12" class="pt-0">
					<v-btn
						width="100%"
						color="primary"
						elevation="4"
						:disabled="btnDisabled"
						@click="createAccount"
						:loading="loading"
						>Daftar</v-btn
					>
				</v-col>
			</v-sheet>
			<v-overlay :value="overlay" opacity="0.2"> </v-overlay>
		</v-main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			checkbox: [],
			btnDisabled: false,
			showPassword: true,
			overlay: false,
			loading: false,
			form: {
				name: "",
				email: "",
				phone: "",
				password: "",
				password_confirmation: "",
			},
			errors: {
				name: "",
				email: "",
				phone: "",
				password: "",
				password_confirmation: "",
			},
			emailRules: [
				(v) => {
					if (!!v) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "E-mail harus terisi";
					}
				},
				(v) => {
					if (v && v.length <= 120) {
						this.btnDisabled = false;
						return v && v.length <= 120;
					} else {
						this.btnDisabled = true;
						return "Email maksimal 120 karakter";
					}
				},
				(v) => {
					if (/.+@.+/.test(v)) {
						this.btnDisabled = false;
						return /.+@.+/.test(v);
					} else {
						this.btnDisabled = true;
						return "Masukkan email dengan benar.";
					}
				},
			],
			pwRules: [
				(v) => {
					if (!!v) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "Password harus terisi";
					}
				},
				(v) => {
					if (v && v.length >= 6) {
						this.btnDisabled = false;
						return v && v.length >= 6;
					} else {
						this.btnDisabled = true;
						return "Password minimal 6 karakter";
					}
				},
				(v) => {
					if (v && v.length <= 120) {
						this.btnDisabled = false;
						return v && v.length <= 120;
					} else {
						this.btnDisabled = true;
						return "Password maksimal 120 karakter";
					}
				},
				(v) => {
					if (v !== this.form.password_confirmation) {
						this.errors.password_confirmation =
							"Harap masukan password yang sama.";
						this.btnDisabled = true;

						return this.form.password_confirmation !== v;
					} else {
						this.errors.password_confirmation = "";
						return true;
					}
				},
			],
			passwordRules: [
				(v) => {
					if (!!v) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "Password harus terisi";
					}
				},
				(v) => {
					if (v && v.length >= 6) {
						this.btnDisabled = false;
						return v && v.length >= 6;
					} else {
						this.btnDisabled = true;
						return "Password minimal 6 karakter";
					}
				},
				(v) => {
					if (v && v.length <= 120) {
						this.btnDisabled = false;
						return v && v.length <= 120;
					} else {
						this.btnDisabled = true;
						return "Password maksimal 120 karakter";
					}
				},
				() => {
					if (this.form.password_confirmation == this.form.password) {
						this.btnDisabled = false;
						this.errors.password = "";
						this.errors.password_confirmation = "";
						return true;
					} else {
						this.btnDisabled = true;
						return "Harap masukan password yang sama.";
					}
				},
			],
			nameRules: [
				(v) => {
					if (!!v) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "Username harus terisi";
					}
				},
				(v) => {
					if (v && v.length <= 120) {
						this.btnDisabled = false;
						return v && v.length <= 120;
					} else {
						this.btnDisabled = true;
						return "Username maksimal 120 karakter";
					}
				},
			],
			phoneRules: [
				(v) => {
					if (!!v) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "Masukan nomor handphone dengan benar";
					}
				},
				(v) => {
					if (/^\d+$/.test(v)) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return "Hanya masukan angka";
					}
				},
				(v) => {
					if (v && v.length <= 13) {
						this.btnDisabled = false;
						return !!v;
					} else {
						this.btnDisabled = true;
						return " Maksimal 13 karakter";
					}
				},
			],
		};
	},
	methods: {
		navigation_back() {
			this.$router.back();
		},
		createAccount() {
			this.loading = true
			this.overlay = true
			this.$store
				.dispatch("auth/registerAction", this.form)
				.then((response) => {
					this.$store
						.dispatch("auth/loginAction", response.data.login_form)
						.then((response) => {
							// this.loading = false;
							setTimeout(() => {
								this.$router
									.push({ name: "home" })
									.then((next) => {
										this.loading = false;
										this.overlay = false;
									})
									.catch((error) => {
										iziToast.error({
											title: "Oops ! Kayaknya ada masalah :( ",
											message: "Coba lagi, kali aja bisa.",
											position: "topCenter",
											timeout: 4500,
											// ballon:true,
											transitionInMobile: "fadeInLeft",
											transitionOutMobile: "fadeOutLeft",
											displayMode: 2,
										});
										this.loading = false;
										this.overlay = false;
									});
							}, 800);
						})
						.catch((e) => {
							this.overlay = false;
							this.loading = false;
							iziToast.error({
								title: "Oops ! Kayaknya ada masalah :( ",
								message: "Coba lagi, kali aja bisa.",
								position: "topCenter",
								timeout: 4500,
								// ballon:true,
								transitionInMobile: "fadeInLeft",
								transitionOutMobile: "fadeOutLeft",
								displayMode: 2,
							});
						});
				})
				.catch((e) => {
					if (e.response) {
						console.log(e.response);
						if (e.response.status === 422) {
							this.errors = e.response.data.errors;
							console.log(this.errors);
						} else {
							this.loginError();
						}
					} else {
						console.log(e);
						this.loginError();
					}
				});
		},

		loginError() {
			iziToast.error({
				title: "Oops ! Kayaknya ada masalah :( ",
				message: "Coba lagi nanti, atau hubungi admin.",
				position: "topCenter",
				timeout: 4500,
				// ballon:true,
				transitionInMobile: "fadeInLeft",
				transitionOutMobile: "fadeOutLeft",
				displayMode: 2,
			});
		},
	},
};
</script>

<style>
</style>