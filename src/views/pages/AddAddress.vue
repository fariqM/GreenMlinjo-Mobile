<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="false" :page="'Alamat Baru'"></mlj-toolbar>
			<v-sheet
				max-height="calc(100vh - 48px)"
				class="overflow-y-auto"
				color="#f7f7f7"
			>
				<v-subheader class="py-0 px-2">Kontak</v-subheader>
				<v-card tile elevation="0" class="pa-2 mb-2">
					<v-text-field
						placeholder="Nama Lengkap"
						flat
						solo
						hide-details="auto"
						:error-messages="errors.contact"
						dense
						v-model="form.contact"
						class="elevation-0"
					></v-text-field>
					<v-divider />
					<v-text-field
						placeholder="Nomor Telepon"
						flat
						solo
						hide-details="auto"
						:error-messages="errors.phone"
						type="number"
						v-model="form.phone"
						dense
						class="elevation-0"
					></v-text-field>
				</v-card>

				<v-subheader class="py-0 px-2 mt-3">Alamat</v-subheader>
				<v-card tile elevation="0" class="pa-2 mb-2">
					<v-textarea
						placeholder="Kota, Kecamatan, Desa"
						flat
						solo
						readonly
						hide-details="auto"
						:error-messages="errors.full_address"
						dense
						auto-grow
						class="elevation-0"
						append-icon="mdi-chevron-right"
						v-model="full_address"
						@click="appendIconCallback"
						@click:append="appendIconCallback"
					></v-textarea>
					<v-divider />
					<v-text-field
						placeholder="Nama jalan, No. Rumah/Gedung"
						flat
						solo
						hide-details="auto"
						:error-messages="errors.road"
						v-model="form.road"
						dense
						class="elevation-0"
					></v-text-field>
					<v-divider />
					<v-text-field
						placeholder="Detail lainnya (..Sebelah warkop/mesjid)"
						flat
						solo
						hide-details="auto"
						:error-messages="errors.details"
						v-model="form.details"
						dense
						class="elevation-0"
					></v-text-field>
				</v-card>
				<div class="px-2 mt-3">
					<v-btn
						class=""
						block
						color="primary"
						:disabled="btnDisabled"
						:loading="btnLoading"
						@click="saveAddress"
						>Simpan</v-btn
					>
				</div>
			</v-sheet>
		</v-main>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		dialog: Boolean,
	},
	data() {
		return {
			// btnDisabled: true,
			showMaps: false,
			btnLoading: false,
			form: {
				contact: "",
				phone: "",
				full_address: "",
				road: "",
				details: "",
			},
			errors: {
				contact: "",
				phone: "",
				road: "",
				details: "",
			},
		};
	},
	computed: {
		...mapGetters({
			full_address: "getTextMapAddress",
		}),
		btnDisabled: function () {
			let disabled = false;
			if (this.form.contact == "") {
				disabled = true;
			}
			if (this.form.phone == "") {
				disabled = true;
			}
			if (this.full_address == "") {
				disabled = true;
			}
			if (this.form.road == "") {
				disabled = true;
			}
			if (this.form.details == "") {
				disabled = true;
			}
			return disabled;
		},
	},
	mounted() {
		const oldForm = this.$store.getters.getAddressForm;
		this.form.contact = oldForm.contact;
		this.form.phone = oldForm.phone;
		this.form.full_address = oldForm.full_address;
		this.form.road = oldForm.road;
		this.form.details = oldForm.details;
	},
	methods: {
		closeMapsDialog() {
			this.showMaps = false;
		},
		addAddress() {},
		closeDialog() {
			this.$emit("closeDialog");
		},
		appendIconCallback() {
			this.form.full_address = this.full_address;
			this.$store.commit("setAddressForm", this.form);
			this.$router.push({ name: "example" });
		},
		saveAddress() {
			this.btnLoading = true;
			this.form.full_address = this.full_address;
			this.$store
				.dispatch("auth/addAddress", this.form)
				.then((response) => {
					this.btnLoading = false;
					this.$router.back();
				})
				.catch((e) => {
					this.btnLoading = false;
					console.log(e);
				});
		},
	},
};
</script>

<style>
</style>