<script setup lang="ts">
import { Form } from "@primevue/forms";
import type { UpdateUserDto } from "~/composables/api/generated/model";
import {
  useUsersControllerUpdate,
  useUsersControllerUploadAvatar,
} from "~/composables/api/generated/users/users";
import { useUserStore } from "~/stores/user";

definePageMeta({ middleware: "auth" });
useHead({ title: "Account" });

const { t } = useI18n();
const userStore = useUserStore();
const user = computed(() => userStore.user);
const nationalities = useNationalities();
const { mutateAsync: updateUser } = useUsersControllerUpdate();
const { mutateAsync: uploadAvatar } = useUsersControllerUploadAvatar();

const username = ref(user.value?.username);
const email = ref(user.value?.email);
const nationality = ref(user.value?.nationality);

const { errors, validateForm, clearError } = useFormValidator(
  { username, email },
  {
    username: [required(t("validation.usernameRequired"))],
    email: [required(t("validation.emailRequired"))],
  },
);

const handleUpdateUser = async (userData: UpdateUserDto) => {
  if (!user.value?.id) return;

  const updateResult = await updateUser({
    id: user.value.id,
    data: {
      ...userData,
    },
  });

  if (updateResult.status === 200) {
    userStore.update(updateResult.data);
    alert("User updated successfully");
  } else {
    alert("User updated failed" + updateResult.data.message);
  }
};

const handleAvatarChange = async (avatar: File) => {
  if (!user.value?.id) return;
  const uploadAvatarResult = await uploadAvatar({
    id: user.value.id,
    data: { file: avatar },
  });

  if (uploadAvatarResult.status === 200) {
    userStore.update(uploadAvatarResult.data);
    alert("Avatar updated successfully");
  } else {
    alert("Avatar updated failed" + uploadAvatarResult.data.message);
  }
};

const handleSubmitAndClose = async () => {
  if (validateForm()) {
    handleUpdateUser({
      username: username.value,
      email: email.value,
      nationality: nationality.value,
    });
  }
};

/**
 * TODO: Roadmap des fonctionnalités de la page Compte
 * - [ ] Formulaire de changement de mot de passe
 * - [x] Un uploader d'avatar ?
 * - [x] Formulaire de modification du profil (Username, Email, Avatar)
 * - [ ] Paramètres de confidentialité (Compte privé/public)
 * - [ ] Suppression définitive du compte
 */
</script>

<template>
  <main class="page-account">
    <h1>Account</h1>

    <section>
      <div class="page-account__profile">
        <Card style="width: 25%; text-align: center">
          <template #content>
            <UploadableAvatar
              :image-url="getAvatarUrl(user?.avatar)"
              :label="user?.username?.charAt(0).toUpperCase()"
              @on-avatar-change="handleAvatarChange"
            />
            <h2>{{ user?.username }}</h2>
            <h3>{{ user?.email }}</h3>
          </template>
        </Card>

        <Card style="width: 70%">
          <template #content>
            <div style="display: flex; gap: 2rem; flex-direction: column">
              <div class="account__personal-informations-title">
                <i class="pi pi-user" style="font-size: 1.5rem" />
                <h2>{{ $t("pages.account.personalInformation") }}</h2>
              </div>

              <div style="flex-direction: column; gap: 10px">
                <Form
                  :submit-label="$t('pages.account.save')"
                  severity="success"
                  name="account"
                  :modal="true"
                  @submit="handleSubmitAndClose"
                  style="display: flex; flex-direction: column; gap: 2rem"
                >
                  <div class="account__fields">
                    <!-- username -->
                    <div class="account__input">
                      <PrimeFloatLabel>
                        <PrimeInputText
                          id="username"
                          v-model="username"
                          :default-value="user?.username"
                          :invalid="!!errors.username"
                          @update:model-value="clearError('username')"
                        />
                        <label for="username">{{
                          $t("pages.account.username")
                        }}</label>
                      </PrimeFloatLabel>
                      <PrimeMessage
                        v-if="errors.username"
                        size="small"
                        severity="error"
                        variant="simple"
                      >
                        {{ errors.username }}
                      </PrimeMessage>
                    </div>

                    <!-- email -->
                    <div class="account__input">
                      <PrimeFloatLabel>
                        <PrimeInputText
                          id="email"
                          v-model="email"
                          :default-value="user?.email"
                          :invalid="!!errors.email"
                          @update:model-value="clearError('email')"
                        />
                        <label for="email">{{
                          $t("pages.account.email")
                        }}</label>
                      </PrimeFloatLabel>
                      <PrimeMessage
                        v-if="errors.email"
                        size="small"
                        severity="error"
                        variant="simple"
                      >
                        {{ errors.email }}
                      </PrimeMessage>
                    </div>
                  </div>

                  <div class="account__fields">
                    <!-- nationality -->
                    <div class="account__input">
                      <PrimeFloatLabel>
                        <PrimeSelect
                          id="nationality"
                          optionLabel="label"
                          option-value="code"
                          :options="nationalities"
                          v-model="nationality"
                          :default-value="user?.nationality"
                        />
                        <label for="nationality">{{
                          $t("pages.account.nationality")
                        }}</label>
                      </PrimeFloatLabel>
                    </div>
                  </div>

                  <PrimeButton
                    type="submit"
                    :label="$t('pages.account.save')"
                    :severity="'success'"
                    :size="'large'"
                    variant="plain"
                  />
                </Form>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- TODO: Formulaire de changement de mot de passe -->

    <!-- TODO: Paramètres de confidentialité (Compte privé/public) -->

    <!-- TODO: Suppression définitive du compte -->
  </main>
</template>

<style scoped lang="scss">
.page-account {
  &__profile {
    display: flex;
    gap: 1rem;
  }
}
.account__fields {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.account__input {
  flex-direction: column;
  width: 100%;
}

.account__personal-informations-title {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
}
</style>
