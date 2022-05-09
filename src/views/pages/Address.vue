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
						:key="n"
					>
						<div class="d-flex flex-row">
							<div class="tittle-text mr-2">{{address.contact}}</div>
							<div style="color: #87bd43" v-if="address.choosen === 1">[Dipilih]</div>
						</div>
						<div class="subtitle-text">
							<div>{{address.phone}}</div>
							<div>{{address.road}}</div>
							<div>{{address.full_address}}</div>
						</div>
					</v-card>
				</v-sheet>
			</v-card>
		</v-main>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			// showAddAddressDialog: false,
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
			this.$router.push({name:"address.new"})
		},
		closeAddAddressDialog() {
			this.showAddAddressDialog = false;
		},
		closeDialog() {
			this.$emit("closeDialog");
		},
		fetchAddress() {
			console.log("fetch address..");
			this.$store
				.dispatch("auth/getAddress")
				.then((response) => {
					console.log(response);
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
};
</script>

<style>
</style>