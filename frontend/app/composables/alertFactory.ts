const ALERT_STATE_KEY = "alerts";

interface Alert {
  type: string;
  message: string;
}

/**
 * Alert Factory
 * @param {string} type
 * @param {string} message
 * @return {void}
 */
export function useAlertFactory(type: string, message: string): void {
  const alerts = useState<Alert[]>(ALERT_STATE_KEY, () => []);
  const newAlert = { type: type, message: message };
  alerts.value.push(newAlert);

  setTimeout(() => {
    alerts.value = alerts.value.filter(a => a !== newAlert);
  }, 5000);
}
