export const PROGRESS_BAR_USAGE_CODE_SNIPPET = `<ProgressBar
  value={50}
  size="medium"
  color="primary"
/>

<!-- Indeterminate (loading) state -->
<ProgressBar color="primary" />

<!-- With click handler -->
<ProgressBar
  value={progress}
  onValueClick={(v) => progress = v}
/>

<!-- Animated value changes -->
<ProgressBar
  value={progress}
  animateValue
/>`;
