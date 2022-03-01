<template>
	<div>
		<mlj-toolbar :loading="loading" :page="'Maps Geo'"></mlj-toolbar>

		<v-row justify="center" align="center" style="height: 80vh">
			<p>
				{{ text }}
			</p>
			<v-btn color="pirmary" @click="cek">chek</v-btn>
		</v-row>
	</div>
</template>

<script>
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@awesome-cordova-plugins/geolocation";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions";
import { LocationAccuracy } from "@awesome-cordova-plugins/location-accuracy";

export default {
	data() {
		return {
			loading: false,
			text: "",
		};
	},
	methods: {
		checkGeo() {
			this.getLocation()
				.then((location) => {
					console.log(location.coords);
					this.text = JSON.stringify({
						latitude: location.coords.latitude,
						logintude: location.coords.logintude,
						accuracy: location.coords.accuracy,
					});
				})
				.catch((e) => {
					console.log(e);
				});
		},

		reverseGeoloc() {
			this.getLocation()
				.then((location) => {
					console.log(location.coords);
					this.text = JSON.stringify({
						latitude: location.coords.latitude,
						logintude: location.coords.logintude,
						accuracy: location.coords.accuracy,
					});
				})
				.catch((e) => {
					console.log(e);
				});
		},

		checkGPSPermission() {
			return new Promise((resolve, reject) => {
				AndroidPermissions.checkPermission(
					AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION
				)
					.then((result) => {
						resolve(result);
					})
					.catch((e) => {
						reject(e);
					});
				const platform = Capacitor.getPlatform();
				// if (platform === "android" || platform === "ios") {

				// } else {
				// 	// this resolve params equal to result above
				// 	resolve({ hasPermission: true });
				// }
			});
		},

		askAllowAccessGPS() {
			return new Promise((resolve, reject) => {
				AndroidPermissions.requestPermission(
					AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION
				)
					.then(
						(result) => {
							resolve(result);
						},
						(error) => {
							reject(error);
						}
					)
					.catch((e) => {
						reject(e);
					});
			});
		},

		askTurnOnGPS() {
			return new Promise((resolve, reject) => {
				LocationAccuracy.canRequest().then((canRequest) => {
					// check if user allowed application to access location
					if (canRequest) {
						// if true, ask user to turn on GPS if its off
						LocationAccuracy.request(
							LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
						).then(
							(result) => {
								console.log("Turn on location success !!");
								console.log(result);
								resolve({ action: true });
							},
							(error) => {
								console.log("Turn on location failed !!");
								console.log(error);
								resolve({ action: false });
							}
						);
					} else {
						reject("User doesnt allow application to access location.");
					}
				});
			});
		},

		getLocation() {
			return new Promise((resolve, reject) => {
				Geolocation.getCurrentPosition({ enableHighAccuracy: true })
					.then((location) => {
						resolve(location);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},

		cek() {
			const platform = Capacitor.getPlatform();
			if (platform === "android" || platform === "ios") {
				this.checkGPSPermission().then((result) => {
					if (result.hasPermission) {
						console.log("masuk 1");
						this.askTurnOnGPS().then((click) => {
							console.log(click);
							if (click.action) {
								console.log("masuk 1.1");
								this.getLocation()
									.then((location) => {
										console.log(location);
										this.text = JSON.stringify({
											latitude: location.coords.latitude,
											logintude: location.coords.logintude,
											accuracy: location.coords.accuracy,
										});
									})
									.catch((e) => {
										console.log(e);
									});
							} else {
								alert("Yahh gamau nyalain lokasi pak!!");
							}
						});
					} else {
						console.log("masuk 2");
						this.askAllowAccessGPS().then((result) => {
							if (result.hasPermission) {
								console.log("masuk 2.1");
								this.askTurnOnGPS().then((click) => {
									console.log(click);
									if (click.action) {
										console.log("masuk 2.2");
										this.getLocation()
											.then((location) => {
												console.log(location);
												this.text = JSON.stringify({
													latitude: location.coords.latitude,
													logintude: location.coords.logintude,
													accuracy: location.coords.accuracy,
												});
											})
											.catch((e) => {
												console.log(e);
											});
									} else {
										alert("Yahh gamau nyalain lokasi pak!!");
									}
								});
							} else {
								alert("Yahh ga di izinin pak!!");
							}
						});
					}
				});
			} else {
				this.getLocation()
					.then((location) => {
						console.log(location.coords);
						this.text = JSON.stringify({
							latitude: location.coords.latitude,
							logintude: location.coords.logintude,
							accuracy: location.coords.accuracy,
						});
					})
					.catch((e) => {
						console.log(e);
					});
			}
		},
	},
};
</script>

<style>
</style>