<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar
				:loading="loading"
				:page="'Pembayaran'"
				:isUseBack="true"
				:routeTarget="'home'"
			></mlj-toolbar>
			<my-scroll
				:ops="ops"
				:style="{ 'max-height': windowsHeight - 100 + 'px' }"
			>
				<v-sheet
					color="#f5f5f5"
					:height="windowsHeight - 100 + 'px'"
					:max-height="windowsHeight - 100 + 'px'"
					max-width="99.8vw"
				>
					<indomaret v-if="topupMethod.type === 5" />
					<alfamaret v-if="topupMethod.type === 4" />
					<bank-payment
						v-if="topupMethod.type === 1"
						:bankId="topupMethod.bankId"
					/>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn @click="sendTopup" block color="primary">OK</v-btn>
		</div>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate size="30"></v-progress-circular>
		</v-overlay>
		<div class="text-center">
			<v-dialog v-model="isTopupSuccess">
				<v-card class="">
					<v-card-title style="font-size: 1rem; justify-content: space-around"
						>Pembayaran Berhasil!</v-card-title
					>
					<v-card-actions>
						<v-btn block color="primary" :to="{name:'home'}">Kembali</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="isTopupFailed">
				<v-card class="">
					<v-card-title style="font-size: 1rem; justify-content: space-around"
						>Pembayaran Gagal!</v-card-title
					>
					<v-card-subtitle style="font-size: 0.8rem; justify-content: space-around"
						>Mohon coba lain waktu.</v-card-subtitle
					>
					<v-card-actions>
						<v-btn block color="primary" :to="{name:'home'}">Kembali</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import MyScroll from "vuescroll";
import Indomaret from "../components/payment/Indomaret.vue";
import Alfamaret from "../components/payment/Alfamaret.vue";
import BankPayment from "../components/payment/Bank.vue";

export default {
	components: {
		MyScroll,
		Indomaret,
		Alfamaret,
		BankPayment,
	},
	computed: {
		...mapGetters({
			topupMethod: "others/getTopupMethod",
			nominalTopup: "others/getNominalTopup",
		}),
	},
	data() {
		return {
			dialog: false,
			overlay: false,
			loading: false,
			isTopupSuccess: false,
			isTopupFailed: false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
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

	methods: {
		sendTopup() {
			this.overlay = true;
			this.$store
				.dispatch("auth/makeTopup", { balance: this.nominalTopup })
				.then((response) => {
					this.isTopupSuccess = true
					this.overlay = false;
				})
				.catch((e) => {
					this.isTopupFailed = true
					console.log(e);
				});
		},
		routeBack() {
			this.$router.back();
		},
	},
};
</script>

