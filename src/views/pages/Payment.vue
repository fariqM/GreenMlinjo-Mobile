<template>
	<div style="height: 100%">
		<v-main>
			<mlj-toolbar :loading="loading" :page="'Metode Pembayaran'"></mlj-toolbar>
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
					<v-list>
						<div
							v-for="(payment, i) in payments"
							:key="i"
							class="d-flex align-center"
						>
							<v-list-item
								:style="{ width: payment.type === 2 ? '70%' : '100%' }"
								:ripple="false"
								:disabled="
									payment.type === 3 ? false : balance > amount ? false : true
								"
								v-if="!payment.child"
								@click="paymentClicked(payment.type)"
							>
								<v-list-item-action>
									<v-checkbox
										v-model="paymentMethod.pay"
										v-if="payment.type === 2"
									></v-checkbox>
									<v-checkbox
										v-model="paymentMethod.cod"
										v-if="payment.type === 3"
									></v-checkbox>
								</v-list-item-action>
								<v-list-item-icon class="mr-2">
									<v-icon>{{ payment.icon }}</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>{{ payment.title }}</v-list-item-title>
									<v-list-item-subtitle
										class="link-text"
										v-if="payment.type === 2 && balance !== null"
										>Rp{{ numberWithCommas(balance) }}</v-list-item-subtitle
									>
								</v-list-item-content>
							</v-list-item>
							<div v-if="payment.type === 2" class="pr-4">
								<v-btn color="primary" outlined small :to="{ name: 'topup' }">
									Isi Saldo
								</v-btn>
							</div>
						</div>
					</v-list>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn @click="routeBack" block color="primary" :disabled="btnDisabled"
				>Konfirmasi</v-btn
			>
		</div>
	</div>
</template>

<script>
import MyScroll from "vuescroll";
import { mapGetters } from "vuex";

export default {
	components: {
		MyScroll,
	},
	data() {
		return {
			loading: false,
			url: __BASE_URL__,
			amount: null,
			admins: [
				["Transfer Bank", "mdi-account-multiple-outline"],
				["COD (Bayar di tempat)", "mdi-cog-outline"],
				["MlijoPay", "mdi-cog-outline"],
			],
			paymentMethod: {
				bank: false,
				pay: false,
				cod: false,
			},
			cruds: [
				["Create", "mdi-plus-outline"],
				["Read", "mdi-file-outline"],
				["Update", "mdi-update"],
				["Delete", "mdi-delete"],
			],
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
	computed: {
		...mapGetters({
			payments: "others/getPaymentMethod",
			selectedPayment: "others/getSelectedPayment",
			balance: "auth/getBalance",
		}),
		btnDisabled: function () {
			let disabled = true;

			if (this.paymentMethod.pay || this.paymentMethod.cod) {
				disabled = false;
			}

			return disabled;
		},
	},
	mounted() {
		this.amount = this.$router.history.current.params.amount;
		if (this.selectedPayment === 1) {
			this.paymentMethod.bank = true;
		}
		if (this.selectedPayment === 2) {
			this.paymentMethod.pay = true;
		}
		if (this.selectedPayment === 3) {
			this.paymentMethod.cod = true;
		}
		if (this.amount > this.balance) {
			this.paymentMethod.pay = false;
			this.paymentMethod.cod = true;
			this.$store.commit("others/setSelectedPayment", 3);
		}
	},
	methods: {
		paymentClicked(type) {
			this.$store.commit("others/setSelectedPayment", type);
			if (type === 2) {
				this.paymentMethod.pay = true;
				this.paymentMethod.cod = false;
			} else {
				this.paymentMethod.pay = false;
				this.paymentMethod.cod = true;
			}
		},
		routeBack() {
			this.$router.back();
		},
		numberWithCommas(x) {
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		},
	},
};
</script>

<style>
.bottom-container-payment {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: #fff;
}
</style>