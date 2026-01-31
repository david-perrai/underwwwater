<script setup lang="ts">
import { statsAxios } from "../../plugins/axios";
import { translations } from "@/i18n/index";

const { TITLE } = translations.en.PAGES.STATS;

const response = await statsAxios.post("/stats");

console.log(response);
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <PageTitle :label="TITLE" />

      <v-row>
        <v-col>
          <p v-if="response?.data?.totalDives">
            - underwwwater count a total of
            {{ response.data.totalDives }}dives.
          </p>
          <p v-if="response?.data?.totalUsers">
            - {{ response.data.totalUsers }} users have signed in.
          </p>
          <br />

          <p
            v-if="
              response?.data?.deepestDive?.username &&
              response?.data?.deepestDive?.max_depth
            "
          >
            - The deepest dive have been done by
            {{ response.data.deepestDive.username }} on a depth of
            {{ response.data.deepestDive.max_depth }}meters.
          </p>
          <p
            v-if="
              response?.data?.longestDive?.username &&
              response?.data?.longestDive?.total_time
            "
          >
            - The longest dive have been done by
            {{ response.data.longestDive.username }} on a time of
            {{ response.data.longestDive.total_time }}minutes.
          </p>

          <p
            v-if="
              response?.data?.mostActiveDiver?.username &&
              response?.data?.mostActiveDiver?.dive_count
            "
          >
            - The most active diver is
            {{ response.data.mostActiveDiver.username }}, with
            {{ response.data.mostActiveDiver.dive_count }}dives.
          </p>

          <br />
          <p
            v-if="
              response?.data?.lastSubscribedUser?.username &&
              response?.data?.lastSubscribedUser?.subscribed_at
            "
          >
            The last subscribed user is
            {{ response.data.lastSubscribedUser.username }}, the
            {{ response.data.lastSubscribedUser.subscribed_at }},
          </p>
          <p
            v-if="
              response?.data?.firstSubscribedUser?.username &&
              response?.data?.firstSubscribedUser?.subscribed_at
            "
          >
            The first subscribed user is
            {{ response.data.firstSubscribedUser.username }}, the
            {{ response.data.firstSubscribedUser.subscribed_at }},
          </p>
        </v-col>
      </v-row>
    </template>
  </StrateTemplate>
</template>
