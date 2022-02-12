<template>
	<div>
		<v-toolbar dense color="primary" rounded="2" class="pr-0">
			<v-btn icon class="mr-0" small @click="navigation_back">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<v-subheader class="pl-0"><h3>Masuk</h3></v-subheader>
			<v-spacer></v-spacer>
			<router-link :to="{ name: 'register' }">
				<v-subheader>
					<h3>Daftar</h3>
				</v-subheader>
			</router-link>
			<v-progress-linear
				:active="loading"
				:indeterminate="loading"
				absolute
				bottom
				color="success"
			></v-progress-linear>
		</v-toolbar>
		<v-main>
			<v-col md="12" cols="12" class="mt-10">
				<!-- <div>asd</div> -->
				<v-img
					contain
					src="../../assets/cart.png"
					height="200px"
					max-height="20vh"
				></v-img>
			</v-col>
			<v-col md="12" cols="12">
				<h2 class="text-center">Selamat Datang</h2>
			</v-col>
			<v-col md="12" cols="12" class="pt-0 pb-0 mb-2">
				<v-text-field
					hide-details="auto"
					placeholder="Masukkan email anda"
					label="Email"
					v-model="form.email"
					:rules="emailRules"
					outlined
					filled
				></v-text-field>
			</v-col>
			<v-col md="12" cols="12" class="pt-0">
				<v-text-field
					hide-details="auto"
					placeholder="Masukkan Password anda"
					v-model="form.password"
					label="Password"
					type="password"
					outlined
					filled
				></v-text-field>
			</v-col>
			<v-col md="12" cols="12" class="pt-0">
				<div class="d-flex justify-space-between">
					<v-checkbox
						v-model="checkbox"
						label="Ingat saya"
						class="mt-0 pt-0"
						value="Error"
					></v-checkbox>
					<router-link :to="{ name: 'register' }" style="text-decoration: none"
						>Lupa kata sandi ?</router-link
					>
				</div>
			</v-col>

			<v-col md="12" cols="12" class="pt-0">
				<v-btn
					width="100%"
					color="primary"
					elevation="4"
					@click="Login"
					:loading="loading"
					>Masuk</v-btn
				>
			</v-col>
			<v-overlay :value="overlay" opacity="0.3"> </v-overlay>
		</v-main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: "mlinjo@gmail.com",
				password: "password",
			},
			checkbox: [],
			overlay: false,
			loading: false,
			emailRules: [
				(v) => !!v || "*Oops.. Tolong masukkan email",
				(v) => (v && v.length <= 120) || "Max 120 charachters",
				(v) => /.+@.+/.test(v) || "Kayaknya ini bukan email deh...",
			],
		};
	},
	mounted() {
		// console.log(this.$platform);
	},
	methods: {
		navigation_back() {
			this.$router.back();
		},
		check() {
			axios
				.get("inspect")
				.then((response) => {
					console.log(response);
				})
				.catch((e) => {
					console.log(e);
				});
			// this.$store
			// 	.dispatch("auth/getCreds", {})
			// 	.then((token) => {
			// 		console.log(token);
			// 	})
			// 	.catch((e) => {
			// 		console.log(e);
			// 	});
		},
		Login() {
			this.loading = true;
			this.overlay = true;
			this.$store
				.dispatch("auth/loginAction", this.form)
				.then((response) => {
					this.loading = false;
					this.$router
						.push({ name: "home" })
						.then((next) => {
							this.loading = false;
							this.overlay = false;
						})
						.catch((error) => {
							this.$toast.error(
								"Coba lagi, kali aja bisa.",
								"Oops ! Kayaknya ada masalah :( ",
								{
									position: "topCenter",
									timeout: 4500,
									// ballon:true,
									transitionInMobile: "fadeInLeft",
									transitionOutMobile: "fadeOutLeft",
									displayMode: 2,
								}
							);
							this.loading = false;
							this.overlay = false;
						});
				})
				.catch((e) => {
					this.loading = false;
					this.$toast.error(
						"Coba lagi, kali aja bisa.",
						"Oops ! Kayaknya ada masalah :( ",
						{
							position: "topCenter",
							timeout: 4500,
							// ballon:true,
							transitionInMobile: "fadeInLeft",
							transitionOutMobile: "fadeOutLeft",
							displayMode: 2,
						}
					);
				});
		},
	},
};
</script>
