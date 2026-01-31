import { ApolloError, ApolloQueryResult } from "@apollo/client";
import {
  QUERY_DATES_BY_DIVES,
  QUERY_DEPTH_BY_DIVES,
  QUERY_DIVES,
  QUERY_DIVES_BY_DATES,
  QUERY_FIRST_DIVE,
  QUERY_GASTANKS_BY_DIVES,
  QUERY_LAST_DIVE,
  THEMES_BY_DIVES,
} from "@/graphql/queries/queryDives";

import { DocumentNode } from "graphql";
import { DocumentParameter } from "@vue/apollo-composable/dist/useQuery";
import { GraphqlActions } from "@/types/models/graphql";
import { QUERY_DIVING_ENVIRONMENTS } from "@/graphql/queries/queryDivingEnvironment";
import { QUERY_DIVING_ROLES } from "@/graphql/queries/queryDivingRole";
import { QUERY_DIVING_TYPES } from "@/graphql/queries/queryDivingType";
import { apiAxios } from "@/plugins/axios";
import { ref } from "vue";
import store from "@/store";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL Requests Factory
 * @param {GraphqlActions} action GraphqlActions
 * @param {object} variables object
 */
export function useGqlQueryManager(action: GraphqlActions, variables?: object) {
  function processPromisedQuery<TResult = any>(
    gqlAction: DocumentParameter<TResult>
  ) {
    const enableQuery = ref(false);
    const {
      onResult,
      loading: queryLoading,
      onError,
      refetch,
    } = useQuery(gqlAction, variables ? variables : {}, () => ({
      enabled: enableQuery.value,
      notifyOnNetworkStatusChange: false,
    }));

    const apolloQuery = () =>
      new Promise<ApolloQueryResult<TResult>>((resolve, reject) => {
        enableQuery.value = true;

        onResult((res) => {
          if (!res.loading) {
            enableQuery.value = false;

            if (!res.data) {
              reject("no data");
            }
            resolve(res);
          }
        });

        onError((err: ApolloError) => {
          const statusCode = err.message.match(/\b\d{3}\b/);

          if (statusCode && statusCode[0] === "401") {
            apiAxios.post("/refresh_token").then((response) => {
              store.commit("setRefreshUserToken", response.data.refresh_token);
            });
            refetch();
          } else {
            enableQuery.value = false;
          }
        });
      });

    return {
      apolloQuery,
      queryLoading,
    };
  }

  async function __process() {
    const query: DocumentNode | false | null =
      action === GraphqlActions.DIVING_TYPES
        ? QUERY_DIVING_TYPES
        : action === GraphqlActions.DIVING_ENVIRONMENTS
        ? QUERY_DIVING_ENVIRONMENTS
        : action === GraphqlActions.DIVING_ROLES
        ? QUERY_DIVING_ROLES
        : action === GraphqlActions.GAS_BY_DIVES
        ? QUERY_GASTANKS_BY_DIVES
        : action === GraphqlActions.DIVES_BY_DATES
        ? QUERY_DIVES_BY_DATES
        : action === GraphqlActions.DEPTH_BY_DIVES
        ? QUERY_DEPTH_BY_DIVES
        : action === GraphqlActions.FIRST_DIVE
        ? QUERY_FIRST_DIVE
        : action === GraphqlActions.LAST_DIVE
        ? QUERY_LAST_DIVE
        : action === GraphqlActions.THEMES_BY_DIVES
        ? THEMES_BY_DIVES
        : action === GraphqlActions.DATES_BY_DIVES
        ? QUERY_DATES_BY_DIVES
        : action === GraphqlActions.DIVES
        ? QUERY_DIVES
        : null;

    if (
      !action ||
      query === null ||
      !Object.values(GraphqlActions).includes(action)
    ) {
      throw "GraphQL action to process is unknown!";
    }

    const { apolloQuery } = processPromisedQuery(query as DocumentNode);

    const { data } = await apolloQuery();

    return data;
  }

  return __process();
}
