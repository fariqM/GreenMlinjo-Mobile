<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="false" :page="'Alamat'"></mlj-toolbar>
			<v-card color="#f7f7f7">
				<v-sheet
					height="calc(100vh - 48px)"
					max-height="calc(100vh - 48px)"
					class="overflow-y-auto"
					color="#f7f7f7"
				>
					<v-card tile elevation="0" v-ripple @click="openAddressDialog">
						<div class="text-center mb-2 pa-2">
							<v-icon small>mdi-plus</v-icon>
							Tambah alamat lain
						</div>
					</v-card>
					<v-card
						tile
						elevation="0"
						class="pa-2 mb-2"
						v-for="(address, n) in addresses"
						@click="addressClicked(address)"
						:key="n"
					>
						<div class="d-flex flex-row">
							<div class="tittle-text mr-2">{{ address.contact }}</div>
							<div style="color: #87bd43" v-if="address.choosen === 1">
								[Dipilih]
							</div>
						</div>
						<div class="subtitle-text">
							<div>{{ address.phone }}</div>
							<div>{{ address.road }}</div>
							<div>{{ address.full_address }}</div>
						</div>
					</v-card>
				</v-sheet>
			</v-card>

			<v-dialog v-model="showDialog" persistent>
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
						<v-icon small @click="showDialog = false">mdi-close</v-icon>
					</div>
					<v-card-title class="text-h6">
						Pilih sebagai alamat utama?
					</v-card-title>
					<v-card-text
						>Jika anda belum yakin dengan alamat ini anda dapat
						mengubahnya.</v-card-text
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							text
							@click="chooseAddress"
							:loading="btnLoadin"
						>
							ya
						</v-btn>
						<v-btn color="grey darken-1" text @click="showDialog = false">
							Ubah Alamat
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-main>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			showDialog: false,
			addressChoosed: null,
			btnLoadin: false,
		};
	},
	mounted() {
		this.fetchAddress();
	},
	computed: {
		...mapGetters({
			addresses: "auth/getAddress",
		}),
	},
	methods: {
		openAddressDialog() {
			this.$router.push({ name: "address.new" });
		},
		closeAddAddressDialog() {
			this.showAddAddressDialog = false;
		},
		closeDialog() {
			this.$emit("closeDialog");
		},
		fetchAddress(refetch = false) {
			if (refetch) {
				this.btnLoadin = false;
				this.showDialog = false;
			}
			this.$store
				.dispatch("auth/getAddress")
				.then((response) => {
					// console.log(response);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		addressClicked(address) {
			this.addressChoosed = address.id;
			this.showDialog = true;
		},
		chooseAddress() {
			this.btnLoadin = true;
			this.$store
				.dispatch("auth/chooseAddress", this.addressChoosed)
				.then((response) => {
					this.fetchAddress(true);
					this.getChoosenAddress();
				})
				.catch((e) => {
					this.showDialog = false;
					console.log(e);
				});
		},
		getChoosenAddress() {
			this.$store
				.dispatch("auth/getChoosenAddress")
				.then((response) => {})
				.catch((e) => {
					if (e.response) {
						if (e.response.status !== 404) {
							console.log(e.response);
						}
					}
				});
		},
	},
};
</script>

<style>
</style>