<template>
	<div>
		<v-toolbar color="primary" elevation="0" tile dense absolute width="100%">
			<v-btn icon @click="navigation_back">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-toolbar-title>Alamat baru</v-toolbar-title>
		</v-toolbar>
		<v-card style="margin-top: 48px">
			<div style="width: 100%; height: 100%">
				<div style="height: calc(100vh - 48px); width: 100%" id="mymap"></div>
				<div
					v-if="address !== '' && address !== null"
					style="
						position: absolute;
						bottom: 0px;
						z-index: 99999;
						width: 100%;
						padding: 0.3rem 0.4rem;
						margin-bottom: 2.5rem;
					"
				>
					<v-card @click="navigation_back" v-ripple>
						<div class="d-flex flex-row justify-space-between pa-2">
							<div
								style="max-height: 100px; max-width: 90%"
								class="ellipsis-text"
							>
								{{ address }}
							</div>
							<div >
								<v-icon> mdi-chevron-right </v-icon>
							</div>
						</div>
					</v-card>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
	data() {
		return {
			token:
				"pk.eyJ1IjoiYm9yZXFvZnUiLCJhIjoiY2wwNnM5dzE5MDU3czNjbHZmbGhsbGZ2MCJ9.nNAbUcoqk9PpyZS8nz0T_A",
			maps: {},
			dialog: true,
			geocoder: {},
			searchInput: "",
			marker: null,
			location: [],
			address: "",
			fullAddress: {},
		};
	},
	mounted() {
		console.log(this.$router);
		this.setMap();
	},
	watch: {},
	methods: {
		setMap() {
			mapboxgl.accessToken = this.token;
			this.maps = new mapboxgl.Map({
				container: "mymap",
				style: "mapbox://styles/mapbox/streets-v11",
				center: [112.73469739249269, -7.302882498123081],
				zoom: 10,
			});

			this.geocoder = new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
				countries: "id",
				language: "id",
				marker: false,
				flyTo: {
					easing: function (t) {
						return t;
					},
					zoom: 14, // If you want your result not to go further than a specific zoom
				},
			});
			// Get the geocoder results container.

			this.maps.addControl(this.geocoder);
			this.geocoder.on("result", (e) => {
				this.location = e.result.center;
				console.log(this.location);
				this.getAddress();
				// resultCont.innerText = JSON.stringify(e.result, null, 2);
				if (this.marker !== null) {
					this.marker.remove();
				}
				// this.geocoder.clear();
				this.marker = new mapboxgl.Marker({ draggable: true })
					.setLngLat(e.result.center)
					.addTo(this.maps);
				this.marker.on("dragend", () => {
					this.location[0] = this.marker.getLngLat().lng;
					this.location[1] = this.marker.getLngLat().lat;

					console.log(this.location);
				});
			});
		},
		getAddress() {
			fetch(
				`https://us1.locationiq.com/v1/reverse.php?key=pk.7fac90def5c0cd43d1b6bb9c7fdf8646
                &lat=${this.location[1]}&lon=${this.location[0]}
                &format=json&accept-language=id`
			)
				.then((response) => response.json())
				.then((data) => {
					this.mapAddress(data.address);
					this.fullAddress = data.address;
					console.log(data);
				});
		},
		mapAddress(address) {
			let newAdress = "";
			// desa
			if (address.suburb) {
				newAdress = newAdress + address.suburb + ", ";
			} else if (address.village) {
				newAdress = newAdress + address.village + ", ";
			}

			// kecamatan
			if (address.municipality) {
				newAdress = newAdress + address.municipality + ", ";
			}

			// post code
			if (address.postcode) {
				newAdress = newAdress + address.postcode + ", ";
			}

			// kota/kabupaten
			if (address.city) {
				newAdress = newAdress + address.city + ", ";
			} else if (address.county) {
				newAdress = newAdress + address.county + ", ";
			}

			// provinsi
			if (address.state) {
				newAdress = newAdress + address.state + ", ";
			}

			// negara
			if (address.country) {
				newAdress = newAdress + address.country + ".";
			}

			this.address = newAdress.toUpperCase();
			this.$store.commit("setMapAddress", {
				fullAddress: address,
				text: this.address,
			});
		},
		closeDialog() {
			this.$emit("closeDialog");
		},
        navigation_back() {
			this.$router.back();
		},
	},
};
</script>

<style>
.mapboxgl-ctrl-top-right .mapboxgl-ctrl {
	margin: 0 !important;
}
.mapboxgl-ctrl-top-right {
	padding: 1rem !important;
}
</style>