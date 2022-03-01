<template>
	<div style="height: 100%; background-color: #f5f5f5">
		<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>

		<div class="my-2">
			<v-card class="noselect py-1">
				<div class="d-flex align-end justify-space-between px-1 py-1">
					<div class="d-flex align-end">
						<v-icon>mdi-map-marker-radius-outline</v-icon>
						<div class="title-text ml-1">Alamat Pengiriman</div>
					</div>
					<div class="title-text link-text">Pilih Alamat Lain</div>
				</div>
				<v-divider class="ma-1"></v-divider>
				<div style="min-width: 100%" class="px-2">
					<div
						v-ripple
						class="
							d-flex
							justify-center
							align-center
							subtitle-text
							rounded
							address-box-empty
						"
					>
						MOHON LENGKAPI ALAMAT
					</div>
				</div>
			</v-card>

            <v-card>
                
            </v-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
		};
	},
	mounted() {
		console.log(this.$router);
	},
};
</script>

<style>
.address-box-empty {
	width: 100%;
    color: #FF0000;
    font-weight: 600;
	min-height: 5rem;
	border-width: 1px;
	border-style: solid;
	border-color: #FF0000;
}
</style>