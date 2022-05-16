<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar tile class="pa-0">
					<v-img src="/assets/images/indomaret.png" contain></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>Indomaret / i.Saku</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar tile class="pa-0" />
				<v-list-item-content>
					<v-list-item-title>No. Handphone</v-list-item-title>
					<v-list-item-subtitle>082745556772</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-list class="mt-2">
			<v-list-item>
				<v-list-item-title>Instruksi Pembayaran</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<ul class="numbered-list">
					<li v-for="(step, i) in steps" :key="i">{{step}}</li>
				</ul>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
export default {
    data(){
        return{
            steps: [
                "Datangi toko Indomaret terdekat",
                "Sampaikan Kepada kasir untuk melakukan isi ulang MlijoPay",
                "Beritahukan no. handphone yang kamu gunakan untuk top up MlijoPay",
                "Beritahu jumlah MlijoPay yang kamu inginkan. (Pilih Rp10.000, Rp20.000, Rp50.000, Rp100.000, Rp200.000, Rp500.000)",
                "Kasir akan mengisi saldo ke akun MlijoPay kamu",
                "Pastikan MlijoPay kamu sudah bertambah",
            ]
        }
    }
};
</script>

<style lang="scss" scoped>
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
            background-color: #87BD43;
			border: 1px solid #87BD43;
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