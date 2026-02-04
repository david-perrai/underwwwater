<script setup lang="ts">
	/** Props */
	const props = defineProps<{
		isBuyingAddress: boolean;
	}>();

	/** Datas */
	const gtm = useGTM();
	const saveAddress = ref(true);
	const isBillingAddressOrderAdress = ref(true);
	const selectedAddress = ref<AddressInterface | null>(null);
	const formOrder = reactive({
		firstName: '',
		lastName: '',
		street1: '',
		street2: '',
		postcode: '',
		city: '',
		country: '',
		id: '',
	});

	const formBilling = reactive({
		firstName: '',
		lastName: '',
		street1: '',
		street2: '',
		postcode: '',
		city: '',
		country: '',
		id: '',
	});

	const formErrors = reactive({
		order: {
			firstName: null as string | null,
			lastName: null as string | null,
			street1: null as string | null,
			street2: null as string | null,
			postcode: null as string | null,
			city: null as string | null,
			country: null as string | null,
		},
		billing: {
			firstName: null as string | null,
			lastName: null as string | null,
			street1: null as string | null,
			street2: null as string | null,
			postcode: null as string | null,
			city: null as string | null,
			country: null as string | null,
		},
	});

	/** Stores and Composables */
	const userStore = useUserStore();
	const cartStore = useCartStore();
	const toast = useToast();
	const { t } = useI18n({ useScope: 'global' });
	const emit = defineEmits(['step3']);

	/** Computeds */
	const optionsAdresses = computed(() => {
		return [
			{
				id: '',
				isDefault: false,
				firstName: '',
				lastName: '',
				street1: '',
				street2: '',
				postcode: '',
				city: '',
				country: '',
			},
		].concat(userStore?.addresses as []);
	});

	/** Functions */
	/**
	 * Fonction de peuplement des champs
	 * @param {AddressInterface} address
	 * @return {void}
	 */
	function setFields(address: AddressInterface): void {
		formOrder.firstName = address?.firstName;
		formOrder.lastName = address?.lastName;
		formOrder.street1 = address?.street1;
		formOrder.street2 = address?.street2 ? address?.street2 : '';
		formOrder.postcode = address?.postcode;
		formOrder.city = address?.city;
		formOrder.country = address?.country;
		formOrder.id = address?.id as string;
	}

	/**
	 * Fonction submit Form
	 * @return {void}
	 */
	function submitForm(): void {
		let isValid = true;

		formErrors.order.lastName = useInputValidator(
			'lastName',
			formOrder.lastName,
			true,
		);
		isValid = formErrors.order.lastName ? false : isValid;

		formErrors.order.firstName = useInputValidator(
			'firstName',
			formOrder.firstName,
			true,
		);
		isValid = formErrors.order.firstName ? false : isValid;

		formErrors.order.street1 = useInputValidator(
			'street',
			formOrder.street1,
			true,
		);
		isValid = formErrors.order.street1 ? false : isValid;

		formErrors.order.street2 = useInputValidator(
			'street',
			formOrder.street2,
			false,
		);
		isValid = formErrors.order.street2 ? false : isValid;

		formErrors.order.postcode = useInputValidator(
			'postcode',
			formOrder.postcode,
			true,
		);
		isValid = formErrors.order.postcode ? false : isValid;

		formErrors.order.city = useInputValidator('city', formOrder.street1, true);
		isValid = formErrors.order.city ? false : isValid;

		formErrors.order.country = useInputValidator(
			'country',
			formOrder.country,
			false,
		);
		isValid = formErrors.order.country ? false : isValid;

		if (!isValid) {
			toast.add({
				severity: 'error',
				detail: t('TOASTERS.ERROR_FORM'),
				life: 4000,
				styleClass: 'custom-toast-error',
			});

			return;
		}

		// Si addresse de livraison === addresse de paiement
		if (isBillingAddressOrderAdress.value) {
			cartStore.orderAddress = {
				firstName: formOrder.firstName,
				lastName: formOrder.lastName,
				street1: formOrder.street1,
				street2: formOrder.street2 || '',
				city: formOrder.city,
				postcode: formOrder.postcode,
				country: formOrder.country,
				id: formOrder.id,
				toAddressBook: saveAddress.value,
			};

			cartStore.billingAddress = {
				firstName: formOrder.firstName,
				lastName: formOrder.lastName,
				street1: formOrder.street1,
				street2: formOrder.street2 || '',
				city: formOrder.city,
				postcode: formOrder.postcode,
				country: formOrder.country,
				id: formOrder.id,
				sameAddress: true,
			};
		} else {
			cartStore.orderAddress = {
				firstName: formOrder.firstName,
				lastName: formOrder.lastName,
				street1: formOrder.street1,
				street2: formOrder.street2 || '',
				city: formOrder.city,
				postcode: formOrder.postcode,
				country: formOrder.country,
				id: formOrder.id,
				toAddressBook: saveAddress.value,
			};

			cartStore.billingAddress = {
				firstName: formBilling.firstName,
				lastName: formBilling.lastName,
				street1: formBilling.street1,
				street2: formBilling.street2 || '',
				city: formBilling.city,
				postcode: formBilling.postcode,
				country: formBilling.country,
			};
		}

		cartStore.saveOrderAddress();

		gtm.addShippingInfo(cartStore?.items, cartStore?.amounts?.total, 'AGEDISS');
		emit('step3');
	}

	/** onMounted */
	onMounted(() => {
		userStore.fetchAddresses().then(() => {
			if (!userStore?.addresses?.length) {
				selectedAddress.value = optionsAdresses?.value[0];

				return;
			}

			selectedAddress.value =
				userStore?.addresses?.find((address) => {
					return address.isDefault;
				}) || userStore?.addresses[0];

			setFields(selectedAddress.value);
		});
	});

	/** Watchers */
	watch(selectedAddress, (newAddress) => {
		setFields(newAddress as AddressInterface);
	});

	watch(
		() => props.isBuyingAddress,
		(val) => {
			if (val && isBillingAddressOrderAdress.value) {
				isBillingAddressOrderAdress.value = false;
			}
		},
		{ immediate: true },
	);
</script>

<template>
	<div :class="['form--outer']">
		<div :class="['form', 'form--facturation']">
			<h2 :class="['h1', 'h1--semipoint']">{{ t('VAR.DELIVERY_INFO') }}</h2>

			<!-- ADRESSE DE LIVRAISON -->
			<form action="#" method="post" @submit.prevent="">
				<div :class="['account__forms-strate']">
					<div :class="['form__group']">
						<label for="email" :class="['form__label']">
							{{ t('VAR.SELECT_ADRESS') }}
						</label>
						<PrimeSelect
							v-model="selectedAddress"
							:class="['form__dropdown']"
							:options="optionsAdresses"
							:option-label="
								(address) => {
									return !address.id
										? '+ Saisir une nouvelle addresse'
										: address.street1 +
												(address.street2 ? ', ' : '') +
												address.street2 +
												(address.postcode ? ' - ' + address.postcode : '');
								}
							"
						/>
					</div>

					<div :class="['form__group', 'form__group--row']">
						<div>
							<FormInput
								v-model="formOrder.firstName"
								input-id="FormFacturation_firstname"
								:ctx="'FIRSTNAME'"
								:error-message="formErrors.order.firstName"
								:required="true"
							/>
						</div>
						<div>
							<FormInput
								v-model="formOrder.lastName"
								input-id="FormFacturation_lastname"
								:ctx="'LASTNAME'"
								:error-message="formErrors.order.lastName"
								:required="true"
							/>
						</div>
					</div>

					<div :class="['form__group']">
						<FormInput
							v-model="formOrder.street1"
							input-id="FormFacturation_street1"
							:ctx="'STREET1'"
							:error-message="formErrors.order.street1"
							:required="true"
						/>
					</div>

					<div :class="['form__group']">
						<FormInput
							v-model="formOrder.street2"
							input-id="FormFacturation_street2"
							:ctx="'STREET2'"
							:error-message="formErrors.order.street2"
						/>
					</div>

					<div :class="['form__group', 'form__group--row']">
						<div>
							<FormInput
								v-model="formOrder.postcode"
								input-id="FormFacturation_postcode"
								:ctx="'POSTCODE'"
								:error-message="formErrors.order.postcode"
								:required="true"
							/>
						</div>

						<div>
							<FormInput
								v-model="formOrder.city"
								input-id="FormFacturation_city"
								:ctx="'CITY'"
								:error-message="formErrors.order.city"
								:required="true"
							/>
						</div>

						<div>
							<FormInput
								v-model="formOrder.country"
								input-id="FormFacturation_country"
								:ctx="'COUNTRY'"
								:error-message="formErrors.order.country"
								:required="true"
							/>
						</div>
					</div>

					<div>
						<FormCheckbox
							v-model="saveAddress"
							:label="'Enregistrer dans mon carnet d’adresses.'"
							:value="saveAddress"
						/>
					</div>
				</div>
			</form>
		</div>

		<div :class="['form', 'form--facturation']">
			<h2 :class="['h1', 'h1--semipoint']">{{ t('VAR.DELIVERY_METHOD') }}</h2>
			<p>
				{{ t('VAR.DELIVERY_ACTOR') }}
			</p>
		</div>

		<div :class="['form', 'form--facturation']">
			<h2 :class="['h1', 'h1--semipoint']">{{ t('VAR.PAYEMENT_METHOD') }}</h2>

			<strong>Le paiement s'effectuera par Carte bancaire.</strong>

			<br />

			<div :style="{ marginTop: '20px' }">
				<FormCheckbox
					v-model="isBillingAddressOrderAdress"
					:label="'Mes informations de facturation sont les mêmes que mes informations d’expédition.'"
					:value="isBillingAddressOrderAdress"
				/>
			</div>

			<!-- ADRESSE DE FACTURATION -->
			<form
				v-if="!isBillingAddressOrderAdress"
				action="#"
				method="post"
				:style="{ marginTop: '20px' }"
				@submit.prevent=""
			>
				<div :class="['account__forms-strate']">
					<div :class="['form__group', 'form__group--row']">
						<div>
							<FormInput
								v-model="formBilling.firstName"
								form="FormFacturation_firstName_billing"
								:ctx="'FIRSTNAME'"
								:error-message="formErrors.billing.firstName"
								:required="true"
							/>
						</div>
						<div>
							<FormInput
								v-model="formBilling.lastName"
								input-id="FormFacturation_lastname_billing"
								:ctx="'LASTNAME'"
								:error-message="formErrors.billing.lastName"
								:required="true"
							/>
						</div>
					</div>

					<div :class="['form__group']">
						<FormInput
							v-model="formBilling.street1"
							input-id="FormFacturation_street1_billing"
							:ctx="'STREET1'"
							:error-message="formErrors.billing.street1"
							:required="true"
						/>
					</div>

					<div :class="['form__group']">
						<FormInput
							v-model="formBilling.street2"
							input-id="FormFacturation_street2_billing"
							:ctx="'STREET2'"
							:error-message="formErrors.billing.street2"
						/>
					</div>

					<div :class="['form__group', 'form__group--row']">
						<div>
							<FormInput
								v-model="formBilling.postcode"
								input-id="FormFacturation_postcode_billing"
								:ctx="'POSTCODE'"
								:error-message="formErrors.billing.postcode"
								:required="true"
							/>
						</div>

						<div>
							<FormInput
								v-model="formBilling.city"
								input-id="FormFacturation_city_billing"
								:ctx="'CITY'"
								:error-message="formErrors.billing.city"
								:required="true"
							/>
						</div>

						<div>
							<FormInput
								v-model="formBilling.country"
								input-id="FormFacturation_country_billing"
								:ctx="'COUNTRY'"
								:error-message="formErrors.billing.country"
								:required="true"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>

		<Cta :shadow="true" :label="t('CTA.CONTINUE')" @click="submitForm" />
	</div>
</template>
