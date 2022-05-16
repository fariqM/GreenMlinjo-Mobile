<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar tile class="pa-0">
					<v-img
						v-if="bankId !== null"
						:src="
							bankId == 1
								? payments[0].child[0].icon
								: payments[0].child[1].icon
						"
						contain
					></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-if="bankId !== null"
						>{{
							bankId == 1 ? "Bank BCA (Otomatis)" : "Bank Mandiri (Otomatis)"
						}}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar tile class="pa-0" />
				<v-list-item-content>
					<v-list-item-title>No. Rekening:</v-list-item-title>
					<v-list-item-subtitle>{{
						user.phone.replace("0", "6278")
					}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item class="py-0">
				<v-list-item-avatar tile class="pa-0" style="height: 5px" />
				<v-list-item-content class="pa-0">
					<v-list-item-subtitle
						style="white-space: normal; font-size: 0.7rem !important"
						class="normal-text link-text mt-2"
					>
						Pembayaran akan dicek secara otomatis.
					</v-list-item-subtitle>
					<v-list-item-subtitle
						v-if="bankId == 1"
						style="white-space: normal; font-size: 0.7rem !important"
						class="normal-text mt-2"
					>
						Hanya menerima dari Bank BCA.<br />Metode pembayaran lebih mudah.
					</v-list-item-subtitle>
					<v-list-item-subtitle
						v-if="bankId == 2"
						style="white-space: normal; font-size: 0.7rem !important"
						class="normal-text mt-2"
					>
						Menerima semua Bank termasuk Bank Syariah.<br>Metode pembayaran lebih mudah.
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-list class="mt-2">
			<div v-for="(method, i) in payments[0].child" :key="i">
				<template v-if="method.id == bankId">
					<v-list-group v-for="(stepPayment, y) in method.steps" :key="y">
						<template v-slot:activator>
							<v-list-item-title class="title-text"
								>Peetunjuk Pembayaran
								{{ stepPayment.method }}</v-list-item-title
							>
						</template>

						<v-list-item>
							<ul class="numbered-list">
								<li
									v-for="(step, i) in stepPayment.steps"
									:key="i"
									v-html="
										step.replace('__phone', user.phone.replace('0', '6278'))
									"
								></li>
							</ul>
						</v-list-item>
					</v-list-group>
				</template>
			</div>
		</v-list>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		bankId: {
			type: [Number, String],
			default: null,
		},
	},
	data() {
		return {
			steps: [
				"Datangi toko Alfamaret terdekat",
				"Sampaikan Kepada kasir untuk melakukan isi ulang MlijoPay",
				"Beritahukan no. handphone yang kamu gunakan untuk top up MlijoPay",
				"Beritahu jumlah MlijoPay yang kamu inginkan. (Pilih Rp10.000, Rp20.000, Rp50.000, Rp100.000, Rp200.000, Rp500.000)",
				"Kasir akan mengisi saldo ke akun MlijoPay kamu",
				"Pastikan MlijoPay kamu sudah bertambah",
			],
		};
	},
	computed: {
		...mapGetters({
			payments: "others/getPaymentMethod",
			user: "auth/getUser",
		}),
	},
	mounted() {
		setTimeout(() => {
			console.log(this.payments);
		}, 2000);
	},
};
</script>

<style lang="scss">
ul.numbered-list {
	counter-reset: li;
	list-style-type: none;
	font-size: 14px;
	line-height: 18px;
	padding-left: 10px;

	li {
		position: relative;
		padding: 5px 0 5px 30px;

		&:before {
			content: counter(li);
			counter-increment: li;
			height: 20px;
			width: 20px;
			background-color: #87bd43;
			border: 1px solid #87bd43;
			border-radius: 50%;
			color: white;
			text-align: center;
			position: absolute;
			left: 0;
			top: 4px;
		}
	}
}
</style>