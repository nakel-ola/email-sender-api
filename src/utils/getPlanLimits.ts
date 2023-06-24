function getPlanLimits(plan: string): number {
  switch (plan) {
    case "Free":
      return 100;
    case "Plus":
      return 60000;
    case "Pro":
      return 150000;
    default:
      return 0;
  }
}


export default getPlanLimits