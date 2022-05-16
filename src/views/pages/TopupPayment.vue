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
					<v-list class="py-0">
						<div v-for="(payment, i) in payments" :key="i">
							<v-list-group
								prepend-icon="mdi-swap-horizontal"
								no-action
								v-if="payment.child"
							>
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title class="t-list-title">{{
											payment.title
										}}</v-list-item-title>
									</v-list-item-content>
								</template>

								<v-list-item
									:ref="'paymentBank' + bank.id"
									v-for="(bank, n) in payment.child"
									:key="n"
									style="height: fit-content"
									@click="
										paymentClicked(
											payment.type,
											bank.id,
											'paymentBank' + bank.id
										)
									"
								>
									<v-list-item-avatar tile style="align-self: start">
										<v-img :src="bank.icon" contain></v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title class="title-text">
											{{ bank.title }}
										</v-list-item-title>
										<v-list-item-subtitle
											class="subtitle-text"
											v-html="bank.subtitle"
											style="white-space: normal"
										>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list-group>
						</div>

						<v-list-item
							:ref="'payment' + 4"
							@click="paymentClicked(4, null, 'payment' + 4)"
						>
							<v-list-item-avatar tile class="pa-0">
								<v-img src="/assets/images/alfamaret.png" contain></v-img>
							</v-list-item-avatar>
							<v-list-item-title class="t-list-title"
								>Alfamart / Alfamidi</v-list-item-title
							>
						</v-list-item>

						<v-list-item
							:ref="'payment' + 5"
							@click="paymentClicked(5, null, 'payment' + 5)"
							v
						>
							<v-list-item-avatar tile class="pa-0">
								<v-img src="/assets/images/indomaret.png" contain></v-img>
							</v-list-item-avatar>
							<v-list-item-title class="t-list-title"
								>Indomaret / i.Saku</v-list-item-title
							>
						</v-list-item>
					</v-list>
				</v-sheet>
			</my-scroll>
		</v-main>
		<div class="pa-2 bottom-container-payment">
			<v-btn @click="confirmPayment" block color="primary" :loading="btnLoading" :disabled="btnDisabled"
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
            btnLoading:false,
			url: __BASE_URL__,
			windowWidth: window.innerWidth,
			windowsHeight: window.innerHeight,
			classActive: null,
			paymentSelected: null,
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
		}),
		btnDisabled: function () {
			if (this.paymentSelected === null) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
        confirmPayment(){
            this.btnLoading = true
            setTimeout(() => {
                this.btnLoading = false
                this.$router.replace({name:'topup.process'})
            }, 1200);
        },
		paymentClicked(type, bankId = null, DomRef) {
            this.paymentSelected = type
			this.$store.commit("others/setTopupMethod", {
				type: type,
				bankId: bankId,
			});
			if (type === 1) {
				var dom = this.$refs[DomRef][0].$el;
			} else {
				var dom = this.$refs[DomRef].$el;
			}
			if (this.classActive !== null) {
				this.classActive.classList.remove("payment-list-active");
			}
			this.classActive = dom;
			this.classActive.classList.add("payment-list-active");
		},
		routeBack() {
			this.$router.back();
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
.t-list-title {
	color: rgba(0, 0, 0, 0.87);
	font-size: 1rem !important;
	font-weight: 400;
}
.payment-list-active {
	background-color: #d9fdd0;
}
</style>