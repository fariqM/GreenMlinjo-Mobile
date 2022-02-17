<template>
	<v-card class="mx-auto" max-width="100%" outlined elevation="3">
		<v-list class="pa-0 info">
			<v-list-item three-line class="pa-0 accent">
				<v-list-item-avatar class="py-0 px-0" tile size="75" color="grey">
					<v-img :src="url + cart.url"></v-img>
				</v-list-item-avatar>

				<v-list-item-content class="">
					<!-- List1 -->
					<v-list-item-title class="">
						<div style="font-weight: 700">
							{{ cart.title }}
						</div>
					</v-list-item-title>

					<!-- List2 -->
					<div class="normal-text">
						{{ cart.min_qty_per_unit }}-{{ cart.max_qty_per_unit }}
						{{ cart.sub_unit }}/{{ cart.unit }}
					</div>

					<!-- List3 -->
					<div class="">
						<div class="d-flex justify-space-between align-center pt-1 pb-3">
							<div>
								<div
									class="pt-2 info"
									style="
										max-width: 95px;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
									"
								>
									Rp {{ numberWithCommas(cart.min_price) }} - Rp
									{{ numberWithCommas(cart.max_price) }}
								</div>
							</div>
							<div
								:ref="'costum-input' + cart.id"
								class="
									v-input
									v-input--solo
									v-input--hide-details
									v-input--is-label-active
									v-input--is-dirty
									v-input--dense
									theme--light
									v-text-field
									v-text-field--outlined
									v-text-field--is-booted
									v-text-field--enclosed
									pb-4
								"
								style="
									max-width: 100px;
									width: 70px;
									padding: 0px !important;
									height: 30px;
								"
							>
								<div class="v-input__control">
									<div class="v-input__slot" style="padding: 0px !important">
										<div class="v-input__prepend-inner">
											<div class="v-input__icon v-input__icon--prepend-inner">
												<i
													aria-hidden="true"
													class="v-icon notranslate mdi mdi-minus theme--light"
												></i>
											</div>
										</div>

										<!-- text input quantity-->
										<div class="v-text-field__slot">
											<input
												@focus="onFocusCustom(cart.id)"
												@blur="onBlurCostum(cart.id)"
												type="text"
												style="text-align: center"
												v-model="cart.qty"
											/>
										</div>

										<!-- icon plus -->
										<div class="v-input__append-inner">
											<div class="v-input__icon v-input__icon--append">
												<i
													aria-hidden="true"
													class="v-icon notranslate mdi mdi-plus theme--light"
												></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- <v-text-field
												dense
												hide-details
												prepend-inner-icon="mdi-minus"
												append-icon="mdi-plus"
                        solo
												value="1"
												style="
													max-width: 100px;
													width: 70px;
													padding: 0px;
													text-align: center;
												"
											></v-text-field> -->
						</div>
						<v-divider class="pb-1" style="border-color: #87bd43" />
					</div>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>
export default {};
</script>

<style>
</style>