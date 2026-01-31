import {
  type Form,
  FormActions,
  type FormControl,
  type FormControlProps,
} from "@/types/models/form";

import { type DiveInterface } from "@/types/global/dive";
import { GraphqlActions } from "@/types/models/graphql";
import { translations } from "@/i18n/index";

const { FORM_DIVING, FORM_WORDING } = translations.en;

/**
 * Dive Form Factory
 * @param {FormActions} action
 * @param {DiveInterface} dive
 * @return {Form}
 */
export function useFormFactory(
  action: FormActions,
  dive?: DiveInterface
): Form {
  function getControlDate(): FormControlProps {
    return {
      name: "FormControlDate",
      label: "Date of the dive",
      type: "datetime-local",
    };
  }

  function getControlText(
    context: string,
    action: FormActions
  ): FormControlProps {
    const regexPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    const regexUsername = /^[A-Za-z0-9_-]*$/;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const rules = [];

    if (
      (action === FormActions.ACCOUNT_UPDATE && context === "password") ||
      context === "maxDepth" ||
      context === "totalTime"
    ) {
      rules.push((v: string) => !!v || FORM_WORDING.RULE_IS_REQUIRED);
    }

    if (action === FormActions.ACCOUNT_DELETE) {
      rules.push(
        (v: string) => v === "DELETE" || FORM_WORDING.RULE_IS_EQUAL_TO_DELETE
      );
    }

    if (
      (action === FormActions.ACCOUNT_UPDATE ||
        action === FormActions.REGISTER) &&
      context === "password"
    ) {
      rules.push(
        (v: string) => regexPassword.test(v) || FORM_WORDING.RULE_PASSWORD_REGEX
      );
    }

    if (action === FormActions.REGISTER && context === "email") {
      rules.push(
        (v: string) => regexEmail.test(v) || FORM_WORDING.RULE_BE_EMAIL
      );
    }

    if (context === "username") {
      rules.push(
        (v: string) => regexUsername.test(v) || FORM_WORDING.RULE_USERNAME
      );
    }

    return {
      name:
        (action === FormActions.ACCOUNT_UPDATE && context === "password") ||
        (action === FormActions.REGISTER && context === "password")
          ? "FormControlDoubleText"
          : "FormControlText",
      type:
        context === "password"
          ? "password"
          : context === "email"
          ? "email"
          : "text",
      label:
        context === "email"
          ? FORM_WORDING.EMAIL
          : context === "password"
          ? FORM_WORDING.PASSWORD
          : context === "username"
          ? FORM_WORDING.USERNAME
          : context === "security_passphrase"
          ? FORM_WORDING.CONSENT
          : "",
      icon: context === "password" ? "$lockOutline" : null,
      rules: rules,
      subtitle:
        action === FormActions.ACCOUNT_UPDATE && context === "password"
          ? FORM_WORDING.PASSWORD_VERIF
          : "",
    };
  }

  function getControlNumber(context: string): FormControlProps {
    return {
      name: "FormControlNumber",
      type: "number",
      label:
        context === "maxDepth"
          ? FORM_DIVING.MAXDEPTH
          : context === "totalTime"
          ? FORM_DIVING.TOTALTIME
          : "",
      rules: [
        (v: number) => !!v || FORM_WORDING.RULE_IS_REQUIRED,
        (v: number) => Math.sign(v) === 1 || FORM_WORDING.RULE_BE_POS_NUMBER,
        (v: number) => Number.isInteger(v) || FORM_WORDING.RULE_BE_INT_NUMBER,
      ],
    };
  }

  function getControlSelect(context: string): FormControlProps {
    if (context === "divingEnvironment") {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ENV,
        query: GraphqlActions.DIVING_ENVIRONMENTS,
        rules: [(v: Text) => !!v || FORM_WORDING.RULE_IS_REQUIRED],
      };
    } else {
      return {
        name: "FormControlSelect",
        label: FORM_DIVING.SELECT_DIVING_ROLES,
        query: GraphqlActions.DIVING_ROLES,
        rules: [(v: Text) => !!v || FORM_WORDING.RULE_IS_REQUIRED],
      };
    }
  }

  function getControlComboBox(): FormControlProps {
    return {
      name: "FormControlComboBox",
      label: FORM_DIVING.SELECT_DIVING_TYPES,
      query: GraphqlActions.DIVING_TYPES,
    };
  }

  function getControlGasGroup(): FormControlProps {
    return {
      name: "FormControlGasGroup",
      label: FORM_DIVING.SELECT_GAS_TANK,
    };
  }

  function getControlRadioList(): FormControlProps {
    return {
      name: "FormControlRadioList",
      label: FORM_WORDING.SELECT_AVATAR,
    };
  }

  function buildProps(propId: string, action: FormActions): FormControlProps {
    switch (propId) {
      case "email":
      case "username":
      case "password":
      case "security_passphrase":
        return getControlText(propId, action);
      case "totalTime":
      case "maxDepth":
        return getControlNumber(propId);
      case "divingEnvironment":
      case "divingRole":
        return getControlSelect(propId);
      case "divingType":
        return getControlComboBox();
      case "date":
        return getControlDate();
      case "gasTanks":
        return getControlGasGroup();
      case "avatar":
        return getControlRadioList();
      default:
        return {
          name: "",
          label: "",
        };
    }
  }

  function __construct(): Form {
    const form: Form = {
      title:
        action === FormActions.DIVE_CREATE && dive
          ? FORM_DIVING.TITLE_ADD
          : action === FormActions.DIVE_UPDATE && dive
          ? FORM_DIVING.TITLE_UPDATE
          : action === FormActions.LOGIN
          ? FORM_WORDING.LOGIN
          : action === FormActions.REGISTER
          ? FORM_WORDING.REGISTER
          : action === FormActions.ACCOUNT_UPDATE
          ? FORM_WORDING.UPDATE_ACCOUNT
          : action === FormActions.ACCOUNT_DELETE
          ? FORM_WORDING.DELETE_ACCOUNT
          : "",
      controls: [],
    };

    const formProps: string[] =
      (action === FormActions.DIVE_CREATE ||
        action === FormActions.DIVE_UPDATE) &&
      dive
        ? Object.getOwnPropertyNames(dive)
        : action === FormActions.LOGIN
        ? ["email", "password"]
        : action === FormActions.REGISTER
        ? ["email", "password", "username"]
        : action === FormActions.ACCOUNT_UPDATE
        ? ["password", "username", "avatar"]
        : action === FormActions.ACCOUNT_DELETE
        ? ["security_passphrase"]
        : [];

    formProps.forEach((propId) => {
      const control: FormControl = {
        id: propId,
        props: null,
      };

      control.props = buildProps(propId, action);
      form.controls.push(control);
    });
    return form;
  }

  return __construct();
}
