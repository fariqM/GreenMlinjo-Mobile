<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Pengiriman'"></mlj-toolbar>
			<my-scroll
				ref="vs"
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 128 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 128 + 'px'"
					:max-height="windowsHeight - 128 + 'px'"
					max-width="99.8vw"
				>
					<home-corousels
						:skeleton="skeleton_show"
						:showBar="false"
					></home-corousels>

					<div style="max-width: 90%; display: contents">
						<div style="padding: 0 1rem">
							<step-progress
								v-if="!skeleton_show"
								:steps="mySteps"
								:current-step="currentStep"
								icon-class="fa fa-check"
								:active-thickness="2"
								:passive-thickness="2"
								:line-thickness="7"
								:active-color="'#87BD43'"
							></step-progress>
							<div v-else style="margin-top: 1.1rem">
								<skeleton
									width="90vw"
									height="20px"
									animation="wave"
									:radius="3"
								>
								</skeleton>
							</div>
						</div>
					</div>

					<v-card style="margin-top: 2rem">
						<div class="px-2 py-1 d-flex justify-space-between title-text">
							<span>Detail Pesanan</span>
							<span>GM-13482jhj</span>
						</div>
						<v-divider />
						<div
							class="pa-2 d-flex justify-space-between"
							v-for="n in 4"
							:key="n"
						>
							<div class="d-flex">
								<v-avatar tile size="50">
									<v-img src="https://picsum.photos/id/11/500/300"></v-img>
								</v-avatar>
								<div class="d-flex flex-column ml-1">
									<span class="product-title-text">Wortel Spesiap</span>
									<span class="product-subtitle-text">x2Kg (3-7 pcs)</span>
									<span class="product-subtitle-text">Catatan : </span>
								</div>
							</div>
							<div class="product-title-text" style="color: rgb(9, 137, 60)">
								<span>Rp {{ numberWithCommas(123123) }}</span>
							</div>
						</div>
						<v-divider />
						<div class="pa-2 d-flex flex-column total-text total-subheader">
							<div class="d-flex justify-space-between">
								<span> Jumlah Subtotal </span>
								<span> Rp {{ numberWithCommas(123123) }}</span>
							</div>
							<div class="d-flex justify-space-between">
								<span> Jumlah Pengiriman </span>
								<span> Rp {{ numberWithCommas(123123) }}</span>
							</div>
							<div class="d-flex justify-space-between">
								<span> Jumlah Penanganan </span>
								<span> Rp {{ numberWithCommas(123123) }}</span>
							</div>
						</div>
					</v-card>
				</v-sheet>
			</my-scroll>
		</v-main>
		<v-card tile class="bottom-container white pa-2">
			<div
				class="d-flex justify-space-between mb-1"
				style="font-size: 1rem; font-weight: 700;"
			>
				<span>Total Harga</span>
				<span> Rp {{ numberWithCommas(123123) }}</span>
			</div>
			<v-btn @click="currentStep +=1" block color="primary" :disabled="currentStep === 3 ? false : true">
				Pesanan telah diterima
			</v-btn>
		</v-card>
		<!-- <div style="position: absolute; bottom: 0">
			<v-btn @click="skeleton_show = !skeleton_show">prev</v-btn>
		</div> -->
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import HomeCorousels from "../components/home/HomeCorousel.vue";
import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";
export default {
	components: {
		MyScroll,
		HomeCorousels,
		"step-progress": StepProgress,
	},
	data() {
		return {
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			skeleton_show: false,
			loading: false,
			mySteps: ["Mencari driver", "", "", ""],
			currentStep: 0,
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

	mounted() {
		this.deliveryProgress();
	},
	methods: {
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
		deliveryProgress() {
			const progress = [
				"Mencari driver",
				"Driver sedang antre",
				"Driver menuju alamat anda",
				"Pesanan telah sampai",
			];

			setTimeout(() => {
				this.currentStep = 1;
				this.mySteps[1] = progress[1];
			}, 2000);

			setTimeout(() => {
				this.currentStep = 2;
				this.mySteps[2] = progress[2];
			}, 4000);

			setTimeout(() => {
				this.currentStep = 3;
				this.mySteps[3] = progress[3];
			}, 6000);
		},
	},
};
</script>

<style>
.step-progress__step-label {
	word-wrap: break-word;
	white-space: pre-wrap;
	text-align: center;
	font-size: 0.7rem;
	top: calc(100% + 5px);
}
.step-progress__wrapper {
	top: -15px;
}
.total-subheader {
	font-size: 0.9rem;
	font-weight: 600;
}
.total-text {
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 0.1rem;
	color: rgba(0, 0, 0, 0.87);
	font-weight: 500;
}
</style>