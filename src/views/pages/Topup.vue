<template>
	<div style="height: 100%; background-color: #f5f5f5">
		<v-main>
			<div style="height: 100%; background-color: #f5f5f5">
				<mlj-toolbar
					:loading="loading"
					:page="'Isi Saldo MlijoPay'"
				></mlj-toolbar>
				<my-scroll
					ref="vs"
					:ops="ops"
					:style="{ height: windowsHeight - 98 + 'px' }"
				>
					<v-sheet max-width="99.8vw" :height="windowsHeight - 98 + 'px'">
						<v-subheader class="title-text noselect b-subheader py-2">
							Pilihan Nominal Topup
						</v-subheader>

						<v-row no-gutters justify="center" align="center" class="px-2">
							<v-col
								cols="6"
								sm="3"
								md="3"
								v-for="(nominal, i) in nominals"
								:key="i"
								class="pa-2"
							>
								<v-card
									:ripple="true"
									:ref="'nomcard' + i"
									@click="nominalClicked(i, nominal.value)"
									style="font-size: 1.5rem; font-weight: 400"
									class="text-center pa-4 noselect"
								>
									{{ nominal.text }}
								</v-card>
							</v-col>
						</v-row>
						<v-subheader class="title-text noselect b-subheader py-2">
							Pilihan Nominal Topup
						</v-subheader>
						<div class="px-4">
							<v-text-field
								prefix="Rp"
								flat
								solo
								outlined
								type="number"
								:append-icon="selectedNominal == null ? '' : 'mdi-close'"
								@click:append="appendIconCallback"
								v-model="selectedNominal"
							></v-text-field>
						</div>
						<!-- <v-btn @click="makeTopup">tes</v-btn> -->
					</v-sheet>
				</my-scroll>
			</div>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn block color="primary" :disabled="btnDisabled"> Top Up</v-btn>
		</div>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
export default {
	components: {
		MyScroll,
	},
	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			loading: false,
			classActive: null,
			selectedNominal: null,
			nominals: [
				{
					text: "10ribu",
					value: 10000,
				},
				{
					text: "20ribu",
					value: 20000,
				},
				{
					text: "50ribu",
					value: 50000,
				},
				{
					text: "100ribu",
					value: 100000,
				},
				{
					text: "200ribu",
					value: 200000,
				},
				{
					text: "500ribu",
					value: 500000,
				},
			],
			ops: {
				vuescroll: {
					mode: "native",
					sizeStrategy: "percent",
					detectResize: true,
					/** Enable locking to the main axis if user moves only slightly on one of them at start */
					locking: true,
				},
				scrollPanel: {
					initialScrollY: false,
					initialScrollX: false,
					scrollingX: true,
					scrollingY: true,
					speed: 300,
					easing: "easeInCubic",
					verticalNativeBarPos: "right",
					maxHeight: "100%",
					// maxHeight: "300",
				},
				rail: {
					background: "#87BD43",
					opacity: 0,
					size: "3px",
					specifyBorderRadius: false,
					gutterOfEnds: null,
					gutterOfSide: "2px",
					keepShow: false,
				},
				bar: {
					showDelay: 500,
					onlyShowBarOnScroll: false,
					keepShow: false,
					background: "#87BD43",
					opacity: 1,
					hoverStyle: true,
					specifyBorderRadius: false,
					minSize: 0,
					size: "5px",
					disable: false,
				},
				scrollButton: {
					enable: false,
					background: "#87BD43",
					opacity: 1,
					step: 180,
					mousedownStep: 30,
				},
			},
		};
	},
	computed: {
		btnDisabled: function () {
			if (this.selectedNominal == null) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		makeTopup() {
			console.log(parseInt(this.selectedNominal.replace(".", "")));
		},
		nominalClicked(i, value) {
			this.selectedNominal = this.numberWithCommas(value);
			if (this.classActive !== null) {
				this.classActive.classList.remove("nominal-active");
			}
			this.classActive = this.$refs[`nomcard${i}`][0].$el;
			this.classActive.classList.add("nominal-active");
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			return parts.join(".");
		},
		appendIconCallback() {
			this.selectedNominal = null;
			if (this.classActive !== null) {
				this.classActive.classList.remove("nominal-active");
			}
		},
	},
};
</script>

<style>
.nominal-active {
	border: 2px solid #87bd43 !important;
}
.b-subheader {
	font-size: 1rem !important;
	color: #000 !important;
	height: fit-content;
}
.bottom-container-topup {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: #fff;
}
</style>