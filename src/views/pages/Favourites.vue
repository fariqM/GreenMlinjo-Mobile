<template>
	<v-main>
		<search-bar></search-bar>

		<v-row no-gutters justify="start" class="py-1 px-1">
			<v-col cols="12" md="12" sm="12">
				<v-card class="mx-auto" max-width="100%" outlined>
					<v-list-item three-line>
						<v-list-item-avatar class="py-0 px-0" tile size="90" color="grey">
              	<v-img :src="url+'storage/images/products/wortel.jpg'"></v-img>
						</v-list-item-avatar>
					
						<v-list-item-content>
							<!-- <div class="text-overline">OVERLINE</div> -->
							<v-list-item-title class="text-h6">
								ABGHIYZLQWabcdefghijykqlwepux
							</v-list-item-title>
							<div class="d-flex">
								<v-chip
									x-small
									v-for="(promotion, i) in 4"
									:key="i"
									class="mr-1"
									color="primary"
									>tes</v-chip
								>
								<v-spacer></v-spacer>
								<!-- <v-chip small>tes</v-chip> -->
							</div>
							<div class="d-flex justify-space-between">
								<v-btn
									icon
									text
									color="warning"
									height="1.9rem"
									width="1.07rem"
								>
									<v-icon large>mdi-delete-outline</v-icon>
								</v-btn>
								<v-btn
									text
									x-small
									outlined
									color="primary"
									class="pa-4"
									width="85%"
								>
									<v-icon x-small color="primary" class="mr-2">mdi-plus</v-icon>
									Keranjang
								</v-btn>
								<!-- <v-btn outlined rounded small width="85%"> Tambahkan ke keranjang </v-btn> -->
							</div>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
		<!-- <v-sheet>
     asd
   </v-sheet> -->
	</v-main>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";

export default {
	components: {
		SearchBar,
	},
	data() {
		return {
			url: __BASE_URL__,
		};
	},
};
</script>

<style>
</style>